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
`/public/photos/_source/` (git-ignored, kept locally). The five `photo-*.jpg` files
are the home-screen signature — each is a doorway that opens a themed window; a small
"view all photos" link (inside the Music & Stage window, and on the mobile launcher)
browses them all in a lightbox.

**To swap a photo:** drop a new original into `/public/photos/_source/`, point the
matching entry in [`scripts/process-photos.mjs`](scripts/process-photos.mjs) at it, then:

```bash
node scripts/process-photos.mjs   # re-crops + compresses into the slot files
```

The script **only resizes / crops / compresses** (auto-orienting via EXIF, never
upscaling). Current mapping:

| Slot file | From original | Used for |
| --- | --- | --- |
| `photo-stage.jpg` | `Sax 1.JPG` | home doorway → **Music & Stage** hero |
| `photo-perform.jpg` | `Sax pic.JPG` | home doorway → Music & Stage gallery |
| `photo-lead.jpg` | `On Mike … .JPG` | home doorway → **Leadership** hero |
| `photo-build.jpg` | `At Work.JPG` | home doorway → **Work** |
| `photo-candid.jpg` | `At Work.JPG` (reuse) | home doorway → **About** |
| `portrait.jpg` | `Headshot.png` | inside the About window |
| `og-headshot.jpg` | `Headshot.png` | social-preview (OG) card |
| `gallery-*.jpg` | Mic 3 / trophies / poster | woven into the window stories |
| `read-the-room.jpg` | _(add yours)_ | startup-school → Read the Room (16:9) |

Captions + the floating layout live in [`lib/photos.ts`](lib/photos.ts); the in-window
photo stories live in each app component (e.g. `components/apps/LeadershipApp.tsx`).

> Note: `photo-candid.jpg` and `photo-build.jpg` are both crops of `At Work.JPG`, so the
> same desk shot appears in two home frames. If you'd rather vary it, there's an unused
> `On Stage.JPG` in `_source/` you can point `photo-candid` at and re-run the script.

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
