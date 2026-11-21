## Design system — non-negotiable

Goal: a personal site that reads as hand-crafted, NOT AI-generated. A reviewer
(YC, recruiters) is judging whether I can build something with taste. Avoid the
"AI slop" look at all costs.

(Updated in the Nov 2026 "refresh": serif + sans type, a flat printed-poster sky,
solid paper chrome, sky blue as the only accent. The rules below describe that.)

Typography
- Headings + the name: Newsreader (optical-size serif, real italics). Body + UI:
  IBM Plex Sans. Mono: IBM Plex Mono, only for the menubar clock and kbd hints.
- NEVER use Inter, Roboto, Open Sans, Arial, Geist, Bricolage, or system-ui.
- Hierarchy from size + the serif/sans contrast, not from weight extremes.
- No letter-spaced uppercase mono eyebrows, no numbered kickers ("01 / WORK").
- No em dashes in site copy.

Color (CSS variables only, never hardcode hex in components)
- A living SKY world with two themes via the menubar toggle.
- DAY:   --sky-top #4FB8FF · --sky-horizon #C7ECFF · --sun #FFD23F
         --sea-top #28C0CE → --sea-deep #0E7C8C · --palm #2C6E44
- NIGHT: --sky-top #0A1B3A · --sky-horizon #17386A · --moon #EDE6CF + stars
         --sea-top #0E2A45 → --sea-deep #071A2C
- --window #F8FAFB cool paper (day) / #121A23 (night). Not warm cream.
- --ink #13202B · --ink-muted #586874.
- Accent is SKY BLUE: --sky #4FB8FF for rules + marks, --sky-ink #1A6FA8
  (night #7CCBFF) for links + emphasis (AA on paper). The sun/saffron lives only
  in the sky illustration, never in UI.
- Type on the sky is dark ink by day (.sky-ink), light by night. No text glow.
- FORBIDDEN: glows, blurred blobs, glassmorphism/backdrop-blur, gradient text,
  pill-shaped chips, emoji, sparkle icons, icon tiles beside headings or list
  items, identical rounded cards in grids, heavy drop shadows.

Layout & motion
- 8px spacing rhythm. Left-aligned text. Hierarchy via type and space; structure
  via thin rules (border-hair), not boxes.
- Small radii (2–6px). Windows get one quiet shadow; nothing else floats.
- Motion lives in the window physics + ONE orchestrated page-load. Respect
  prefers-reduced-motion. Don't scatter micro-animations everywhere.
- Use shadcn/ui primitives as the base; customize them, never ship them raw.
  Icons only for functional controls (sound, theme, prev/next), via Phosphor.
- Shared content primitives live in components/apps/_kit.tsx (AppHeader, Entry,
  FactList, Figure, ExternalLink, SectionLabel). Reach for those first.

Process
- Before coding a screen, state the aesthetic direction in one line, then build.
- After any UI change: screenshot it, critique the screenshot specifically,
  fix, repeat. Do this loop at least twice per screen.
- Build to a quality floor silently: responsive to mobile, visible keyboard
  focus, reduced-motion honored.
- JSX gotcha in this toolchain: a closing tag followed by a short word and a
  line break can lose its space ("developer</strong> with" rendered "developerwith").
  Write {" "} explicitly after inline tags when the line breaks soon after.

## Build-prompt extensions (PART 2 — take precedence where they differ)

- Concept: "Simon OS" — a living seaside SKY that resolves from a water-droplet
  intro, with clean paper windows floating over it.
- Default state is the sky HOME: the name + tagline lead, ringed by a few real
  PHOTOS of Simon (performing, building, leading) drifting like memories. The
  photos ARE the navigation — clicking one opens a themed window (Music & Stage,
  Leadership, Work, About, Goofy). Each photo has a plain text caption under it.
  A small "view all photos" link keeps a gallery lightbox. On first load the
  photos do one gentle wave + a brief "start here" nudge, then quiet. NOTHING
  auto-opens; closing every window returns to the sky home.
- The name must always clearly lead the composition; photos stay sparse + elegant.
  Photo positions are fixed by lib/photos.ts; don't move them.
- Dock (a solid paper bar of text links, in this order): About, Work, Projects,
  Music, Leadership, Goofy, Contact. Keyboard: 1–7 by position, or a/w/j/m/p/g/c.
- Intro plays once ever (localStorage), skippable; honor prefers-reduced-motion
  with a calm instant version.
- Sound is opt-in (default OFF): droplet woosh/ding/splash + ambient ocean loop.
- Mobile (<700px): drop the window metaphor — a photo grid launcher (Projects and
  Contact are plain paper tiles) + slide-up sheets, a simpler static sky (night
  only gets a legibility scrim), a shorter intro.
