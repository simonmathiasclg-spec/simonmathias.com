// One-off: turn Simon's raw source photos into web-optimized slot files.
// RULES: auto-orient (EXIF), only resize/crop/compress — never upscale, never
// alter the subject. Run: `node scripts/process-photos.mjs`
import sharp from "sharp";
import { statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const DIR = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "photos");
const IN = (f) => join(DIR, "_source", f); // raw originals (git-ignored)
const OUT = (f) => join(DIR, f); // web-optimized slot files (committed)

// crop the largest target-ratio rect that FITS in the source (no upscaling),
// biased by position, then downscale to a cap. position: x = left|center|right,
// y = top|center|bottom.
async function coverCrop(src, out, rw, rh, { x = "center", y = "center", cap = 1600, q = 80 } = {}) {
  const img = sharp(IN(src)).rotate(); // auto-orient first
  const m = await img.metadata();
  // metadata() reports PRE-rotation dims; swap when EXIF orientation rotates 90°
  const swap = (m.orientation || 1) >= 5;
  const sw = swap ? m.height : m.width;
  const sh = swap ? m.width : m.height;
  const r = rw / rh;
  let cw, ch;
  if (sw / sh > r) { ch = sh; cw = Math.round(sh * r); } // source wider -> crop width
  else { cw = sw; ch = Math.round(sw / r); }             // source taller -> crop height
  const left = x === "left" ? 0 : x === "right" ? sw - cw : Math.round((sw - cw) / 2);
  const top = y === "top" ? 0 : y === "bottom" ? sh - ch : Math.round((sh - ch) / 2);
  await img
    .extract({ left, top, width: cw, height: ch })
    .resize(cap, cap, { fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: q, mozjpeg: true, progressive: true })
    .toFile(OUT(out));
  const o = await sharp(OUT(out)).metadata();
  console.log(`✓ ${out.padEnd(26)} ${o.width}x${o.height}  ${(statSync(OUT(out)).size / 1024).toFixed(0)}KB  (from ${src})`);
}

// exact-size cover (for the OG card background)
async function coverExact(src, out, w, h, { x = "center", y = "center", q = 82 } = {}) {
  await sharp(IN(src)).rotate()
    .resize(w, h, { fit: "cover", position: y === "top" ? "top" : x === "left" ? "left" : "centre" })
    .jpeg({ quality: q, mozjpeg: true, progressive: true })
    .toFile(OUT(out));
  const o = await sharp(OUT(out)).metadata();
  console.log(`✓ ${out.padEnd(26)} ${o.width}x${o.height}  ${(statSync(OUT(out)).size / 1024).toFixed(0)}KB  (OG, from ${src})`);
}

// keep aspect, cap the long side, compress (for gallery photos)
async function fit(src, out, cap, q = 80) {
  await sharp(IN(src)).rotate()
    .resize(cap, cap, { fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: q, mozjpeg: true, progressive: true })
    .toFile(OUT(out));
  const o = await sharp(OUT(out)).metadata();
  console.log(`✓ ${out.padEnd(26)} ${o.width}x${o.height}  ${(statSync(OUT(out)).size / 1024).toFixed(0)}KB  (from ${src})`);
}

await (async () => {
  // --- hero / floating-frame slots (face-safe portrait crops) ---
  await coverCrop("Sax 1.JPG", "photo-stage.jpg", 4, 5, { y: "top", cap: 1000 });
  await coverCrop("Sax pic.JPG", "photo-perform.jpg", 4, 5, { y: "top", cap: 1400 });
  await coverCrop("At Work.JPG", "photo-build.jpg", 4, 5, { y: "top", cap: 1600 });
  await coverCrop("On Mike but not a huge fan .JPG", "photo-lead.jpg", 4, 5, { y: "top", cap: 1280 });
  await coverCrop("At Work.JPG", "photo-candid.jpg", 1, 1, { y: "top", cap: 1200 });
  await coverCrop("Headshot.png", "portrait.jpg", 4, 5, { x: "center", y: "center", cap: 1400 });

  // --- Open Graph card background (his face, exact 1200x630) ---
  await coverExact("Headshot.png", "og-headshot.jpg", 1200, 630, { y: "center" });

  // --- gallery extras (keep aspect, just cap + compress) ---
  await fit("Mic 3.JPG", "gallery-mic.jpg", 1280);
  await fit("Trophies flex.JPG", "gallery-saxy-president.jpg", 1600);
  await fit("Another Trophy.JPG", "gallery-trophy-1.jpg", 1280);
  await fit("Trophy.JPG", "gallery-trophy-2.jpg", 1280);
  await fit("Team trophy win.JPG", "gallery-team.jpg", 1280);
  await fit("Presidenty poster.png", "gallery-poster.jpg", 1280);
})();
