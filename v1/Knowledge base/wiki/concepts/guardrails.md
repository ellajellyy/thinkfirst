---
title: Guardrails
type: concept
tags: [safety, reliability, agents, policy]
sources: 1
updated: 2026-04-24
---

# Guardrails

Guardrails are constraints and checks that keep an agent’s behavior safe, predictable, and aligned—especially when it can take real actions through tools.

---

## Why guardrails exist

Agents are powerful because they can autonomously execute workflows. That autonomy increases risk: privacy leakage, policy violations, unintended side effects, and “confident wrong” actions.\n

Guardrails turn an agent into a **bounded system**: it can act, but only within defined limits, and it can stop + hand control back when uncertain or blocked.

---

## Layered approach

[[a-practical-guide-to-building-agents]] emphasizes **layered defense**:\n
- rules-based checks (schemas, allowlists/denylists, regex, validators)\n
- model-based checks (classification, tripwires, policy evaluators)\n
- workflow-level checks (pauses before executing risky actions)\n

---

## Related Concepts

- [[agent-design]]\n

---

## Sources

- [[a-practical-guide-to-building-agents]]\n

