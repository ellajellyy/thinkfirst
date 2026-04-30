'use strict';

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash-preview-04-17';

/**
 * Converts internal message history to Gemini's expected format.
 * Gemini requires strictly alternating user/model roles starting with user.
 */
function toGeminiHistory(messageHistory) {
  return messageHistory.map(m => ({
    role: m.role === 'user' ? 'user' : 'model',
    parts: [{ text: m.text }],
  }));
}

/**
 * Calls Gemini for a conversation turn. Returns parsed JSON.
 * Throws on API error or unparseable response.
 *
 * @param {string} systemPrompt - Full system prompt with injected state
 * @param {Array}  historyBeforeCurrent - All turns EXCEPT the current user message
 * @param {string} userMessage - The current user message
 */
async function callConversation(systemPrompt, historyBeforeCurrent, userMessage) {
  const model = genAI.getGenerativeModel({
    model: MODEL,
    systemInstruction: systemPrompt,
    generationConfig: {
      responseMimeType: 'application/json',
      temperature: 0.7,
    },
  });

  const chat = model.startChat({
    history: toGeminiHistory(historyBeforeCurrent),
  });

  const result = await chat.sendMessage(userMessage);
  const raw = result.response.text();

  try {
    return JSON.parse(raw);
  } catch {
    throw new Error(`Gemini returned unparseable JSON: ${raw.slice(0, 200)}`);
  }
}

/**
 * Calls Gemini to generate the output brief. Returns parsed JSON object.
 *
 * @param {string} systemPrompt - Output generation system prompt
 * @param {string} contextString - Formatted session context (idea + dimensions + history)
 */
async function callOutputGeneration(systemPrompt, contextString) {
  const model = genAI.getGenerativeModel({
    model: MODEL,
    systemInstruction: systemPrompt,
    generationConfig: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: 'object',
        properties: {
          problem: { type: 'string' },
          user:    { type: 'string' },
          matters: { type: 'string' },
          next:    { type: 'string' },
        },
        required: ['problem', 'user', 'matters', 'next'],
      },
      temperature: 0.4,
    },
  });

  const result = await model.generateContent(contextString);
  const raw = result.response.text();
  try {
    return JSON.parse(raw);
  } catch {
    throw new Error(`Output generation returned unparseable JSON: ${raw.slice(0, 200)}`);
  }
}

// ── V2 Analysis Pipeline ──────────────────────────────────────────────────────

const promptCache = {};
function loadPrompt(filename) {
  if (!promptCache[filename]) {
    promptCache[filename] = fs.readFileSync(
      path.join(__dirname, '../../../v2/prompts', filename),
      'utf8'
    );
  }
  return promptCache[filename];
}

function getUsage(result) {
  const u = result.response.usageMetadata || {};
  return { input_tokens: u.promptTokenCount || 0, output_tokens: u.candidatesTokenCount || 0 };
}

/**
 * Pass 1: Extract assumptions from the interview transcript.
 * @param {object} session - Full session object (message_history, raw_idea, dimension_state)
 * @returns {{ data: Array, meta: object }}
 */
async function callPass1(session) {
  const model = genAI.getGenerativeModel({
    model: MODEL,
    systemInstruction: loadPrompt('extraction_v1.txt'),
    generationConfig: { responseMimeType: 'application/json', temperature: 0.0 },
  });

  const transcript = session.message_history
    .map(m => `${m.role === 'user' ? 'Builder' : 'ThinkFirst'}: ${m.text}`)
    .join('\n\n');

  const userInput = `Session ID: ${session.session_id}
Raw Idea: "${session.raw_idea}"

Dimensions:
${JSON.stringify(session.dimension_state, null, 2)}

Full Conversation Transcript:
${transcript}`;

  const result = await model.generateContent(userInput);
  const raw = result.response.text();

  let parsed;
  try { parsed = JSON.parse(raw); } catch {
    throw new Error(`Pass 1 returned unparseable JSON: ${raw.slice(0, 300)}`);
  }

  const data = Array.isArray(parsed) ? parsed
    : Array.isArray(parsed.assumption_map) ? parsed.assumption_map
    : Array.isArray(parsed.assumptions)    ? parsed.assumptions
    : (() => { throw new Error('Pass 1: unexpected response shape'); })();

  return {
    data,
    meta: { pass: 1, model_name: MODEL, model_version: '001', prompt_version: 'v1',
            timestamp: new Date().toISOString(), ...getUsage(result) },
  };
}

/**
 * Pass 2: Score the assumption map on 5 radar axes.
 * @param {Array} assumptionMap - Output of Pass 1
 * @returns {{ data: Array, meta: object }}
 */
async function callPass2(assumptionMap) {
  const model = genAI.getGenerativeModel({
    model: MODEL,
    systemInstruction: loadPrompt('scoring_v1.txt'),
    generationConfig: { responseMimeType: 'application/json', temperature: 0.0 },
  });

  const userInput = `## Assumption Map\n\n${JSON.stringify(assumptionMap, null, 2)}`;

  const result = await model.generateContent(userInput);
  const raw = result.response.text();

  let parsed;
  try { parsed = JSON.parse(raw); } catch {
    throw new Error(`Pass 2 returned unparseable JSON: ${raw.slice(0, 300)}`);
  }

  const data = Array.isArray(parsed) ? parsed
    : Array.isArray(parsed.eval_scorecard) ? parsed.eval_scorecard
    : Array.isArray(parsed.scorecard)      ? parsed.scorecard
    : (() => { throw new Error('Pass 2: unexpected response shape'); })();

  if (data.length !== 5) throw new Error(`Pass 2: expected 5 scorecard items, got ${data.length}`);

  return {
    data,
    meta: { pass: 2, model_name: MODEL, model_version: '001', prompt_version: 'v1',
            timestamp: new Date().toISOString(), ...getUsage(result) },
  };
}

/**
 * Pass 3: Write the Decision Brief using pre-computed calibration.
 * @param {Array}  assumptionMap - Output of Pass 1
 * @param {Array}  scorecard     - Output of Pass 2
 * @param {object} calibration   - { calibration_decision, proceed_blocked, rule_applied }
 * @returns {{ data: object, meta: object }}
 */
async function callPass3(assumptionMap, scorecard, calibration) {
  const model = genAI.getGenerativeModel({
    model: MODEL,
    systemInstruction: loadPrompt('decision_v1.txt'),
    generationConfig: { responseMimeType: 'application/json', temperature: 0.0 },
  });

  const userInput = `## Calibration (Pre-computed by backend — do not override)
calibration_decision: "${calibration.calibration_decision}"
calibration_reason: "${calibration.rule_applied}"
proceed_blocked: ${calibration.proceed_blocked}

## Assumption Map

${JSON.stringify(assumptionMap, null, 2)}

## Eval Scorecard

${JSON.stringify(scorecard, null, 2)}`;

  const result = await model.generateContent(userInput);
  const raw = result.response.text();

  let parsed;
  try { parsed = JSON.parse(raw); } catch {
    throw new Error(`Pass 3 returned unparseable JSON: ${raw.slice(0, 300)}`);
  }

  const data = parsed.decision_brief || parsed;
  const required = ['one_sentence_idea', 'target_user', 'pain_chain', 'riskiest_assumption', 'decision'];
  for (const f of required) {
    if (!data[f]) throw new Error(`Pass 3: missing required field "${f}"`);
  }

  return {
    data,
    meta: { pass: 3, model_name: MODEL, model_version: '001', prompt_version: 'v1',
            timestamp: new Date().toISOString(), ...getUsage(result) },
  };
}

module.exports = { callConversation, callOutputGeneration, callPass1, callPass2, callPass3 };
