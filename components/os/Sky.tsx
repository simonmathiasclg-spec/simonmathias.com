"use client";

import { motion, useSpring, useTransform } from "motion/react";
import { pointerX, pointerY } from "./pointer";

/* deterministic scatter (same on server + client, no hydration drift) */
const STARS = Array.from({ length: 44 }, (_, i) => ({
  left: (i * 97.13) % 100,
  top: (i * 41.7) % 56,
  size: 1 + ((i * 7) % 3) * 0.6,
  delay: (i % 9) * 0.5,
  dur: 2.6 + (i % 5) * 0.7,
}));

const CLOUDS = [
  { top: 12, w: 230, h: 70, dur: 120, delay: -20, o: 0.95, scale: 1 },
  { top: 26, w: 170, h: 54, dur: 165, delay: -90, o: 0.8, scale: 0.9 },
  { top: 8, w: 300, h: 88, dur: 200, delay: -140, o: 0.7, scale: 1.1 },
  { top: 38, w: 150, h: 46, dur: 145, delay: -50, o: 0.65, scale: 0.8 },
];

function Cloud({ w, h }: { w: number; h: number }) {
  return (
    <div style={{ width: w, height: h, filter: "blur(3px)" }} className="relative">
      {[
        { l: 0, t: 30, s: 60 },
        { l: 22, t: 8, s: 78 },
        { l: 48, t: 18, s: 66 },
        { l: 30, t: 38, s: 90 },
        { l: 64, t: 34, s: 58 },
      ].map((p, i) => (
        <span
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${p.l}%`,
            top: `${p.t}%`,
            width: `${p.s}%`,
            height: `${p.s}%`,
            background:
              "radial-gradient(circle at 42% 40%, var(--cloud) 0%, var(--cloud) 34%, var(--cloud-2) 60%, transparent 82%)",
          }}
        />
      ))}
    </div>
  );
}

function Bird({ top, dur, delay, scale = 1 }: { top: number; dur: number; delay: number; scale?: number }) {
  return (
    <div
      className="anim-bird absolute left-0"
      style={{ top: `${top}%`, animationDuration: `${dur}s`, animationDelay: `${delay}s` }}
    >
      <svg width={26 * scale} height={12 * scale} viewBox="0 0 26 12" fill="none">
        <g className="anim-wing" style={{ animationDuration: "0.5s" }}>
          <path d="M1 8 Q7 1 13 7 Q19 1 25 8" stroke="rgba(255,255,255,0.6)" strokeWidth="1.6" strokeLinecap="round" fill="none" />
        </g>
      </svg>
    </div>
  );
}

export default function Sky({ parallax, reduced = false }: { parallax: boolean; reduced?: boolean }) {
  const animate = !reduced;

  const pxs = useSpring(pointerX, { stiffness: 36, damping: 20, mass: 1 });
  const pys = useSpring(pointerY, { stiffness: 36, damping: 20, mass: 1 });
  const par = (v: number, amt: number, axis: "w" | "h") =>
    parallax && typeof window !== "undefined"
      ? (v / (axis === "w" ? window.innerWidth : window.innerHeight) - 0.5) * amt
      : 0;

  const cloudX = useTransform(pxs, (v) => par(v, -28, "w"));
  const cloudY = useTransform(pys, (v) => par(v, -16, "h"));
  const farX = useTransform(pxs, (v) => par(v, -14, "w"));
  const farY = useTransform(pys, (v) => par(v, -9, "h"));

  const dayGrad =
    "linear-gradient(180deg, var(--day-sky-top) 0%, color-mix(in srgb, var(--day-sky-top) 55%, var(--day-sky-horizon)) 52%, var(--day-sky-horizon) 100%)";
  const nightGrad =
    "linear-gradient(180deg, var(--night-sky-top) 0%, color-mix(in srgb, var(--night-sky-top) 60%, var(--night-sky-horizon)) 55%, var(--night-sky-horizon) 100%)";

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-desk">
      {/* sky gradient crossfade */}
      <div className="layer-day swap absolute inset-0" style={{ background: dayGrad }} />
      <div className="layer-night swap absolute inset-0" style={{ background: nightGrad }} />

      {/* stars (night) */}
      <div className="layer-night swap absolute inset-0">
        {STARS.map((s, i) => (
          <span
            key={i}
            className={animate ? "anim-twinkle absolute rounded-full bg-white" : "absolute rounded-full bg-white"}
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: s.size,
              height: s.size,
              opacity: animate ? undefined : 0.8,
              animationDelay: `${s.delay}s`,
              animationDuration: `${s.dur}s`,
            }}
          />
        ))}
      </div>

      {/* clouds (day) — fade out at night */}
      <motion.div style={{ x: cloudX, y: cloudY }} className="layer-day swap absolute inset-0">
        {(reduced ? CLOUDS.slice(0, 2) : CLOUDS).map((c, i) => (
          <div
            key={i}
            className={animate ? "anim-cloud absolute" : "absolute"}
            style={{
              top: `${c.top}%`,
              left: 0,
              opacity: c.o,
              animationDuration: `${c.dur}s`,
              animationDelay: `${c.delay}s`,
              transform: animate ? undefined : `translateX(${15 + i * 22}%)`,
            }}
          >
            <div style={{ transform: `scale(${c.scale})` }}>
              <Cloud w={c.w} h={c.h} />
            </div>
          </div>
        ))}
      </motion.div>

      {/* celestial bodies + island (far parallax) */}
      <motion.div style={{ x: farX, y: farY }} className="absolute inset-0">
        {/* SUN — arcs down on the right at night */}
        <div className="celestial-arm sun-arm" style={{ left: "76%", top: "67%" }}>
          <div
            className="sun-body swap"
            style={{ position: "absolute", left: 0, top: "-46vh", width: 106, height: 106, transform: "translate(-50%,-50%)" }}
          >
            <div
              style={{
                position: "absolute",
                inset: -120,
                background:
                  "radial-gradient(circle, color-mix(in srgb, var(--sun) 60%, transparent) 0%, color-mix(in srgb, var(--sun) 14%, transparent) 36%, transparent 66%)",
              }}
            />
            <div
              className={animate ? "anim-sun" : ""}
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "9999px",
                background: "var(--sun)",
                boxShadow: "0 0 64px 10px color-mix(in srgb, var(--sun) 60%, transparent)",
                animationDuration: "7s",
              }}
            />
          </div>
        </div>

        {/* MOON — rises on the left at night */}
        <div className="celestial-arm moon-arm" style={{ left: "24%", top: "67%" }}>
          <div
            className="moon-body swap"
            style={{ position: "absolute", left: 0, top: "-46vh", width: 84, height: 84, transform: "translate(-50%,-50%)" }}
          >
            <div
              style={{
                position: "absolute",
                inset: -90,
                background:
                  "radial-gradient(circle, color-mix(in srgb, var(--moon, #ede6cf) 42%, transparent) 0%, transparent 60%)",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "9999px",
                background: "var(--moon, #ede6cf)",
                boxShadow: "0 0 46px 6px color-mix(in srgb, var(--moon, #ede6cf) 50%, transparent)",
              }}
            >
              <span className="absolute left-[26%] top-[30%] size-3 rounded-full bg-black/10" />
              <span className="absolute right-[24%] top-[50%] size-2 rounded-full bg-black/10" />
              <span className="absolute left-[44%] top-[66%] size-1.5 rounded-full bg-black/10" />
            </div>
          </div>
        </div>

        {/* small, distant island — a refined silhouette with a graceful palm */}
        <div className="absolute left-[12%] bottom-[31.5%] origin-bottom opacity-90">
          <svg
            width="126"
            height="58"
            viewBox="0 0 126 58"
            fill="none"
            className="swap-fill drop-shadow-[0_3px_5px_rgba(6,22,40,0.18)]"
            style={{ overflow: "visible" }}
          >
            {/* low, long landmass — flatter + better proportioned than a cartoon hump */}
            <path
              d="M1 56 C18 44 36 39 63 39 C90 39 108 45 125 56 Z"
              fill="var(--island)"
            />
            {/* a slim sand shelf catches a touch of light along the top */}
            <path
              d="M16 52 C34 44 92 44 110 52"
              stroke="color-mix(in srgb, var(--island) 62%, white 30%)"
              strokeWidth="1.4"
              strokeLinecap="round"
              fill="none"
              opacity="0.5"
            />
            {/* palm — gently curved trunk */}
            <path
              d="M59 40 C56 28 58 16 62 7"
              stroke="var(--palm)"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
            {/* a full, drooping crown — fronds arc up from one point then dip at the tips */}
            <g stroke="var(--palm)" strokeWidth="1.9" strokeLinecap="round" fill="none">
              <path d="M61 7 C50 1 42 4 36 11" />
              <path d="M61 7 C72 1 80 4 86 11" />
              <path d="M61 7 C53 -3 47 -3 41 0" />
              <path d="M61 7 C69 -3 75 -3 81 0" />
              <path d="M61 7 C56 -5 52 -9 49 -11" />
              <path d="M61 7 C66 -5 70 -9 73 -11" />
            </g>
            {/* two little coconuts at the crown */}
            <g fill="var(--palm)">
              <circle cx="59" cy="9.5" r="1.5" />
              <circle cx="63.5" cy="9.5" r="1.5" />
            </g>
          </svg>
        </div>
      </motion.div>

      {/* occasional birds */}
      {animate && (
        <>
          <Bird top={19} dur={46} delay={-8} />
          <Bird top={13} dur={62} delay={-34} scale={0.8} />
        </>
      )}

      {/* SEA (crossfades day↔night) */}
      <div className="absolute inset-x-0 bottom-0 h-[32%] overflow-hidden">
        <div
          className="layer-day swap absolute inset-0"
          style={{ background: "linear-gradient(180deg, var(--day-sea-top) 0%, var(--day-sea-deep) 100%)" }}
        />
        <div
          className="layer-night swap absolute inset-0"
          style={{ background: "linear-gradient(180deg, var(--night-sea-top) 0%, var(--night-sea-deep) 100%)" }}
        />

        {/* SUN reflection (day) — a glowing column under the sun that breathes +
            shimmers on the ripples. MOON reflection (night) sits left. */}
        <div
          className="layer-day swap absolute bottom-0 left-[70%] h-full w-[150px] -translate-x-1/2 overflow-hidden"
          style={{ maskImage: "linear-gradient(90deg, transparent, black 32%, black 68%, transparent)", WebkitMaskImage: "linear-gradient(90deg, transparent, black 32%, black 68%, transparent)" }}
        >
          <div
            className={animate ? "anim-reflect-breathe absolute inset-0" : "absolute inset-0"}
            style={{ animationDuration: "6.5s", background: "linear-gradient(180deg, var(--day-streak) 0%, transparent 86%)", filter: "blur(8px)" }}
          />
          <div
            className={`absolute inset-0 mix-blend-screen ${animate ? "anim-reflect-drift" : ""}`}
            style={{
              animationDuration: "3.6s",
              opacity: 0.4,
              filter: "blur(0.6px)",
              maskImage: "linear-gradient(180deg, black 0%, transparent 80%)",
              WebkitMaskImage: "linear-gradient(180deg, black 0%, transparent 80%)",
              background: "repeating-linear-gradient(180deg, transparent 0 9px, color-mix(in srgb, var(--day-streak) 60%, white) 9px 10.5px)",
            }}
          />
        </div>
        <div
          className="layer-night swap absolute bottom-0 left-[30%] h-full w-[130px] -translate-x-1/2 overflow-hidden"
          style={{ maskImage: "linear-gradient(90deg, transparent, black 32%, black 68%, transparent)", WebkitMaskImage: "linear-gradient(90deg, transparent, black 32%, black 68%, transparent)" }}
        >
          <div
            className={animate ? "anim-reflect-breathe absolute inset-0" : "absolute inset-0"}
            style={{ animationDuration: "7.5s", background: "linear-gradient(180deg, var(--night-streak) 0%, transparent 86%)", filter: "blur(8px)" }}
          />
          <div
            className={`absolute inset-0 mix-blend-screen ${animate ? "anim-reflect-drift" : ""}`}
            style={{
              animationDuration: "4.4s",
              opacity: 0.36,
              filter: "blur(0.6px)",
              maskImage: "linear-gradient(180deg, black 0%, transparent 80%)",
              WebkitMaskImage: "linear-gradient(180deg, black 0%, transparent 80%)",
              background: "repeating-linear-gradient(180deg, transparent 0 10px, color-mix(in srgb, var(--night-streak) 66%, white) 10px 11.5px)",
            }}
          />
        </div>

        {/* waves near the waterline */}
        <div className={`swap-fill absolute inset-x-0 top-0 ${animate ? "anim-wave-bob" : ""}`} style={{ animationDuration: "7s" }}>
          <div className={`absolute -top-2 left-0 h-12 w-[200%] ${animate ? "anim-wave-x" : ""}`} style={{ animationDuration: "26s", opacity: 0.5 }}>
            <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="h-full w-full">
              <path d="M0,40 C120,12 240,12 360,40 C480,68 600,68 720,40 C840,12 960,12 1080,40 C1200,68 1320,68 1440,40 L1440,80 L0,80 Z" fill="color-mix(in srgb, var(--sea-top) 70%, white 16%)" />
            </svg>
          </div>
          <div className={`absolute top-1 left-0 h-12 w-[200%] ${animate ? "anim-wave-x" : ""}`} style={{ animationDuration: "18s", opacity: 0.9 }}>
            <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="h-full w-full">
              <path d="M0,44 C120,20 240,20 360,44 C480,68 600,68 720,44 C840,20 960,20 1080,44 C1200,68 1320,68 1440,44 L1440,80 L0,80 Z" fill="var(--sea-top)" />
            </svg>
          </div>
        </div>

        {/* slow soft sheen gliding across the surface — calm, premium shimmer */}
        <div
          className={`absolute inset-x-0 top-0 h-2/3 mix-blend-screen ${animate ? "anim-sea-sheen" : ""}`}
          style={{
            animationDuration: "15s",
            opacity: 0.5,
            maskImage: "linear-gradient(180deg, black 0%, transparent 88%)",
            WebkitMaskImage: "linear-gradient(180deg, black 0%, transparent 88%)",
            background:
              "radial-gradient(120% 70% at 50% -10%, color-mix(in srgb, var(--sea-streak) 24%, transparent) 0%, transparent 58%)",
          }}
        />
        {/* the faintest static ripple texture for grain under the sheen */}
        <div
          className="absolute inset-0"
          style={{
            opacity: 0.16,
            maskImage: "linear-gradient(180deg, rgba(0,0,0,0.85) 0%, transparent 62%)",
            WebkitMaskImage: "linear-gradient(180deg, rgba(0,0,0,0.85) 0%, transparent 62%)",
            background: "repeating-linear-gradient(180deg, transparent 0 30px, color-mix(in srgb, var(--sea-streak) 16%, transparent) 30px 31px)",
          }}
        />
      </div>

      {/* soft top scrim so the menubar stays legible */}
      <div className="absolute inset-x-0 top-0 h-24" style={{ background: "linear-gradient(180deg, rgba(6,22,40,0.22), transparent)" }} />
    </div>
  );
}
