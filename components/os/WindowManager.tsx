"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "motion/react";
import { useOS, type AppId } from "@/lib/os-store";
import { APP_MAP } from "@/lib/apps";
import Window from "./Window";

const clamp = (v: number, min: number, max: number) =>
  Math.max(min, Math.min(max, v));

export default function WindowManager() {
  const containerRef = useRef<HTMLDivElement>(null);
  const placed = useRef<Record<string, { left: number; top: number }>>({});
  const [size, setSize] = useState({ w: 0, h: 0 });

  const windows = useOS((s) => s.windows);
  const focusedId = useOS((s) => s.focusedId);
  const focusApp = useOS((s) => s.focusApp);
  const closeApp = useOS((s) => s.closeApp);

  // measure the draggable region
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const measure = () =>
      setSize({ w: el.clientWidth, h: el.clientHeight });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Escape closes the focused window
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && focusedId) closeApp(focusedId);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [focusedId, closeApp]);

  // forget placement when a window closes (so reopening re-cascades)
  useEffect(() => {
    const openIds = new Set(windows.map((w) => w.id));
    for (const id of Object.keys(placed.current)) {
      if (!openIds.has(id as AppId)) delete placed.current[id];
    }
  }, [windows]);

  const place = (id: AppId, w: number, h: number) => {
    if (placed.current[id]) return placed.current[id];
    let pos: { left: number; top: number };
    if (id === "about") {
      pos = {
        left: (size.w - w) / 2,
        top: clamp((size.h - h) / 2 - 16, 16, size.h - h - 16),
      };
    } else {
      const k = Object.keys(placed.current).length;
      pos = {
        left: clamp(size.w * 0.5 - w * 0.5 + k * 36 - 54, 14, size.w - w - 14),
        top: clamp(44 + k * 34, 16, Math.max(16, size.h - h - 16)),
      };
    }
    placed.current[id] = pos;
    return pos;
  };

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-x-0 bottom-[78px] top-10 z-10"
    >
      <AnimatePresence>
        {size.w > 0 &&
          windows.map((w) => {
            const app = APP_MAP[w.id];
            const width = clamp(app.window.w, 320, size.w - 28);
            const height = clamp(app.window.h, 280, size.h - 28);
            const pos = place(w.id, width, height);
            return (
              <Window
                key={w.id}
                app={app}
                z={w.z}
                focused={focusedId === w.id}
                left={clamp(pos.left, 8, Math.max(8, size.w - width - 8))}
                top={clamp(pos.top, 8, Math.max(8, size.h - height - 8))}
                width={width}
                height={height}
                constraintsRef={containerRef}
                onFocus={() => focusApp(w.id)}
                onClose={() => closeApp(w.id)}
              />
            );
          })}
      </AnimatePresence>
    </div>
  );
}
