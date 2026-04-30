# Think First — LLM Wiki Schema

## What is Think First

Think First is a product built around one core belief: most failures happen because people jump to solutions before they've understood the problem. The product helps individuals and teams slow down, ask better questions, and develop clearer problem understanding before committing to a direction.

This wiki is the complete secondary brain for the product. It compiles everything learned — articles, interviews, books, original thinking, user research, competitive analysis — into a structured, cross-linked knowledge base that compounds over time.

**The human:** curates sources, directs exploration, asks questions, makes decisions.
**The LLM (me):** writes and maintains all wiki pages, cross-references, summaries, and bookkeeping. I own the wiki layer entirely.

---

## Directory Structure (D5)

```
Knowledge base/
├── CLAUDE.md           ← this file (schema + rules, never modify without user instruction)
├── index.md            ← content catalog (update on every ingest)
├── log.md              ← append-only activity log (never edit past entries)
├── raw/                ← immutable source documents (I never modify files here)
│   └── assets/         ← downloaded images and attachments
└── wiki/               ← LLM-generated pages (I own this layer)
    ├── concepts/       ← ideas, frameworks, mental models, patterns
    ├── entities/       ← people, companies, products, tools
    ├── sources/        ← one summary page per raw source
    └── synthesis/      ← analyses, comparisons, theses, filed query answers
```

The five wiki directories are: `raw/`, `wiki/concepts/`, `wiki/entities/`, `wiki/sources/`, `wiki/synthesis/`.

---

## Page Conventions

Every wiki page begins with YAML frontmatter:

```yaml
---
title: Page Title
type: concept | entity | source | synthesis
tags: [tag1, tag2]
sources: 1
updated: YYYY-MM-DD
---
```

**Naming:** kebab-case filenames. Examples: `premature-solutioning.md`, `jobs-to-be-done.md`, `notion.md`.

**Cross-references:** Use Obsidian wiki-link syntax `[[page-name]]`. Always link to existing pages when referencing a concept or entity that already has a page. When creating a new page, scan `index.md` for related pages and add inbound links from those pages to the new one.

**Contradictions:** When a new source contradicts an existing claim, add a blockquote to the relevant page:
> **Contradiction [source-slug]:** old claim vs. new claim.

Never silently overwrite old claims. Flag the conflict and note both positions.

**Evidence weight:** When a claim is supported by multiple sources, note it: `(supported by [[source-a]], [[source-b]])`.

---

## Operations

### Ingest

Trigger: user says "ingest [source]" or drops/pastes a file.

1. **Read** the source in full.
2. **Discuss** key takeaways — ask the user what to emphasize if the source is ambiguous or rich.
3. **Write** `wiki/sources/[slug].md` — a structured summary with key claims, quotes, and relevance to Think First themes.
4. **Update** existing `wiki/concepts/` and `wiki/entities/` pages that the source touches — add claims, note contradictions, strengthen synthesis.
5. **Create** new concept or entity pages for anything not yet in the wiki.
6. **Update** `index.md` — add the new source page and any new wiki pages created.
7. **Append** to `log.md` with the standard prefix. List every file touched.

A single ingest typically touches 5–15 wiki pages. Do all of it in one pass. After finishing, tell the user: how many pages were created, how many updated, and what the most interesting cross-connection was.

### Query

Trigger: user asks a question about the knowledge base.

1. Read `index.md` to identify relevant pages.
2. Read the relevant pages.
3. Synthesize an answer with citations (use `[[page-name]]` links).
4. Offer to file the answer as `wiki/synthesis/[slug].md` if it's worth keeping.
5. Append to `log.md`.

### Lint

Trigger: user says "lint", "health check", or "audit the wiki".

1. Scan all pages for: orphan pages (no inbound links), stale claims superseded by newer sources, missing cross-references, concepts mentioned across pages but lacking their own page.
2. Report findings as a prioritized list with specific file names.
3. Suggest 3–5 new sources or questions worth investigating next.
4. Append to `log.md`.

### Note

Trigger: user shares a thought, observation, or rough idea they want preserved.

1. Ask one clarifying question if needed.
2. Write a brief `wiki/synthesis/[slug].md` capturing the idea and its implications.
3. Link it to related existing pages.
4. Update `index.md` and `log.md`.

---

## Log Format

Entries are append-only. Each entry starts with a parseable prefix:

```
## [YYYY-MM-DD] type | Title
```

Valid types: `ingest`, `query`, `lint`, `note`.

After the header, list files created (+) and updated (~):

```
## [2026-04-24] ingest | LLM Wiki Pattern
+ wiki/sources/llm-wiki-pattern.md
+ wiki/concepts/knowledge-compounding.md
~ index.md
~ log.md
```

---

## Index Format

`index.md` is organized by section. Each entry follows this format:

```
- [[page-name]] — one-line summary (updated: YYYY-MM-DD)
```

Sections: `## Sources`, `## Concepts`, `## Entities`, `## Synthesis`.

The LLM reads `index.md` first on every query to find relevant pages before drilling in.

---

## Think First — Core Themes

When ingesting any source, actively route content to these concept areas. If a concept page doesn't exist yet, create it.

| Theme | Watch for |
|---|---|
| **Problem framing** | How do people (mis)define problems? What makes a frame limiting vs. generative? |
| **Premature solutioning** | Jumping to answers before the problem is understood. The IKEA effect, solution bias. |
| **Question quality** | What makes a question good? How does question design shape what gets discovered? |
| **Cognitive biases** | Biases that cause people to misread problems: confirmation bias, availability bias, solutionism. |
| **Jobs to Be Done** | What people are really trying to accomplish underneath surface requests. |
| **User research methods** | Techniques for surfacing the real problem: interviews, five whys, customer discovery. |
| **Product philosophy** | How successful products embody or violate the "understand first" principle. |
| **Competitive landscape** | Tools and products in the problem-clarification, discovery, and facilitation space. |
| **Thinking frameworks** | Structured approaches to problem understanding: first principles, inversion, SCAMPER, etc. |

---

## Session Start Protocol

At the start of every new session:

1. Read `index.md` to reload the current state of the wiki.
2. Read the last 5 entries in `log.md` (`grep "^## \[" log.md | tail -5`) to understand recent activity.
3. Brief the user: current wiki size, last activity, any open threads from the log.
4. Ask: "What would you like to work on — ingest, query, lint, or something else?"

---

## Rules I Never Break

- I never modify files in `raw/`. They are immutable.
- I never edit past entries in `log.md`. It is append-only.
- I never modify `CLAUDE.md` without explicit user instruction.
- I always update `index.md` and `log.md` on every operation that changes the wiki.
- I always use `[[wiki-link]]` syntax for cross-references, not bare filenames.
- I flag contradictions rather than silently overwriting old claims.
