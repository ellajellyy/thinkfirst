from __future__ import annotations

import json
import sys
import time
from dataclasses import asdict
from pathlib import Path
from typing import Any, Optional


ROOT = Path(__file__).resolve().parents[1]
SCRIPTS_DIR = Path(__file__).resolve().parent
if str(SCRIPTS_DIR) not in sys.path:
    sys.path.insert(0, str(SCRIPTS_DIR))

INBOX_DIR = ROOT / "inbox"
CACHE_DIR = ROOT / ".cache"
SEEN_PATH = CACHE_DIR / "llm_watch_seen.json"


def main(argv: list[str]) -> int:
    import argparse

    parser = argparse.ArgumentParser(description="Watch inbox/ and normalize new items into raw/ Markdown.")
    parser.add_argument("--inbox", default=str(INBOX_DIR))
    parser.add_argument("--batch", default=None, help="Optional batch folder name under raw/.")
    parser.add_argument("--scan-existing", action="store_true", help="Also process existing files in inbox on startup.")
    args = parser.parse_args(argv)

    inbox = Path(args.inbox).resolve()
    inbox.mkdir(parents=True, exist_ok=True)
    CACHE_DIR.mkdir(parents=True, exist_ok=True)

    seen = _load_seen()

    if args.scan_existing:
        for p in sorted(inbox.iterdir()):
            _maybe_process_path(p, batch=args.batch, seen=seen)
        _save_seen(seen)

    try:
        from watchdog.events import FileSystemEventHandler
        from watchdog.observers import Observer
    except Exception as e:  # pragma: no cover
        raise RuntimeError("Missing dependency: watchdog (pip install -r requirements.txt)") from e

    handler = _Handler(batch=args.batch, seen=seen)
    observer = Observer()
    observer.schedule(handler, str(inbox), recursive=False)
    observer.start()

    print(f"[llm_watch] watching: {inbox}")
    try:
        while True:
            time.sleep(0.5)
    except KeyboardInterrupt:
        pass
    finally:
        observer.stop()
        observer.join(timeout=5)
        _save_seen(seen)

    return 0


class _Handler:  # watchdog wants a concrete handler
    def __init__(self, *, batch: Optional[str], seen: dict[str, Any]):
        self.batch = batch
        self.seen = seen

    def on_created(self, event):  # type: ignore[no-untyped-def]
        if getattr(event, "is_directory", False):
            return
        p = Path(getattr(event, "src_path")).resolve()
        _maybe_process_path(p, batch=self.batch, seen=self.seen)
        _save_seen(self.seen)

    def on_moved(self, event):  # type: ignore[no-untyped-def]
        if getattr(event, "is_directory", False):
            return
        p = Path(getattr(event, "dest_path")).resolve()
        _maybe_process_path(p, batch=self.batch, seen=self.seen)
        _save_seen(self.seen)


def _maybe_process_path(path: Path, *, batch: Optional[str], seen: dict[str, Any]) -> None:
    if not path.exists() or not path.is_file():
        return

    if path.name.startswith("."):
        return

    sig = _signature(path)
    prev = seen.get(str(path))
    if prev == sig:
        return

    # Avoid processing files still being written.
    if not _wait_for_stable_size(path):
        return

    try:
        item = _process_path(path, batch=batch)
        print(f"[llm_watch] queued: {item.raw_path} ({item.source_type})")
        if item.warnings:
            for w in item.warnings:
                print(f"[llm_watch] warning: {w}")
    except Exception as e:
        print(f"[llm_watch] error processing {path.name}: {e}")
        return

    seen[str(path)] = sig


def _process_path(path: Path, *, batch: Optional[str]):
    from llm_intake import intake_local_file, intake_url

    ext = path.suffix.lower()

    # URL intake: a simple text file containing a URL.
    if ext in {".url", ".webloc"}:
        url = path.read_text(encoding="utf-8", errors="replace").strip().splitlines()[0].strip()
        return intake_url(url, batch=batch)

    return intake_local_file(path, batch=batch)


def _wait_for_stable_size(path: Path, *, checks: int = 5, interval_s: float = 0.2) -> bool:
    try:
        last = path.stat().st_size
    except FileNotFoundError:
        return False
    for _ in range(checks):
        time.sleep(interval_s)
        try:
            cur = path.stat().st_size
        except FileNotFoundError:
            return False
        if cur == last:
            return True
        last = cur
    return True


def _signature(path: Path) -> dict[str, Any]:
    st = path.stat()
    return {"mtime": int(st.st_mtime), "size": int(st.st_size)}


def _load_seen() -> dict[str, Any]:
    if not SEEN_PATH.exists():
        return {}
    try:
        return json.loads(SEEN_PATH.read_text(encoding="utf-8"))
    except Exception:
        return {}


def _save_seen(seen: dict[str, Any]) -> None:
    SEEN_PATH.write_text(json.dumps(seen, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1:]))

