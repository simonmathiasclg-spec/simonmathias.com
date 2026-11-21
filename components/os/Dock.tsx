"use client";

import { motion, useReducedMotion } from "motion/react";
import { useOS } from "@/lib/os-store";
import { DOCK_APPS } from "@/lib/apps";

/**
 * The section bar along the bottom of the sky: a solid strip of paper with text
 * links. An open section gets a sky-blue underline.
 */
export default function Dock({ show }: { show: boolean }) {
  const reduce = useReducedMotion();
  const openApp = useOS((s) => s.openApp);
  const windows = useOS((s) => s.windows);
  const focusedId = useOS((s) => s.focusedId);

  return (
    <motion.nav
      aria-label="Sections"
      initial={false}
      animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: reduce ? 0 : 16 }}
      transition={reduce ? { duration: 0 } : { duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 bottom-0 z-[100] flex justify-center pb-4"
    >
      <ul className="flex items-stretch rounded-md border border-hair-strong bg-window px-2 shadow-[var(--win-shadow)]">
        {DOCK_APPS.map((app) => {
          const open = windows.some((w) => w.id === app.id);
          const focused = focusedId === app.id;
          return (
            <li key={app.id}>
              <button
                onClick={() => openApp(app.id)}
                aria-label={`Open ${app.name}`}
                aria-current={focused ? "page" : undefined}
                className="cursor-hover group relative block px-4 py-3 text-[14.5px] font-medium text-ink-muted transition-colors hover:text-ink aria-[current=page]:text-ink"
              >
                {app.dockLabel}
                <span
                  aria-hidden
                  className={`absolute inset-x-4 bottom-2 h-[2px] bg-sky transition-opacity duration-200 ${
                    open ? "opacity-100" : "opacity-0 group-hover:opacity-40"
                  }`}
                />
              </button>
            </li>
          );
        })}
      </ul>
    </motion.nav>
  );
}
