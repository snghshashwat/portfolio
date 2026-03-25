# Shashwat Terminal Portfolio

Dark terminal-themed personal portfolio with animated sections, project case studies, and a live LLM-powered chatbot.

## Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- OpenRouter Chat Completions API (free model compatible)

## Implemented Sections

- Terminal-style landing page
- Animated card sections (fade + revolve on scroll)
- Projects section with dynamic case-study pages
- Skills, interests, and contact sections
- Ask ShashBot live chatbot

## Featured Projects

- Thyrft
- LedgerIQ
- Auditra
- Duelingo

## Interaction and Motion

- Scroll-based card reveal and revolve transforms
- Terminal-style visual system and interactions
- Live question-answer chatbot UI

## Chatbot Setup (Free LLM)

Create an environment file at the project root:

```bash
OPENROUTER_API_KEY=your_openrouter_key
OPENROUTER_MODEL=meta-llama/llama-3.1-8b-instruct:free
```

- `OPENROUTER_API_KEY` is required for live responses.
- `OPENROUTER_MODEL` is optional; the value above is the default free model.

## Run Locally

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm run dev
```

3. Build production bundle:

```bash
npm run build
```

4. Run lint:

```bash
npm run lint
```

## Key Paths

- Main landing page: app/page.tsx
- Case study route: app/projects/[slug]/page.tsx
- Project content model: lib/projects.ts
- Portfolio components: components/
