from __future__ import annotations

import hashlib
import os
import re
import subprocess
from dataclasses import dataclass
from datetime import datetime
from pathlib import Path
from typing import Optional


@dataclass(frozen=True)
class ConversionResult:
    markdown: str
    title: str
    source_type: str
    warnings: list[str]


_NON_WORD_RE = re.compile(r"[^a-z0-9]+")


def slugify(text: str, *, fallback: str = "untitled") -> str:
    s = text.strip().lower()
    s = _NON_WORD_RE.sub("-", s)
    s = s.strip("-")
    return s or fallback


def sha256_file(path: Path, *, chunk_size: int = 1024 * 1024) -> str:
    h = hashlib.sha256()
    with path.open("rb") as f:
        while True:
            b = f.read(chunk_size)
            if not b:
                break
            h.update(b)
    return h.hexdigest()


def ensure_unique_path(path: Path) -> Path:
    if not path.exists():
        return path
    stem = path.stem
    suffix = path.suffix
    parent = path.parent
    for i in range(2, 10_000):
        candidate = parent / f"{stem}-{i}{suffix}"
        if not candidate.exists():
            return candidate
    raise RuntimeError(f"Unable to create unique path for {path}")


def _frontmatter(title: str, *, source: str, added: str) -> str:
    # Keep raw markdown minimal; the wiki layer enforces YAML conventions.
    return (
        f"# {title}\n"
        f"_Source: {source}_\n\n"
        f"_Date added: {added}_\n\n"
        "---\n\n"
    )


def convert_local_file_to_markdown(path: Path) -> ConversionResult:
    warnings: list[str] = []

    ext = path.suffix.lower()
    if ext == ".md":
        text = path.read_text(errors="replace")
        title = _infer_title_from_markdown(text) or path.stem
        return ConversionResult(markdown=text, title=title, source_type="markdown", warnings=warnings)

    if ext in {".txt", ".text"}:
        text = path.read_text(errors="replace")
        title = _infer_title_from_text(text) or path.stem
        md = _frontmatter(title, source=str(path.name), added=_today()) + text.strip() + "\n"
        return ConversionResult(markdown=md, title=title, source_type="text", warnings=warnings)

    if ext in {".html", ".htm"}:
        html = path.read_text(errors="replace")
        md_body, title = _html_to_markdown(html)
        title = title or path.stem
        md = _frontmatter(title, source=str(path.name), added=_today()) + md_body.strip() + "\n"
        return ConversionResult(markdown=md, title=title, source_type="html", warnings=warnings)

    if ext == ".pdf":
        md_body, title, pdf_warnings = _pdf_to_markdown(path)
        warnings.extend(pdf_warnings)
        title = title or path.stem
        md = _frontmatter(title, source=str(path.name), added=_today()) + md_body.strip() + "\n"
        return ConversionResult(markdown=md, title=title, source_type="pdf", warnings=warnings)

    # Best-effort: try pandoc if present; otherwise fallback to lossy text.
    md_body, pandoc_title, pandoc_warnings = _pandoc_convert(path)
    if md_body is not None:
        warnings.extend(pandoc_warnings)
        title = pandoc_title or path.stem
        md = _frontmatter(title, source=str(path.name), added=_today()) + md_body.strip() + "\n"
        return ConversionResult(markdown=md, title=title, source_type="pandoc", warnings=warnings)

    # Fallback: treat as binary/unknown
    warnings.append(f"Unknown file type {ext}; stored as placeholder with path reference.")
    title = path.stem
    md = _frontmatter(title, source=str(path.name), added=_today()) + f"Could not convert `{path.name}` to Markdown.\n"
    return ConversionResult(markdown=md, title=title, source_type="unknown", warnings=warnings)


def convert_url_to_markdown(url: str, *, timeout_s: int = 30) -> ConversionResult:
    warnings: list[str] = []
    try:
        import requests
    except Exception as e:  # pragma: no cover
        raise RuntimeError("Missing dependency: requests") from e

    resp = requests.get(url, timeout=timeout_s, headers={"User-Agent": "thinkfirst-llm-intake/1.0"})
    resp.raise_for_status()

    content_type = (resp.headers.get("content-type") or "").lower()
    raw = resp.text if "charset" in content_type or "text/" in content_type or "html" in content_type else resp.content

    if isinstance(raw, bytes):
        # Attempt to decode; if not, provide a placeholder.
        try:
            raw = raw.decode("utf-8", errors="replace")
        except Exception:
            raw = ""

    if "html" in content_type or "<html" in raw.lower():
        md_body, title = _html_to_markdown(raw)
        title = title or url
        md = _frontmatter(_safe_title(title), source=url, added=_today()) + md_body.strip() + "\n"
        return ConversionResult(markdown=md, title=_safe_title(title), source_type="url_html", warnings=warnings)

    title = url
    md = _frontmatter(_safe_title(title), source=url, added=_today()) + str(raw).strip() + "\n"
    return ConversionResult(markdown=md, title=_safe_title(title), source_type="url_text", warnings=warnings)


def _safe_title(title: str, *, max_len: int = 120) -> str:
    t = " ".join(title.split())
    if len(t) > max_len:
        return t[: max_len - 1] + "…"
    return t


def _today() -> str:
    return datetime.now().strftime("%Y-%m-%d")


def _infer_title_from_markdown(md: str) -> Optional[str]:
    for line in md.splitlines():
        if line.startswith("# "):
            return line[2:].strip()
    return None


def _infer_title_from_text(text: str) -> Optional[str]:
    for line in text.splitlines():
        s = line.strip()
        if s:
            return _safe_title(s)
    return None


def _html_to_markdown(html: str) -> tuple[str, Optional[str]]:
    try:
        from bs4 import BeautifulSoup
    except Exception as e:  # pragma: no cover
        raise RuntimeError("Missing dependency: beautifulsoup4") from e
    try:
        from markdownify import markdownify as mdify
    except Exception as e:  # pragma: no cover
        raise RuntimeError("Missing dependency: markdownify") from e

    soup = BeautifulSoup(html, "html.parser")
    title = soup.title.get_text(strip=True) if soup.title else None

    # Remove obvious non-content.
    for tag in soup(["script", "style", "noscript"]):
        tag.decompose()

    body = soup.body or soup
    md = mdify(str(body), heading_style="ATX")
    md = md.strip()
    return md, title


def _pdf_to_markdown(path: Path) -> tuple[str, Optional[str], list[str]]:
    warnings: list[str] = []
    title: Optional[str] = None
    text_parts: list[str] = []

    try:
        from pypdf import PdfReader
    except Exception as e:  # pragma: no cover
        raise RuntimeError("Missing dependency: pypdf") from e

    reader = PdfReader(str(path))
    meta = getattr(reader, "metadata", None)
    if meta:
        t = getattr(meta, "title", None)
        if t:
            title = str(t)

    for i, page in enumerate(reader.pages):
        try:
            txt = page.extract_text() or ""
        except Exception:
            txt = ""
        txt = txt.strip()
        if not txt:
            continue
        text_parts.append(f"-- page {i + 1} --\n{txt}\n")

    if not text_parts:
        warnings.append("PDF text extraction produced empty output.")
        text_parts.append(f"(No extractable text found in `{path.name}`.)\n")

    return "\n".join(text_parts).strip() + "\n", title, warnings


def _pandoc_convert(path: Path) -> tuple[Optional[str], Optional[str], list[str]]:
    warnings: list[str] = []

    if not _has_executable("pandoc"):
        return None, None, warnings

    # Pandoc emits markdown; title extraction is best-effort.
    cmd = ["pandoc", str(path), "-t", "gfm", "--wrap=preserve"]
    try:
        proc = subprocess.run(cmd, check=False, capture_output=True, text=True)
    except Exception as e:  # pragma: no cover
        warnings.append(f"pandoc failed to run: {e}")
        return None, None, warnings

    if proc.returncode != 0:
        warnings.append(f"pandoc conversion failed (exit {proc.returncode}).")
        if proc.stderr.strip():
            warnings.append(proc.stderr.strip().splitlines()[-1])
        return None, None, warnings

    md = proc.stdout
    title = _infer_title_from_markdown(md)
    return md, title, warnings


def _has_executable(name: str) -> bool:
    return any(
        os.access(str(Path(p) / name), os.X_OK)
        for p in os.environ.get("PATH", "").split(os.pathsep)
        if p
    )

