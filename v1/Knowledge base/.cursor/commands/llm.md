---
name: llm
description: Normalize+ingest queued sources into the wiki (Think First OS).
---

## /llm — thinkfirst OS

### First step (always)
- Read `CLAUDE.md` and follow it exactly.

### Inputs
- This command uses the intake queue at `.cache/intake_queue.json`.

### Invariants (never violate)
- Never modify anything already inside `raw/` (immutable ground truth).
- `log.md` is append-only; never edit previous entries.

### Steps
1. Read `.cache/intake_queue.json`.\n
2. For each queued item (in order):\n
   - Read the referenced `raw/*.md` file.\n
   - Follow the **Ingest** workflow in `CLAUDE.md`:\n
     - Create/update `wiki/sources/<slug>.md`\n
     - Update/create relevant `wiki/concepts/*.md` and `wiki/entities/*.md`\n
     - Update `index.md`\n
     - Append a new entry to `log.md` (use the standard prefix + list files touched)\n
3. When an item is fully ingested, remove it from `.cache/intake_queue.json` (do not touch the raw file).\n

### Finish
- If anything fails mid-way, leave remaining queue items untouched and report what’s left.\n

