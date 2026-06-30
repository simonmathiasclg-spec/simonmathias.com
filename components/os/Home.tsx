"use client";

import { motion, useReducedMotion } from "motion/react";
import { CaretDown } from "@phosphor-icons/react";

export default function Home() {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[5] flex flex-col items-center justify-center px-6 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduce ? 0 : 0.5, ease: "easeOut" }}
    >
      <motion.div
        className="mt-20 flex flex-col items-center gap-5"
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
      </motion.div>

      {/* hint toward the dock */}
      <motion.div
        className="absolute bottom-[118px] flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: reduce ? 0 : 1.1, duration: 0.6 }}
      >
        <span className="sky-text-shadow font-mono text-[11px] uppercase tracking-[0.28em] text-white/70">
          where to start
        </span>
        <motion.span
          animate={reduce ? undefined : { y: [0, 5, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="text-white/70"
        >
          <CaretDown weight="bold" className="size-4 drop-shadow-[0_2px_6px_rgba(6,22,40,0.4)]" />
        </motion.span>
      </motion.div>
    </motion.div>
  );
}
