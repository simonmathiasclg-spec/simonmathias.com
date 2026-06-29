import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import { join } from "node:path";

export const alt = "Simon Mathias — builder, musician, operator";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Simon's real headshot, pre-cropped to 1200x630, embedded as a data URI so the
// card renders with zero network fetches at build time.
const photo = readFileSync(join(process.cwd(), "public", "photos", "og-headshot.jpg"));
const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          fontFamily: "sans-serif",
          backgroundColor: "#0a1b3a",
        }}
      >
        {/* the headshot, full-bleed */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photoSrc}
          width={1200}
          height={630}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />

        {/* readability scrim — dark at the bottom, clear over the face */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            backgroundImage:
              "linear-gradient(180deg, rgba(8,18,33,0.05) 0%, rgba(8,18,33,0.12) 40%, rgba(8,18,33,0.78) 84%, rgba(8,18,33,0.95) 100%)",
          }}
        />

        {/* saffron accent bar */}
        <div
          style={{
            position: "absolute",
            left: 64,
            bottom: 188,
            width: 72,
            height: 6,
            borderRadius: 3,
            background: "#ffd23f",
            display: "flex",
          }}
        />

        {/* text */}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            height: "100%",
            width: "100%",
            padding: "0 64px 54px",
          }}
        >
          <div
            style={{
              fontSize: 26,
              letterSpacing: 7,
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.82)",
              marginBottom: 14,
              display: "flex",
            }}
          >
            Toronto · builder · musician
          </div>
          <div
            style={{
              fontSize: 116,
              fontWeight: 800,
              color: "#ffffff",
              lineHeight: 1,
              letterSpacing: -3,
              textShadow: "0 4px 30px rgba(6,22,40,0.45)",
              display: "flex",
            }}
          >
            Simon Mathias
          </div>
          <div
            style={{
              fontSize: 33,
              fontWeight: 300,
              color: "rgba(255,255,255,0.9)",
              marginTop: 20,
              maxWidth: 720,
              display: "flex",
            }}
          >
            Obsessed with how people work — on stage and in software.
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
