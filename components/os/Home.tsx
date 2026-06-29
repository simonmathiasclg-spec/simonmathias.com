"use client";

import { motion, useReducedMotion } from "motion/react";
import { RocketLaunch, ArrowRight } from "@phosphor-icons/react";
import { useOS } from "@/lib/os-store";
import { playNote } from "@/lib/sound";

export default function Home() {
  const reduce = useReducedMotion();
  const openApp = useOS((s) => s.openApp);
  const sound = useOS((s) => s.sound);

  const openYC = () => {
    if (sound) playNote(523.25);
    openApp("startup-school");
  };

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[5] flex flex-col items-center justify-center px-6 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduce ? 0 : 0.5, ease: "easeOut" }}
    >
      <motion.div
        className="mt-36 flex flex-col items-center gap-5"
        initial={reduce ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
      >
        <p className="sky-text-shadow font-mono text-[12px] uppercase tracking-[0.34em] text-white/75">
          Toronto · builder · musician
        </p>
        <h1 className="sky-text-shadow font-display text-[clamp(3rem,9vw,6rem)] font-extrabold leading-[0.92] tracking-[-0.035em] text-white">
          Simon Mathias
        </h1>
        <p className="sky-text-shadow max-w-[36ch] text-pretty text-[clamp(1rem,1.5vw,1.3rem)] font-light leading-snug text-white/85">
          Obsessed with how people work, on stage and in software.
        </p>

        {/* primary call-to-action — the YC centerpiece */}
        <motion.button
          type="button"
          onClick={openYC}
          aria-label="Why YC Startup School: open the founder's notes"
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: reduce ? 0 : 0.55, ease: [0.16, 1, 0.3, 1] }}
          whileHover={reduce ? undefined : { y: -3, scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="cursor-hover pointer-events-auto group mt-1 inline-flex items-center gap-2.5 rounded-full bg-saffron px-7 py-3.5 font-mono text-[14px] font-bold uppercase tracking-[0.08em] text-[#2a1d04] shadow-[0_14px_40px_-8px_rgba(255,210,63,0.75)] ring-1 ring-[color-mix(in_srgb,var(--saffron)_55%,white)]"
        >
          <RocketLaunch weight="fill" className="size-5" />
          Why YC Startup School
          <ArrowRight
            weight="bold"
            className="size-4 transition-transform duration-200 group-hover:translate-x-1"
          />
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
