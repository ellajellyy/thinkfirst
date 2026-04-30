# thinkfirst knowledge base scripts

## What this does

This repo uses a **two-stage intake pipeline**:

1) **Automatic intake (watcher)**: normalizes new inputs into `raw/*.md` and queues them.\n
2) **LLM ingest (`/llm`)**: reads queued `raw/*.md` and follows `CLAUDE.md` to update the wiki (`wiki/`, `index.md`, `log.md`).\n

## Setup

From repo root:

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

Optional (better conversions):

- Install `pandoc` so non-text documents (docx, etc.) convert cleanly.

## Run the watcher

```bash
source .venv/bin/activate
python3 scripts/llm_watch.py --scan-existing
```

Then add files to `inbox/`.

### URL intake

Create a file in `inbox/` with extension `.url` containing a URL, for example:

`inbox/paul-graham-essay.url`

```
https://example.com/some-article
```

### Pasted text intake

Create a `.txt` or `.md` file in `inbox/` with the content.\n

## Queue file

The watcher appends items into:

- `.cache/intake_queue.json`

The Cursor `/llm` command uses this queue to know what needs ingesting.

