'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { createAndSaveSession, getSession } = require('./session');
const { processMessage, OPENING_MESSAGE } = require('./orchestrator');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// Create a new session and return the opening message
app.post('/api/session', (req, res) => {
  const session = createAndSaveSession();
  res.json({
    session_id: session.session_id,
    message: OPENING_MESSAGE,
  });
});

// Get current session state (for debugging / state inspection)
app.get('/api/session/:id', (req, res) => {
  const session = getSession(req.params.id);
  if (!session) return res.status(404).json({ error: 'Session not found' });
  res.json(session);
});

// Process a user message
app.post('/api/chat', async (req, res) => {
  const { session_id, message } = req.body;

  if (!session_id || !message) {
    return res.status(400).json({ error: 'session_id and message are required' });
  }

  const session = getSession(session_id);
  if (!session) {
    return res.status(404).json({ error: 'Session not found' });
  }

  if (session.mode === 'output') {
    return res.status(400).json({ error: 'Session is complete. Start a new session.' });
  }

  try {
    const result = await processMessage(session_id, message);
    res.json(result);
  } catch (err) {
    console.error('processMessage error:', err);
    res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
});

app.listen(PORT, () => {
  console.log(`ThinkFirst running at http://localhost:${PORT}`);
});
