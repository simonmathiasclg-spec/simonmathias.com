"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useOS } from "@/lib/os-store";
import { playNote } from "@/lib/sound";

const SECRET = "luffy"; // Monkey D. Luffy — no overlap with the a/w/p/s/g/c shortcuts

function StrawHat() {
  return (
    <svg viewBox="0 0 48 30" width="34" height="22" aria-hidden>
      <ellipse cx="24" cy="22" rx="22" ry="6.5" fill="#E8C667" />
      <ellipse cx="24" cy="22" rx="22" ry="6.5" fill="none" stroke="#C99A3A" strokeWidth="1" opacity="0.5" />
      <path d="M9 22 Q11 7 24 6 Q37 7 39 22 Z" fill="#F0D27A" />
      <rect x="10" y="18.5" width="28" height="4" rx="2" fill="#D34B3E" />
      <path d="M9 22 Q11 7 24 6 Q37 7 39 22" fill="none" stroke="#C99A3A" strokeWidth="1" opacity="0.4" />
    </svg>
  );
}

export default function EasterEgg() {
  const [show, setShow] = useState(false);
  const buf = useRef("");
  const sound = useOS((s) => s.sound);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
      if (e.key.length !== 1 || e.metaKey || e.ctrlKey || e.altKey) return;
      buf.current = (buf.current + e.key.toLowerCase()).slice(-SECRET.length);
      if (buf.current === SECRET) {
        buf.current = "";
        setShow(true);
        if (sound) {
          playNote(523.25);
          window.setTimeout(() => playNote(659.25), 130);
        }
        window.setTimeout(() => setShow(false), 3600);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [sound]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 26, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 16, opacity: 0 }}
          transition={{ type: "spring", stiffness: 320, damping: 24 }}
          className="pointer-events-none fixed bottom-24 left-1/2 z-[115] flex -translate-x-1/2 items-center gap-2.5 rounded-[4px] border border-hair-strong bg-window py-2 pl-3 pr-4 shadow-[var(--win-shadow)]"
        >
          <motion.span
            initial={{ rotate: -16, y: -2 }}
            animate={{ rotate: [-16, 6, -16], y: [-2, 0, -2] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <StrawHat />
          </motion.span>
          <span className="font-display text-[16px] italic text-ink">
            The One Piece is real.
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
