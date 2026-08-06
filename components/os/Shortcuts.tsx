"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Question } from "@phosphor-icons/react";
import { useOS } from "@/lib/os-store";
import type { AppId } from "@/lib/app-ids";

// letters avoid the easter-egg secret ("luffy"), hence p(resident) for leadership
const BY_LETTER: Record<string, AppId> = {
  a: "about",
  w: "work",
  m: "music-stage",
  p: "leadership",
  g: "goofy",
  c: "contact",
};
// numbers follow dock order
const BY_NUMBER: Record<string, AppId> = {
  "1": "about",
  "2": "work",
  "3": "music-stage",
  "4": "leadership",
  "5": "goofy",
  "6": "contact",
};

const ROWS: { key: string; label: string }[] = [
  { key: "a", label: "about" },
  { key: "w", label: "work" },
  { key: "m", label: "music & stage" },
  { key: "p", label: "leadership" },
  { key: "g", label: "goofy" },
  { key: "c", label: "contact" },
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
              className="fixed bottom-16 right-4 z-[101] w-60 rounded-2xl border border-[var(--menubar-hair)] bg-[var(--menubar)] p-3.5 font-mono text-[12px] text-menubar-ink shadow-[0_18px_50px_-12px_rgba(4,8,15,0.7)] backdrop-blur-2xl"
            >
              <p className="mb-2.5 px-1 text-[10px] uppercase tracking-[0.22em] text-menubar-ink/55">
                Shortcuts
              </p>
              <ul className="flex flex-col gap-1">
                {ROWS.map((r) => (
                  <li
                    key={r.key}
                    className="flex items-center justify-between rounded-md px-1 py-0.5"
                  >
                    <span className="lowercase text-menubar-ink/85">{r.label}</span>
                    <kbd className="grid h-5 min-w-5 place-items-center rounded border border-white/15 bg-white/10 px-1 text-[11px] text-menubar-ink">
                      {r.key}
                    </kbd>
                  </li>
                ))}
              </ul>
              <div className="my-2.5 h-px bg-[var(--menubar-hair)]" />
              <ul className="flex flex-col gap-1.5 px-1 text-menubar-ink/65">
                <li>
                  <span className="text-menubar-ink/85">1–6</span> open by position
                </li>
                <li>
                  <span className="text-menubar-ink/85">esc</span> close window
                </li>
                <li>
                  <span className="text-menubar-ink/85">?</span> toggle this
                </li>
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <motion.button
        aria-label="Keyboard shortcuts"
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
        className="cursor-hover fixed bottom-4 right-4 z-[100] grid size-9 place-items-center rounded-full border border-[var(--menubar-hair)] bg-[var(--dock)] text-menubar-ink/80 shadow-[0_6px_20px_-6px_rgba(4,8,15,0.6)] backdrop-blur-xl transition-colors hover:text-menubar-ink"
      >
        <Question weight="bold" className="size-4" />
      </motion.button>
    </>
  );
}
