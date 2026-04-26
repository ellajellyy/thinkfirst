# ThinkFirst — Core AI Loop v1

**Version:** 1.0
**Date:** April 2026
**Status:** Locked
**Stage:** Phase 2 — Shape the Product

---

## The Loop in One Sentence

> Builder types raw idea → ThinkFirst asks one sharp question → Builder answers → ThinkFirst evaluates the answer → Repeat across 4 dimensions → Backend triggers output mode → Builder receives clean brief

---

## Input-to-Impact Mapping


| Question           | Answer                                                                        |
| ------------------ | ----------------------------------------------------------------------------- |
| **Trigger**        | Builder types their raw idea in plain language                                |
| **Context**        | Full conversation history + dimension_state JSON, passed to Claude every turn |
| **Success Metric** | Builder copies the output brief without editing more than 20% of it           |
| **Data Exhaust**   | Full transcript + drop-off question number + % of brief edited before copy    |


---

## The 5 Stages

### 1. Perceive

What ThinkFirst receives and processes each turn:

- The builder's latest message
- Full conversation history from turn 1
- Current dimension_state (which dimensions are covered, at what quality)
- Current mode: `question` / `deepening` / `output`

ThinkFirst does **not** start fresh each turn. Every answer informs the next question.

---

### 2. Reason

Claude reads the full context and evaluates:

- What dimension is currently being explored
- Whether the last answer was specific or vague
- What the next best question is given what was just said

**Answer quality check happens here.**
Fluffy signals Claude detects before moving forward:

- Generic language: "I usually," "people," "anyone," "everyone"
- Future tense: "I would," "I will," "I might"
- Compliments with no data: "That's a great idea"
- Stalling: "Let me know when it launches"

If any of these appear → do not move to next dimension. Trigger recovery.

---

### 3. Plan

ThinkFirst determines next action based on answer quality and dimension state:

```
if answer is specific:
    move to next dimension OR go deeper on current

if answer is vague:
    strike 1 → re-ask with one concrete example
    strike 2 → reframe question entirely (different angle)
    strike 3 → flag dimension as unclear, move on

if all dimensions >= "ok":
    backend triggers output mode
```

This is a **finite state machine**, not a free conversation.

```
IDEA → EXPLORE → COVER DIMENSIONS → DEEPEN → OUTPUT
```

---

### 4. Act

Two possible actions per turn:

**Primary — Ask**
One sharp, contextually relevant question. Never two questions at once. Always references what the builder just said.

**Recovery — Anchor**
When answer is vague: offer one concrete example, then re-ask.
Example format: `"Like, for example — [one specific relatable person/situation]. Who are you picturing?"`

**Terminal — Generate Output**
Only when backend switches mode to `output`. Claude receives a different system prompt and generates the brief. Never happens mid-conversation.

---

### 5. Observe

After each builder answer, the backend updates two things:

**dimension_state JSON:**

```json
{
  "user_specificity": { "status": "weak|ok|strong", "evidence": "..." },
  "problem_reality": { "status": "weak|ok|strong", "evidence": "..." },
  "frequency_urgency": { "status": "weak|ok|strong", "evidence": "..." },
  "workaround_check": { "status": "weak|ok|strong", "evidence": "..." }
}
```

**Feedback signals tracked:**


| Signal                      | What it means                         | Strength            |
| --------------------------- | ------------------------------------- | ------------------- |
| Builder copies output brief | Loop worked — output was useful       | ★★★ Primary success |
| Builder edits brief heavily | Questions didn't go deep enough       | ★★★ Gold data       |
| Drop-off question number    | Which question kills the conversation | ★★ Failure signal   |
| Answer length per question  | Short = disengaging, long = engaged   | ★ Engagement signal |


Then loop back to Perceive.

---

## Stopping Conditions

Three valid stop states — not a fixed question count:


| Stop Type          | Condition                                             | What Happens                                                                                                  |
| ------------------ | ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| **Success stop**   | All 4 dimensions reach "ok" or "strong"               | Backend triggers output mode                                                                                  |
| **Blocked stop**   | Builder gives vague answers 3 times on same dimension | Flag dimension as unclear, move on. Output brief notes the gap                                                |
| **Discovery stop** | Builder cannot name a real problem after exploration  | ThinkFirst says honestly: "It sounds like the problem might not be fully clear yet" — delivers partial output |


---

## The Failure Loop

**Rule:** When a builder gives a vague answer, ThinkFirst offers one concrete example, then re-asks. Never interrogates. Never repeats the same words.


| Strike       | What ThinkFirst Does                               | Example                                                                                                                                |
| ------------ | -------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| **Strike 1** | Re-ask with one concrete example                   | *"That's still a bit broad — like, for example, 'a freelance designer using ChatGPT to speed up client work.' Who are you picturing?"* |
| **Strike 2** | Reframe entirely — different angle, not same words | Ask from a different entry point into the same dimension                                                                               |
| **Strike 3** | Flag and move on                                   | Note dimension as "unclear" in output brief. Never push past 3 attempts                                                                |


---

## V1 Architecture

**Principle: Claude handles language. Backend handles logic.**

```
Frontend (chat UI)
        ↓
Backend (orchestrator)

State tracked per session:
- message_history        ← full conversation, passed to Claude every turn
- dimension_state        ← JSON object, updated after every answer
- current_dimension      ← which of the 4 dimensions is active
- mode                   ← "question" | "deepening" | "output"
- turn_count             ← total turns taken
- strike_count           ← vague answers per dimension

Loop per turn:
1. Builder sends message
2. Single LLM call (Claude) with structured output:
   - evaluate answer quality
   - update dimension
   - generate next message
3. Backend:
   - updates dimension_state
   - checks trigger conditions
   - overrides mode if needed
4. Return message to frontend
5. Repeat
```

**Output mode trigger (backend logic):**

```
if dimensions_covered >= 3 AND turn_count >= 6:
    mode = "output"
    system_prompt = OUTPUT_GENERATION_PROMPT
```

**What does NOT belong in the LLM:**

- Deciding when the conversation is done
- Tracking which dimensions are covered
- Counting strikes or turns

These are backend decisions. Claude owns the language. The backend owns the flow.

---

## The Data Flywheel


| Phase        | What happens                                                                                  |
| ------------ | --------------------------------------------------------------------------------------------- |
| **V1 — Now** | PM reviews transcripts manually. Finds drop-off question. Rewrites it. Updates system prompt. |
| **V2**       | Builder edits to output brief feed back into golden dataset. Patterns inform prompt updates.  |
| **V3+**      | Accumulated data enables fine-tuning. Question depth adapts based on answer quality signals.  |


---

*ThinkFirst · Core AI Loop v1 · April 2026* 