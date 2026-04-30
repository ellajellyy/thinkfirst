'use strict';

const { v4: uuidv4 } = require('uuid');

const DIMENSIONS = ['user_specificity', 'problem_reality', 'frequency_urgency', 'workaround_check'];

function emptyDimensionState() {
  return DIMENSIONS.reduce((acc, dim) => {
    acc[dim] = { status: 'weak', justification: 'Not yet explored', evidence: null };
    return acc;
  }, {});
}

function createSession() {
  return {
    session_id: uuidv4(),
    raw_idea: null,
    message_history: [],       // [{ role: 'user'|'assistant', text: string }]
    dimension_state: emptyDimensionState(),
    current_dimension: 'user_specificity',
    mode: 'discovery',         // 'discovery' | 'output'
    turn_count: 0,
    strike_count: 0,           // resets when current_dimension changes
    created_at: Date.now(),
    v2_analysis: null,         // populated by /api/analyze after interview
    run_log: [],               // [{ pass, model_name, prompt_version, timestamp, ... }]
  };
}

// In-memory store — keyed by session_id
const store = new Map();

function getSession(sessionId) {
  return store.get(sessionId) || null;
}

function saveSession(session) {
  store.set(session.session_id, session);
}

function createAndSaveSession() {
  const session = createSession();
  saveSession(session);
  return session;
}

module.exports = { createAndSaveSession, getSession, saveSession, DIMENSIONS };
