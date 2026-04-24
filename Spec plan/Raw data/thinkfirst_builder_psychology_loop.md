# ThinkFirst Builder Psychology Loop — Research Findings

## How to use this document
This document extracts evidence from the ThinkFirst knowledge base to inform the design of ThinkFirst's conversation loop when a user gives vague, evasive, or defensive answers about their problem or idea. The team should use it as a behavior specification: each Q&A section maps to a specific decision point in the conversation state machine, and the "Recommended decision" line translates KB evidence into one concrete loop behavior. Read the full Loop Design Decision Summary at the bottom for the coherent end-to-end sequence.

---

## Q1 — Signals of a vague or defensive answer

### Evidence from KB
- **Fluffy generic claims** are a named bad-data type: language like "I usually," "I always," "I never," "I would," "I will," "I might," "I could" signals the person is describing who they *want to be*, not what they *actually do*. [/Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/raw/the-mom-test-by-rob-fitzpatrick.md]
- **Future-tense promises** are the most dangerous form of vague signal — "I would definitely buy that" sounds concrete but reflects wild optimism about a hypothetical future, not a real commitment. [/Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/raw/the-mom-test-by-rob-fitzpatrick.md]
- **Compliments** are the canonical evasion type: "That's so cool. I love it." contains zero data and is a warning flag that the person is trying to be politely dismissive or protecting the asker's feelings. [/Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/raw/the-mom-test-by-rob-fitzpatrick.md]
- **Stalling tactics** — "Let me know when it launches," "I'll look at it when I have more time," "Keep me in the loop" — are polite refusals and should be read as non-interest rather than delayed interest. [/Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/raw/the-mom-test-by-rob-fitzpatrick.md]
- **Sustain talk** in MI terms: patient language that contains ambivalence and reasons *why current behavior should remain* is a measurable negative signal. The more sustain talk present, the fewer behavioural changes result; it predicts negative outcomes better than absence of change talk predicts positive ones. [/Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/raw/motivational-interview-principle/Motivational Interviewing.md]
- **Hostility, disinterest, and reluctance** are all named forms of patient ambivalence in MI, ranging along a spectrum rather than being a binary signal. [/Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/raw/motivational-interview-principle/Motivational Interviewing.md]
- **Pre-contemplation stage behaviour**: a person "not interested in changing their behavior and may have subjective justification as to why they shouldn't change" is a recognized stage of change in the Transtheoretical Model — this is ambivalence at its deepest, not just a bad answer. [/Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/raw/motivational-interview-principle/Motivational Interviewing.md]
- **Compliment-symptoms to watch for internally**: "That meeting went really well," "We're getting a lot of positive feedback," "Everybody loves the idea" — these are back-of-office warning signs that the data collected was compliments, not facts. [/Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/raw/the-mom-test-by-rob-fitzpatrick.md]
- **Fluff-inducing question patterns** produce vague answers by design: "Do you ever…," "Would you ever…," "What do you usually…," "Do you think you…," "Might you…," "Could you see yourself…" — if the question is of this type, the vague answer is expected and shouldn't be treated as meaningful resistance. [/Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/raw/the-mom-test-by-rob-fitzpatrick.md]
- **Feature requests with no underlying problem evidence** are a deflection pattern: when someone offers ideas or requests without being able to articulate the motivation, they may be filling silence rather than describing a real need. [/Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/raw/the-mom-test-by-rob-fitzpatrick.md]

### Gaps
The KB does not cover body-language or audio-prosodic signals (e.g., hesitation, trailing off, pitch shift). It also does not address culturally-specific evasion patterns or distinguish between a person who is vague *because they're confused* vs. vague *because they're disengaged*. No KB file covers how to detect sycophantic agreeableness that disguises disinterest in text-based conversations specifically.

### Recommended decision
Classify an answer as vague/defensive when it contains generic frequency claims, hypothetical futures, compliments without accompanying behaviour evidence, or stalling phrases — and treat any such signal as a trigger to anchor to specific past behaviour before proceeding.

---

## Q2 — After 1 vague answer

### Evidence from KB
- **Anchor to past behaviour immediately**: the primary Mom Test technique for recovering from fluff is "When's the last time that happened?" — this converts a generic claim into a concrete past event that can be examined. [/Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/raw/the-mom-test-by-rob-fitzpatrick.md]
- **Ask them to walk through the workflow**: "Talk me through the last time that happened" recovers the conversation into concrete territory — "Folks can't be wishy-washy when you're watching them do the task." [/Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/raw/the-mom-test-by-rob-fitzpatrick.md]
- **Deflect the compliment and get to facts**: when a compliment appears, the correct move is to ignore it and redirect — "How are you dealing with this at the moment?" — rather than acknowledge the compliment and build on it. [/Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/raw/the-mom-test-by-rob-fitzpatrick.md]
- **Dig into emotional signals**: "Tell me more about that," "That seems to really bug you — I bet there's a story here," "What makes it so awful?" — any strong emotion is worth exploring rather than accepting at face value. [/Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/raw/the-mom-test-by-rob-fitzpatrick.md]
- **Reflective listening**: the MI approach after a vague response is to reflect back what the person said in a neutral statement — "It sounds like…" — which tests your understanding, shows empathy, and keeps the person talking without applying pressure. [/Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/raw/motivational-interview-principle/introduction to MI.md]
- **Open-ended follow-up**: MI research found that at least 70% of questions should be open-ended; closed questions after a vague answer force the person into yes/no mode and reduce the chance they'll volunteer the real information. [/Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/raw/motivational-interview-principle/Motivational Interviewing.md]
- **Transitioning from fluff to concrete**: a fluff-inducing question is acceptable *only if* immediately followed by an anchor: "Do you ever X?" → "Oh yeah, all the time" → "When's the last time that happened?" The sequence is a valid technique for maintaining tempo while still getting to facts. [/Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/raw/the-mom-test-by-rob-fitzpatrick.md]
- **Affirm the person's experience before probing**: in MI, affirmation of strengths and past experiences "helps to build the person's hope and confidence" and is the recommended framing before asking deeper questions — this lowers defensiveness on the first re-ask. [/Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/raw/motivational-interview-principle/understand MI.md]
- **Use the Elicit–Provide–Elicit structure**: first assess what the person already understands, then share information (if needed), then re-elicit their response — this avoids the mistake of overwhelming them with information before you know what they already believe. [/Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/raw/motivational-interview-principle/introduction to MI.md]

### Gaps
Neither source provides exact language for a text-based AI agent to use in the first recovery attempt. The Mom Test's examples are conversational (spoken, in-person) and don't cover the specific register or word-count needed for a chat interface. MI doesn't specify how many reflective statements to offer before escalating the approach.

### Recommended decision
After 1 vague answer, reflect the answer back neutrally, then ask for a specific concrete past example using a non-leading open question — do not rephrase the same question in different words, and do not yet challenge or probe for inconsistency.

---

## Q3 — After 2–3 vague answers in a row

### Evidence from KB
- **Resistance is a signal to respond differently** (not to push harder): MI explicitly names this — "Resistance is a signal to respond differently" and advocates never directly opposing resistance. The recommended move is to roll with it, invite new perspectives, and involve the person in problem-solving. [/Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/raw/motivational-interview-principle/introduction to MI.md]
- **Reframe rather than repeat**: the MI "Roll with Resistance" principle says when patients resist, the content "can be turned or reframed slightly to create a new momentum toward change" — the frame shifts, not just the words. [/Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/raw/motivational-interview-principle/introduction to MI.md]
- **Develop discrepancy**: the MI principle of "Develop Discrepancy" is the second-order tool when simple reflection isn't enough — help the person see the gap between their stated goals and their current behaviour, but crucially, *the client must voice this*, not the practitioner. [/Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/raw/motivational-interview-principle/introduction to MI.md]
- **Use a decisional balance tool**: after multiple vague answers, the MI "pros and cons matrix" — asking about good and not-so-good things about their current situation — is designed to get people unstuck from ambivalence. [/Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/raw/motivational-interview-principle/introduction to MI.md]
- **Use the 0–10 concern ruler**: "On a scale of 0 to 10, how concerned are you about [the problem]?" followed by "Why is it not higher?" and "Why is it not lower?" forces engagement without confrontation and surfaces the underlying values and barriers. [/Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/raw/motivational-interview-principle/introduction to MI.md]
- **Check whether the problem actually matters**: the Mom Test diagnoses persistent vagueness as a sign the problem may not be real: "Some problems don't actually matter." If someone keeps being vague about a problem's implications, the correct inference is that it's a nuisance, not a real problem. [/Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/raw/the-mom-test-by-rob-fitzpatrick.md]
- **Test for prior action**: "What else have you tried?" is the Mom Test's diagnostic question for determining whether a problem is real enough to motivate behaviour: "If they haven't looked for ways of solving it already, they're not going to look for (or buy) yours." [/Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/raw/the-mom-test-by-rob-fitzpatrick.md]
- **Summarize and invite correction**: MI's summarizing technique — restating the key things the person has said — "ensures shared understanding and reinforces key points" and can surface discrepancies the person hasn't noticed yet without the practitioner having to name them directly. [/Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/raw/motivational-interview-principle/understand MI.md]

### Gaps
The KB does not provide explicit guidance on *how many* reframing attempts are appropriate before changing strategy, nor does it specify whether a topic pivot (changing to a different aspect of the problem) or a meta-acknowledgment ("I notice we've been circling this question — is there something about it that's hard to answer?") is more effective. No source covers the specific case where vagueness is due to the person not yet having reflected on the topic at all, rather than resistance.

### Recommended decision
After 2–3 vague answers, shift the questioning frame entirely rather than repeating variants of the same question — use a decisional balance, concern ruler, or "what have you already tried" probe to test whether the problem is real and whether the person is in a position to engage with it.

---

## Q4 — When to stop vs keep going

### Evidence from KB
- **The complainer signal**: "Long story short, that person is a complainer, not a customer. They're stuck in the la-la-land of imagining they're the sort of person who finds clever ways to solve petty annoyances." If someone complains but hasn't taken any action to solve the problem, they're a non-customer. [/Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/raw/the-mom-test-by-rob-fitzpatrick.md]
- **"If they haven't looked for ways of solving it already, they're not going to look for (or buy) yours"** — stated as a rule of thumb and functions as a hard stopping criterion in the Mom Test framework. [/Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/raw/the-mom-test-by-rob-fitzpatrick.md]
- **No commitment = no real signal**: when someone refuses to give up anything of value (time, reputation, money) after the idea has been revealed, the meeting has failed. "A pipeline of zombie leads," "ending with a compliment," "ending with no clear next steps," and "meetings which 'went well'" are all failure signals. [/Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/raw/the-mom-test-by-rob-fitzpatrick.md]
- **Pre-contemplation is a valid stopping state**: the Transtheoretical Model recognizes that a person in pre-contemplation "is not interested in changing their behaviour" — MI's recommendation is not to force through this, but to work with the stage the person is actually in. At this stage, you can plant seeds but cannot expect commitment. [/Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/raw/motivational-interview-principle/Motivational Interviewing.md]
- **More information does not resolve ambivalence**: the MI literature explicitly notes that "simply giving patients the facts and information on why change is beneficial, or warnings against their current behaviors tended to have the opposite response and caused more resistance." Continuing to push facts after repeated vague answers makes things worse. [/Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/raw/motivational-interview-principle/Motivational Interviewing.md]
- **Focusing on ambivalence without resolution does not predict positive outcomes**: one study found that "focusing on ambivalence did not consistently predict positive outcomes, especially in those individuals who were at lower stages of change and did not resolve their internal conflicts." Extended ambivalence work without resolution is not productive. [/Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/raw/motivational-interview-principle/Motivational Interviewing.md]
- **Disproval is a valid successful outcome**: "They don't have the problem. That's successful learning." The Mom Test explicitly frames a negative result as a good conversation — it's worth leaving once you've established the person doesn't have the problem. [/Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/raw/the-mom-test-by-rob-fitzpatrick.md]
- **Not asking is the real failure, not rejection**: "I never consider rejection to be a real failure. But not asking certainly is." The conversation should end with a clear ask or a clear close — ambiguity about where the person stands is the worst outcome. [/Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/raw/the-mom-test-by-rob-fitzpatrick.md]
- **It only takes 5 minutes to learn whether a problem exists**: "It only takes 5 minutes to learn whether a problem exists and is important." The conversation should not be artificially extended when the answer is already clear. [/Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/raw/the-mom-test-by-rob-fitzpatrick.md]

### Gaps
No KB file specifies a number-of-turns limit for AI-mediated conversation before stopping. The MI literature does not address asynchronous or AI-driven interactions — it assumes a skilled human practitioner who can read emotional nuance in real time. No source covers what to do at the end of an unresolved conversation (e.g., how to close gracefully and leave the door open for a future session).

### Recommended decision
Stop the deep-probing loop and move to a graceful close when: (a) the person cannot cite a single concrete past instance of the problem, or (b) the person has given no commitment of any kind (time, action, information) after 3+ recovery attempts — treat either as a valid negative result, not a failure.

---

## Q5 — Tone when challenging a weak answer

### Evidence from KB
- **The MI spirit — Partnership, Evocation, Acceptance, Compassion**: all four named elements of MI spirit require a non-confrontational posture. The MI practitioner "takes a nonjudgmental stance, seeks to understand the person's perspectives and experiences, expresses empathy, highlights strengths, and respects a person's right to make informed choices." [/Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/raw/motivational-interview-principle/understand MI.md]
- **Confrontation causes resistance, not change**: "Early research indicated that provider confrontation with a patient's behavior would cause patients to resist treatment, either directly by refusing care or indirectly with non-compliance." Direct challenge is contraindicated. [/Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/raw/motivational-interview-principle/Motivational Interviewing.md]
- **MI is not a technique to "get people to change"**: it "requires the clinician to engage with the client as an equal partner and refrain from unsolicited advice, confronting, instructing, directing, or warning." The tone is curious and collaborative, never prosecutorial. [/Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/raw/motivational-interview-principle/understand MI.md]
- **Acceptance does not mean agreement**: "Acceptance does not mean that we agree with or approve what our patients say. It means accepting and understanding the patient's perspective while not agreeing with or endorsing it." The tone can challenge gently while still validating the person's right to feel what they feel. [/Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/raw/motivational-interview-principle/introduction to MI.md]
- **Amplified reflection as a gentle challenge**: "Reflection can assist the provider in shifting the focus away from barriers and reframing negative interpretations to positive ones." An amplified or double-sided reflection ("On one hand you said X… and on the other…") surfaces inconsistency without accusing the person of being inconsistent. [/Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/raw/motivational-interview-principle/Motivational Interviewing.md]
- **Keep ego out of the conversation**: "Once someone detects that your ego is on the line, they'll give you fluffy mis-truths and extra compliments." The tone must be detached from any investment in a particular answer — curiosity is safe, investment is dangerous. [/Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/raw/the-mom-test-by-rob-fitzpatrick.md]
- **"Comforting the afflicted, afflicting the comfortable"**: MI's essence is described as this — those who are stuck should be provoked (gently) to think about changing, but this provocation is done through empathy and curiosity, not challenge. [/Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/raw/motivational-interview-principle/introduction to MI.md]
- **Language examples for gentle re-focus**: "Whoops — I just slipped into pitch mode. I'm really sorry about that — can we jump back to what you were just saying?" and "You seem pretty excited about that — it's a big deal?" are the Mom Test's model for recovering tone after getting off track. [/Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/raw/the-mom-test-by-rob-fitzpatrick.md]
- **MI-style information framing**: use "what happens to some people…" or "what usually happens…" rather than "this is what will happen to you" — less confrontational framing that invites the person to consider evidence without feeling targeted. [/Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/raw/motivational-interview-principle/introduction to MI.md]

### Gaps
The KB provides no sample scripts for challenging a weak answer in a text-based AI conversational interface specifically. The MI examples are all clinician-patient dialogue in spoken settings. No source addresses the tradeoff between tone warmth and perceived sycophancy in AI chat — particularly whether the tone guidance from human MI practitioners translates without sounding hollow when delivered by an AI.

### Recommended decision
Challenge weak answers through curiosity and reflection rather than direct correction — use double-sided reflections, gentle past-specificity anchors, and affirm the person's autonomy throughout; never accuse, warn, or tell them what their problem is.

---

## Overall KB coverage assessment

### Files that contributed findings:
- /Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/raw/the-mom-test-by-rob-fitzpatrick.md
- /Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/raw/motivational-interview-principle/Motivational Interviewing.md
- /Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/raw/motivational-interview-principle/introduction to MI.md
- /Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/raw/motivational-interview-principle/understand MI.md
- /Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/wiki/concepts/motivational-interviewing.md
- /Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/wiki/concepts/question-quality.md
- /Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/wiki/concepts/user-research-methods.md

### Files checked but not relevant:
- /Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/wiki/sources/paul-graham-ycombinator.md — source note only; raw PG files are empty placeholders
- /Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/wiki/sources/yc-startup-school.md — source note only; raw YC Startup School files are empty placeholders

### Critical gaps:
- No source covers how to handle vagueness in a **text-based AI chat** context (all examples are spoken, in-person, or clinical)
- No source specifies a **turn-count or time limit** for escalation — how many anchoring attempts before pivoting strategy
- No source addresses the tone difference between **human warmth and AI warmth** — MI guidance may not transfer directly
- No source covers **culturally-specific evasion patterns** or politeness norms that produce vague answers structurally
- No source covers the case where vagueness is caused by **genuine unfamiliarity with introspection**, not resistance
- Paul Graham YC essays and YC Startup School materials are **empty placeholders** — likely contain directly relevant material on user-learning and problem discovery

### Sources recommended to add:
- YC Startup School raw files (populated): specifically "How to Talk to Users" and "How to Get and Evaluate Startup Ideas"
- Paul Graham raw essays (populated): specifically "What I Learned from Users" and "Before the Startup"
- Conversational AI UX design files (`/Users/anlalalaa_/Projects/AI PM/thinkfirst/Knowledge base/raw/conversational-ux-design/`) — likely directly relevant to translating MI into AI chat UX
- A source on MI with resistant or overconfident populations — current MI files skew toward willing patients in healthcare; the ThinkFirst user is often overconfident, not under-confident

---

## Loop design decision summary

The KB collectively supports the following behaviour sequence for ThinkFirst when a user gives vague or defensive answers: **detect early** (classify generic claims, hypothetical futures, compliments, and stalling language as red-flag signals rather than positive signals); **anchor once gently** (after the first vague answer, reflect neutrally and ask for a specific concrete past example without confrontation); **reframe the whole question after persistent vagueness** (after 2–3 vague answers, do not repeat the same probe — switch to a decisional balance, concern-level ruler, or prior-action diagnostic like "what have you already tried?"); **stop when the evidence for non-problem is clear** (if the person cannot produce a single concrete past instance and gives no commitment of any kind, exit the loop gracefully and treat this as valid negative data, not failure); and **maintain a tone of genuine curiosity throughout** (never confront directly, never tell the person what their problem is, never expose investment in a particular answer — use double-sided reflections and amplified summaries to surface inconsistency and let the person draw their own conclusions). The two frameworks complement each other: The Mom Test supplies the tactical moves (anchor, dig, deflect, test for prior action), while MI supplies the relational posture (empathy, roll-with-resistance, support autonomy) that makes those moves land without triggering defensiveness.

___
