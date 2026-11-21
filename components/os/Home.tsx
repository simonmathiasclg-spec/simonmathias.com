"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * The sky home's headline. Set like a poster: dark serif ink straight on the sky
 * by day (light by night), left-aligned in the clear middle of the scene.
 */
export default function Home() {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[5] flex items-center justify-center px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduce ? 0 : 0.5, ease: "easeOut" }}
    >
      <motion.div
        className="mt-24 w-full max-w-[min(720px,56vw)] text-left"
        initial={reduce ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
      >
        <p className="sky-ink-muted text-[15px] font-medium">Builder, performer, learner.</p>
        <h1 className="sky-ink mt-2 font-display text-[clamp(3.4rem,8vw,6.6rem)] font-medium leading-[0.95] tracking-[-0.02em]">
          Simon Mathias
        </h1>
        <p className="sky-ink mt-4 font-display text-[clamp(1.25rem,1.9vw,1.6rem)] italic leading-snug">
          Enthusiasm everywhere I go.
        </p>
      </motion.div>
    </motion.div>
  );
}
