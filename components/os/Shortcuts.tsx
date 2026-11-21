"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useOS } from "@/lib/os-store";
import type { AppId } from "@/lib/app-ids";

// letters avoid the easter-egg secret ("luffy"), hence p(resident) for
// leadership and j for pro(j)ects
const BY_LETTER: Record<string, AppId> = {
  a: "about",
  w: "work",
  j: "projects",
  m: "music-stage",
  p: "leadership",
  g: "goofy",
  c: "contact",
};
// numbers follow dock order
const BY_NUMBER: Record<string, AppId> = {
  "1": "about",
  "2": "work",
  "3": "projects",
  "4": "music-stage",
  "5": "leadership",
  "6": "goofy",
  "7": "contact",
};

const ROWS: { key: string; label: string }[] = [
  { key: "a", label: "About" },
  { key: "w", label: "Work" },
  { key: "j", label: "Projects" },
  { key: "m", label: "Music & Stage" },
  { key: "p", label: "Leadership" },
  { key: "g", label: "Goofy" },
  { key: "c", label: "Contact" },
];

export default function Shortcuts() {
  const [open, setOpen] = useState(false);
  const openApp = useOS((s) => s.openApp);
  // the lightbox owns the keyboard while it's up (esc / ← / →), so a stray
  // letter shouldn't open a window invisibly behind it
  const viewerOpen = useOS((s) => s.photoViewer) !== null;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (
        t &&
        (t.tagName === "INPUT" ||
          t.tagName === "TEXTAREA" ||
          t.isContentEditable)
      )
        return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      if (e.key === "?") {
        e.preventDefault();
        setOpen((o) => !o);
        return;
      }
      if (e.key === "Escape") {
        setOpen(false);
        return; // window close is handled by the window manager
      }
      if (viewerOpen) return;
      const id = BY_NUMBER[e.key] ?? BY_LETTER[e.key.toLowerCase()];
      if (id) {
        openApp(id);
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openApp, viewerOpen]);

  return (
    <>
      <AnimatePresence>
        {open && (
          <>
            <button
              aria-label="Close shortcuts"
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[99] cursor-default"
              tabIndex={-1}
            />
            <motion.div
              role="dialog"
              aria-label="Keyboard shortcuts"
              initial={{ opacity: 0, y: 10, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 360, damping: 28 }}
              className="fixed bottom-16 right-4 z-[101] w-60 rounded-md border border-hair-strong bg-window p-4 text-[13px] text-ink shadow-[var(--win-shadow)]"
            >
              <p className="mb-2 font-display text-[17px] font-medium">Shortcuts</p>
              <ul className="flex flex-col">
                {ROWS.map((r) => (
                  <li
                    key={r.key}
                    className="flex items-center justify-between border-t border-hair py-1.5"
                  >
                    <span>{r.label}</span>
                    <kbd className="grid h-5 min-w-5 place-items-center rounded-[3px] border border-hair-strong px-1 font-mono text-[11px] text-ink-muted">
                      {r.key}
                    </kbd>
                  </li>
                ))}
              </ul>
              <ul className="mt-3 flex flex-col gap-1 border-t border-hair pt-3 text-ink-muted">
                <li>
                  <span className="font-mono text-ink">1–7</span> open by position
                </li>
                <li>
                  <span className="font-mono text-ink">esc</span> close window
                </li>
                <li>
                  <span className="font-mono text-ink">?</span> toggle this
                </li>
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <motion.button
        aria-label="Keyboard shortcuts"
        onClick={() => setOpen((o) => !o)}
        whileTap={{ scale: 0.95 }}
        className="cursor-hover fixed bottom-4 right-4 z-[100] grid h-9 min-w-9 place-items-center rounded-md border border-hair-strong bg-window px-2.5 text-[15px] font-medium text-ink-muted transition-colors hover:text-ink"
      >
        ?
      </motion.button>
    </>
  );
}
