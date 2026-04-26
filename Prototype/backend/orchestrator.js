'use strict';

const { getSession, saveSession, DIMENSIONS } = require('./session');
const { callConversation, callOutputGeneration } = require('./gemini');
const { buildConversationPrompt } = require('./prompts/conversation');
const { OUTPUT_PROMPT, buildOutputContext } = require('./prompts/output');

const STATUS_ORDER = { weak: 0, ok: 1, strong: 2 };

const OPENING_MESSAGE = `Got an idea?

Before you build it — let's think it through for a minute.

Takes ~3 minutes.

What are you thinking about?`;

/**
 * Merges incoming dimension scores into existing state.
 * Enforces the consistency rule: scores can only go forward unless
 * there is new contradicting evidence (non-null evidence on a downgrade).
 */
function mergeDimensionState(existing, incoming) {
  const merged = {};
  for (const dim of DIMENSIONS) {
    const curr = existing[dim];
    const next = incoming[dim];

    if (!next) {
      merged[dim] = curr;
      continue;
    }

    const currRank = STATUS_ORDER[curr.status] ?? 0;
    const nextRank = STATUS_ORDER[next.status] ?? 0;

    if (nextRank >= currRank) {
      merged[dim] = next;
    } else {
      // Only allow downgrade if the model provided contradicting evidence
      merged[dim] = next.evidence ? next : curr;
    }
  }
  return merged;
}

/**
 * Backend trigger check — authoritative. Model's next_action is advisory;
 * this is the source of truth for switching to output mode.
 */
function shouldTriggerOutput(session, modelNextAction) {
  if (modelNextAction === 'trigger_output') return true;
  if (session.turn_count >= 12) return true;

  const states = Object.values(session.dimension_state);
  const strongCount = states.filter(d => d.status === 'strong').length;
  const weakCount = states.filter(d => d.status === 'weak').length;

  return strongCount >= 2 && weakCount <= 1 && session.turn_count >= 6;
}

/**
 * Returns the next dimension to explore, or keeps current if not moving on.
 */
function resolveNextDimension(currentDimension, nextAction, incomingDimension) {
  if (nextAction === 'move_on' || nextAction === 'trigger_output') {
    const idx = DIMENSIONS.indexOf(currentDimension);
    const next = DIMENSIONS[idx + 1];
    return next || currentDimension; // stay on last if no next
  }
  return incomingDimension || currentDimension;
}

/**
 * Main entry point. Called once per user message.
 * Returns { message, output_ready, brief? }
 */
async function processMessage(sessionId, userMessage) {
  const session = getSession(sessionId);
  if (!session) throw new Error(`Session not found: ${sessionId}`);

  // Add user message to history
  session.message_history.push({ role: 'user', text: userMessage });
  session.turn_count += 1;

  // Store the raw idea from the first user message
  if (session.turn_count === 1) {
    session.raw_idea = userMessage;
  }

  // History to pass to Gemini = everything except the message we just added
  const historyBeforeCurrent = session.message_history.slice(0, -1);

  // Build system prompt with current authoritative state injected
  const systemPrompt = buildConversationPrompt(session);

  // Call Gemini — retry once on JSON parse failure
  let geminiResponse;
  try {
    geminiResponse = await callConversation(systemPrompt, historyBeforeCurrent, userMessage);
  } catch (err) {
    console.warn('Gemini call failed, retrying once:', err.message);
    geminiResponse = await callConversation(systemPrompt, historyBeforeCurrent, userMessage);
  }

  // Validate required fields
  const { message, dimensions, next_action, strike_count, current_dimension } = geminiResponse;
  if (!message || !dimensions || !next_action) {
    throw new Error('Gemini response missing required fields');
  }

  // Update session state
  session.dimension_state = mergeDimensionState(session.dimension_state, dimensions);

  const prevDimension = session.current_dimension;
  session.current_dimension = resolveNextDimension(prevDimension, next_action, current_dimension);

  // Reset strike count when moving to a new dimension
  if (session.current_dimension !== prevDimension) {
    session.strike_count = 0;
  } else {
    session.strike_count = typeof strike_count === 'number' ? strike_count : session.strike_count;
  }

  // Add assistant message to history (the visible message only)
  session.message_history.push({ role: 'assistant', text: message });

  // Check output trigger
  const triggerOutput = shouldTriggerOutput(session, next_action);

  if (triggerOutput && session.mode === 'discovery') {
    session.mode = 'output';
    saveSession(session);

    const contextString = buildOutputContext(session);
    const brief = await callOutputGeneration(OUTPUT_PROMPT, contextString);

    return { message, output_ready: true, brief };
  }

  saveSession(session);
  return { message, output_ready: false, brief: null };
}

module.exports = { processMessage, OPENING_MESSAGE };
