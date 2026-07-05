# shashwat.dev — portfolio

A quiet, editorial portfolio built with Next.js 16, Tailwind v4, and Motion.

## Stack
- **Next.js 16** (App Router, React 19)
- **Tailwind CSS v4** (config-less, using `@theme`)
- **Motion** for scroll-triggered reveals & hero staggered text
- **Geist** (Sans + Mono) + **Instrument Serif** — via `next/font`

## Structure
```
src/
├── app/                    # App Router entry, metadata, favicon, OG
│   ├── layout.tsx          # fonts, shell, cursor spotlight
│   ├── page.tsx            # composes the six sections
│   ├── globals.css         # design tokens + primitives
│   ├── icon.tsx            # dynamic favicon (next/og)
│   ├── opengraph-image.tsx # 1200x630 social card
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── layout/             # top-nav, footer, cursor spotlight
│   ├── sections/           # hero · about · experience · projects · skills · contact
│   └── ui/                 # reveal, section-header, local-time
└── lib/
    ├── data.ts             # single source of truth for content
    └── utils.ts            # cn() helper
```

Everything a visitor reads lives in `src/lib/data.ts`. To edit copy, roles, or
projects, only touch that file.

## Local dev
```bash
npm install
npm run dev
```
Open http://localhost:3000.

## Add your résumé
Drop `resume.pdf` into `public/` and it's linked from the hero automatically.

## Deploy
Push to GitHub, then import to Vercel. Zero config needed.

```bash
git remote add origin git@github.com:snghshashwat/portfolio.git
git push -u origin main
```

## Design decisions
- **Editorial monospace** — Geist Mono for meta / labels, Geist Sans for body,
  Instrument Serif italic as the single accent voice. Cream `#e8d5b7` accent,
  near-black background.
- **Motion budget** — scroll-triggered reveals, hero word stagger, cursor
  spotlight, availability pulse. Everything else stays still. All animation
  respects `prefers-reduced-motion`.
- **One source of truth** — content lives in `src/lib/data.ts`, styling tokens
  in `globals.css`. No content trapped in JSX.
