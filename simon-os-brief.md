# Simon OS — Personal Site Build Brief

Hand this to Claude Code. Split it however you like: the **PART 1** block is meant to live in your repo as `CLAUDE.md`; **PART 2** is the build prompt.

---

## PART 1 — paste into `CLAUDE.md`

```md
## Design system — non-negotiable

Goal: a personal site that reads as hand-crafted, NOT AI-generated. A reviewer
(YC, recruiters) is judging whether I can build something with taste. Avoid the
"AI slop" look at all costs.

Typography
- Display: Bricolage Grotesque. Body: Geist (or Hanken Grotesk). Mono: Geist Mono.
- NEVER use Inter, Roboto, Open Sans, Arial, or system-ui.
- Use weight extremes (300 vs 800), and size jumps of 3x+, not timid 1.5x.

Color (CSS variables only, never hardcode hex in components)
- --desk #15233B  (dusk petrol-indigo, the desktop background)
- --window #F7F4ED (warm paper, window surfaces)
- --ink #1A1714    (text)
- --saffron #FFB02E (primary accent)
- --cerulean #2E6BFF (secondary accent)
- --muted #6B6457
- One dominant color + sharp accents. No evenly-distributed palette.
- FORBIDDEN: purple/blue gradients on white, cream+terracotta, black+acid-green.

Layout & motion
- 8px spacing rhythm. Hierarchy via type and space, not borders everywhere.
- No three-rounded-card hero. No centered-everything default.
- Motion lives in the window physics + ONE orchestrated page-load. Respect
  prefers-reduced-motion. Don't scatter micro-animations everywhere.
- Use shadcn/ui primitives as the base; customize them, never ship them raw.
  Icons: Phosphor or Heroicons, not default Lucide everywhere.

Process
- Before coding a screen, state the aesthetic direction in one line, then build.
- After any UI change: screenshot it, critique the screenshot specifically,
  fix, repeat. Do this loop at least twice per screen.
- Build to a quality floor silently: responsive to mobile, visible keyboard
  focus, reduced-motion honored.
```

---

## PART 2 — the build prompt

**Concept: "Simon OS."** A modern personal site styled as a desktop operating
system. Evolve the cozy windowed-desktop idea from sharyap.com into something
sleeker and more premium — a designer's desktop at dusk, not Windows 95.

### Stack
- Next.js (App Router) + TypeScript + Tailwind + shadcn/ui.
- Motion (the Framer Motion successor) for window physics and the page-load.
- Deploy target: Vercel.

### The signature: a real window manager
This is where all the boldness goes — keep everything else quiet and disciplined.
- A top **menubar** (mono font): "● Simon Mathias" on the left like an Apple menu;
  right side shows status items: "Toronto", a live clock, a sound toggle (●/◐),
  and a light/dark toggle.
- A **desktop** with a subtle dusk gradient (--desk), faint grain, no clutter.
- A **dock** (or desktop icons) for each app: `readme`, `work`, `projects`,
  `stage`, `leadership`, `contact`.
- Clicking an app **springs open a window** (Motion spring, slight scale+fade).
  Windows are **draggable**, focus on click (raise z-index + subtle shadow),
  closable, and multiple can be open at once. A window has a title bar with the
  app name and a close dot.
- ONE orchestrated page-load: menubar draws in, then the `readme` window opens
  itself with a staggered reveal of its contents. Everything else stays still.
- Don't overdo retro skeuomorphism. Clean modern surfaces, soft real shadows,
  one accent. The craft is the smoothness, not the chrome.

### Mobile fallback (critical — reviewers open on phones)
A draggable window manager can't survive on a 380px screen. On mobile:
- Drop the desktop metaphor gracefully. The dock becomes a clean vertical nav;
  tapping an app opens that section as a full-screen sheet that slides up.
- Same content, same palette, same type. Just a stacked, thumb-friendly layout.
- Test this explicitly; do not ship a broken desktop-only build.

### Window content (my real material — see flags)
Each app opens a window with: a short heading, a description in my voice, and a
photo strip/grid. Photos go in /public/photos — leave labeled placeholders where
I'll drop real images.

**readme** (the landing window, opens on load)
- "Hi, I'm Simon." One line: obsessed with how people work — on stage and in
  software. Came from Bangalore to Toronto on a scholarship, now at UofT.
  Builder by day, musician the rest of the time.

**work**
- Solution Specialist Intern at Predictive Success, a Predictive Index
  consulting firm. I turn behavioral data into software people actually use —
  dashboards, training tools, and AI-powered workforce analytics. Work hands-on
  with Reference Profiles, behavioral factors, and the SSAT selling stages.

**projects**
- Read the Room — gamified PI training platform, built and deployed end-to-end.
  Link: https://read-the-room-lime.vercel.app  [LIVE]
- Sales Performance Dashboard — a live web app replacing aging Excel dashboards,
  built on real behavioral + assessment data.  [IN BUILD]
- Juno — "Uber for tutors." A startup I built that hit ~1M LinkedIn views and
  got VC meetings before I pivoted.  [PAST VENTURE — great YC story, keep it]
- [FLAG: I also have an internal AI workforce-intelligence product in build.
  Keep it generic or omit — confirm what's public before publishing.]

**stage**
- Saxophone and guitar. Performed for ~3,000 people. Background in public-speaking
  and personality competitions in Bangalore. Performing is its own read-the-room.

**leadership**
- Elected College President. City-wide public-speaking / personality competitions.
  Shipped real, client-used products as an intern.

**contact**
- Email + links (LinkedIn, GitHub). [I'll fill the handles in.]

### Anti-slop checklist before you call it done
- [ ] No Inter/Roboto/system fonts anywhere.
- [ ] No purple gradient, no cream+terracotta, no three-card hero.
- [ ] Window drag/focus/close all feel smooth (spring, not linear).
- [ ] Page-load is one orchestrated moment, not random fades.
- [ ] Mobile sheet layout works and looks intentional.
- [ ] Keyboard focus visible; prefers-reduced-motion disables window animation.
- [ ] Every photo slot is a labeled placeholder I can swap.
- [ ] You screenshotted each screen and fixed it at least twice.
```
