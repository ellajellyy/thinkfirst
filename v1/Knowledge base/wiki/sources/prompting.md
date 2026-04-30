---
title: Prompting (folder)
type: source
tags: [prompt-engineering, context-engineering, agents, llm]
sources: 7
updated: 2026-04-24
---

# Prompting (folder)

**Raw folder:** `raw/prompting/`  
**Date ingested:** 2026-04-24  
**Relevance to Think First:** Provides operational methods for specifying behavior and managing context for LLM-based tools and agents.

---

## Summary

This folder collects prompt engineering and context engineering guidance from multiple sources (OpenAI, Anthropic, Microsoft, and others). A consistent theme is that reliable behavior comes from:\n
- clear high-authority instructions,\n
- explicit output structure,\n
- representative examples,\n
- and tight, high-signal context.\n

Anthropic’s “context engineering” reframes the problem: not just better prompts, but better **context state design** (system instructions, tools, retrieval, memory, and history).

---

## Key takeaways

### Prompt engineering (classic)

From [[Prompt engineering by OpenAI]]:\n
- choose models intentionally; pin snapshots for consistency\n
- use roles/instructions as high-authority control\n
- measure behavior with evals; prompts are non-deterministic\n

### Context engineering (agent era)

From [[Effective context engineering for AI agents by Anthropic]]:\n
- context is finite; treat tokens as an attention budget\n
- avoid context rot; curate minimal high-signal state\n
- use just-in-time retrieval via tools and references\n
- for long-horizon tasks: compaction, structured note-taking, multi-agent architectures\n

---

## Connections (wiki)

- [[prompt-engineering]]\n
- [[context-engineering]]\n
- [[agent-design]]\n

