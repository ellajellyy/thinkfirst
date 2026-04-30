/**
 * Step 5a — Isolation test for the V2 3-pass pipeline.
 *
 * Run from the thinkfirst/v2/ directory:
 *   node test_pipeline.js
 *
 * Or from the project root:
 *   node "thinkfirst/v2/test_pipeline.js"
 *
 * Requires GEMINI_API_KEY in a .env file at thinkfirst/v1/Prototype/.env
 * (the same .env the backend uses).
 */

'use strict';

// Load .env from the Prototype directory
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../v1/Prototype/.env') });

const { callPass1, callPass2, callPass3 } = require('../v1/Prototype/backend/gemini');

// ── Sample session (flagship demo idea from thinkfirst_v2_flagship_example.json) ──

const SAMPLE_SESSION = {
  session_id: 'test-pipeline-001',
  raw_idea: 'AI agents lose project context after a task or session ends, so long-running work becomes fragmented across tools.',
  dimension_state: {
    user_specificity:   { status: 'weak',   justification: 'Mentioned builders/operators broadly', evidence: 'solo builders using multiple AI tools' },
    problem_reality:    { status: 'ok',     justification: 'Context loss described concretely',   evidence: 'agents forget prior work, users re-explain each session' },
    frequency_urgency:  { status: 'weak',   justification: 'No specific frequency stated',        evidence: null },
    workaround_check:   { status: 'weak',   justification: 'Manual copy-paste mentioned vaguely', evidence: 'copy-pasting context into every new chat window' },
  },
  message_history: [
    { role: 'user',      text: 'AI agents lose project context after a task or session ends, so long-running work becomes fragmented across tools.' },
    { role: 'assistant', text: "Got an idea? Before you build it — let's think it through. Who's this really for? Tell me about the person who runs into this most." },
    { role: 'user',      text: 'Solo builders and small teams who use Claude, GPT, and Cursor together on the same long-running project.' },
    { role: 'assistant', text: "What's the hardest part of their situation — the thing that quietly frustrates them day to day?" },
    { role: 'user',      text: "Every time a new agent session starts, they have to re-explain the whole project. It's like the agent has amnesia. They lose hours just restoring context." },
    { role: 'assistant', text: 'Why does that matter right now, not in a year?' },
    { role: 'user',      text: 'Because people are building bigger and bigger things with AI agents right now. The problem gets worse the more complex the project. No one has solved cross-tool memory yet.' },
    { role: 'assistant', text: 'Have you talked to anyone who has this problem specifically? Any examples of when it caused a real failure?' },
    { role: 'user',      text: 'Not yet. But I experience it myself constantly. And I see people complaining in Discord servers about losing context mid-sprint.' },
    { role: 'assistant', text: 'What would users have to trust for this to work — and why would they trust it?' },
    { role: 'user',      text: "They'd need to trust that the memory layer is secure and doesn't leak across projects. I haven't figured out the permission model yet." },
    { role: 'assistant', text: "Got it — that's everything I need. Give me a moment." },
  ],
};

function computeCalibration(scorecard) {
  const anyScore1     = scorecard.some(d => d.score === 1);
  const evidenceDim   = scorecard.find(d => d.dimension_name === 'Evidence');
  const evidenceScore = evidenceDim ? evidenceDim.score : 5;
  const allGte3       = scorecard.every(d => d.score >= 3);
  const painDim       = scorecard.find(d => d.dimension_name === 'Pain');
  const painScore     = painDim ? painDim.score : 0;

  if (anyScore1 || evidenceScore <= 2) {
    return { calibration_decision: 'PARK', proceed_blocked: true, rule_applied: 'any_axis_1_or_evidence_lte_2' };
  }
  if (allGte3 && painScore >= 4) {
    return { calibration_decision: 'PROCEED TO PROTOTYPE', proceed_blocked: false, rule_applied: 'all_axes_gte_3_and_pain_gte_4' };
  }
  return { calibration_decision: 'INVESTIGATE', proceed_blocked: true, rule_applied: 'mixed_evidence' };
}

function check(label, condition, detail = '') {
  if (condition) {
    console.log(`  ✓  ${label}`);
  } else {
    console.error(`  ✗  ${label}${detail ? ': ' + detail : ''}`);
    process.exitCode = 1;
  }
}

async function run() {
  console.log('\n── ThinkFirst V2 Pipeline Isolation Test ──────────────────────────\n');

  // ── Pass 1 ──────────────────────────────────────────────────────────────────
  console.log('Pass 1 — Extracting assumptions...');
  let assumptionMap;
  try {
    const result = await callPass1(SAMPLE_SESSION);
    assumptionMap = result.data;
    console.log(`  model: ${result.meta.model_name}  |  tokens in/out: ${result.meta.input_tokens}/${result.meta.output_tokens}`);
    check('Returns an array',        Array.isArray(assumptionMap));
    check('Has 4–8 assumptions',     assumptionMap.length >= 4 && assumptionMap.length <= 8, `got ${assumptionMap.length}`);
    check('Each has id field',       assumptionMap.every(a => a.id));
    check('Each has label field',    assumptionMap.every(a => a.label));
    check('Each has evidence_score', assumptionMap.every(a => typeof a.evidence_score === 'number'));
    check('Each has importance_score', assumptionMap.every(a => typeof a.importance_score === 'number'));
    check('Each has quadrant field', assumptionMap.every(a => a.quadrant));
    console.log(`  Sample: [${assumptionMap[0]?.id}] ${assumptionMap[0]?.label?.slice(0, 60)}...\n`);
  } catch (err) {
    console.error('  FAILED:', err.message);
    process.exitCode = 1;
    return;
  }

  // ── Pass 2 ──────────────────────────────────────────────────────────────────
  console.log('Pass 2 — Scoring on 5 dimensions...');
  let evalScorecard;
  try {
    const result = await callPass2(assumptionMap);
    evalScorecard = result.data;
    console.log(`  model: ${result.meta.model_name}  |  tokens in/out: ${result.meta.input_tokens}/${result.meta.output_tokens}`);
    const names = evalScorecard.map(d => d.dimension_name);
    check('Exactly 5 items',           evalScorecard.length === 5, `got ${evalScorecard.length}`);
    check('Has Pain dimension',        names.includes('Pain'));
    check('Has User dimension',        names.includes('User'));
    check('Has Technical dimension',   names.includes('Technical'));
    check('Has Competitive dimension', names.includes('Competitive'));
    check('Has Evidence dimension',    names.includes('Evidence'));
    check('All scores 1–5',            evalScorecard.every(d => d.score >= 1 && d.score <= 5));
    check('All have failure_mode',     evalScorecard.filter(d => d.score <= 3).every(d => d.failure_mode));
    check('All have improvement_tip',  evalScorecard.every(d => d.improvement_tip));
    evalScorecard.forEach(d => console.log(`    ${d.dimension_name}: ${d.score}/5`));
    console.log('');
  } catch (err) {
    console.error('  FAILED:', err.message);
    process.exitCode = 1;
    return;
  }

  // ── Calibration (hard gate) ──────────────────────────────────────────────────
  console.log('Calibration gate...');
  const calibration = computeCalibration(evalScorecard);
  console.log(`  decision: ${calibration.calibration_decision}  |  blocked: ${calibration.proceed_blocked}  |  rule: ${calibration.rule_applied}`);
  const evidenceScore = evalScorecard.find(d => d.dimension_name === 'Evidence')?.score;
  if (evidenceScore <= 2 || evalScorecard.some(d => d.score === 1)) {
    check('Blocked correctly when evidence weak', calibration.proceed_blocked === true);
  }
  console.log('');

  // ── Pass 3 ──────────────────────────────────────────────────────────────────
  console.log('Pass 3 — Writing decision brief...');
  let decisionBrief;
  try {
    const result = await callPass3(assumptionMap, evalScorecard, calibration);
    decisionBrief = result.data;
    console.log(`  model: ${result.meta.model_name}  |  tokens in/out: ${result.meta.input_tokens}/${result.meta.output_tokens}`);
    const required = [
      'one_sentence_idea', 'target_user', 'pain_chain', 'current_workaround',
      'riskiest_assumption', 'evidence_needed', 'invalidation_threshold',
      'next_3_experiments', 'confidence_level', 'honest_gaps', 'decision',
    ];
    for (const f of required) {
      check(`Has "${f}"`, !!decisionBrief[f]);
    }
    check('next_3_experiments is array of 3', Array.isArray(decisionBrief.next_3_experiments) && decisionBrief.next_3_experiments.length === 3);
    check('honest_gaps is array',            Array.isArray(decisionBrief.honest_gaps));
    if (calibration.proceed_blocked) {
      check('Decision is not PROCEED when blocked', decisionBrief.decision !== 'PROCEED TO PROTOTYPE');
    }
    console.log(`  Decision: ${decisionBrief.decision}`);
    console.log(`  One-liner: ${decisionBrief.one_sentence_idea?.slice(0, 80)}...`);
    console.log('');
  } catch (err) {
    console.error('  FAILED:', err.message);
    process.exitCode = 1;
    return;
  }

  console.log('── Result ──────────────────────────────────────────────────────────');
  if (process.exitCode === 1) {
    console.error('Some checks FAILED. Fix prompts before wiring to backend.\n');
  } else {
    console.log('All checks passed. Prompts are ready for backend integration.\n');
  }
}

run().catch(err => {
  console.error('Unexpected error:', err);
  process.exit(1);
});
