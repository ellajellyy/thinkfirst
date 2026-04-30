# ThinkFirst — Golden Dataset & Eval Framework

**Version:** 1.1
**Date:** April 2026
**Status:** Updated — Prototype Ready
**Model:** Gemini 2.5 Flash

---

## What Is This?

A golden dataset is a fixed set of known-good input → output pairs that defines what "correct" looks like for ThinkFirst. It's your source of truth before shipping. Every new prompt version gets run against it. If scores drop, the prompt regressed. If they improve, the fix worked.

---

## Overview

| | |
|---|---|
| **Total test cases** | 8 (T1–T8 builder types) |
| **Eval dimensions** | 5 |
| **Critical bugs fixed in v2** | 6 |
| **Model** | Gemini 2.5 Flash Preview |

---

## The 5 Eval Dimensions

These are what you grade on every test case, every turn.

### Eval 1 — JSON Structure
**Severity: Critical — zero tolerance**

| Check | Expected |
|---|---|
| All required fields present | `session_id`, `turn_count`, `dimensions`, `strike_count`, `justification`, `evidence`, `next_action`, `output_ready`, `message` |
| `justification` written before `status` | Yes — always |
| `output_ready` value | Always `false` — backend sets this, never Claude |
| `evidence` field | Builder's actual words — not Claude's paraphrase |
| Pass threshold | 100% — zero tolerance |

### Eval 2 — Scoring Accuracy
**Severity: Critical**

| Check | Expected |
|---|---|
| Fluffy signal | → `weak` |
| Personal experience only | → `ok` (max ceiling, never `strong`) |
| External observation of another person | → `strong` (eligible) |
| Hypotheticals ("would pay", "would use") | → `weak` |
| Social proof (likes, polls, friends' opinions) | → `weak` |
| Pass threshold | ≥90% correct across T1–T8 |

### Eval 3 — next_action Logic
**Severity: Critical**

| Check | Expected |
|---|---|
| Turn 1 `next_action` | Always `probe_deeper` |
| `strike_count` at conversation start | 0 |
| `strike_count` per dimension cap | 3 then `move_on` |
| `strike_count` resets at new dimension | Yes — back to 0 |
| `trigger_output` condition | ≥2 strong + ≤1 weak + turn ≥6 |
| Hard cap | Turn 12 — force output regardless |
| Pass threshold | ≥90% correct |

### Eval 4 — Tone Compliance
**Severity: Important — zero violations**

| Check | Expected |
|---|---|
| No "Great answer!" / "I love that" | Must pass every turn |
| One question per message | Must pass every turn |
| No PM jargon (ICP, personas, TAM) | Must pass every turn |
| No future-tense questions ("Would you...") | Instant fail |
| No "As an AI..." | Instant fail |
| Pass threshold | 0 violations across all 8 runs |

### Eval 5 — Output Brief Quality
**Severity: Important**

| Check | Expected |
|---|---|
| Exactly 4 sections | Yes |
| Each section ≤4 lines | Yes |
| Builder's exact words used | Yes |
| No scores or dimension labels | Yes (section headers ok, scores are not) |
| Weak dims handled honestly | Yes — not inflated |
| "I can use this right now" test | ≥80% of 3 human reviewers say yes |

---

## The 8 Golden Test Cases

---

### T1 — Clear Builder (Ideal Path)

**What it tests:** Does ThinkFirst handle a rich, cooperative builder correctly and trigger output at the right moment?

**Opening input:**
> "I want to build a tool that helps freelance designers track revision rounds — they always do more work than quoted."

**Expected dimension outcomes:**

| Dimension | Expected Score |
|---|---|
| User specificity | strong |
| Problem reality | strong |
| Frequency & urgency | strong |
| Workaround check | strong |

**Key checks:**

| Check | Expected |
|---|---|
| Expected turns to output | 5 |
| `next_action` at Turn 1 | `probe_deeper` |
| `next_action` at Turn 5 | `trigger_output` |
| `output_ready` in JSON | Always `false` |
| `strike_count` throughout | 0 — no false strikes on correct answers |

**Key check note:** `strike_count` must stay 0 throughout. No false strikes on correct answers.

---

### T2 — Vague Builder (Max Strikes Path)

**What it tests:** Does ThinkFirst correctly handle a builder who can't name a specific user? Does the strike system work correctly?

**Opening input:**
> "I want to build something for people who struggle with productivity."

**Expected dimension outcomes:**

| Dimension | Expected Score |
|---|---|
| User specificity | weak |
| Problem reality | ok |
| Frequency & urgency | strong |
| Workaround check | strong |

**Key checks:**

| Check | Expected |
|---|---|
| Dim 1 strike count path | 0 → 1 → 2 → `move_on` at 3 |
| Dim 2 score from personal experience | `ok` (not `strong`) |
| Output brief must note | "Target user not yet fully defined" |
| `strike_count` resets at Dim 2 | Yes — back to 0 |

**Key check note:** Personal projection ("I feel this myself") scores `ok`, never `strong`.

---

### T3 — Overconfident Builder (Vanity Signals)

**What it tests:** Does ThinkFirst correctly reject LinkedIn likes, "everyone says so", and friend opinions as evidence?

**Opening input:**
> "It's an AI tool that writes emails — everyone I've spoken to loves it. It's basically a guaranteed win."

**Expected dimension outcomes:**

| Dimension | Expected Score |
|---|---|
| User specificity | ok |
| Problem reality | ok |
| Frequency & urgency | ok |
| Workaround check | weak |

**Key checks:**

| Check | Expected |
|---|---|
| "LinkedIn 47 likes" → scored as | `weak` (fluffy signal) |
| "Everyone hates email" → scored as | `weak` (fluffy signal) |
| "Tom in sales" → scored as | `ok` user specificity |
| ThinkFirst tone on overconfidence | Curious, never confrontational |

**Key check note:** ThinkFirst never validates or agrees with overconfident claims. It stays curious, not confrontational.

---

### T4 — Plan Seeker (Holds the Line)

**What it tests:** Does ThinkFirst redirect plan requests and hold the conversation process even when the builder pushes back?

**Opening input:**
> "I have an idea for a budgeting app. Can you just help me figure out what features to build first?"

**Expected dimension outcomes:**

| Dimension | Expected Score |
|---|---|
| User specificity | strong |
| Problem reality | strong |
| Frequency & urgency | strong |
| Workaround check | strong |

**Key checks:**

| Check | Expected |
|---|---|
| "Just give me a roadmap" → response | Redirects, continues current dimension |
| Plan request effect on `strike_count` | 0 — plan skips are not dimension failures |
| Expected turns | 8 |

**Key check note:** Plan skip attempts must not increment `strike_count`. They are off-script inputs, not dimension failures.

---

### T5 — Idea Switcher (Pivot Handling)

**What it tests:** Does ThinkFirst catch mid-conversation pivots, pause, confirm the switch, and correctly reset all dimensions?

**Pivot input (mid-conversation):**
> "Actually wait — I want to build a co-working space finder instead. I think that's the bigger problem."

**Expected dimension outcomes (after switch):**

| Dimension | Expected Score |
|---|---|
| User specificity | strong |
| Problem reality | strong |
| Frequency & urgency | ok |
| Workaround check | ok |

**Key checks:**

| Check | Expected |
|---|---|
| At pivot → response | "Do you want to switch to that one, or finish thinking through the first?" |
| After switch confirmed | All 4 dims reset to `weak` |
| Same user (Dan) carried over | Scored `strong` from new context |
| Residual scores from first idea | None — complete reset |

**Key check note:** Dimension reset must be complete. No residual scores from the first idea carry into the second.

---

### T6 — Defensive Builder (Resistance Handling)

**What it tests:** Does ThinkFirst stay calm and not argue when the builder pushes back or questions the process?

**Resistance input (mid-conversation):**
> "Why does frequency matter? It's a habit problem. This feels like you're just trying to poke holes."

**Expected dimension outcomes:**

| Dimension | Expected Score |
|---|---|
| User specificity | strong |
| Problem reality | ok |
| Frequency & urgency | strong |
| Workaround check | strong |

**Key checks:**

| Check | Expected |
|---|---|
| Tone on pushback | Calm — rolls with it, does not argue |
| Never says | "I understand your frustration" |
| "Studies prove it" claim → scored as | `weak` (not an observed moment) |
| Builder frustration effect on scoring | None — evidence quality is the only input |

**Key check note:** Builder frustration must never change scoring. Evidence quality is the only scoring input.

---

### T7 — Rich Answer Builder (All Dims in 1 Turn)

**What it tests:** Does ThinkFirst correctly score all 4 dimensions from one rich answer and trigger output immediately without asking further questions?

**Opening input:**
> "Jake, 28, freelance photographer — 4 hours editing metadata per shoot, 2–3x a week, lost 2 clients, Lightroom can't handle his Canon R5 RAW files."

**Expected dimension outcomes:**

| Dimension | Expected Score |
|---|---|
| User specificity | strong |
| Problem reality | strong |
| Frequency & urgency | strong |
| Workaround check | strong |

**Key checks:**

| Check | Expected |
|---|---|
| Turns to output | 1 |
| `next_action` on Turn 1 | `trigger_output` |
| Evidence from all 4 dims | Must all be present in JSON |
| Further questions after Turn 1 | None — output triggers immediately |

**Key check note:** ThinkFirst must not ask further questions when all dims are strong. Asking anyway wastes builder trust.

---

### T8 — One-Word Builder (Minimal Responses)

**What it tests:** Does ThinkFirst handle builders who give one-word or "I don't know" answers across multiple turns without breaking?

**Input sequence:**
> "Productivity app." → "People." → "Yes." → "I don't know."

**Expected dimension outcomes:**

| Dimension | Expected Score |
|---|---|
| User specificity | weak |
| Problem reality | weak |
| Frequency & urgency | weak |
| Workaround check | weak |

**Key checks:**

| Check | Expected |
|---|---|
| Strike sequence Dim 1 | 0 → 1 → 2 → 3 → `move_on` |
| `strike_count` resets at Dim 2 | Yes — back to 0 |
| Output brief with all weak dims | Generates at Turn 12 — honest gaps + specific next steps, no fake 4-section brief |
| Brief tone with all weak dims | Honest, specific, actionable — tells builder exactly what to do next to sharpen their idea |

**Key check note:** At Turn 12 with all weak dims, ThinkFirst does not generate a fake 4-section brief. It gives honest feedback on what is missing and specific next steps the builder can take to sharpen their idea before coming back.

---

## Scoring Rubric — Quick Reference

### Dimension 1 — User Specificity

| Score | Signal |
|---|---|
| weak | Generic — "freelancers", "small businesses", "anyone who..." |
| ok | "My friend who does design work" — real but vague |
| strong | "Sara, 28, freelance designer — I watched her last week" |

### Dimension 2 — Problem Reality

| Score | Signal |
|---|---|
| weak | "I think people struggle with this" — assumed or projected |
| ok | Personal experience, secondhand, Reddit — **ceiling: ok only** |
| strong | "I watched 3 people do this manually last month" — external observation required |

> **Ceiling rule:** "I felt this myself" is `ok` at most. `strong` requires external observation of another specific person.

### Dimension 3 — Frequency & Urgency

| Score | Signal |
|---|---|
| weak | "Sometimes", "occasionally" — no consequence described |
| ok | "Happens monthly" — frequency only, no cost quantified |
| strong | "Every week, costs 2 hours, lost clients over it" — both frequency AND consequence |

### Dimension 4 — Workaround Check

| Score | Signal |
|---|---|
| weak | "I haven't checked" / "I assume nothing exists" |
| ok | "Tools exist but they're too complex" — vague awareness |
| strong | "Uses Notion but breaks at 10+ clients — that's the gap" — specific gap identified |

---

## Fluffy Signals — Always Score Weak

If any of these appear in a builder's answer, score `weak` regardless of what else they say:

- Generic language: "people", "anyone", "everyone", "users", "businesses"
- Vague frequency: "I usually", "I always", "I often"
- Future tense: "I would", "I will", "I might", "I could"
- Hypotheticals: "If someone had this problem", "I imagine people would"
- Compliments with no data: "everyone loves it", "my friends think it's great"
- Social proof: LinkedIn likes, polls, Reddit upvotes
- Stalling: "let me know when it launches", "keep me posted"
- Studies or research: without personal, direct observation

---

## Pass / Fail Thresholds

### Critical — Must be 100% before shipping

| Check | Threshold |
|---|---|
| JSON valid on every turn | 100% |
| `output_ready` always `false` in Claude JSON | 100% |
| Turn 1 = `probe_deeper` always | 100% |
| 3 strikes → `move_on` fires | 100% |
| `strike_count` resets at new dimension | 100% |
| Personal projection caps at `ok` | 100% |

### Important — Must be ≥90% before shipping

| Check | Threshold |
|---|---|
| Scoring accuracy across all 8 cases | ≥90% |
| `next_action` correct per turn | ≥90% |
| `trigger_output` at right moment | ≥90% |
| Pivot detection + dim reset | ≥90% |

### Tone — Zero Tolerance

| Check | Threshold |
|---|---|
| No "Great answer!" or idea validation | 0 violations |
| One question per message | 0 violations |
| No future-tense questions | 0 violations |
| No PM jargon | 0 violations |

### Output Brief — Human Review

| Check | Threshold |
|---|---|
| Exactly 4 sections | 100% |
| Uses builder's words | 100% |
| Weak dims honest, not inflated | 100% |
| "I can use this right now" test | ≥80% of 3 human reviewers say yes |

---

## How to Run the Evals

**Step 1 — Run each case in AI Studio (Gemini 2.5 Flash Preview)**
Open the system prompt from Prompt & Policy Spec v3. Paste T1's opening input. Run each turn manually. Copy the raw JSON per turn into your JSON Check Log sheet.

**Step 2 — Grade against this rubric**
For each turn: check JSON validity, score accuracy, `next_action`, `strike_count`, tone. Mark pass/fail per eval dimension.

**Step 3 — Grade output briefs**
When `trigger_output` fires, run the Output Generation Prompt with that session's `dimensions_summary`. Grade the brief against the 5 output criteria above.

**Step 4 — Human review**
Get 3 people to read each output brief and answer: "Would you use this as your starting brief?" 2 out of 3 yes = pass.

---

*ThinkFirst · Golden Dataset & Eval Framework v1.1 · April 2026*
