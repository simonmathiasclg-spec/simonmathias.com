"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useTransform } from "motion/react";
import { pointerX, pointerY } from "./pointer";

export default function CustomCursor() {
  const [hovering, setHovering] = useState(false);
  const [pressing, setPressing] = useState(false);
  const [visible, setVisible] = useState(false);

  // dot tracks almost instantly; ring trails with weight
  const dotX = useSpring(pointerX, { stiffness: 1400, damping: 70, mass: 0.2 });
  const dotY = useSpring(pointerY, { stiffness: 1400, damping: 70, mass: 0.2 });
  const ringX = useSpring(pointerX, { stiffness: 280, damping: 26, mass: 0.5 });
  const ringY = useSpring(pointerY, { stiffness: 280, damping: 26, mass: 0.5 });

  const dx = useTransform(dotX, (v) => v - 3);
  const dy = useTransform(dotY, (v) => v - 3);
  const rx = useTransform(ringX, (v) => v - 17);
  const ry = useTransform(ringY, (v) => v - 17);

  useEffect(() => {
    document.body.classList.add("cursor-hidden");

    const over = (e: PointerEvent) => {
      const t = e.target as HTMLElement | null;
      setHovering(
        !!t?.closest('a, button, [role="button"], input, label, .cursor-hover'),
      );
    };
    const down = () => setPressing(true);
    const up = () => setPressing(false);
    const enter = () => setVisible(true);
    const leave = () => setVisible(false);

    window.addEventListener("pointerover", over, { passive: true });
    window.addEventListener("pointerdown", down, { passive: true });
    window.addEventListener("pointerup", up, { passive: true });
    window.addEventListener("pointermove", enter, { passive: true, once: true });
    document.addEventListener("pointerleave", leave);
    document.addEventListener("pointerenter", enter);

    return () => {
      document.body.classList.remove("cursor-hidden");
      window.removeEventListener("pointerover", over);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      document.removeEventListener("pointerleave", leave);
      document.removeEventListener("pointerenter", enter);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[120] mix-blend-difference"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <motion.div
        style={{ x: rx, y: ry }}
        className="absolute left-0 top-0 grid h-[34px] w-[34px] place-items-center rounded-full border border-white"
        animate={{
          scale: pressing ? 0.72 : hovering ? 1.55 : 1,
          opacity: hovering ? 1 : 0.7,
        }}
        transition={{ type: "spring", stiffness: 320, damping: 22 }}
      />
      <motion.div
        style={{ x: dx, y: dy }}
        className="absolute left-0 top-0 h-[6px] w-[6px] rounded-full bg-white"
        animate={{ scale: hovering ? 0 : pressing ? 1.6 : 1 }}
        transition={{ type: "spring", stiffness: 320, damping: 22 }}
      />
    </div>
  );
}
