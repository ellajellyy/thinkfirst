# ThinkFirst — Product Brief

*Think it through. Then build it right.*

**Version:** 3.0
**Date:** April 2026
**Status:** Pre-Validation
**Stage:** Problem Discovery Complete

---

## 01 The Specific Task in Context

The exact moment ThinkFirst intervenes is this:

| | |
|---|---|
| **WHO** | A first-time or once-burned builder — non-technical founder, aspiring PM, or vibe coder — who has just had a product idea and is about to start building. |
| **WHAT** | They open ChatGPT or Claude, describe their idea, and receive a detailed, confident-sounding product plan within minutes. It looks complete. It feels like validation. |
| **WHERE** | The 10–30 minute window immediately after the first AI-generated plan appears — before any build tool is opened. |
| **WHEN** | Right at the moment the builder feels ready to start building. Confidence is highest. Critical thinking is lowest. |
| **WHY IT FAILS** | The AI plan is not grounded in real user pain. Nobody asked: who specifically has this problem? Have you seen it? Is it urgent enough to pay for? The builder doesn't know what they don't know — and the AI just agreed with everything. |

ThinkFirst intercepts this exact moment — as a thinking buddy who says: *"Cool idea. Let's think it through a little more first."*

---

## 02 Problem Statement

**Early-stage indie makers struggle to validate whether their ideas solve a real problem before they start building. They often rely on AI-generated plans or assumptions instead of real user signals, which leads to wasted time building products that don't gain traction.**

**The Pain Chain**

- AI tools (ChatGPT, Claude) generate confident plans for any idea without questioning whether the problem is real
- Builders mistake structured AI output for validated thinking — false confidence locks in
- They skip problem definition, user research, and desirability testing entirely
- Weeks or months later: no users, no traction, wrong product
- They return to AI for fixes — not realising the failure happened at step zero

**The Non-Obvious Insight**

The problem is not lack of frameworks. Frameworks exist everywhere. The problem is lack of enforced thinking at the right moment. Builders don't avoid discovery because they're lazy — they avoid it because nothing stops them, and building feels like progress.

AI shifted the bottleneck from execution to decision quality. Building is now easy. Choosing what to build is the hard part. The tool that wins is the one that improves decision quality before the first line of code — not after.

---

## 03 Solution & Approach

**The Solution**

ThinkFirst is a conversational AI buddy that takes a raw idea and walks the builder through structured thinking — one friendly question at a time — before they open any build tool. It does not generate a plan. It asks questions that help the builder find their own clarity.

At the end, the builder receives one clean, copy-pasteable output brief they can take to Claude, Lovable, Cursor — wherever they build.

**The Core Mechanic**

| Step | What Happens |
|---|---|
| **Step 1 — Idea In** | Builder types their raw idea in plain language. No forms, no jargon, no onboarding. |
| **Step 2 — The Conversation** | ThinkFirst asks one question at a time, going progressively deeper. Friendly, curious, never interrogating. |
| **Step 3 — Output Brief** | One clean document: problem statement, target user, why it matters, what to do next. Copy-paste ready. |

**The 4 Question Dimensions**

- **User specificity** — can you name one specific person who has this problem?
- **Problem reality** — have you actually seen this happen, not just imagined it?
- **Frequency & urgency** — how often does it happen and what do they do about it right now?
- **Workaround check** — what are they already doing to deal with this, and what's missing from that?

**The Knowledge Moat**

Questions are drawn from a curated knowledge base — sourced from leading AI practitioners, the Mom Test framework, YC startup school, real builder failure patterns, and Motivational Interviewing principles. This is not generic ChatGPT advice. It is grounded in what people with track records actually say matters before building. That's the differentiation — not just the source material, but the rubric for what question lands at what moment.

**The Tone**

> *"Got an idea? Before you build it — let's think it through for a minute. Takes ~3 minutes. What are you thinking about?"*
> — ThinkFirst, opening message

> *"Got it. And when does that happen for them? Like, what are they doing right before they hit this problem?"*
> — ThinkFirst, mid-conversation

---

## 04 Ideal Customer Profile

**Primary — The First-Timer**

Non-technical founder, aspiring PM, or vibe coder. 20s–30s. Has an idea, has AI tools, has no PM background. Wants to build something real. Moves fast. Doesn't know what they don't know. Fails at traction stage and rationalises the failure as bad timing or competition.

| Attribute | Description |
|---|---|
| **Current workaround** | Ask ChatGPT for a plan → search Reddit → build anyway and see what happens |
| **Trigger moment** | Just had an idea. About to open Lovable or Cursor. Has 30 minutes. |
| **Why they'll engage** | ThinkFirst feels like a smart friend, not a framework. Fast. Conversational. No PM jargon. |
| **Pain awareness** | Low — they don't feel the problem until after they've failed. |
| **Willingness to pay** | Low to medium — needs product to prove value first via freemium or trial. |

**Secondary (Priority Revenue) — The Once-Burned Builder**

Has already spent 3–6 months building the wrong thing. Starting again. Actively looking for a better process. Highest willingness to pay and most emotionally clear about the problem. The marketing message for this person is not "build the right thing" — it's "don't waste another 3 months."

**Excluded — The Experienced Builder**

PMs and engineers with existing mental models. They use AI as acceleration, not substitution. Do not design for them at v1. Their sophistication would require a different product entirely.

---

## 05 Design Direction

| Element | Direction |
|---|---|
| **Tone** | Warm, casual, curious. Never clinical. A smart friend, not a tool. Uses contractions and plain language. Consistent from first message to last. |
| **Interface** | Single chat interface. One question at a time. No sidebars or dashboards. |
| **Progress** | Implicit — no progress bar, no step counters. Conversation flows naturally. |
| **Output** | Clean, minimal, copy-paste ready. 4 sections. No scores. Designed to be pasted into any build tool as a brief. |
| **Visual language** | Calm and focused. Warm neutrals. Typography-led. Mobile-first. |
| **Platform v1** | Web app (to be validated against Telegram bot in hypothesis 7). |

---

## 06 Validation Roadmap

This is a list of hypotheses to test — not features to build. Each has a method and a pass/fail signal. Nothing moves to build until H1–H4 pass.

**H1 — The Intervention Moment**
Builders are open to being asked clarifying questions about their idea before starting to build — not after.

| Method | Pass |
|---|---|
| Show 6 target users the opening message. Ask: 'Would you engage or skip?' | 4 of 6 engage. |

**H2 — The False Confidence Problem**
Builders who receive an AI-generated plan feel confident enough to start building even when the plan is not grounded in validated user pain.

| Method | Pass |
|---|---|
| Show 6 builders a ChatGPT plan for a vague idea. Ask: 'Would you start building from this?' | 4 of 6 say yes — confirming the problem is real. |

**H3 — Behavior Change Willingness**
Builders will accept being challenged on their assumptions if the tone is friendly and the questions feel relevant.

| Method | Pass |
|---|---|
| Walk 3 builders through a live prototype conversation. Observe: do they disengage or lean in? | All 3 complete the conversation. |

**H4 — Output Value**
The copy-pasteable output is more useful than any AI-generated product plan they have received before.

| Method | Pass |
|---|---|
| Show builders the output after the conversation. Ask: 'Would you use this as your starting brief?' | 4 of 6 say yes and at least 2 copy it immediately. |

**H5 — Willingness to Pay**
Builders who have already failed once will pay for a tool that helps them avoid repeating the same mistake.

| Method | Pass |
|---|---|
| Interview 4 once-burned builders. Ask: 'Would you have paid $15/month for this?' | 3 of 4 say yes. |

**H6 — Knowledge Moat Differentiation**
Builders notice a meaningful difference between ThinkFirst questions and questions from a standard ChatGPT conversation.

| Method | Pass |
|---|---|
| Run same idea through ThinkFirst and raw ChatGPT. Show both outputs side by side to 6 builders. | 5 of 6 say ThinkFirst asked sharper questions. |

**H7 — Platform Fit**
A web app is the right delivery format over a Telegram bot for this use case.

| Method | Pass |
|---|---|
| Test two entry points — web app and Telegram bot — with 10 users split 5/5. | Web app has 20% higher completion rate. |

*This is a hypothesis document. Nothing here should be treated as final until H1–H4 have passed validation.*

---

*ThinkFirst · Product Brief v3.0 · April 2026*
