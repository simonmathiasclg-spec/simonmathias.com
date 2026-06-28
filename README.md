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

## 1. Add your photos

Every photo slot already shows a tasteful labeled placeholder, so the site looks
finished with **zero** photos. Drop a real file at the path below and it appears
automatically — no code changes, no rebuild needed in dev. Just match the filename.

Put all files in **`/public/photos/`**:

| Filename | What it opens (click on the home) | Best crop |
| --- | --- | --- |
| `photo-stage.jpg` | **Music & Stage** — "Sax solo · 3,000 people · age 15" | **4:5 portrait** |
| `photo-perform.jpg` | **Music & Stage** — "Guitar, live" | 4:5 portrait |
| `photo-build.jpg` | **Work** — "Building software people use" | 4:3 |
| `photo-lead.jpg` | **Leadership** — "Elected College President" | 4:3 |
| `photo-candid.jpg` | **About** — "Off the clock" | 1:1 square |
| `portrait.jpg` | inside the about window | 4:5 portrait (face upper-third) |
| `read-the-room.jpg` | startup-school → Read the Room | 16:9 screenshot |

The five **`photo-*.jpg`** files are the home-screen signature: each is a doorway
that opens a themed window. A small "view all photos" link (inside the Music & Stage
window, and on the mobile launcher) browses them all in a lightbox. Captions + which
window each opens live in
[`lib/photos.ts`](lib/photos.ts). The window heroes crop 16:9 (tweak `objectPosition`
in the matching component if a face gets cut).

---

## 2. Fill in your contact handles

Open [`components/apps/ContactApp.tsx`](components/apps/ContactApp.tsx) and replace
the five constants at the top, then delete the `<Placeholder>` wrappers around each
value (they render the dashed "to add" markers):

```ts
const EMAIL = "hello@simonmathias.dev";          // ← your real email
const LINKEDIN_URL = "https://linkedin.com/in/your-handle";
const LINKEDIN_LABEL = "/in/your-handle";
const GITHUB_URL = "https://github.com/your-handle";
const GITHUB_LABEL = "@your-handle";
```

To remove a "to add" marker, change e.g. `<Placeholder>{EMAIL}</Placeholder>`
back to just `{EMAIL}`.

---

## 3. Confirm the internal product

[`components/apps/ProjectsApp.tsx`](components/apps/ProjectsApp.tsx) has a third,
deliberately-vague project ("Workforce intelligence", marked `Internal`). It reveals
nothing specific. **Decide one of:** fill in real detail, or delete that `<li>`
block. Look for the `TODO(simon)` comment.

---

## 4. Deploy to Vercel

This is a stock Next.js App Router app — Vercel deploys it with zero config.

**Option A — dashboard (easiest):**

1. Push this folder to a GitHub repo:
   ```bash
   git init && git add -A && git commit -m "Simon OS"
   gh repo create simon-os --private --source=. --push   # or create the repo in the GitHub UI
   ```
2. Go to [vercel.com/new](https://vercel.com/new), import the repo.
3. Framework preset auto-detects **Next.js**. Leave build/output settings default.
4. Click **Deploy**. Done — you get a `*.vercel.app` URL.

**Option B — CLI:**

```bash
npm i -g vercel
vercel          # preview deploy, follow the prompts
vercel --prod   # promote to production
```

No environment variables are required. Add a custom domain in
**Project → Settings → Domains** when you're ready.

---

## Notes

- **Fonts:** Bricolage Grotesque (display), Geist (body), Geist Mono — self-hosted
  via `next/font`. No Inter/Roboto anywhere.
- **Themes:** a menubar toggle switches the world between *day* (default) and *night*.
  The choice is remembered in `localStorage`.
- **Intro:** a one-time water-droplet open (stored in `localStorage`) that resolves into
  the sky; skippable by click/scroll/key, instant-and-calm under `prefers-reduced-motion`.
- **Sound:** opt-in via the menubar toggle (off by default) — intro splash + a low
  ambient ocean loop. Never autoplays.
- **Home-first:** nothing opens on load; the sky home with your name is the landing.
  Closing every window returns to it.
- **Accessibility:** visible keyboard focus (cerulean ring), `Escape` closes the
  focused window, reduced-motion disables the world/intro animation, all images have
  alt text.
- **The three bold moments:** the droplet intro, the window physics, and the living
  sky. Everything else is intentionally quiet.
