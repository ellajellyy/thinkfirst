---
title: LLM Wiki — A Pattern for Building Personal Knowledge Bases
type: source
tags: [knowledge-management, llm, methodology, tools]
sources: 1
updated: 2026-04-24
---

# LLM Wiki — A Pattern for Building Personal Knowledge Bases

**Raw file:** `raw/llm-wiki-pattern.md`
**Date ingested:** 2026-04-24
**Relevance to Think First:** This is the founding document of this wiki system itself. Foundational.

---

## Summary

Argues that RAG (retrieval-augmented generation) is fundamentally limited because knowledge is re-derived on every query rather than accumulated. Proposes an alternative: the LLM incrementally builds and maintains a persistent, interlinked wiki from raw sources. Knowledge compounds over time instead of being discovered from scratch each session.

The key insight: **the wiki is a compiling step, not a retrieval step.** Cross-references, contradictions, and synthesis are resolved once and kept current — not recalculated on every question.

---

## Key Claims

1. RAG rediscovers knowledge from scratch on every query. Nothing accumulates.
2. A persistent wiki shifts the LLM's role from retriever to maintainer. The artifacts compound.
3. The human's job is curation and thinking; the LLM's job is all the bookkeeping that makes a knowledge base useful.
4. Good query answers can be filed back into the wiki — explorations compound just like ingested sources.
5. Humans abandon wikis because maintenance burden exceeds value. LLMs eliminate that cost.
6. Related to Vannevar Bush's Memex (1945) — the unsolved part was who does the maintenance. LLMs solve it.

---

## Most Relevant Quotes

> "The wiki keeps getting richer with every source you add and every question you ask."

> "Obsidian is the IDE; the LLM is the programmer; the wiki is the codebase."

> "The human's job is to curate sources, direct the analysis, ask good questions, and think about what it all means. The LLM's job is everything else."

---

## Connections

- Introduces the concept of [[knowledge-compounding]] — the core mechanism that makes this system valuable
- Describes [[rag-limitations]] — why retrieval-only systems don't accumulate knowledge
- Mentions [[vannevar-bush-memex]] as a historical antecedent
- Relevant to [[personal-knowledge-management]] as a broader field

---

## Think First Relevance

This pattern is the infrastructure for Think First's secondary brain. It also has a philosophical resonance: just as Think First argues for compiling understanding before jumping to solutions, this system argues for compiling knowledge before querying it. Both are against re-deriving from scratch.
