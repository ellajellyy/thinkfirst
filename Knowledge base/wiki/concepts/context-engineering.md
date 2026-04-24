---
title: Context Engineering
type: concept
tags: [context, agents, llm, memory, retrieval]
sources: 1
updated: 2026-04-24
---

# Context Engineering

Context engineering is the discipline of curating the **full context state** passed to an LLM (instructions, tools, retrieval, memory, history) to maximize reliable behavior under finite token constraints.

---

## Why it matters

From [[prompting]] (Anthropic):\n
- context is a finite attention budget with diminishing returns\n
- as context grows, models can lose precision (“context rot”)\n
- effective systems prioritize minimal high-signal tokens\n

---

## Key strategies

- **Just-in-time retrieval**: keep lightweight references (paths, links, ids) and load details as needed via tools.\n
- **Compaction**: summarize near context limits and restart with a high-fidelity condensed state.\n
- **Structured note-taking**: persist working memory outside context (plans, to-dos, notes) and rehydrate.\n
- **Multi-agent architectures**: isolate deep exploration in sub-agents; return distilled summaries.\n

---

## Related concepts

- [[prompt-engineering]]\n
- [[agent-design]]\n

---

## Sources

- [[prompting]]\n

