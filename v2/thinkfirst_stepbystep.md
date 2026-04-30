**Part 1 — What you already have (keep all of this)**

## **ThinkFirst V1 Current State**

**Working app**

Desktop + mobile, live

**Socratic chat flow**

8–12 turns, finite-state logic

**8 archetypes**

Golden dataset, tested

**5 eval dimensions**

Scoring rubric defined

**Prompt specs**

v1 → v3, in repo

**Idea recap output**

V1 end state (before)

**Claude API**

Already wired in

**Tech stack**

React / Next.js / Vercel

**Keep unchanged** Chat flow, archetypes, existing prompts, current UI layout



**Part 2 — V2 architecture (what gets added)**

## **The New 3-Pass Pipeline**

**Existing**

**Socratic interview**

→

**Pass 1 — New**

**Extraction**

→

**Pass 2 — New**

**Scoring**

→

**Pass 3 — New**

**Decision Brief**

When the interview ends, user clicks **Generate Analysis**. Three sequential Claude API calls run. Each call's output is strict JSON. Each run is logged with model name, model version, prompt version, and timestamp.



**Part 3 — Lock schemas first (before touching any code)**

## **3 JSON Schemas to Define**

**1 - Assumption Map**

assumption_label

category

evidence_status

user_evidence_quote

gap_flag

**2 - Eval Scorecard**

dimension_name

score (1–5)

reason

failure_mode

improvement_tip

**3 - Decision Brief**

one_sentence_idea

target_user

pain_chain

current_workaround

riskiest_assumption

evidence_needed

invalidation_threshold

next_3_experiments

confidence_level

honest_gaps

decision

**Calibration rule: if 2 or more critical assumptions have evidence_status = "missing", the system cannot output decision = "Proceed". Hard-coded, not LLM-decided.**

Valid decisions:

**ProceedInvestigateParkRevise**



A few notes on how these map to the implementation plan:

**The Assumption Map 2x2** uses the Importance vs Evidence axes from the frameworks you shared. The key insight from image 3 is that the top-right quadrant (important + no evidence) is the danger zone — that's where your "Experiment Now" assumptions live. In the demo, 4 of 7 dots land there. That's the visual that a hiring manager remembers.

**The Eval Scorecard radar** replaces a static list of scores with a shape you can read instantly. A tight, small polygon close to the center = low confidence idea. A wide polygon reaching the outer ring = strong, validated idea. The shape itself tells the story before you read a single number.

Both panels are clickable and show the detail + next action below — which is the "explain below" behaviour you asked for from the reference images.

These two visuals are ready to drop directly into your ThinkFirst V2 UI as the output panels.



**Part 4 — Execution steps (do in this exact order)**

## **10-Step Build Plan**

**0 - Pick the flagship demo idea**

One vague startup idea you will run end-to-end. Must be something you actually know about — so your "founder answers" in the interview are authentic. Suggested: the AI Hackathon Platform (real, vague, meaningful). Write it in one sentence before doing anything else.

**1 - Lock the 3 JSON schemas**

Write out all required fields for Assumption Map, Eval Scorecard, and Decision Brief in a plain text doc. Define allowed values (evidence_status enum, decision enum, score range). Add the calibration rule explicitly. Do not touch code until this is done.

**2 - Write and test Pass 1 — Extraction prompt**

Input: full conversation transcript. Output: Assumption Map JSON array. Rule: extract only what the user actually said — never infer. If evidence is missing, set evidence_status = "missing" and gap_flag = true. Test this prompt alone in Claude API (not in the app yet) on your flagship idea transcript. Fix reasoning bugs here first.

**extraction_v1.txt, API only first**

**3 - Write and test Pass 2 — Scoring prompt**

Input: Assumption Map JSON. Output: Eval Scorecard JSON. Uses your existing 5 eval dimensions. Each dimension outputs: score (1–5), reason, failure_mode if weak, improvement_tip. Test in isolation on the Assumption Map output from Step 2.

**scoring_v1.txt**

**4 - Write and test Pass 3 — Decision Brief prompt**

Input: Assumption Map + Scorecard. Output: Decision Brief JSON with all 11 mandatory fields. Apply the calibration rule before calling the LLM — check the Assumption Map for missing-evidence count. If ≥2 critical gaps, set decision to "Investigate" or "Park" before the LLM even runs. Test on flagship idea data.

**decision_v1.txt1 hrcalibration rule is pre-LLM**

**5 - Wire the backend sequence**

Keep all existing chat logic unchanged. Add a "Generate Analysis" button that triggers the 3-pass chain after the interview ends. Add run logging: for each pass, log model name, model version, prompt version (v1), timestamp, and pass type. Show progressive loading states between passes.

**3–4 hrslog every passexisting chat = untouched**

**6 - Build the output UI**

Recommended: keep the existing chat view on the left. Add a slide-in or tabbed panel on the right (or below on mobile) that shows the Decision Brief as the primary view, with tabs for Assumption Map and Eval Scorecard. The Decision badge (Proceed / Investigate / Park / Revise) should be the first thing visible, large and clear. This is simpler and faster than a full 3-panel redesign, but equally demonstrable in a Loom.

**Decision badge = hero element**

**7 - Run end-to-end on flagship + 2–3 golden ideas**

Run the full flow on your flagship idea plus 2–3 from your 8 archetypes golden dataset. Capture: chat transcript, assumption map, scorecard, decision brief, decision distribution, missing evidence rate, confirmed evidence rate, V1 vs V2 output completeness comparison on the same flagship idea. Fix reasoning bugs before proceeding.

**2–3 hrsmetric definitions pre-locked in Step 1**

**8 - Capture before / after proof screenshots**

Screenshot 1: V1 — the same flagship idea ending with just an idea recap. Screenshot 2: V2 — the same idea producing the 3-pass Decision Brief with Investigate/Proceed badge. These two screenshots are your strongest visual evidence and the core of your case study hero section.

**9 - Package proof-of-work assets**

Case study page (primary — include architecture decisions and tradeoffs, failure modes, quantitative results). GitHub README section. 2–3 min Loom walkthrough. One-page outreach memo base template. 



---

Part 5 **What V2 must produce (definition of done)**

## **V2 Deliverables Checklist**

**1 - Product outputs**

**Live app with 3-pass analysis pipeline**

Chat → Extract → Score → Decision Brief, all wired end-to-end

**Structured Decision Brief with 11 required fields**

Proceed / Investigate / Park / Revise with calibration rule enforced

**Run logging per analysis session**

Model name, version, prompt version, timestamp — all 3 passes

**2 - Proof outputs**

**V1 vs V2 before/after screenshots (same flagship idea)**

Idea recap vs full Decision Brief — strongest visual in case study

**Quantitative results from 4+ runs**

Output completeness %, missing evidence rate %, decision distribution

**Reproducibility log**

All runs documented with model/prompt version/timestamp

**3 - Outreach outputs**

**Case study page with architecture decisions + tradeoffs**

Multi-pass vs single-pass, strict JSON rationale, failure modes, calibration logic

**GitHub README section**

Technical overview of eval pipeline with schema definitions

**2–3 min Loom walkthrough**

One idea → full V2 flow → Decision Brief, narrated with rationale

**Outreach memo base + 3 tailored variants**

Arize AI · Decagon · Hume AI — each with product-specific framing



