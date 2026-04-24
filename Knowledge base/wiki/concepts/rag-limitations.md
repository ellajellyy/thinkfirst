---
title: RAG Limitations
type: concept
tags: [rag, llm, knowledge-management, retrieval]
sources: 1
updated: 2026-04-24
---

# RAG Limitations

Retrieval-Augmented Generation (RAG) is the dominant pattern for LLM + document systems, but it has a fundamental ceiling: it re-derives knowledge from scratch on every query rather than accumulating it.

---

## What RAG Does

RAG embeds source documents as vector chunks. At query time, the most relevant chunks are retrieved and injected into the LLM's context. The LLM generates an answer from those chunks.

Systems like NotebookLM, ChatGPT file uploads, and most enterprise knowledge tools work this way.

---

## The Core Limitation

RAG treats each query as a cold start. Nothing is built up between queries. A question that requires synthesizing five documents forces the system to find and piece together five fragments every time. The connections between documents are never pre-computed or maintained.

Consequences:
- Multi-hop reasoning is fragile (the retriever may not surface all relevant chunks)
- Contradictions between sources are never flagged — they surface randomly at query time
- Explorations disappear into chat history rather than enriching the knowledge base
- The system doesn't get smarter as you add more sources — it gets slower and less precise

---

## The Alternative

See [[knowledge-compounding]] for the alternative: a persistent wiki where the LLM pre-computes synthesis, cross-references, and contradiction flags during ingest rather than at query time.

---

## Sources

- [[llm-wiki-pattern]] — core critique of RAG, motivates the wiki pattern
