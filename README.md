# ThinkFirst

*Think it through. Then build it right.*

ThinkFirst is a conversational AI buddy that intercepts the "about to build" moment. When a builder has an idea and is about to open a build tool, ThinkFirst asks one sharp, grounded question at a time — helping them think clearly about whether the problem is real before they write a single line of code.

At the end of the conversation (~3 minutes, up to 12 turns), the builder receives a clean, copy-pasteable output brief they can take to Claude, Cursor, Lovable — wherever they build.

---

## How It Works

### Phase 1 — Discovery Conversation

The AI walks the builder through 5 dimensions in order, asking one question at a time and scoring each answer:

| Dimension | What it checks |
|---|---|
| **User Specificity** | Can the builder name one real, specific person with this problem? |
| **Problem Reality** | Has the builder actually seen this problem happen — not just imagined it? |
| **Frequency & Urgency** | How often does it hit them, and what does it actually cost? |
| **Workaround Check** | What are they already doing about it, and where does that break? |
| **Technical Feasibility** | What would actually need to work for this to land? |

Each answer is scored `weak / ok / strong`. The session ends when all dimensions have been explored or the 12-turn hard cap is reached.

### Phase 2 — Output Generation

Once the discovery is complete, the backend generates a 4-section brief:

- **Problem Statement** — who has the problem, what it is, why it matters now
- **Target User** — specific, not a category
- **Why This Problem Matters** — frequency, cost, consequence
- **What To Do Next** — 4 concrete actions

An optional deeper analysis pass (`/api/analyze`) runs a 3-step pipeline — assumption mapping, evidence scoring, and a calibration decision (`PROCEED / INVESTIGATE / PARK`) — based on the full conversation transcript.

---

## Folder Structure

```
thinkfirst/
└── v1/
    ├── Design/              Brand style and visual assets
    ├── Spec plan/           Product brief, behavior spec, prompt policy, core loop docs, eval dataset
    ├── Knowledge base/      Research wiki (conversational AI UX, motivational interviewing, prompt engineering, etc.)
    └── Prototype/           Runnable Node.js prototype (backend complete, frontend in progress)
        ├── backend/
        │   ├── server.js         Express API server
        │   ├── orchestrator.js   Core conversation loop and output trigger logic
        │   ├── session.js        In-memory session store
        │   ├── analyzer.js       3-pass post-interview analysis pipeline
        │   ├── gemini.js         Gemini API client (conversation + output + analysis passes)
        │   └── prompts/
        │       ├── conversation.js   System prompt + dimension rubrics for discovery turns
        │       └── output.js         System prompt for brief generation
        ├── frontend/
        │   └── index.html        Chat UI (in progress)
        ├── .env.example
        ├── package.json
        └── TODO.md
```

---

## Running the Prototype

### Prerequisites

- Node.js 18+
- A [Google AI Studio](https://aistudio.google.com/) API key (Gemini)

### Setup

```bash
cd v1/Prototype
npm install
cp .env.example .env
# Edit .env and add your GEMINI_API_KEY
```

### Environment Variables

| Variable | Description | Default |
|---|---|---|
| `GEMINI_API_KEY` | Google Gemini API key (required) | — |
| `GEMINI_MODEL` | Gemini model to use | `gemini-2.5-flash` |
| `PORT` | Port the server listens on | `3000` |

### Start

```bash
# Production
npm start

# Development (auto-restarts on file changes)
npm run dev
```

The server runs at `http://localhost:3000`.

---

## API Reference

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/session` | Create a new session. Returns `{ session_id, message }` — the opening message to display. |
| `POST` | `/api/chat` | Send a user message. Body: `{ session_id, message }`. Returns `{ message, output_ready, brief }`. |
| `GET` | `/api/session/:id` | Inspect full session state (dimensions, turn count, mode). Useful for debugging. |
| `POST` | `/api/analyze` | Run the 3-pass deep analysis on a completed session. Body: `{ session_id }`. Returns `{ v2_analysis }`. |

When `output_ready: true` is returned from `/api/chat`, the `brief` field contains the 4-section output object. The session is locked — no further messages are accepted.

---

## Prototype
Check here: https://thinkfirst-xi.vercel.app/ 
