import { ImageResponse } from "next/og";

export const alt = "Simon Mathias — builder, musician, operator";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// A tasteful generated fallback card (sky + sun + name). Reliable — no external
// font fetch. Swap in a portrait-based card later if you like.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          position: "relative",
          backgroundImage: "linear-gradient(180deg, #4fb8ff 0%, #9ad4f7 58%, #c7ecff 100%)",
          fontFamily: "sans-serif",
        }}
      >
        {/* sun */}
        <div
          style={{
            position: "absolute",
            top: 96,
            right: 130,
            width: 168,
            height: 168,
            borderRadius: 999,
            background: "#ffd23f",
            boxShadow: "0 0 90px 26px rgba(255,210,63,0.55)",
            display: "flex",
          }}
        />
        {/* sea band */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 150,
            backgroundImage: "linear-gradient(180deg, #28c0ce 0%, #0e7c8c 100%)",
            display: "flex",
          }}
        />

        {/* text */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "0 84px 200px",
            position: "relative",
          }}
        >
          <div
            style={{
              fontSize: 30,
              letterSpacing: 8,
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.85)",
              marginBottom: 14,
              display: "flex",
            }}
          >
            Toronto · builder · musician
          </div>
          <div
            style={{
              fontSize: 132,
              fontWeight: 800,
              color: "#ffffff",
              lineHeight: 1,
              letterSpacing: -3,
              textShadow: "0 4px 30px rgba(6,22,40,0.3)",
              display: "flex",
            }}
          >
            Simon Mathias
          </div>
          <div
            style={{
              fontSize: 38,
              fontWeight: 300,
              color: "rgba(255,255,255,0.92)",
              marginTop: 24,
              maxWidth: 920,
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
