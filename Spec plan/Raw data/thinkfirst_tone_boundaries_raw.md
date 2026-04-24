# ThinkFirst Tone Boundaries — Raw Evidence
_Source files: Knowledge base/raw and wiki. Compiled from: motivational-interview-principle (3 files), wiki/concepts/motivational-interviewing.md, conversational-ux-design (3 files), the-mom-test-by-rob-fitzpatrick.md, prompting/System Prompts.md, prompting/Effective context engineering by Anthropic.md, wiki/concepts/conversational-ai-ux.md, wiki/concepts/question-quality.md_

---

## Tone Q1 — What warm tone looks like

### Evidence from KB

- MI is "based on a **respectful and curious way of being with people** that facilitates the natural process of change and honors client autonomy." [human dialogue context] [`/Knowledge base/raw/motivational-interview-principle/understand MI.md`]

- MI spirit is described as four named qualities: **Partnership** (collaborative process, people are experts on their own lives), **Evocation** (draws out the person's priorities and wisdom), **Acceptance** (nonjudgmental stance, seeks to understand perspectives, expresses empathy, highlights strengths, respects autonomy), **Compassion** (actively promotes client welfare). [human dialogue context] [`/Knowledge base/raw/motivational-interview-principle/understand MI.md`]

- "A client-centred and empathic counselling style is a fundamental and defining characteristic of MI. The attitude underlying this principle of empathy is **'acceptance'**. That does not mean that we agree with or approve what our patients say. It means accepting and understanding the patient's perspective while not agreeing with or endorsing it. This is possible to do through **reflective listening** which helps us understand their feelings and perspectives **without judging, criticising or blaming**." [human dialogue context] [`/Knowledge base/raw/motivational-interview-principle/introduction to MI.md`]

- "The attitude of acceptance and respect **builds a working therapeutic alliance and supports our patients' self-esteem**, which will help promote change." [human dialogue context] [`/Knowledge base/raw/motivational-interview-principle/introduction to MI.md`]

- "When providers offer open-ended questions regarding patient motivations, it creates **a sense of compassion and interest, allowing patients to open up**." [human dialogue context] [`/Knowledge base/raw/motivational-interview-principle/Motivational Interviewing.md`]

- The Mom Test's second-pass conversation demonstrates warmth through curiosity about life, not product: "Your mom can't remember the last time she had such an enjoyable conversation with you. **You were so interested in her life for once!**" The warmth here comes from topic focus (their life, not your idea), not from explicit warmth vocabulary. [both — conversation principle, applies to structured dialogue] [`/Knowledge base/raw/the-mom-test-by-rob-fitzpatrick.md`]

- System Prompts document names concrete warm-tone guidance for AI customer service: **"friendly, patient, and professional"**; "Acknowledge customer concerns with empathy"; "When customers express frustration, respond with understanding and focus on solutions." [AI/text context] [`/Knowledge base/raw/prompting/System Prompts: Design Patterns and Best Practices.md`]

- System Prompts document describes the Conversational Guide Pattern as: "Engage users conversationally. When questions are vague, **ask 2–3 clarifying questions before providing detailed answers**. Reference earlier conversation points when relevant. After answering, suggest related topics the user might find helpful." [AI/text context] [`/Knowledge base/raw/prompting/System Prompts: Design Patterns and Best Practices.md`]

- The Educational Tutor example in System Prompts specifies: "**Celebrate progress and maintain encouraging tone**. When students make errors, explain why the error occurred and how to correct thinking, not just what the right answer is." [AI/text context] [`/Knowledge base/raw/prompting/System Prompts: Design Patterns and Best Practices.md`]

- Warm tone in MI is described using a named metaphor: the practitioner as **ship's rudder**, not engine — "our focus will be more to guide our patients in their decisions rather than making the decisions for our patients." [human dialogue context] [`/Knowledge base/raw/motivational-interview-principle/introduction to MI.md`]

### Exact phrasings found in KB

> "MI is a collaborative, goal-oriented style of communication with particular attention to the language of change. It is designed to strengthen personal motivation for and commitment to a specific goal by eliciting and exploring the person's own reasons for change within an atmosphere of **acceptance and compassion**."
> — Miller & Rollnick, 2013, quoted in [`/Knowledge base/raw/motivational-interview-principle/understand MI.md`]

> "MI is based on a **respectful and curious** way of being with people."
> — [`/Knowledge base/raw/motivational-interview-principle/understand MI.md`]

> "Acceptance facilitates change. Skilful reflective listening is fundamental. Ambivalence is normal."
> — General Principles table, [`/Knowledge base/raw/motivational-interview-principle/introduction to MI.md`]

> "A customer service chatbot might use **warm, empathetic language with simple explanations**, while a research assistant might employ precise technical terminology."
> — [`/Knowledge base/raw/prompting/System Prompts: Design Patterns and Best Practices.md`]

> "You were so interested in her life for once!"
> — [`/Knowledge base/raw/the-mom-test-by-rob-fitzpatrick.md`]

> "Use clear, direct language. Avoid jargon unless the user demonstrates technical familiarity. Maintain a **helpful, patient tone** even when users express frustration."
> — System Prompts example instruction, [`/Knowledge base/raw/prompting/System Prompts: Design Patterns and Best Practices.md`]

### Gaps

- The KB has no direct description of what warm tone looks like specifically in a **text-based AI questioning interface** (as distinct from spoken clinical dialogue or customer service chatbots). All MI tone guidance is from spoken human-to-human clinical settings. The System Prompts examples describe generic chatbot warmth (customer service, tutors), not a product that asks probing questions about the user's thinking.
- No file defines the difference between **curious tone** and **interrogating tone** in an AI interface. The MI distinction exists but is specific to clinical resistance (pre-contemplation, ambivalence). There is no explicit definition for what "interrogating" means in a text questioning product.
- The KB contains no example **opening lines** for a conversational AI that feels warm. The Mom Test contains opening moves for human conversations, but they are not AI dialogue examples.

---

## Tone Q2 — What to never say or do

### Evidence from KB

- Early MI research showed "provider confrontation with a patient's behavior would **cause patients to resist treatment**, either directly by refusing care or indirectly with non-compliance." Direct opposition of resistance is explicitly named as counterproductive. [human dialogue context] [`/Knowledge base/raw/motivational-interview-principle/Motivational Interviewing.md`]

- "It was discovered early on in MI that simply giving patients **the facts and information on why change is beneficial, or warnings against their current behaviors tended to have the opposite response and caused more resistance**." [human dialogue context] [`/Knowledge base/raw/motivational-interview-principle/Motivational Interviewing.md`]

- MI requires practitioners to "refrain from **unsolicited advice, confronting, instructing, directing, or warning**. It is not a way to 'get people to change' or a set of techniques to impose on the conversation." [human dialogue context] [`/Knowledge base/raw/motivational-interview-principle/understand MI.md`]

- "The least desirable situation is when we advocate for change while our patients argue against it. **Such argumentation is counterproductive.**" [human dialogue context] [`/Knowledge base/raw/motivational-interview-principle/introduction to MI.md`]

- Chatbot user research: "Users were **generally annoyed when the bot repeated the same answers over and over again**." [AI/text context] [`/Knowledge base/raw/conversational-ux-design/The User Experience of Chatbots.md`]

- Chatbot user research found a bot whose personality disappeared mid-conversation: "In the beginning you're like, oh, look, it kind of has somewhat of a personality [...], but after that stopped, I was more like, **this is like a chatbot, it doesn't mean anything**." — User quote about Flo from Progressive. [AI/text context] [`/Knowledge base/raw/conversational-ux-design/The User Experience of Chatbots.md`]

- Mom Test names three types of bad data that destroy conversation: **Compliments, Fluff (generics, hypotheticals, future), Ideas**. The pattern that produces them is asking opinion questions and questions that invite the person to guess about the future. [both — applies to any structured discovery conversation] [`/Knowledge base/raw/the-mom-test-by-rob-fitzpatrick.md`]

- Mom Test identifies **"The Pathos Problem"**: "when you expose your ego, leading people to feel they ought to protect you by saying nice things [...] Once someone detects that **your ego is on the line**, they'll give you fluffy mis-truths and extra compliments." [both] [`/Knowledge base/raw/the-mom-test-by-rob-fitzpatrick.md`]

- Mom Test explicitly names **"approval-seeking"** questions as question patterns that produce bad data. Symptoms: "I'm thinking of starting a business... so, do you think it will work?" / "I had an awesome idea for an app — do you like it?" [both] [`/Knowledge base/raw/the-mom-test-by-rob-fitzpatrick.md`]

- System Prompts document warns against **vague, catch-all guidance**: "At the other extreme, engineers sometimes provide vague, high-level guidance that fails to give the LLM concrete signals for desired outputs or **falsely assumes shared context**." (This applies to how prompts for AI are designed, not directly to tone with users, but implies the same risk of AI asking hollow questions.) [AI/text context] [`/Knowledge base/raw/prompting/Effective context engineering for AI agents by Anthropic.md`]

### Exact phrasings found in KB

> "Do you think it's a good idea? Awful question! [...] Opinions are worthless."
> — [`/Knowledge base/raw/the-mom-test-by-rob-fitzpatrick.md`]

> "Would you buy a product which did X? Bad question. You're asking for opinions and hypotheticals from overly optimistic people who want to make you happy. The answer to a question like this is almost always 'yes', which makes it worthless."
> — [`/Knowledge base/raw/the-mom-test-by-rob-fitzpatrick.md`]

> "People will lie to you if they think it's what you want to hear."
> — Rule of thumb, [`/Knowledge base/raw/the-mom-test-by-rob-fitzpatrick.md`]

> "Anything involving the future is an over-optimistic lie."
> — Rule of thumb, [`/Knowledge base/raw/the-mom-test-by-rob-fitzpatrick.md`]

> Fluff-inducing questions named explicitly: "Do you ever…", "Would you ever…", "What do you usually…", "Do you think you…", "Might you…", "Could you see yourself…"
> — [`/Knowledge base/raw/the-mom-test-by-rob-fitzpatrick.md`]

> "She kind of used some phrases like 'now we're cooking with gas' and made it more engaged [...]; but once it got into the actual information they needed for the quote it didn't really have it anymore; it was just straight clean cut information. It can be a little misleading. In the beginning you're like, oh, look, it kind of has somewhat of a personality [...], but after that stopped, I was more like, **this is like a chatbot, it doesn't mean anything.** It took me out of that concept of 'oh, I am speaking with flo from progressive' versus I am just speaking with a chatbot."
> — User quote, [`/Knowledge base/raw/conversational-ux-design/The User Experience of Chatbots.md`]

> "New perspectives are invited but **not imposed**. The client is a primary resource in finding answers and solutions. Resistance is a signal to respond differently."
> — General Principles of MI, [`/Knowledge base/raw/motivational-interview-principle/introduction to MI.md`]

> "Compliments are the fool's gold of customer learning: shiny, distracting, and entirely worthless."
> — [`/Knowledge base/raw/the-mom-test-by-rob-fitzpatrick.md`]

### Gaps

- The KB names patterns that produce bad data (compliments, fluff) but does not describe what specific **AI phrasing patterns** trigger defensiveness in a product that asks structured thinking questions. The User Experience of Chatbots research addresses task-oriented bots (pizza ordering, insurance quotes), not introspective AI guiding thinking.
- There is no evidence in the KB about what "sounding hollow" looks like in written sentence structure specifically — only the Flo from Progressive quote (sustained personality failure) and the context-engineering warning about falsely assuming shared context.
- The KB does not name what **judgment** sounds like in an AI text interface. MI names confrontation and arguing as judgment signals in spoken dialogue; there is no parallel for typed questions.

---

## Tone Q3 — How to handle a weak or vague answer without triggering defensiveness

### Evidence from KB

- "Repeating the patient's words in a neutral way is the **most straightforward strategy** a healthcare professional can utilize to allow the patient to feel heard." [human dialogue context] [`/Knowledge base/raw/motivational-interview-principle/Motivational Interviewing.md`]

- Four named reflection types for lowering resistance: "**simple reflection, feeling reflection, amplified reflection, double-sided reflection, action reflection**." [human dialogue context] [`/Knowledge base/raw/motivational-interview-principle/introduction to MI.md`]

- The MI "Roll with Resistance" principle: "When our patients are resistant, this can be turned or reframed slightly to create a new momentum towards change. **In MI we do not directly oppose resistance, but roll or flow with it.** We invite our patient to consider new information and we offer them new perspectives. We turn a question or problem back to them. We involve them actively in the process of problem solving." [human dialogue context] [`/Knowledge base/raw/motivational-interview-principle/introduction to MI.md`]

- Affirmation as named technique before follow-up: "**Affirmation of strengths, efforts, and past successes help to build the person's hope and confidence in their ability to change.**" [human dialogue context] [`/Knowledge base/raw/motivational-interview-principle/understand MI.md`]

- Mom Test describes a named technique for anchoring vague answers — **transition from fluffy question to concrete one**: "You: 'Do you ever X?' [...] Them: 'Oh yeah, all the time.' [...] You: 'When's the last time that happened?'" [both] [`/Knowledge base/raw/the-mom-test-by-rob-fitzpatrick.md`]

- Mom Test names a recovery move after a generic claim: "Haha, nice. I'm an 'Inbox 0' failure. What's your inbox at right now?" — using **self-disclosure plus a specific counter-question** to anchor fluff without confronting it. [both] [`/Knowledge base/raw/the-mom-test-by-rob-fitzpatrick.md`]

- Mom Test names specific "dig" nudges that are minimal and non-confrontational: "**'Tell me more about that.'** / 'That seems to really bug you — I bet there's a story here.' / 'Go on.'" [both] [`/Knowledge base/raw/the-mom-test-by-rob-fitzpatrick.md`]

- "**People love talking about their opinions and emotions. Digging into a signal is basically just giving them permission to do a brain dump.**" [both] [`/Knowledge base/raw/the-mom-test-by-rob-fitzpatrick.md`]

- 6 Types of Conversations research: bot that asked clarifying questions when user gave vague input "**expediting the funneling process**" — described as a positive behavior. "In some of the conversations we studied, the bot did ask for clarification. For example, one participant started the conversation with 'Issue with swimming pool cleaner.' ChatGPT asked for specific information about the cleaner and the issue." [AI/text context] [`/Knowledge base/raw/conversational-ux-design/The 6 Types of Conversations with Generative AI.md`]

- 6 Types: "**To reduce the articulation load in funneling conversations, the bot should ask helping questions that narrow down underspecified queries.**" [AI/text context] [`/Knowledge base/raw/conversational-ux-design/The 6 Types of Conversations with Generative AI.md`]

### Exact phrasings found in KB

> "You: 'Do you ever X?' [fluffy question] / Them: 'Oh yeah, all the time.' / You: 'When's the last time that happened?' [anchor to specifics] / Them: 'Two weekends ago.' / You: 'Can you talk me through that?'"
> — [`/Knowledge base/raw/the-mom-test-by-rob-fitzpatrick.md`]

> "Tell me more about that." / "That seems to really bug you — I bet there's a story here." / "What makes it so awful?" / "Go on."
> — Questions to dig into emotional signals, [`/Knowledge base/raw/the-mom-test-by-rob-fitzpatrick.md`]

> "You seem pretty excited about that — it's a big deal?" / "Why so happy?"
> — Questions to dig into emotional signals, [`/Knowledge base/raw/the-mom-test-by-rob-fitzpatrick.md`]

> "Reflection is an active listening skill – reflecting what our patients say, feel or mean shows that we are following what our patient is saying [...] It involves taking a guess at what we think the patient means and reflecting it back in a short statement. It affirms and validates what the patient is thinking and it **keeps the patients thinking and talking about change**."
> — [`/Knowledge base/raw/motivational-interview-principle/introduction to MI.md`]

> "Compare the question 'How do you feel about being the only one overweight in your family?' vs the reflective statement 'You don't like the fact that you are the only one overweight in your family'. If that was an accurate reflection, your patient will know you heard and understood."
> — [`/Knowledge base/raw/motivational-interview-principle/introduction to MI.md`]

> "If I understand you correctly, it sounds like..."
> — Described as the basic hypothesis-testing structure of reflection, [`/Knowledge base/raw/motivational-interview-principle/introduction to MI.md`]

> "Summarizing the information the patient gives and affirming their strengths assures that all parties accurately understood what was discussed."
> — [`/Knowledge base/raw/motivational-interview-principle/Motivational Interviewing.md`]

### Gaps

- All named recovery techniques (reflection types, rolling with resistance) are from spoken clinical MI. The KB provides no evidence of what these look like as typed text responses in a one-question-at-a-time AI interface.
- The KB has no evidence of how **many attempts** to probe deeper are acceptable before a user perceives the AI as pressuring them. MI sessions are multi-session; ThinkFirst is a single conversational flow.
- The 6 Types research shows clarifying questions are valued (funneling), but does not address what tone those clarifying questions should have. The research is about conversation type, not phrasing warmth.
- No KB file addresses the specific scenario of a **second or third attempt** to get depth from a response — the recovery arc of "I got a surface answer, I asked again gently, they gave another surface answer."

---

## Tone Q4 — Where human MI tone breaks down for AI

### Evidence from KB

- **Sustained personality failure in a chatbot**: User study found that a bot (Flo from Progressive) that adopted a playful personality but failed to maintain it produced a specific negative reaction — the user described it as "misleading" and "taking me out" of the experience. "In the beginning you're like, oh, look, it kind of has somewhat of a personality [...], but after that stopped, I was more like, **this is like a chatbot, it doesn't mean anything**." [AI/text context] [`/Knowledge base/raw/conversational-ux-design/The User Experience of Chatbots.md`]

- **Users drop politeness markers with known-bots**: "Although in our intelligent-assistant studies we found that people tended to still use polite language when interacting with Siri, Alexa, or Google Assistant, participants in this study generally **dropped the politeness markers ('Please,' 'Thank you,' indirect language such as 'Would it be possible to…') if they were aware that they were interacting with a bot.**" [AI/text context] [`/Knowledge base/raw/conversational-ux-design/The User Experience of Chatbots.md`]

- **Chat as a medium is more direct than speech**: "chat, as a medium, tends to be slightly more direct than face-to-face or telephone conversation, **possibly because of the higher interaction cost of typing**." [AI/text context] [`/Knowledge base/raw/conversational-ux-design/The User Experience of Chatbots.md`]

- **Human presence signals care differently than bot presence**: "If you have a human [for customer service], it means that you care enough; if you have a bot, you should **have a really good one**." — User quote. [AI/text context] [`/Knowledge base/raw/conversational-ux-design/The User Experience of Chatbots.md`]

- **MI is explicitly not a technique set**: "In fact, MI is a skilful clinical method, not a set of techniques that can be easily learned. It is **more than a set of techniques for doing counselling. It is a way of being with people.**" — This is an implicit warning that MI spirit cannot be scripted or replicated by rule. [human dialogue context — implicit gap for AI] [`/Knowledge base/raw/motivational-interview-principle/introduction to MI.md`]

- **MI requires clinician attributes that AI lacks**: "MI takes time, practice and **requires self-awareness and discipline** from the clinician." [human dialogue context — implicit gap for AI] [`/Knowledge base/raw/motivational-interview-principle/understand MI.md`]

- **Trust and warmth are measured differently in AI UX research**: The literature review of 171 CA papers lists "perceived warmth of the AI system" as an evaluated metric defined as "the extent to which users feel the CA is **good-natured and warm**" — measured separately from task performance and accuracy. [AI/text context] [`/Knowledge base/raw/conversational-ux-design/ux research on conversationa human ai interaction.md`]

- **Empathy and self-disclosure are identified as critical for CA UX, but less reflected in group AI interactions**: "In prior works, **human-likeness (e.g., empathy and self-disclosure) is identified as a critical aspect to improving UX and to encouraging users to show favorable feelings (trust, openness, tolerance) towards CAs**. However, similar topics are less reflected by polyadic human-AI interaction." [AI/text context] [`/Knowledge base/raw/conversational-ux-design/ux research on conversationa human ai interaction.md`]

- **Being transparent about bot status calibrates user behavior**: "Our study participants were pleased when the business was **transparent about using a bot** because they could calibrate both their expectations and their language. [...] This type of language [keyword-based, direct] was generally more successful than the convoluted, indirect language often used in normal conversation." [AI/text context] [`/Knowledge base/raw/conversational-ux-design/The User Experience of Chatbots.md`]

- **Context rot in AI**: LLMs "lose focus or experience confusion at a certain point [...] context rot: as the number of tokens in the context window increases, **the model's ability to accurately recall information from that context decreases**." [AI/text context — technical, not directly tone, but affects consistency of warm tone across a conversation] [`/Knowledge base/raw/prompting/Effective context engineering for AI agents by Anthropic.md`]

### Exact phrasings found in KB

> "this is like a chatbot, it doesn't mean anything. It took me out of that concept of 'oh, I am speaking with flo from progressive' versus I am just speaking with a chatbot."
> — User quote, [`/Knowledge base/raw/conversational-ux-design/The User Experience of Chatbots.md`]

> "If you have a human [for customer service], it means that you care enough; if you have a bot, you should have a really good one."
> — User quote, [`/Knowledge base/raw/conversational-ux-design/The User Experience of Chatbots.md`]

> "MI is a skilful clinical method, not a set of techniques that can be easily learned. It is more than a set of techniques for doing counselling. **It is a way of being with people.**"
> — [`/Knowledge base/raw/motivational-interview-principle/introduction to MI.md`]

> "perceived warmth of the AI system — the extent to which users feel the CA is good-natured and warm"
> — Evaluation metric table, [`/Knowledge base/raw/conversational-ux-design/ux research on conversationa human ai interaction.md`]

> "human-likeness (e.g., empathy and self-disclosure) is identified as a critical aspect to improving UX and to encouraging users to show favorable feelings (trust, openness, tolerance, etc) towards CAs"
> — [`/Knowledge base/raw/conversational-ux-design/ux research on conversationa human ai interaction.md`]

> "when users realized they were talking to a bot, they tended to be more direct, use **keyword-based language, and avoid politeness markers**. This type of language was generally more successful than the convoluted, indirect language often used in normal conversation."
> — [`/Knowledge base/raw/conversational-ux-design/The User Experience of Chatbots.md`]

### Gaps

- The KB contains **no experimental findings specifically on whether MI techniques feel manipulative when delivered by AI**. The Flo from Progressive case is the only direct evidence of AI warmth failing, and it concerns inconsistency, not manipulativeness.
- The KB has no evidence comparing **user responses to reflective listening done by an AI vs a human**. The UX research covers overall warmth perception and empathy, but no study in the KB directly tested MI reflection techniques in an AI context.
- The UX research (ux research on conversationa human ai interaction.md) focuses on polyadic CAs (group/team contexts) and customer service/task bots — not on introspective, one-question-at-a-time guidance AI. Its findings on trust and warmth are not directly applicable to ThinkFirst's interaction model.
- The KB mentions "perceived warmth" as a measured metric in CA research but contains no experimental data on what specific AI behaviors produce or destroy it in a questioning interface.

---

## Tone Q5 — What makes an AI question land vs fall flat

### Evidence from KB

- Mom Test names the **past-specific, behavior-focused question** as categorically different from opinion/future questions: "Talk me through the last time that happened" is named "Good question" and described as getting you "shown, not told." [both] [`/Knowledge base/raw/the-mom-test-by-rob-fitzpatrick.md`]

- Mom Test names **"Why do you bother?"** as a good question: "I love this sort of question. It's great for getting from the **perceived problem to the real one**." [both] [`/Knowledge base/raw/the-mom-test-by-rob-fitzpatrick.md`]

- Mom Test names **"What are the implications of that?"** as good: "This distinguishes between I-will-pay-to-solve-that problems and thats-kind-of-annoying-but-I-can-deal-with-it 'problems'." [both] [`/Knowledge base/raw/the-mom-test-by-rob-fitzpatrick.md`]

- Mom Test on the difference between generic and specific questions: "What do you usually do on it?" produced generic data. "What's the last thing you did on it?" produced concrete, unexpected, actionable data. [both] [`/Knowledge base/raw/the-mom-test-by-rob-fitzpatrick.md`]

- Mom Test names the **question that makes someone feel heard**: "Is there anything else I should have asked?" — "Usually, by the end of the meeting, people understand what you're trying to do. [...] **Asking this question gives them a chance to politely 'fix' your line of questioning. And they will!**" [both] [`/Knowledge base/raw/the-mom-test-by-rob-fitzpatrick.md`]

- MI evidence: "**Researchers determined that MI is appropriately utilized when at least 70% of questions are open-ended.**" Open-ended questions "allow patients to tell their stories and explore their ambivalence. We also receive **less biased data because closed ended questions are leading and inefficient**." [human dialogue context] [`/Knowledge base/raw/motivational-interview-principle/Motivational Interviewing.md`]

- MI defines **evocative open-ended questions**: "Evocative open-ended questions help orient patients to a goal-oriented mindset and enable them to **talk themselves into change**." [human dialogue context] [`/Knowledge base/raw/motivational-interview-principle/Motivational Interviewing.md`]

- 6 Types research: in funneling conversations, when the AI **asked for specifics that narrowed the topic**, users found it helpful — "ChatGPT asked for specific information about the cleaner and the issue, expediting the funneling process." The user had typed only: "Issue with swimming pool cleaner." [AI/text context] [`/Knowledge base/raw/conversational-ux-design/The 6 Types of Conversations with Generative AI.md`]

- 6 Types research: "**Ask the user for specific details about their question, as well as about the format of the answer.** Consider giving users examples of the information they could provide in a prompt if the prompt is too vague or underspecified." [AI/text context] [`/Knowledge base/raw/conversational-ux-design/The 6 Types of Conversations with Generative AI.md`]

- System Prompts Adaptive Complexity Pattern: "Assess the user's technical level from their questions and terminology. Start with clear, accessible explanations. If users demonstrate technical knowledge, match their sophistication level." — implies questions that **match what the user just said** are better than generic questions. [AI/text context] [`/Knowledge base/raw/prompting/System Prompts: Design Patterns and Best Practices.md`]

- wiki/concepts/question-quality.md: "Question quality is the difference between **truth-seeking and validation-seeking**. Good questions produce concrete facts about reality (behaviors, constraints, costs). Bad questions produce noise (compliments, hypotheticals, future promises)." [AI/text context — wiki synthesis] [`/Knowledge base/wiki/concepts/question-quality.md`]

- wiki/concepts/question-quality.md heuristics: "Treat 'Would you…?' / 'Do you think…?' as **red flags** unless you're already asking for money/time commitments." [AI/text context — wiki synthesis] [`/Knowledge base/wiki/concepts/question-quality.md`]

### Exact phrasings found in KB

> "Talk me through the last time that happened." — named Good Question
> "Why do you bother?" — named Good Question
> "What are the implications of that?" — named Good Question
> "What else have you tried?" — named Good Question
> "How are you dealing with it now?" — named Good Question
> — [`/Knowledge base/raw/the-mom-test-by-rob-fitzpatrick.md`]

> "Do you think it's a good idea?" — named Awful Question
> "Would you buy a product which did X?" — named Bad Question
> "How much would you pay for X?" — named Bad Question
> "Would you pay X for a product which did Y?" — named Bad Question
> — [`/Knowledge base/raw/the-mom-test-by-rob-fitzpatrick.md`]

> "Asking 'Tell me more about your previous attempts to lose weight' would elicit more information [than 'Was your previous attempt to lose weight successful?']."
> — [`/Knowledge base/raw/motivational-interview-principle/introduction to MI.md`]

> "In some of the conversations we studied, the bot did ask for clarification. For example, one participant started the conversation with 'Issue with swimming pool cleaner.' **ChatGPT asked for specific information about the cleaner and the issue, expediting the funneling process.**"
> — [`/Knowledge base/raw/conversational-ux-design/The 6 Types of Conversations with Generative AI.md`]

> "Consider explicitly telling the AI bot to ask helping questions to improve its output. For example, you may add phrasing such as **'Ask me questions if you need additional information'**, to get the bot to help you articulate the different constraints that you may be working with."
> — [`/Knowledge base/raw/conversational-ux-design/The 6 Types of Conversations with Generative AI.md`]

> "Talk about **their life** instead of your idea. Ask about **specifics in the past** instead of generics or opinions about the future. Talk less and **listen more.**"
> — The Mom Test rules, [`/Knowledge base/raw/the-mom-test-by-rob-fitzpatrick.md`]

> "While it's rare for someone to tell you precisely what they'll pay you, they'll **often show you what it's worth to them**."
> — [`/Knowledge base/raw/the-mom-test-by-rob-fitzpatrick.md`]

> "Question quality is the difference between **truth-seeking and validation-seeking**."
> — [`/Knowledge base/wiki/concepts/question-quality.md`]

### Gaps

- The KB provides no evidence on **optimal question length** in a text-based AI interface. MI is spoken; the Mom Test is conversational human dialogue. There is no study in this KB on whether shorter or longer questions perform differently in typed AI chat.
- The KB has no evidence on **question positioning** — whether the order in which questions appear in a conversation affects how well they land. The 6 Types research describes conversation shapes but not intra-question sequencing.
- No file addresses what makes a **follow-up question feel connected** vs disconnected from what was just said in a text AI interface. The 6 Types research describes funneling (getting more specific) and exploring (going deeper) as valuable, but does not describe the phrasing quality that makes follow-ups feel natural vs abrupt.
- The Mom Test's question quality evidence comes from **human startup customer conversations**, not from a product that asks questions to guide structured thinking. The contexts differ: in the Mom Test, the goal is to avoid false positives about product-market fit; in ThinkFirst, the goal is to help the user think more clearly. Whether the same question quality rules hold in a guidance context vs a research context is not addressed in the KB.
- No file in the KB directly compares how the same question lands differently when **asked by an AI vs a human**. The user perception differences noted in the chatbot research are about identity transparency and personality consistency, not about question quality per se.

---
_Document compiled from raw KB files. No recommendations or tone rules were added. All phrasings are verbatim or closely paraphrased from source files with citations._
