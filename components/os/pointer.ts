"use client";

import { useEffect } from "react";
import { motionValue } from "motion/react";

/**
 * Shared pointer position as MotionValues so the spotlight, custom cursor, and
 * parallax can all read it without triggering React re-renders. One tracker,
 * many consumers.
 */
export const pointerX = motionValue(0);
export const pointerY = motionValue(0);
export const pointerDown = motionValue(0);

export function usePointerTracker(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;

    pointerX.set(window.innerWidth / 2);
    pointerY.set(window.innerHeight / 2);

    const move = (e: PointerEvent) => {
      pointerX.set(e.clientX);
      pointerY.set(e.clientY);
    };
    const down = () => pointerDown.set(1);
    const up = () => pointerDown.set(0);

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", down, { passive: true });
    window.addEventListener("pointerup", up, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
    };
  }, [enabled]);
}
