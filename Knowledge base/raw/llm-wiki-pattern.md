# LLM Wiki — A Pattern for Building Personal Knowledge Bases Using LLMs

Source: shared directly by user
Date added: 2026-04-24

---

## The Core Idea

Most people's experience with LLMs and documents looks like RAG: you upload a collection of files, the LLM retrieves relevant chunks at query time, and generates an answer. This works, but the LLM is rediscovering knowledge from scratch on every question. There's no accumulation. Ask a subtle question that requires synthesizing five documents, and the LLM has to find and piece together the relevant fragments every time. Nothing is built up. NotebookLM, ChatGPT file uploads, and most RAG systems work this way.

The idea here is different. Instead of just retrieving from raw documents at query time, the LLM incrementally builds and maintains a persistent wiki — a structured, interlinked collection of markdown files that sits between you and the raw sources. When you add a new source, the LLM doesn't just index it for later retrieval. It reads it, extracts the key information, and integrates it into the existing wiki — updating entity pages, revising topic summaries, noting where new data contradicts old claims, strengthening or challenging the evolving synthesis. The knowledge is compiled once and then kept current, not re-derived on every query.

This is the key difference: the wiki is a persistent, compounding artifact. The cross-references are already there. The contradictions have already been flagged. The synthesis already reflects everything you've read. The wiki keeps getting richer with every source you add and every question you ask.

You never (or rarely) write the wiki yourself — the LLM writes and maintains all of it. You're in charge of sourcing, exploration, and asking the right questions. The LLM does all the grunt work — the summarizing, cross-referencing, and bookkeeping that makes a knowledge base actually useful over time. In practice, I have the LLM agent open on one side and Obsidian open on the other. The LLM makes edits based on our conversation, and I browse the results in real time — following links, checking the graph view, reading the updated pages. Obsidian is the IDE; the LLM is the programmer; the wiki is the codebase.

## Use Cases

- Personal: tracking goals, health, psychology, self-improvement
- Research: going deep on a topic over weeks or months
- Reading a book: filing each chapter, building out character/theme/plot pages
- Business/team: internal wiki fed by Slack threads, meeting transcripts, project docs, customer calls
- Competitive analysis, due diligence, trip planning, course notes, hobby deep-dives

## Architecture

Three layers:

**Raw sources** — immutable source documents. Articles, papers, images, data files. LLM reads but never modifies.

**The wiki** — a directory of LLM-generated markdown files. Summaries, entity/concept pages, comparisons, overview, synthesis. The LLM owns this layer entirely.

**The schema** — a document (CLAUDE.md for Claude Code, AGENTS.md for Codex) that tells the LLM how the wiki is structured, what the conventions are, and what workflows to follow. Co-evolved by the human and LLM over time.

## Operations

**Ingest:** Drop a new source, LLM reads it, discusses key takeaways, writes a summary page, updates index, updates related entity and concept pages, appends to log. A single source might touch 10–15 wiki pages.

**Query:** Ask questions against the wiki. LLM reads index, finds relevant pages, synthesizes answer with citations. Good answers can be filed back into the wiki as new synthesis pages.

**Lint:** Periodically audit for contradictions, stale claims, orphan pages, missing cross-references, data gaps. LLM suggests new questions and sources.

## Indexing and Logging

**index.md** — content-oriented catalog of everything in the wiki. Organized by category. LLM reads this first on every query.

**log.md** — chronological, append-only record of ingests, queries, lint passes. Parseable with grep: `grep "^## \[" log.md | tail -5`.

## Optional CLI Tools

qmd: local search engine for markdown files with hybrid BM25/vector search and LLM re-ranking. Has CLI and MCP server modes. Useful as wiki grows past the index-file scale.

## Tips

- Obsidian Web Clipper: converts web articles to markdown
- Download images locally for stable references
- Obsidian graph view: visualize connections and orphans
- Marp: markdown slide deck format (Obsidian plugin)
- Dataview: query YAML frontmatter for dynamic tables
- The wiki is a git repo — version history, branching, and collaboration for free

## Why It Works

Humans abandon wikis because maintenance burden grows faster than value. LLMs don't get bored, don't forget to update cross-references, and can touch 15 files in one pass. The human curates and thinks; the LLM does all the bookkeeping.

Related in spirit to Vannevar Bush's Memex (1945): a private, actively curated knowledge store with associative trails between documents. The part Bush couldn't solve was who does the maintenance. The LLM handles that.
