# Deploy — 10-minute finish

This is a stock **Next.js (App Router)** app. Vercel builds it with zero config — no
environment variables are required to go live. Total time: ~10 minutes.

> Sanity check before you start (optional): `npm run build` should pass clean. It does
> as of the last commit.

---

## 1 · Push to GitHub (~3 min)

You have two options — pick one.

### Option A — GitHub CLI (fastest)

```bash
cd "Personal Website"

# if you haven't committed yet:
git add -A && git commit -m "Simon OS"        # (the repo is already committed — skip if so)

gh auth login                                  # one-time, follow the prompts
gh repo create simon-os --private --source=. --push
```

That creates the repo **and** pushes in one step. Done — skip to step 2.

### Option B — GitHub website

1. Go to **https://github.com/new** → name it `simon-os` → **Private** → **Create
   repository** (don't add a README/.gitignore — this repo already has them).
2. Back in your terminal:

   ```bash
   cd "Personal Website"
   git remote add origin https://github.com/<your-username>/simon-os.git
   git branch -M main
   git push -u origin main
   ```

---

## 2 · Deploy on Vercel (~3 min)

1. Go to **https://vercel.com/new** and sign in with **GitHub**.
2. **Import** the `simon-os` repo.
3. Framework preset auto-detects **Next.js**. **Leave every build/output setting at its
   default** — don't add env vars, don't change the build command.
4. Click **Deploy**.
5. Wait ~60–90s. You get a live URL like `https://simon-os-xxxx.vercel.app`. Open it. 🎉

Every future `git push` to `main` auto-deploys.

---

## 3 · Add a custom domain (~3 min, optional)

1. Buy a domain if you don't have one (Namecheap / Cloudflare / Vercel all work).
2. In Vercel: **Project → Settings → Domains → Add** → type your domain (e.g.
   `simonmathias.com`) → **Add**.
3. Vercel shows the DNS records to set. At your registrar, add them:
   - **Apex** (`simonmathias.com`): an **A** record → `76.76.21.21`, **or** follow
     Vercel's "nameservers" option (easiest — point the whole domain at Vercel).
   - **www**: a **CNAME** → `cname.vercel-dns.com`.
4. Wait for it to verify (usually minutes, up to ~1 hr). HTTPS is automatic.

### One env var to set *if you use a custom domain*

So that link-preview cards (LinkedIn / iMessage / Discord) and canonical URLs point at
your real domain instead of the `*.vercel.app` one:

- Vercel: **Project → Settings → Environment Variables → Add**
  - **Name:** `NEXT_PUBLIC_SITE_URL`
  - **Value:** `https://simonmathias.com` (your domain, no trailing slash)
  - Environments: **Production** (and Preview if you like)
- Then **Deployments → ⋯ → Redeploy** the latest so it picks up the variable.

(Without this, previews still work — they just use the `*.vercel.app` URL. With no
custom domain at all, you don't need this variable.)

---

## Notes

- **No secrets, no database, no API keys.** Nothing to configure.
- **Social preview** is a generated card with your headshot + name (`app/opengraph-image.tsx`).
  Test it after deploy by pasting the URL into the
  [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) or just into an
  iMessage/Discord/Slack message.
- **Photos** live in `public/photos/` (committed, web-optimized). Your raw originals are
  in `public/photos/_source/` which is **git-ignored** — they won't be pushed or deployed.
- **To update content later:** edit, `git commit`, `git push` → Vercel redeploys in ~1 min.
- **Things still worth filling in** (the site works without them — they degrade gracefully):
  - `public/photos/read-the-room.jpg` — a 16:9 screenshot for the Startup School window.
  - `public/photos/goofy-1.jpg`, `goofy-2.jpg` — two photos for the Goofy window slots.
