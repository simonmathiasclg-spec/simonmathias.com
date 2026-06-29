# Simon OS — Build Log

A running log of decisions, experiments, and what I'd improve next. Newest entries
near the bottom of each section.

## Stack decisions

- **Next.js 16 (App Router) + React 19 + TypeScript** — scaffolded with
  `create-next-app`. Had to scaffold into a temp dir because the project folder
  ("Personal Website") has a space + capitals, which npm rejects as a package name,
  then rsync'd the result into place.
- **Tailwind v4** (CSS-first `@theme` in `globals.css`, no `tailwind.config`). The
  whole palette lives as CSS variables and is exposed to Tailwind as color tokens
  (`bg-desk`, `text-ink`, `text-saffron`, …) so components never hardcode hex.
- **shadcn/ui** (radix base) for primitives — tooltip, sheet, scroll-area,
  separator, button. Semantic shadcn tokens (`--primary`, `--border`, `--ring`, …)
  are remapped onto the brief's palette so the primitives inherit the design instead
  of looking stock. Focus ring = `--cerulean` for a visible, on-brand focus state.
- **Motion** (the Framer Motion successor, `motion/react`) for the window physics and
  the orchestrated boot. Springs, not linear tweens.
- **Zustand** for the window-manager store (open windows, z-order, focus, boot phase,
  theme, sound, reduced-motion). Drag positions are kept *out* of React state — Motion
  owns the transform per window, so dragging one window doesn't re-render the others.
- **Phosphor Icons** (`@phosphor-icons/react`) instead of Lucide, per the brief.

## Fonts

- Display: **Bricolage Grotesque** (variable). Body: **Geist**. Mono: **Geist Mono**.
  All via `next/font` (self-hosted, no FOUT, no Google runtime call). No Inter/Roboto.

## Architecture

- `lib/apps.tsx` — single source of truth for the dock apps (id, title, icon,
  content component, default window size). Add/remove an app in one place.
- `lib/os-store.ts` — Zustand store for OS state.
- `components/os/*` — the desktop, menubar, dock, window chrome, boot sequence,
  cursor spotlight, custom cursor, mobile shell.
- `components/apps/*` — pure content components, layout-agnostic so the same content
  renders inside a desktop Window OR a mobile Sheet.

## Redirect — the living-sky world (v2)

Kept the entire architecture (window manager, all 6 apps + content, mobile springboard,
shadcn primitives, fonts, 8px rhythm). Changed exactly two things: the visual world and
the landing behavior.

- **Landing behavior (the UX fix).** Removed the about auto-open. Default state is now a
  `Home` hero (`components/os/Home.tsx`) — name + tagline + a "pick an app below" hint
  floating over the sky, shown whenever no window is open. Closing every window fades the
  home back in; it's never a dead desktop. Apps open only on dock/tile click.
- **New world.** `Desktop.tsx` → `Sky.tsx`: a layered, GPU-cheap scene (transform/opacity
  only, no canvas). Sky gradient + drifting parallax clouds, a sun (day) / craters-and-glow
  moon (night), twinkling stars at night, a sea with two scrolling SVG wave layers + a
  sun/moon-light streak, a distant palm island, occasional birds, and ~5 sparse ambient
  icons (sax→music, guitar, mic, airplane = Bangalore→Toronto, rocket = startups). The
  theme toggle now means **day ⇄ night** (was dusk/night). Palette swapped to the sky
  tokens; the sun IS the saffron accent (`#FFD23F`).
- **Intro.** `BootSequence.tsx` (portrait ID-card) → `Intro.tsx`: a water droplet falls,
  ripples bloom, the sea rises and the sky resolves, then it cross-fades to the live Sky +
  home. Plays **once ever** (localStorage `simon-os-intro-seen`), skippable by
  click/scroll/key (with a 300ms guard so a stray load event can't insta-skip), and
  instant-and-calm under reduced-motion. Mobile gets a shorter version.
- **Sound** (`lib/sound.ts`, opt-in, default OFF): synthesized woosh/ding/splash for the
  intro + a low ambient ocean loop (looping brown-noise → lowpass with two slow LFOs for
  surf swell). Wired to the existing menubar toggle; turning it on starts the loop on that
  gesture. No audio files, no autoplay.
- **Readability.** Windows stay opaque paper so text never fights the bright sky. The
  mobile springboard adds a dark legibility scrim over the sky. The desktop cursor
  spotlight was **removed** — a warm light blob made no sense over a bright sky; the world
  itself is now the ambient signature. The custom cursor stays (difference-blend).

## Upgrade — playable world + deep links (v3)

A visual + interaction pass. App content, the window manager, the 6 apps, and the
mobile sheets were left untouched; only the world, objects, transition, sound, and
the engineering additions changed.

- **Playable floating objects** (`components/os/FloatingObjects.tsx`). The drifting
  Phosphor glyphs became six hand-drawn, cohesive-color SVGs (sax, guitar, mic,
  rocket, paper plane, note). Each drifts on its own path with cursor parallax + a
  soft idle bob, perks on hover, and — the signature — **plays a note on click**
  (C-major pentatonic, so any order sounds good and a sweep ascends) with a "played"
  puff + a rising ♪. Capped at 6, balanced around the hero so the name still leads.
  Static under reduced-motion / on mobile (still clickable on desktop).
- **Animated day↔night** (`globals.css` + `Sky.tsx`). No more hard cut — toggling the
  theme is a single ~1.2s eased CSS transition: the sun arcs down on the right while
  the moon rises on the left (two pivoted `.celestial-arm`s rotating off `.dark`), the
  sky + sea + light-streak crossfade between constant day/night token layers, stars
  fade in/out, and the objects' tint shifts via a filter transition. All CSS-driven
  off the `.dark` class — zero JS animation, compositor-cheap. Reduced-motion makes it
  instant. Added a small **green palm island** with day/night fills + rare birds.
- **Sound** (`lib/sound.ts`). Removed the persistent ambient ocean loop (it grated on
  a long visit). Kept the intro woosh/ding/splash; added `playNote()` — a warm
  marimba-ish pluck (triangle + sine partials through a lowpass). Still opt-in, default
  OFF, never autoplays.
- **Deep links** (`app/[app]/page.tsx`, `lib/app-ids.ts`, URL sync in `SimonOS`). Each
  app has a real, prerendered route — `/projects` lands with projects open (window on
  desktop, sheet on mobile). The focused window is reflected in the URL via
  `history.replaceState` (with a guard so a fresh deep link survives until its window
  opens). A server-rendered `sr-only` summary (`components/Seo.tsx`) keeps it crawlable
  + screen-reader accessible.
- **Social preview** (`app/layout.tsx`, `app/opengraph-image.tsx`). metadataBase +
  OpenGraph/Twitter cards + per-app titles, and a generated sky OG card (no external
  font fetch, so it never fails). Swap in a portrait-based card later if wanted.
- **Keyboard shortcuts + help** (`components/os/Shortcuts.tsx`). First-letter
  (a/w/p/s/g/c) or 1–6 open each app; Esc still closes the focused window; a quiet "?"
  button (and the `?` key) reveals a small shortcuts panel.
- **Easter egg** (`components/os/EasterEgg.tsx`). Type `luffy` (no collision with the
  letter shortcuts) → a tiny straw hat floats up: "the One Piece is real." Isolated,
  out of the way, skippable.

## Home redesign — floating photos of Simon (v4)

The home screen is now Simon-forward. App content, the window manager, the day↔night
transition, and the mobile sheets were left intact.

- **Floating photos replace the cartoon instruments.** The hand-drawn SVG glyphs (the
  sax never read as a sax) are gone. `FloatingPhotos.tsx` drifts 4–6 real photos of
  Simon in clean rounded frames around the hero — performing, building, leading. Each
  has a labeled placeholder showing its filename until a real file is dropped in
  (`lib/photos.ts`: `photo-stage/perform/build/lead/candid.jpg`). They drift on their
  own paths with cursor parallax + idle bob; on hover they lift, straighten, scale, and
  show a caption ("Sax solo · 3,000 people · age 15"); on click they open a paged
  lightbox. The per-click musical note (gated by the sound toggle) stays as a delight.
  Lazy-loaded, static under reduced-motion, and always behind the name so it leads.
- **The gallery is merged into the photos.** `PhotoViewer.tsx` is the "view all" —
  a lightbox with prev/next (and ← → / Esc), a counter, and the caption. `gallery` was
  removed as a dock app everywhere (ids, registry, routes, SEO, shortcuts; deleted
  `GalleryApp.tsx`). The dock is now 5 apps.
- **Dock: permanent labels.** Each item shows its name under the icon (no hover-to-
  reveal), keeps the open dot, and **startup-school is highlighted** — a saffron ring +
  glow on the icon and a "★ read this" micro-label — because it's the section to draw a
  reviewer's eye. The mobile springboard row gets the same saffron treatment.
- **Mobile adapts.** The springboard hero swaps its single portrait for a tappable
  3-photo cluster (performing / building / leading) that opens the same viewer; labels
  fit at 380px.
- **Island refined.** Redrawn smaller, smoother, and more distant — a clean low
  silhouette with a minimal palm (day + night via the fill crossfade).

## Photos become doorways + 4-app dock (v5)

Three structural changes; the window manager, day↔night transition, mobile sheets,
and sound rules were untouched.

- **Photos are navigation now, not just a lightbox.** Clicking a floating photo opens
  a themed window via the existing window manager (draggable, focus/close, multi-window):
  stage/perform → **Music & Stage**, build → **Work**, lead → **Leadership**, candid →
  **About**. `lib/photos.ts` carries a `target` per photo; `FloatingPhotos` calls
  `openApp(target)`. Two new content components (`MusicStageApp`, `LeadershipApp`) lead
  with the photo (a `PhotoHero` banner) then the real, first-person story — the self-
  taught-sax-to-3,000-people arc and teaching Roshan guitar; the record 70% election,
  8/8 championships, $18K raised. Work gained a photo hero too. The gallery survives as
  a small "view all photos" affordance (bottom-left desktop, a link on mobile) opening
  the paged `PhotoViewer`. These windowed apps have routes (`/music-stage`,
  `/leadership`) but are NOT in the dock — they're reached by the photos.
- **Discoverability.** After the name settles the photos do one staggered attention
  wave, then a brief "click me" nudge on the first photo (once-ever via localStorage),
  then quiet. Permanent hover lifts + brightens + straightens + captions + pointer.
  All disabled under reduced-motion.
- **Projects → startup-school.** Removed `projects` everywhere (ids, routes, dock, SEO,
  shortcuts; deleted `ProjectsApp`). Its work now lives inside the founder's note as
  evidence — Read the Room (LIVE, linked) and the Sales Dashboard (in build) under
  "what I've shipped" — alongside the Juno lineage and the new through-line: a
  "Duolingo for music" with real-time AI feedback, born from teaching himself sax.
  The **dock is now 4 apps** (about / work / startup-school / contact), keyboard
  shortcuts renumbered 1–4, startup-school keeps its "★ read this" highlight.

## Three fixes — photo→window, dock labels, living water (v6)

Window manager, day↔night transition, mobile sheets, sound rules, and all photo
content untouched. Three targeted fixes.

- **Photo click = a real window (lightbox demoted).** Verified each floating photo
  already opens its themed *window* via the window manager — clicking all five returns
  draggable `[role=dialog]` windows, never a lightbox: Sax solo + Guitar → **Music &
  Stage** (`/music-stage`), Building → **Work** (`/work`), Elected President →
  **Leadership** (`/leadership`), Off the clock → **About** (`/about`). The lightbox is
  now *secondary*: I removed the floating "view all photos" button from the home and
  moved that trigger to a small `ViewAllPhotos` link **inside** a window (Music & Stage)
  plus the mobile launcher. Viewer state moved to the Zustand store (`photoViewer` /
  `setPhotoViewer`) so any window can open the gallery. Net: the primary click always
  opens a window; the gallery is a quiet in-window affordance.
- **Dock labels + header.** Added a title-case `dockLabel` per app
  (About / Work / **Startup School** / Contact) so "startup-school" no longer truncates
  to "startup-…". Dock labels went from 11px lowercase mono in a fixed 72px tile to
  **13px medium, content-width, `whitespace-nowrap`** (no clip), icons unchanged, the
  saffron **★ READ THIS** highlight kept. The mobile springboard uses the same labels
  (title-case, no `lowercase`), legible and un-truncated at 380px. Home header
  "PICK AN APP BELOW" → **"WHERE TO START"** (cleaner, more personal).
- **Living water + better island.** The sea gained continuous, GPU-cheap motion:
  a slow surface **sheen** that glides across the top (`sea-sheen`, `ease-in-out
  alternate`), and a **sun/moon reflection** under the celestial body that *breathes*
  (widens + brightens on the ripples, `reflect-breathe`) with bright bands **drifting**
  down it (`reflect-drift`) — soft-edged via a horizontal mask so it reads as glimmer,
  not stripes. Reflection alignment confirmed against the rendered bodies (sun 69.5% →
  column 70%, moon 30.5% → column 30%). All transform/opacity/background-position only,
  and disabled under `prefers-reduced-motion`. The **island** was redesigned: a lower,
  longer, better-proportioned landmass with a faint sand-shelf highlight, and a graceful
  palm — gently curved trunk, a full six-frond crown that arcs up then droops at the
  tips, two coconuts. Reads as a charming distant detail, not a cartoon (verified by
  magnifying the SVG 4× in an overlay and critiquing the shape).

## Real photos + video (v7)

Simon's real photos went in. A repeatable pipeline, no AI alteration of any photo of
him — only resize / crop / compress.

- **Processing pipeline** (`scripts/process-photos.mjs`, sharp): auto-orients via EXIF
  (caught `At Work.JPG` stored sideways at orientation 6 → would have cropped a
  face-down sliver without `.rotate()`), crops the largest face-safe rect that *fits*
  the source (so it never upscales), then mozjpeg-compresses. Each source was inspected
  first to place the crop on the face. Raw originals live in git-ignored
  `public/photos/_source/`; the committed slot files are the optimized `.jpg`s. Output
  is ~38–243 KB each (~2 MB total) vs. the 9 MB+ originals.
- **Slots remapped to the real files** and re-shaped to fit them. Most sources are
  portrait, so the two landscape floating frames (`lead`, `build`) became 4:5 — a 4:3
  crop would have sliced the suit-and-mic close-up. Hero/floating: stage←Sax 1,
  perform←Sax pic, lead←On Mike, build/candid←At Work (per brief, reused), portrait←the
  studio headshot. Faces verified visible + uncropped in all five floating frames.
- **Window photo stories** (a new `Figure` kit primitive — framed, captioned, slightly
  tiltable; the rigid 16:9 `PhotoHero` was wrong for portrait sources). *Music & Stage*:
  a stage hero, a two-up sax cluster with varied offsets + captions, then the live video.
  *Leadership*: the suit-and-mic hero, the "Saxy Simon · President" trophy-jacket shot
  featured, then a "trophy wall" that unfolds while scrolling (two trophy portraits → the
  full-team championship shot → the campaign poster) → the stats. *Work* hero switched
  from a 16:9 band to a contained 4:5 plate so the desk shot isn't sliced.
- **Live video** = a lazy `YouTubeFacade`: thumbnail + saffron play button; the
  (no-cookie) iframe mounts only on click, jumping to `?start=134` ("starts at the
  solo"). The 142 MB `Sax Vid.MP4` was dropped — no ffmpeg to compress it, and the brief
  allowed dropping it in favor of the embed.
- **Social card** now Simon's real headshot: `og-headshot.jpg` (a 1200×630 face-centered
  crop) is read at build and embedded as a data-URI background in `opengraph-image.tsx`,
  with a bottom scrim + name + saffron accent. `og:image` and `twitter:image` (verified
  in the rendered `<head>`) both resolve to it, so shared links show his face.

## Screenshot / critique notes

Each screen was launched, screenshotted, critiqued, and fixed — at least twice. Notable
loops:

- **about (extra passes):** (1) caught a JSX whitespace bug — the compiler strips the
  single space right after `</strong>`, so "Bangalore and" rendered as "Bangaloreand".
  Fixed with explicit `{" "}` across all prose. (2) The window's bottom was hidden behind
  the dock; reserved a 92px dock zone in the WindowManager so windows never sit under it.
- **boot (extra passes):** (1) the auto-opened about window was overlapping the fading
  boot card (double "Simon" text) — pushed the about-open to 720ms so it lands exactly as
  the ~700ms overlay exit finishes. (2) bumped the "SM" monogram opacity so the no-photo
  boot still looks intentional before a real portrait is dropped in.
- **window manager:** verified multiple windows, cascade placement, focus-raise (deeper
  shadow + the unfocused scrim), dock open-indicators, and Escape-to-close.
- **night mode:** charcoal windows + warm off-white ink, accents held constant; the choice
  persists in localStorage.
- **mobile:** tested at 375px and 380px — springboard launcher + slide-up paper sheets.
- **console hygiene:** removed a no-flash `<script>` that tripped a React 19 dev warning;
  the boot overlay already masks the initial mount, so the theme is applied under it with
  no visible flash and a clean console.

## Verification

- `npm run build` passes clean — no TypeScript or ESLint errors, `/` prerenders static.
- Reduced-motion path is wired everywhere (instant boot, no spotlight/cursor, no parallax,
  `duration: 0` transitions, CSS `@media (prefers-reduced-motion)` kills grain/drift). I
  couldn't emulate the media query in the preview harness, so this one is verified by code
  review rather than a screenshot.

## Substitutions / notes for Simon

- The brief said screenshot via chrome-devtools MCP; in this environment that server
  wasn't connected, so I used the Claude preview MCP (same idea: launch dev server,
  screenshot, resize to 380px, inspect computed styles). Noted so you're not surprised.

## What I'd improve next

In rough priority order:

1. **Window polish:** add window resize handles and a maximize/restore on title-bar
   double-click. Persist each window's last position/size to `localStorage` so the
   desktop remembers your arrangement.
2. **Real content depth:** the projects "internal product" card is intentionally vague
   pending your confirmation — either flesh it out or cut it. Add a couple of real
   metrics to Read the Room (users, sessions) if you have them; numbers sell.
3. **Boot art direction:** once `portrait.jpg` is in, re-tune the scanline/focus-pull
   timing against the real photo — placeholders and faces reveal differently. Consider a
   one-time "skip intro" memory so repeat visitors land straight on the desktop.
4. **Spotlight on windows:** right now the spotlight only lights the desk (behind
   windows). A subtle specular highlight that rakes across the focused window's top edge
   as the cursor passes would tie the two together.
5. **Sound design:** the UI blips are synthesized WebAudio sine tones. Real, designed
   samples (a soft mechanical "thock" on open, a click on close) would feel more premium.
6. **A `projects` detail view:** clicking a project could open a child window with a
   bigger writeup + screenshots, instead of everything living in one list.
7. **Perf:** lazy-load the heavier app windows with `next/dynamic` so the desktop's
   first paint ships even less JS. Add real OG/Twitter image generation via
   `opengraph-image` for nice link unfurls when you share the site.
8. **Tests:** a couple of Playwright smoke tests (boot completes, each app opens, mobile
   sheet opens) would guard against regressions as you tweak.

## Known trade-offs

- Drag uses `dragMomentum={false}` for a controlled, weighty feel rather than throw-and-
  glide. I think it reads as more "engineered"; swap to momentum if you prefer playful.
- The custom cursor uses `mix-blend-difference` so it stays visible over both the dark
  desk and the paper windows. Over the saffron accent it inverts to a cool tone — a
  deliberate, slightly playful effect. Easy to swap for a solid cursor if you dislike it.
