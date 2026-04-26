# ThinkFirst Prototype — TODO

## Phase 1: Frontend UI (current sprint)

### [ ] 1. Create `frontend/index.html` — unified responsive file
Single HTML file that serves both mobile and desktop from the same codebase.

Responsive breakpoint: **< 768px = mobile**, **≥ 768px = desktop**

**Mobile layout (< 768px)**
- Full-screen, no phone shell
- Vertical starter chips (single column)
- Headline: 29px Source Serif 4, orb: 88px
- Chat: header pinned top, input pinned bottom, messages scroll in between
- Brief: 4 cards stacked vertically
- No TopNav — logo lives in the landing page nav bar

**Desktop layout (≥ 768px)**
- Full-width page, content maxWidth 680px centered
- Fixed blurred TopNav (logo + brand name, blurs on scroll)
- Multi-layer radial gradient background
- Starters in 2×2 grid
- Headline: 42px Source Serif 4, orb: 120px
- Brief: 4 cards in 2×2 grid
- Input area has blurred backdrop

**Shared across both**
- Brand tokens: `#7B8CFF` purple, `#FFB3C1` pink, `#FFD697` yellow, `#FAF9F6` bg
- Fonts: Inter + Source Serif 4 (Google Fonts)
- Orb SVG with radial gradient (soft/medium/vivid stops)
- All animations: orbFloat, orbPulse, fadeSlideUp, fadeIn, dotBounce, progressGlow
- Typing dots indicator
- Progress bar (gradient, glow animation)
- Remove TweaksPanel — prototype-only artifact

---

### [ ] 2. Wire up backend API

Replace the design's hardcoded question flow with real API calls.

**Session start**
- On page load: `POST /api/session` → receive `{ session_id, message }`
- Display the opening message as the first AI message

**Chat loop**
- User submits message → `POST /api/chat` with `{ session_id, message }`
- Show typing indicator while waiting
- Receive `{ message, output_ready, brief }`
- Display `message` as AI bubble
- If `output_ready: true` → transition to Brief screen

**Progress bar**
- Estimate: `turn_count / 12` (session has 12 turn hard cap)
- Fetch from `GET /api/session/:id` after each response, or track locally

**Brief screen**
- Display the 4 sections from the `brief` string returned by the API
- Parse into: Problem Statement / Target User / Why This Problem Matters / What To Do Next
- Copy-to-clipboard copies full brief text
- "Start over" resets session (create new session)

---

### [ ] 3. End-to-end test
- `npm install && npm run dev`
- Run through full Landing → Chat → Brief flow
- Test on mobile viewport (375px)
- Test on desktop viewport (1280px)
- Verify copy-to-clipboard works
- Verify "Start over" resets cleanly

---

## Phase 2: Polish (after Phase 1 passes)
- Error state: API failure message in chat
- Empty state: handle session not found gracefully
- Accessibility: keyboard navigation, focus management
- Safari/iOS input keyboard push-up fix

---

## Status
- [x] Backend architecture (session, orchestrator, gemini, server)
- [x] System prompts (conversation + output generation)
- [ ] Frontend UI
- [ ] API integration
- [ ] End-to-end test
