## Design system — non-negotiable

Goal: a personal site that reads as hand-crafted, NOT AI-generated. A reviewer
(YC, recruiters) is judging whether I can build something with taste. Avoid the
"AI slop" look at all costs.

Typography
- Display: Bricolage Grotesque. Body: Geist (or Hanken Grotesk). Mono: Geist Mono.
- NEVER use Inter, Roboto, Open Sans, Arial, or system-ui.
- Use weight extremes (300 vs 800), and size jumps of 3x+, not timid 1.5x.

Color (CSS variables only, never hardcode hex in components)
- A living SKY world with two themes via the menubar toggle.
- DAY:   --sky-top #4FB8FF · --sky-horizon #C7ECFF · --sun/--saffron #FFD23F
         --sea-top #28C0CE → --sea-deep #0E7C8C · --sand #E9D7A6 · --palm #2F7D56
- NIGHT: --sky-top #0A1B3A · --sky-horizon #17386A · --moon #EDE6CF + stars
         --sea-top #0E2A45 → --sea-deep #071A2C + moonlight streak
- --window #F8F5EF (clean opaque paper, day) / #161B24 charcoal (night)
- --ink #16130F · --ink-muted #6B6457 · --cerulean #2E6BFF (focus ring + secondary)
- The fun lives in the WORLD; window surfaces stay quiet, opaque, high-contrast.
- One dominant world + the sun as the single sharp accent. No evenly-distributed palette.
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

## Build-prompt extensions (PART 2 — take precedence where they differ)

- Concept: "Simon OS" — a living seaside SKY that resolves from a water-droplet
  intro, with clean paper windows floating over it.
- Default state is the sky HOME: the name + tagline lead, ringed by a few real
  PHOTOS of Simon (performing, building, leading) drifting like memories. The
  photos ARE the navigation — clicking one opens a themed window (Music & Stage,
  Leadership, Work, About). A small "view all photos" affordance keeps a gallery
  lightbox. On first load the photos do one gentle wave + a brief "click me" nudge,
  then quiet. NOTHING auto-opens; closing every window returns to the sky home.
- The name must always clearly lead the composition; photos stay sparse + elegant.
- Dock apps (final set): about, work, startup-school, contact (4). projects is
  folded into the startup-school founder's note. Music & Stage and Leadership are
  windowed but NOT in the dock — they're reached by clicking the photos.
- startup-school is highlighted in the dock with a saffron "★ read this" accent —
  it's the section to draw a reviewer's eye. Dock items show permanent text labels.
- Intro plays once ever (localStorage), skippable; honor prefers-reduced-motion
  with a calm instant version.
- Sound is opt-in (default OFF): droplet woosh/ding/splash + ambient ocean loop.
- Mobile (<700px): drop the window metaphor — springboard launcher + slide-up
  sheets, a simpler static-ish sky with a legibility scrim, a shorter intro.
