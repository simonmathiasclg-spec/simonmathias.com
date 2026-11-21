"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { introSound } from "@/lib/sound";

type Phase = "fall" | "splash" | "rise" | "resolve";

export default function Intro({
  instant,
  quick,
  night,
  sound,
  onComplete,
}: {
  instant: boolean;
  quick: boolean;
  night: boolean;
  sound: boolean;
  onComplete: () => void;
}) {
  const [phase, setPhase] = useState<Phase>(instant ? "resolve" : "fall");
  const [h, setH] = useState(0);
  const done = useRef(false);

  const finish = () => {
    if (done.current) return;
    done.current = true;
    onComplete();
  };

  useEffect(() => {
    setH(window.innerHeight);
    const timers: ReturnType<typeof setTimeout>[] = [];
    const at = (fn: () => void, ms: number) => timers.push(setTimeout(fn, ms));
    const k = quick ? 0.66 : 1;

    if (instant) {
      at(finish, 460);
    } else {
      if (sound) introSound("woosh");
      at(() => {
        setPhase("splash");
        if (sound) {
          introSound("splash");
          setTimeout(() => introSound("ding"), 110);
        }
      }, 900 * k);
      at(() => setPhase("rise"), 1320 * k);
      at(() => setPhase("resolve"), 2150 * k);
      at(finish, 2400 * k);
    }

    // arm skip after a beat, so a click/scroll still settling from page load
    // can't instantly skip the intro
    let canSkip = false;
    timers.push(setTimeout(() => (canSkip = true), 300));
    const skip = () => {
      if (canSkip) finish();
    };
    window.addEventListener("keydown", skip);
    window.addEventListener("pointerdown", skip);
    window.addEventListener("wheel", skip, { passive: true });
    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
      window.removeEventListener("wheel", skip);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const impactY = h ? h * 0.66 : 0;
  const resolved = phase === "rise" || phase === "resolve";
  const splashing = phase === "splash" || resolved;
  const fallDur = quick ? 0.62 : 0.9;

  return (
    <motion.div
      className="fixed inset-0 z-[110] overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: instant ? 0.3 : 0.7, ease: "easeInOut" }}
    >
      {/* calm pre-sky */}
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{
          opacity: resolved ? 0 : 1,
          background: night
            ? "linear-gradient(180deg, #0a1430 0%, #0e2148 100%)"
            : "linear-gradient(180deg, #dff1ff 0%, #f3fbff 100%)",
        }}
      />

      {/* resolved sky (matches the live Sky so the hand-off is seamless) */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: instant ? 1 : 0 }}
        animate={{ opacity: resolved ? 1 : instant ? 1 : 0 }}
        transition={{ duration: 0.9, ease: "easeInOut" }}
        style={{
          background:
            "linear-gradient(180deg, var(--sky-top) 0%, color-mix(in srgb, var(--sky-top) 55%, var(--sky-horizon)) 52%, var(--sky-horizon) 100%)",
        }}
      >
        <div
          className="absolute right-[14%] top-[40%]"
          style={{
            width: 106,
            height: 106,
            borderRadius: 9999,
            transform: "translate(50%,-50%)",
            background: night ? "var(--moon)" : "var(--sun)",
          }}
        />
      </motion.div>

      {/* the rising sea */}
      <motion.div
        className="absolute inset-x-0 bottom-0 h-[32%] origin-bottom"
        initial={{ scaleY: instant ? 1 : 0 }}
        animate={{ scaleY: resolved || instant ? 1 : 0 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background: "linear-gradient(180deg, var(--sea-top) 0%, var(--sea-deep) 100%)",
        }}
      >
        <div
          className="absolute inset-x-0 top-0 h-1.5"
          style={{ background: "color-mix(in srgb, var(--sea-top) 60%, white 26%)" }}
        />
      </motion.div>

      {/* droplet */}
      {!instant && phase === "fall" && h > 0 && (
        <motion.div
          className="absolute left-1/2 top-0"
          style={{ x: "-50%" }}
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: impactY, opacity: [0, 1, 1, 1], scaleY: [1, 1.35, 1.5] }}
          transition={{ duration: fallDur, ease: [0.55, 0, 1, 0.45] }}
        >
          <svg width="22" height="30" viewBox="0 0 22 30" fill="none">
            <defs>
              <radialGradient id="drop" cx="38%" cy="32%" r="70%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="45%" stopColor="#bfe6ff" />
                <stop offset="100%" stopColor="#4fb8ff" />
              </radialGradient>
            </defs>
            <path
              d="M11 0 C11 0 21 13 21 20 A10 10 0 1 1 1 20 C1 13 11 0 11 0 Z"
              fill="url(#drop)"
            />
          </svg>
        </motion.div>
      )}

      {/* splash: ripple rings + droplets */}
      {!instant && splashing && h > 0 && (
        <div
          className="absolute left-1/2"
          style={{ top: impactY, transform: "translate(-50%,-50%)" }}
        >
          {[0, 0.14, 0.28].map((d, i) => (
            <motion.span
              key={i}
              className="absolute left-1/2 top-1/2 rounded-full border-2"
              style={{
                width: 40,
                height: 40,
                marginLeft: -20,
                marginTop: -20,
                borderColor: "color-mix(in srgb, var(--sea-top) 50%, white 40%)",
              }}
              initial={{ scale: 0.2, opacity: 0.75 }}
              animate={{ scale: 3.6 - i * 0.5, opacity: 0 }}
              transition={{ duration: 1, delay: d, ease: "easeOut" }}
            />
          ))}
          {[-34, -18, 0, 18, 34].map((dx, i) => (
            <motion.span
              key={`d${i}`}
              className="absolute left-1/2 top-1/2 rounded-full bg-white"
              style={{ width: 5, height: 5, marginLeft: -2.5, marginTop: -2.5 }}
              initial={{ x: 0, y: 0, opacity: 0 }}
              animate={{ x: dx, y: [0, -34 - Math.abs(dx) * 0.4, 6], opacity: [1, 1, 0] }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}
