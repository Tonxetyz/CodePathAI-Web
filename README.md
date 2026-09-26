# CodePath AI — Web

**Learn to code hand-in-hand with AI — one progress bar, on every device.**

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?logo=next.js&logoColor=white" alt="Next.js 16" />
  <img src="https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS 4" />
  <img src="https://img.shields.io/badge/State-React_Hooks-61DAFB?logo=react&logoColor=white" alt="State: React Hooks" />
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="MIT License" />
</p>

<p align="center">
  <a href="#hero">Live Demo</a> ·
  <a href="#key-features">Features</a> ·
  <a href="#getting-started">Quick Start</a> ·
  <a href="#project-structure">Architecture</a>
</p>

---

<a id="hero"></a>
<div align="center">
  <img src=".github/hero.png" alt="CodePath AI Web — product demo" width="820" />
</div>

---

## Key Features

- **Animated WebGL hero background** — a hand-written GLSL fragment shader (`Velaris`) renders a live simplex-noise flow field with vignette and film grain, capped to a 1.75x device-pixel ratio for performance and paused automatically when `prefers-reduced-motion` is set.
- **Interactive learning dashboard** — the About screen shows a live progress ring, a 7-day activity chart, and a lesson roadmap with done/available/locked states, all revealed with staggered Framer Motion entrance animations.
- **Full auth flow, demo-ready** — a tabbed signup/login card with an animated sliding pill, a real-time 4-rule password-strength meter, and a 6-digit OTP input that supports paste-to-fill and auto-advances focus per digit.
- **Usage-based pricing UI** — a monthly/annual toggle (Radix `Switch`) animates prices with `@number-flow/react` and fires a `canvas-confetti` burst when switching to the discounted annual plan.
- **Cross-platform download hub** — desktop (Windows/macOS/Linux) and mobile (iOS/Android) targets side by side, plus a live QR code that deep-links straight to the mobile install page.
- **Global toast system** — a lightweight React Context (`ToastProvider`) drives success/info notifications from any screen without prop drilling.

> All data (auth session, plan selection) is demo-only and persisted to `localStorage` on the client — there is no backend in this repo.

---

## Tech Stack

| Technology | Used for |
|---|---|
| Next.js 16 (App Router) | Routing, layout, React framework |
| React 19 | UI rendering |
| TypeScript | Static typing |
| Tailwind CSS 4 | Utility-first styling |
| Radix UI (`Label`, `Slot`, `Switch`) | Accessible unstyled primitives |
| Framer Motion | Page transitions and micro-animations |
| React Context + Hooks | State management (session, toasts) — no external store |
| lucide-react | Icon set |
| canvas-confetti | Celebration effect on the pricing screen |
| @number-flow/react | Animated number transitions |
| class-variance-authority / clsx / tailwind-merge | className composition |
| ESLint (`eslint-config-next`) | Linting |

---

## Getting Started

```bash
git clone https://github.com/Tonxetyz/CodePathAI-Web.git
cd CodePathAI-Web
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

No environment variables are required — the project ships with no backend calls or API keys.

---

## Project Structure

```text
src/
├── app/                        # Next.js App Router: root layout and single page entry
├── components/
│   ├── SegmentedNav.tsx         # top segmented tab navigation between screens
│   ├── SessionProvider.tsx      # demo auth session, persisted to localStorage
│   ├── ToastProvider.tsx        # global toast notification context
│   ├── screens/                 # the four app screens (About, Auth, Pricing, Download)
│   └── ui/                      # reusable UI primitives (button, switch, pricing, auth card, mascot, shader background)
└── lib/                         # shared types and utilities (screen ids, cn() helper)
```

---

## License

MIT — see [LICENSE](./LICENSE).
