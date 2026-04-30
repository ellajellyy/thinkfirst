from __future__ import annotations

import json
from dataclasses import asdict, dataclass
from datetime import datetime
from pathlib import Path
from typing import Any, Optional

import sys

# Allow running as `python3 scripts/llm_intake.py ...` from repo root.
SCRIPTS_DIR = Path(__file__).resolve().parent
if str(SCRIPTS_DIR) not in sys.path:
    sys.path.insert(0, str(SCRIPTS_DIR))

from llm_convert import (  # noqa: E402
    ConversionResult,
    convert_local_file_to_markdown,
    convert_url_to_markdown,
    ensure_unique_path,
    slugify,
)


ROOT = Path(__file__).resolve().parents[1]
RAW_DIR = ROOT / "raw"
CACHE_DIR = ROOT / ".cache"
QUEUE_PATH = CACHE_DIR / "intake_queue.json"


@dataclass(frozen=True)
class QueueItem:
    id: str
    created_at: str
    source: str  # file path or url or "text:<name>"
    raw_path: str  # path to raw markdown file
    title: str
    source_type: str
    warnings: list[str]


def intake_local_file(path: Path, *, batch: Optional[str] = None) -> QueueItem:
    path = path.resolve()
    if not path.exists():
        raise FileNotFoundError(str(path))

    result = convert_local_file_to_markdown(path)
    raw_path = _write_raw_markdown(result, source_label=str(path), batch=batch)
    item = _enqueue(result, source=str(path), raw_path=raw_path)
    return item


def intake_url(url: str, *, batch: Optional[str] = None) -> QueueItem:
    result = convert_url_to_markdown(url)
    raw_path = _write_raw_markdown(result, source_label=url, batch=batch)
    item = _enqueue(result, source=url, raw_path=raw_path)
    return item


def intake_text(text: str, *, title: str, batch: Optional[str] = None) -> QueueItem:
    # Store text directly as a raw markdown doc.
    now = _today()
    safe_title = title.strip() or "untitled"
    md = f"# {safe_title}\n_Source: pasted text_\n\n_Date added: {now}_\n\n---\n\n{text.strip()}\n"
    result = ConversionResult(markdown=md, title=safe_title, source_type="pasted_text", warnings=[])
    raw_path = _write_raw_markdown(result, source_label=f"text:{safe_title}", batch=batch)
    item = _enqueue(result, source=f"text:{safe_title}", raw_path=raw_path)
    return item


def _write_raw_markdown(result: ConversionResult, *, source_label: str, batch: Optional[str]) -> Path:
    RAW_DIR.mkdir(parents=True, exist_ok=True)
    subdir = RAW_DIR / slugify(batch) if batch else RAW_DIR
    subdir.mkdir(parents=True, exist_ok=True)

    base = slugify(result.title or "untitled")
    out = ensure_unique_path(subdir / f"{base}.md")

    # Invariant: never modify existing files under raw/. ensure_unique_path enforces add-only.
    out.write_text(result.markdown, encoding="utf-8")
    return out


def _enqueue(result: ConversionResult, *, source: str, raw_path: Path) -> QueueItem:
    CACHE_DIR.mkdir(parents=True, exist_ok=True)

    item = QueueItem(
        id=_make_id(source, raw_path),
        created_at=datetime.now().isoformat(timespec="seconds"),
        source=source,
        raw_path=str(raw_path.relative_to(ROOT)),
        title=result.title,
        source_type=result.source_type,
        warnings=result.warnings,
    )

    queue = _read_queue()
    queue.setdefault("version", 1)
    items: list[dict[str, Any]] = queue.setdefault("items", [])

    # De-dupe by raw_path; watcher restarts shouldn’t re-enqueue the same output.
    if any(i.get("raw_path") == item.raw_path for i in items):
        return item

    items.append(asdict(item))
    _write_queue(queue)
    return item


def _read_queue() -> dict[str, Any]:
    if not QUEUE_PATH.exists():
        return {"version": 1, "items": []}
    return json.loads(QUEUE_PATH.read_text(encoding="utf-8"))


def _write_queue(queue: dict[str, Any]) -> None:
    QUEUE_PATH.write_text(json.dumps(queue, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


def _make_id(source: str, raw_path: Path) -> str:
    # Stable enough for human inspection; not security-sensitive.
    s = f"{source}|{raw_path.name}"
    return slugify(s)[:80]


def _today() -> str:
    return datetime.now().strftime("%Y-%m-%d")


def main(argv: list[str]) -> int:
    import argparse

    parser = argparse.ArgumentParser(description="Normalize inputs into raw/ markdown and enqueue for /llm ingest.")
    sub = parser.add_subparsers(dest="cmd", required=True)

    p_file = sub.add_parser("file", help="Intake a local file path.")
    p_file.add_argument("path")
    p_file.add_argument("--batch", default=None)

    p_url = sub.add_parser("url", help="Intake a URL (download and convert).")
    p_url.add_argument("url")
    p_url.add_argument("--batch", default=None)

    p_text = sub.add_parser("text", help="Intake pasted text.")
    p_text.add_argument("--title", required=True)
    p_text.add_argument("--batch", default=None)
    p_text.add_argument("--path", help="Read text from file instead of stdin.", default=None)

    args = parser.parse_args(argv)

    if args.cmd == "file":
        item = intake_local_file(Path(args.path), batch=args.batch)
    elif args.cmd == "url":
        item = intake_url(args.url, batch=args.batch)
    else:
        if args.path:
            txt = Path(args.path).read_text(encoding="utf-8", errors="replace")
        else:
            txt = _read_stdin()
        item = intake_text(txt, title=args.title, batch=args.batch)

    print(json.dumps(asdict(item), indent=2, ensure_ascii=False))
    return 0


def _read_stdin() -> str:
    import sys

    return sys.stdin.read()


if __name__ == "__main__":
    raise SystemExit(main(__import__("sys").argv[1:]))

