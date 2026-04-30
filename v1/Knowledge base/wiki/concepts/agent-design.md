---
title: Agent Design
type: concept
tags: [agents, llm, architecture, tools]
sources: 2
updated: 2026-04-24
---

# Agent Design

An agent is an LLM-driven system that **uses tools in a loop** to accomplish workflows on a user’s behalf, with explicit instructions and guardrails.

---

## Core components

From [[a-practical-guide-to-building-agents]]:\n
- **Model**: reasoning + decision-making\n
- **Tools**: external context + actions\n
- **Instructions**: behavioral spec (including constraints)\n

---

## Context as a finite resource

[[Effective context engineering for AI agents by Anthropic]] reframes prompt work as managing the full context state:\n
- curate minimal, high-signal tokens\n
- avoid context rot (loss of recall/precision as context grows)\n
- retrieve “just in time” via tool-assisted navigation\n

---

## Related Concepts

- [[guardrails]]\n
- [[context-engineering]]\n

---

## Sources

- [[a-practical-guide-to-building-agents]]\n
- [[prompting]]\n

