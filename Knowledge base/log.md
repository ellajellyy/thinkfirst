# Think First — Wiki Log

Append-only activity record. Each entry starts with a parseable prefix.
Quick scan: `grep "^## \[" log.md | tail -10`

---

## [2026-04-24] ingest | LLM Wiki Pattern

Founding ingest. Ingested the LLM Wiki pattern document as the system's first source. This document defines the architecture of this wiki itself.

Files created:
+ raw/llm-wiki-pattern.md
+ wiki/sources/llm-wiki-pattern.md
+ wiki/concepts/knowledge-compounding.md
+ wiki/concepts/rag-limitations.md

Files created (infrastructure):
+ CLAUDE.md
+ index.md
+ log.md

Key cross-connection: The LLM Wiki's "compile once, query many times" approach mirrors Think First's core argument — understand the problem first, don't re-derive it on every project. Both systems are anti-cold-start.

Open threads: concept pages for premature-solutioning, problem-framing, and question-quality need to be built out as sources arrive.

## [2026-04-24] ingest | The Mom Test

Ingested *The Mom Test* (Rob Fitzpatrick, 2013) into the wiki as a practical playbook for truth-seeking customer interviews and avoiding false-positive validation.

Files created:
+ wiki/sources/the-mom-test.md
+ wiki/concepts/premature-solutioning.md
+ wiki/concepts/question-quality.md
+ wiki/concepts/user-research-methods.md

Files updated:
~ index.md
~ log.md

Key cross-connection: The book’s interviewing rules are an operational countermeasure to [[premature-solutioning]]—they prevent “understanding drift” by forcing concrete, past-tense evidence instead of compliments and hypotheticals.

## [2026-04-24] ingest | Paul Graham — Y Combinator Essays (folder)

Created a placeholder source page for `raw/paul-graham-ycombinator/`. The raw items currently appear to be empty (0 bytes), so there was no content to ingest yet.

Files created:
+ wiki/sources/paul-graham-ycombinator.md

Files updated:
~ index.md
~ log.md

## [2026-04-24] ingest | A Practical Guide to Building Agents

Ingested a practical guide describing what agents are, when to build them, and how to design them with explicit tools/instructions and layered guardrails.

Files created:
+ wiki/sources/a-practical-guide-to-building-agents.md
+ wiki/concepts/agent-design.md
+ wiki/concepts/guardrails.md

Files updated:
~ index.md
~ log.md

## [2026-04-24] ingest | Conversational UX Design (folder)

Ingested a small set of conversational UX sources (CHI’22 literature review + NN/g guidance) capturing common failure modes (brittle linear flows) and a taxonomy of GenAI conversation types.

Files created:
+ wiki/sources/conversational-ux-design.md
+ wiki/concepts/conversational-ai-ux.md

Files updated:
~ index.md
~ log.md

## [2026-04-24] ingest | Motivational Interviewing (folder)

Ingested an overview set of documents describing MI as a guiding, collaborative communication style for resolving ambivalence and strengthening intrinsic motivation.

Files created:
+ wiki/sources/motivational-interviewing.md
+ wiki/concepts/motivational-interviewing.md

Files updated:
~ index.md
~ log.md

## [2026-04-24] ingest | Prompting (folder)

Ingested prompting resources, including a shift from prompt engineering to context engineering for agentic, multi-turn systems (token budgeting, retrieval, compaction, note-taking, multi-agent patterns).

Files created:
+ wiki/sources/prompting.md
+ wiki/concepts/prompt-engineering.md
+ wiki/concepts/context-engineering.md

Files updated:
~ index.md
~ log.md

## [2026-04-24] ingest | YC Startup School (folder)

Created a placeholder source page for `raw/yc-startup-school/`. The raw items currently appear to be empty (0 bytes), so there was no content to ingest yet.

Files created:
+ wiki/sources/yc-startup-school.md

Files updated:
~ index.md
~ log.md
