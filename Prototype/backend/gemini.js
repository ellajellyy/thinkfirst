'use strict';

require('dotenv').config();
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

module.exports = { callConversation, callOutputGeneration };
