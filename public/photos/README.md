# Photos

These are the **web-optimized** slot files the site serves (committed to git). They
were generated from the raw originals in **`_source/`** (git-ignored, kept locally) by
[`scripts/process-photos.mjs`](../../scripts/process-photos.mjs), which only
resizes / crops / compresses — auto-orienting via EXIF, never upscaling or altering.

## The floating photos (home-screen signature — each opens a window)

- `photo-stage.jpg`    → **Music & Stage**  (from `Sax 1.JPG`)
- `photo-perform.jpg`  → **Music & Stage**  (from `Sax pic.JPG`)
- `photo-lead.jpg`     → **Leadership**     (from `On Mike … .JPG`)
- `photo-build.jpg`    → **Work**           (from `At Work.JPG`)
- `photo-candid.jpg`   → **About**          (from `At Work.JPG`, reused)

## Inside the windows / social

- `portrait.jpg`              → the About window         (from `Headshot.png`)
- `og-headshot.jpg`          → the social-preview card  (from `Headshot.png`, 1200×630)
- `gallery-mic.jpg`          → Music & Stage gallery    (from `Mic 3.JPG`)
- `gallery-saxy-president.jpg`, `gallery-trophy-1.jpg`, `gallery-trophy-2.jpg`,
  `gallery-team.jpg`, `gallery-poster.jpg` → the Leadership "trophy wall"
- `about-yc.jpg`             → About, "Recently" (YC Startup School 2026)
- `goofy-icecream.jpg`       → Goofy, "The evidence"
  (These two were resized to 1200px and re-encoded with every bit of metadata,
  EXIF/GPS included, stripped. Their originals are not kept in the repo.)
- `read-the-room.jpg`        → startup-school screenshot (add a 16:9 image)

## To swap a photo

Drop a new original in `_source/`, point the matching entry in
`scripts/process-photos.mjs` at it, then run `node scripts/process-photos.mjs`.
Captions + layout live in [`lib/photos.ts`](../../lib/photos.ts) and the app components.
