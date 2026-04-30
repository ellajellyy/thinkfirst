'use strict';

const { callPass1, callPass2, callPass3 } = require('./gemini');

/**
 * Hard-coded calibration gate (authoritative — not decided by LLM).
 * Source of truth: thinkfirst_v2_json_schemas.json (locked_draft)
 */
function computeCalibration(scorecard) {
  const anyScore1     = scorecard.some(d => d.score === 1);
  const evidenceDim   = scorecard.find(d => d.dimension_name === 'Evidence');
  const evidenceScore = evidenceDim ? evidenceDim.score : 5;
  const allGte3       = scorecard.every(d => d.score >= 3);
  const painDim       = scorecard.find(d => d.dimension_name === 'Pain');
  const painScore     = painDim ? painDim.score : 0;

  if (anyScore1 || evidenceScore <= 2) {
    // PARK is the conservative default; LLM may choose PIVOT if evidence
    // points to a different user/problem/wedge.
    return {
      calibration_decision: 'PARK',
      proceed_blocked: true,
      rule_applied: 'any_axis_1_or_evidence_lte_2',
    };
  }
  if (allGte3 && painScore >= 4) {
    return {
      calibration_decision: 'PROCEED TO PROTOTYPE',
      proceed_blocked: false,
      rule_applied: 'all_axes_gte_3_and_pain_gte_4',
    };
  }
  return {
    calibration_decision: 'INVESTIGATE',
    proceed_blocked: true,
    rule_applied: 'mixed_evidence',
  };
}

/**
 * Runs the full 3-pass analysis pipeline on a completed session.
 * Passes run sequentially; each feeds the next.
 *
 * @param {object} session - Full session object (must have mode === 'output')
 * @returns {{ assumptionMap, evalScorecard, decisionBrief, runLog }}
 */
async function analyzeTranscript(session) {
  const runLog = [];

  const pass1 = await callPass1(session);
  runLog.push(pass1.meta);
  const assumptionMap = pass1.data;

  const pass2 = await callPass2(assumptionMap);
  runLog.push(pass2.meta);
  const evalScorecard = pass2.data;

  const calibration = computeCalibration(evalScorecard);

  const pass3 = await callPass3(assumptionMap, evalScorecard, calibration);
  runLog.push(pass3.meta);
  const decisionBrief = pass3.data;

  decisionBrief.calibration = { ...(decisionBrief.calibration || {}), ...calibration };

  return { assumptionMap, evalScorecard, decisionBrief, runLog };
}

module.exports = { analyzeTranscript };
