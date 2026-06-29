# Simon OS

A personal site for **Simon Mathias** — a little operating system inside a living
sky. Real photos of Simon drift around his name; click one to open that part of his
world (Music & Stage, Leadership, Work, About).
Click an app in the dock and a window springs open (draggable, multi-window). On a
phone it becomes a clean app launcher with slide-up sheets.

Built with Next.js 16 (App Router) · TypeScript · Tailwind v4 · shadcn/ui ·
Motion · Phosphor Icons. Design system lives in [`CLAUDE.md`](CLAUDE.md);
build notes in [`BUILD-LOG.md`](BUILD-LOG.md).

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (what Vercel runs)
```

---

## 1. Photos (already in) + how to swap one

Your real photos are in and optimized. The web-ready slot files live in
`/public/photos/` (committed); the **raw originals** live in
`/public/photos/_source/` (git-ignored, kept locally). The home screen shows **five
distinct doorways** — one per facet, each labeled (`MUSIC →`, `LEADERSHIP →`, …) — and
each opens its themed window. A small "view all photos" link (inside the Music & Stage
window, and on the mobile launcher) browses them all in a lightbox.

**To swap a photo:** drop a new original into `/public/photos/_source/`, point the
matching entry in [`scripts/process-photos.mjs`](scripts/process-photos.mjs) at it, then:

```bash
node scripts/process-photos.mjs   # re-crops + compresses into the slot files
```

The script **only resizes / crops / compresses** (auto-orienting via EXIF, never
upscaling). Current mapping — the **home doorways** (one per facet, no repeats):

| Doorway (label) | Slot file | From original | Opens |
| --- | --- | --- | --- |
| `MUSIC →` | `photo-perform.jpg` | `Sax pic.JPG` (red kurta) | **Music & Stage** |
| `LEADERSHIP →` | `photo-lead.jpg` | `On Mike … .JPG` | **Leadership** |
| `WORK →` | `photo-build.jpg` | `At Work.JPG` | **Work** |
| `ABOUT →` | `portrait.jpg` | `Headshot.png` | **About** |
| `GOOFY →` | `photo-goofy.jpg` | `Goofy main.jpeg` | **Goofy** |

…and the supporting images (inside windows / social):

| Slot file | From original | Used for |
| --- | --- | --- |
| `photo-stage.jpg` | `Sax 1.JPG` (with the band) | Music & Stage gallery |
| `gallery-mic.jpg` | `Mic 3.JPG` | Music & Stage gallery |
| `gallery-*.jpg` | trophies / poster / team | Leadership "trophy wall" |
| `og-headshot.jpg` | `Headshot.png` | social-preview (OG) card |
| `goofy-1.jpg`, `goofy-2.jpg` | _(add yours)_ | Goofy window slots |
| `read-the-room.jpg` | _(add yours)_ | startup-school → Read the Room (16:9) |

Captions + the floating layout live in [`lib/photos.ts`](lib/photos.ts); the in-window
photo stories live in each app component (e.g. `components/apps/LeadershipApp.tsx`).

> The Goofy doorway now uses your real `Goofy main.jpeg` (pharaoh costume). Fill
> `goofy-1.jpg` / `goofy-2.jpg` to populate the two in-window photo slots.

---

## 2. Contact details (already wired)

The Contact window has real, working links — **email** (with a copy button),
**LinkedIn** (new tab), and **phone** (`tel:`). They live as constants at the top of
[`components/apps/ContactApp.tsx`](components/apps/ContactApp.tsx) if you ever need to
change them. Nothing to fill in.

---

## 3. Deploy

A stock Next.js App Router app — Vercel deploys it with zero config and no environment
variables. Step-by-step (GitHub → Vercel → custom domain), ~10 minutes, in
**[`DEPLOY.md`](DEPLOY.md)**.

---

## Notes

- **Fonts:** Bricolage Grotesque (display), Geist (body), Geist Mono — self-hosted
  via `next/font`. No Inter/Roboto anywhere.
- **Themes:** a menubar toggle switches the world between *day* (default) and *night*.
  The choice is remembered in `localStorage`.
- **Intro:** a one-time water-droplet open (stored in `localStorage`) that resolves into
  the sky; skippable by click/scroll/key, instant-and-calm under `prefers-reduced-motion`.
- **Sound:** opt-in via the menubar toggle (off by default) — a droplet splash on the
  intro plus soft notes when you open photos/windows. Never autoplays.
- **Home-first:** nothing opens on load; the sky home with your name is the landing.
  Closing every window returns to it.
- **Accessibility:** visible keyboard focus (cerulean ring), `Escape` closes the
  focused window, reduced-motion disables the world/intro animation, all images have
  alt text.
- **The three bold moments:** the droplet intro, the window physics, and the living
  sky. Everything else is intentionally quiet.
