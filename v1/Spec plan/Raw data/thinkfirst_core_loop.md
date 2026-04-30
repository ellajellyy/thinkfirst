# ThinkFirst Core AI Loop — Research Findings

## How to use this document
This document summarizes **only** what the current knowledge bases say about how to design a guided, multi-turn conversational AI loop for ThinkFirst (Perceive → Reason → Plan → Act → Observe), and highlights where the KB is silent. Use it to make (and justify) loop design decisions, then treat the “Gaps” sections as a backlog for what to add to the KB next.

---

## Q1 — Stopping condition
### Evidence from KB
- Agents are defined as systems that “recognize when a workflow is complete” and can “halt execution and transfer control back to the user” in case of failure. [/Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/raw/a-practical-guide-to-building-agents.md]
- The “agent loop” is described as the LLM managing workflow execution and decisions, implying a need for explicit completion recognition as part of agent behavior. [/Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/raw/a-practical-guide-to-building-agents.md]
- Agent completion is framed as reaching the user’s goal in a workflow (“sequence of steps that must be executed to meet the user’s goal”), implying “done” is goal-fulfillment rather than merely reaching the end of a script. [/Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/raw/a-practical-guide-to-building-agents.md]
- Guardrails are positioned as making the agent a “bounded system” that “can stop + hand control back when uncertain or blocked,” implying that “done” can also be “stop because we’re blocked / uncertain” (not only “success”). [/Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/wiki/concepts/guardrails.md]
- The KB frames question quality around eliciting “concrete facts about reality,” implying a discovery conversation could be “complete” when those concrete facts have been obtained sufficiently to avoid premature convergence. [/Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/wiki/concepts/question-quality.md]
- “Compaction” is described as summarizing and reinitiating context to maintain coherence over long tasks, implying long guided conversations may need a structural checkpoint (a “summary / state”) that can function as an intermediate “completion” of a phase. [/Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/raw/prompting/Effective context engineering for AI agents by Anthropic.md]

### Gaps
- The KB does not provide a coaching/discovery-specific “definition of done” (e.g., explicit criteria for “problem discovery complete” in a conversational product).
- The KB does not specify ThinkFirst-specific stopping thresholds (e.g., maximum turns, quality thresholds, or explicit “exit prompts”).

### Recommended decision
Use **explicit exit conditions**: stop on (a) meeting a clearly defined goal-state of collected facts/decisions, or (b) hitting a guardrail stop condition (blocked/uncertain), with an intermediate “state summary” checkpoint available for long conversations. 

---

## Q2 — Observe stage
### Evidence from KB
- Conversational UX includes “funneling conversations” where user input is initially underspecified; the system should “ask helping questions” to elicit constraints and refine requirements, implying observation includes detecting underspecification and adapting. [/Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/raw/conversational-ux-design/The 6 Types of Conversations with Generative AI.md]
- Research notes chatbots often only succeed when users provide “legal” answers in linear flows; when users deviate, bots struggle to recover and may force restarts—evidence that systems should detect answer (in)validity/quality and recover rather than blindly proceed. [/Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/raw/conversational-ux-design/The User Experience of Chatbots.md]
- “Question quality” is explicitly defined as truth-seeking vs validation-seeking; good questions yield concrete past specifics, bad ones yield hypotheticals/compliments—implying the system should observe whether it is getting concrete facts (answer quality) before moving forward. [/Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/wiki/concepts/question-quality.md]
- Context engineering is framed as choosing what context to pass “each time we decide what to pass to the model,” implying each turn includes an evaluation step about what information is missing/needed next (i.e., observing state and gaps). [/Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/raw/prompting/Effective context engineering for AI agents by Anthropic.md]
- Guardrails describe “rules-based checks” and “validators,” suggesting a pattern where the system checks inputs/outputs against criteria before continuing. [/Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/wiki/concepts/guardrails.md]

### Gaps
- The KB does not specify concrete answer-quality rubrics for guided discovery (e.g., what counts as “specific enough” per question type).
- The KB does not provide examples of routing logic that branches based on answer depth vs following a fixed sequence (beyond general UX descriptions).

### Recommended decision
Implement **answer-quality evaluation** (at least “underspecified vs sufficiently concrete”) as part of Observe, and use it to drive clarification/helping questions rather than following a fixed sequence regardless of answer quality.

---

## Q3 — The Act
### Evidence from KB
- Agents are described as using tools “both to gather context and to take actions” and dynamically selecting tools depending on workflow state, implying that “Act” can include retrieval, external actions, and control transfer—not only asking questions. [/Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/raw/a-practical-guide-to-building-agents.md]
- The KB explicitly categorizes tools into **Data** (retrieve context), **Action** (take external actions), and **Orchestration** (delegate to other agents), implying an agent turn can include: fetch context, do something in the world, or delegate. [/Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/raw/a-practical-guide-to-building-agents.md]
- Guardrails emphasize workflow-level checks like “pauses before executing risky actions,” implying “Act” includes deciding to pause/confirm rather than proceeding automatically. [/Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/wiki/concepts/guardrails.md]
- Context engineering recommends “structured note-taking” (persist working memory outside context and rehydrate), implying “Act” should include writing/updating structured notes (state) as the conversation progresses. [/Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/raw/prompting/Effective context engineering for AI agents by Anthropic.md]
- In long-horizon designs, “compaction” summarizes and restarts with a condensed state, implying an “Act” option is to produce a high-fidelity summary of what was learned so far. [/Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/raw/prompting/Effective context engineering for AI agents by Anthropic.md]
- Conversational UX (funneling) highlights “helping questions” to reduce articulation load, implying “Act” includes scaffolding and constraint elicitation (not just the next question). [/Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/raw/conversational-ux-design/The 6 Types of Conversations with Generative AI.md]

### Gaps
- The KB does not provide MI-style evidence here for reflect-back/affirm/summary per turn (beyond listing MI as a topic elsewhere), and does not prescribe a standard “acknowledge → reflect → ask” turn template.
- The KB does not specify ThinkFirst’s per-turn output contract (e.g., whether every turn must update a visible “working draft”).

### Recommended decision
Each turn should **do more than ask**: it should update structured state (notes/summary), optionally retrieve context, and use guardrail pauses/hand-offs when needed—then ask the next best “helping” question.

---

## Q4 — Context carried forward
### Evidence from KB
- Context engineering is defined as curating the “full context state” (instructions, tools, retrieval, memory, history) to maximize reliability under finite token constraints, directly addressing whether to carry conversation history forward. [/Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/wiki/concepts/context-engineering.md]
- The KB warns that context is a finite attention budget with diminishing returns and that as context grows models can lose precision (“context rot”), implying carrying full history has tradeoffs and should be curated. [/Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/wiki/concepts/context-engineering.md]
- “Just-in-time retrieval” is recommended: keep lightweight references and load details as needed via tools, implying you should not blindly include everything from history; you should include what’s needed and fetch the rest on demand. [/Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/wiki/concepts/context-engineering.md]
- “Compaction” is described as summarizing near context limits and restarting with a condensed state while discarding redundant tool outputs/messages, providing a concrete technique for long multi-turn conversations. [/Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/raw/prompting/Effective context engineering for AI agents by Anthropic.md]
- “Structured note-taking / agentic memory” is described as persisting notes outside the context window and rehydrating later, supporting coherent multi-turn behavior without full history in-context every time. [/Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/raw/prompting/Effective context engineering for AI agents by Anthropic.md]

### Gaps
- The KB does not quantify how much history should be kept for conversational coaching vs other agentic domains.
- The KB does not provide specific ThinkFirst memory schemas (what fields to store as notes).

### Recommended decision
Carry forward **curated state**, not raw full history: keep a structured memory/notes + compacted summary, and retrieve details just-in-time when needed.

---

## Q5 — Output trigger
### Evidence from KB
- The agent framing includes “recognizes when a workflow is complete,” which implies the system can decide when to produce a final result (not only the user). [/Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/raw/a-practical-guide-to-building-agents.md]
- Guardrails include “workflow-level checks (pauses before executing risky actions),” suggesting a pattern where the system signals readiness but may pause for confirmation before producing/acting on final output. [/Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/wiki/concepts/guardrails.md]
- Context engineering is described as deciding what to pass to the model each turn to achieve desired behavior, implying output generation timing can be controlled via structure and state, rather than being purely user-triggered. [/Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/raw/prompting/Effective context engineering for AI agents by Anthropic.md]
- Prompting guidance notes that adding clear separators/syntax can be used as a stopping condition for generation, implying final output can be gated by explicit format triggers when the system determines it is time. [/Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/raw/prompting/prompting engineering techniques by Microsoft.md]
- Prompting guidance also emphasizes “prime the output” to constrain format, which supports a design where final output is generated when a “finalization” step is reached (system-driven) and is reliably formatted. [/Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/raw/prompting/prompting engineering techniques by Microsoft.md]

### Gaps
- The KB does not directly compare user-triggered vs auto-triggered final outputs in guided coaching/discovery contexts (e.g., effects on trust, control, satisfaction).
- The KB does not define ThinkFirst’s final output schema (what the “final” artifact is).

### Recommended decision
Use a **system-detected readiness** trigger (workflow complete) combined with a **pause/confirmation** pattern (guardrails) before generating/publishing the final structured output.

---

## Q6 — Failed loop
### Evidence from KB
- The agent definition explicitly includes “In case of failure, it can halt execution and transfer control back to the user,” which is a direct prescription for what to do when the loop is not progressing. [/Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/raw/a-practical-guide-to-building-agents.md]
- Guardrails describe agents as bounded systems that “can stop + hand control back when uncertain or blocked,” reinforcing escalation/stop as a first-class response to repeated failure. [/Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/wiki/concepts/guardrails.md]
- Conversational UX research shows bots often fail when users deviate from “legal” answers and may force restarts, implying a need for explicit recovery patterns when the user repeatedly provides unusable input. [/Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/raw/conversational-ux-design/The User Experience of Chatbots.md]
- “Funneling conversations” describes using “helping questions” to reduce articulation load and refine underspecified input, suggesting one recovery path is to change question shape to elicit better answers. [/Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/raw/conversational-ux-design/The 6 Types of Conversations with Generative AI.md]
- The question-quality heuristics emphasize asking for “specifics in the past” and “talk about their life,” implying a recovery strategy for vague answers is to pivot from opinions/hypotheticals to concrete recounting prompts (“Talk me through the last time…”). [/Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/wiki/concepts/question-quality.md]

### Gaps
- The KB does not specify “how many tries” before escalation or how to label partial outputs with missing fields (no explicit attempt counters or thresholds).
- The KB does not document UX patterns for gracefully exiting a coaching conversation that stalls (copy, options, fallback modes).

### Recommended decision
After repeated low-quality answers, **switch tactics** (helping questions + past-specific prompts) and then **stop/escalate** via a guardrail when blocked/uncertain, returning control and/or producing a partial state summary.

---

## Q7 — Perceive stage
### Evidence from KB
- Agents have access to tools “both to gather context and to take actions,” and **Data tools** are defined as tools that retrieve context/information necessary for executing the workflow—evidence that Perceive should include tool-based context intake, not only user text. [/Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/raw/a-practical-guide-to-building-agents.md]
- Context engineering defines the “full context state” as including instructions, tools, retrieval, memory, and history, implying Perceive is the assembly of that context state each turn. [/Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/wiki/concepts/context-engineering.md]
- The context engineering source describes that an “agent running in a loop generates more and more data” and that this information must be “cyclically refined,” implying Perceive includes selecting/refining what to feed forward each turn. [/Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/raw/prompting/Effective context engineering for AI agents by Anthropic.md]
- The same source describes “just in time” context strategies using lightweight identifiers (file paths, links) and dynamic loading, implying Perceive includes references + retrieval rather than full upfront ingestion. [/Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/raw/prompting/Effective context engineering for AI agents by Anthropic.md]
- Conversational UX on funneling underscores that initial user input is often underspecified and must be refined via helping questions, implying Perceive should treat user messages as partial signals and seek missing constraints. [/Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/raw/conversational-ux-design/The 6 Types of Conversations with Generative AI.md]

### Gaps
- The KB does not explicitly define a Perceive stage or provide a checklist of “what inputs are available each turn” for ThinkFirst (e.g., user message, user profile, prior answers, stored notes).
- The KB does not provide ThinkFirst-specific guidance on what *not* to perceive (to avoid context pollution) beyond the general context rot concept.

### Recommended decision
Perceive should assemble a **curated context state each turn**: user’s latest message + structured memory/notes + minimal relevant history/summary + optional just-in-time retrieved context.

---

## Overall KB coverage assessment
### Files that contributed findings: [list]
- /Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/raw/a-practical-guide-to-building-agents.md
- /Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/wiki/concepts/guardrails.md
- /Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/wiki/concepts/context-engineering.md
- /Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/raw/prompting/Effective context engineering for AI agents by Anthropic.md
- /Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/raw/prompting/prompting engineering techniques by Microsoft.md
- /Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/raw/conversational-ux-design/The 6 Types of Conversations with Generative AI.md
- /Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/raw/conversational-ux-design/The User Experience of Chatbots.md
- /Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/wiki/concepts/question-quality.md

### Files checked but not relevant: [list]
- /Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/raw/the-mom-test-by-rob-fitzpatrick.md
- /Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/raw/llm-wiki-pattern.md
- /Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/raw/motivational-interview-principle/Motivational Interviewing.md
- /Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/raw/motivational-interview-principle/introduction to MI.md
- /Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/raw/motivational-interview-principle/understand MI.md
- /Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/raw/conversational-ux-design/ux research on conversationa human ai interaction.md
- /Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/raw/prompting/Prompt engineering by OpenAI.md
- /Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/raw/prompting/Prompting 101 | Code w Claude.md
- /Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/raw/prompting/Few-Shot Prompting.md
- /Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/raw/prompting/Master Prompt Engineering Best Practices for 2026 AI.md
- /Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/raw/prompting/System Prompts: Design Patterns and Best Practices.md
- /Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/wiki/sources/a-practical-guide-to-building-agents.md
- /Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/wiki/sources/conversational-ux-design.md
- /Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/wiki/sources/llm-wiki-pattern.md
- /Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/wiki/sources/motivational-interviewing.md
- /Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/wiki/sources/paul-graham-ycombinator.md
- /Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/wiki/sources/prompting.md
- /Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/wiki/sources/the-mom-test.md
- /Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/wiki/sources/yc-startup-school.md
- /Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/wiki/concepts/agent-design.md
- /Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/wiki/concepts/conversational-ai-ux.md
- /Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/wiki/concepts/knowledge-compounding.md
- /Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/wiki/concepts/motivational-interviewing.md
- /Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/wiki/concepts/premature-solutioning.md
- /Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/wiki/concepts/prompt-engineering.md
- /Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/wiki/concepts/rag-limitations.md
- /Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/wiki/concepts/user-research-methods.md

### Critical gaps across all 7 questions: [list]
- No ThinkFirst-specific “definition of done” for a guided discovery/coaching conversation.
- No explicit Perceive/Observe/Act stage definitions or acceptance criteria; only adjacent agent/context/UX concepts.
- No concrete answer-quality rubric or thresholding guidance (what “specific enough” means per step).
- No explicit retry/escalation thresholds (how many vague answers before switching mode / stopping).
- No direct KB evidence comparing user-triggered vs system-triggered final output for trust/control in guided conversations.
- No ThinkFirst final artifact schema (what the final output contains, and how partial outputs are represented).

### Sources recommended to add: [list]
- A ThinkFirst-specific conversation spec defining stage responsibilities (Perceive/Observe/Act) and “done” criteria per stage.
- Research or case studies on guided/coaching conversation termination criteria and user trust in auto-finalization vs confirm-to-finalize patterns.
- Concrete conversational recovery patterns for repeated vague answers (including UX copy and attempt counters).

---

## Loop design decision summary
Across the KB, the strongest, repeated theme is that multi-turn systems should behave like **agents**: operate in a loop, **curate context deliberately** under finite attention, and include **guardrails** that allow stopping/hand-off when blocked or uncertain. For ThinkFirst specifically, this points to a loop where Perceive assembles a curated context state (latest user message + structured notes + compacted summary + just-in-time retrieval), Observe evaluates whether the user’s answers are sufficiently concrete (vs underspecified/“illegal”), Act updates structured state and uses helping questions and past-specific prompts to recover when answers are vague, and the conversation stops either when the workflow goal-state is met (enough concrete facts/decisions) or when guardrails trigger a stop/hand-off—ideally with a final (or partial) structured summary produced under an explicit formatting trigger and a confirmation pause before finalization.

___
