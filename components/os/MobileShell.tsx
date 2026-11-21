"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { DOCK_APPS, APP_MAP, type AppDef } from "@/lib/apps";
import { useOS, type AppId } from "@/lib/os-store";
import { PHOTOS, type PhotoDef } from "@/lib/photos";
import { Photo } from "@/components/apps/_kit";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

// The mobile home: the same photo doorways as the desktop sky, laid out as a
// grid. Sections with a photo use it as the tile; the rest (Projects, Contact)
// are plain paper tiles carrying their name.
const PHOTO_BY_TARGET: Partial<Record<AppId, PhotoDef>> = Object.fromEntries(
  PHOTOS.map((p) => [p.target, p]),
);

function Tile({
  app,
  onOpen,
}: {
  app: AppDef;
  onOpen: (id: AppId) => void;
}) {
  const photo = PHOTO_BY_TARGET[app.id];
  return (
    <button
      onClick={() => onOpen(app.id)}
      aria-label={`Open ${app.name}`}
      className="flex w-full flex-col items-start gap-1.5 transition-transform active:scale-[0.98]"
    >
      {photo ? (
        <span className="block w-full rounded-[3px] bg-photo-frame p-[4px] shadow-[0_1px_2px_rgba(6,22,40,0.18),0_4px_10px_rgba(6,22,40,0.12)]">
          <Photo
            src={photo.src}
            label={app.dockLabel}
            className="aspect-square w-full rounded-[2px]"
          />
        </span>
      ) : (
        <span className="flex aspect-square w-full items-end rounded-[3px] border border-hair-strong bg-window p-3 text-left font-display text-[18px] italic leading-tight text-ink">
          {app.tagline.charAt(0).toUpperCase() + app.tagline.slice(1)}
        </span>
      )}
      <span className="sky-ink text-[13.5px] font-medium">
        {app.dockLabel} <span aria-hidden>→</span>
      </span>
    </button>
  );
}

export default function MobileShell({
  show,
  initialApp,
}: {
  show: boolean;
  initialApp?: AppId;
}) {
  const reduce = useReducedMotion();
  const setViewer = useOS((s) => s.setPhotoViewer);
  const [active, setActive] = useState<AppId | null>(null);
  const ActiveContent = active ? APP_MAP[active].Content : null;

  // Whether WE pushed a history entry for the open sheet. A deep-linked sheet
  // arrived on its own entry, so there is nothing of ours to pop for it.
  const pushedEntry = useRef(false);

  // Opening a sheet PUSHES a history entry (deep-linkable URL), so the phone's
  // back gesture closes the sheet instead of leaving the site.
  const openSheet = (id: AppId) => {
    window.history.pushState({ sheet: id }, "", `/${id}`);
    pushedEntry.current = true;
    setActive(id);
  };

  // Closing from the UI consumes our pushed entry so history stays clean.
  const closeSheet = () => {
    if (pushedEntry.current) {
      pushedEntry.current = false;
      window.history.back();
    } else {
      window.history.replaceState(null, "", "/");
    }
    setActive(null);
  };

  // back/forward → close the sheet, stay on the site
  useEffect(() => {
    const onPop = () => {
      pushedEntry.current = false;
      setActive(null);
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  // deep link: open the shared sheet on load (URL is already /[app])
  useEffect(() => {
    if (initialApp) setActive(initialApp);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const grid: Variants = {
    hidden: {},
    visible: { transition: reduce ? {} : { staggerChildren: 0.05, delayChildren: 0.15 } },
  };
  const tile: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 10, scale: reduce ? 1 : 0.92 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: reduce ? { duration: 0 } : { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <div className="relative z-10 flex min-h-dvh flex-col px-6 pb-[calc(1.75rem+env(safe-area-inset-bottom))] pt-16">
      {/* hero: the name leads, set straight on the sky like the desktop */}
      <motion.header
        initial={{ opacity: 0, y: reduce ? 0 : 12 }}
        animate={show ? { opacity: 1, y: 0 } : {}}
        transition={reduce ? { duration: 0 } : { duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-1 flex-col justify-center gap-2 py-10 text-left"
      >
        <p className="sky-ink-muted text-[14px] font-medium">Builder, performer, learner.</p>
        <h1 className="sky-ink font-display text-[clamp(3rem,15vw,3.9rem)] font-medium leading-[0.95] tracking-[-0.02em]">
          Simon Mathias
        </h1>
        <p className="sky-ink mt-1 font-display text-[20px] italic leading-snug">
          Enthusiasm everywhere I go.
        </p>
      </motion.header>

      {/* springboard — the photos ARE the navigation, same as the desktop sky */}
      <motion.nav
        aria-label="Apps"
        variants={grid}
        initial="hidden"
        animate={show ? "visible" : "hidden"}
        className="grid grid-cols-3 gap-x-4 gap-y-5"
      >
        {DOCK_APPS.map((app) => (
          <motion.div key={app.id} variants={tile}>
            <Tile app={app} onOpen={openSheet} />
          </motion.div>
        ))}
      </motion.nav>

      <motion.button
        initial={{ opacity: 0 }}
        animate={show ? { opacity: 1 } : {}}
        transition={{ delay: reduce ? 0 : 0.7, duration: 0.5 }}
        onClick={() => setViewer(0)}
        className="sky-ink mt-8 self-start text-[14px] font-medium underline decoration-1 underline-offset-[4px]"
      >
        View all photos <span aria-hidden>→</span>
      </motion.button>

      <p className="sky-ink-muted mt-5 text-[13px]">Toronto. Built by hand.</p>

      {/* app sheet */}
      <Sheet open={!!active} onOpenChange={(o) => !o && closeSheet()}>
        <SheetContent
          side="bottom"
          showCloseButton={false}
          /* inline height: the base sheet's data-[side=bottom]:h-auto rule
             outranks any height class, which let the sheet grow to content
             height and killed scrolling. Inline style outranks everything. */
          style={{ height: "92dvh" }}
          className="flex flex-col gap-0 overflow-hidden rounded-t-[10px] border-hair bg-window p-0"
        >
          {active && (
            <>
              <div className="mx-auto mt-2.5 h-1 w-9 shrink-0 rounded-full bg-ink/15" aria-hidden />
              <SheetHeader className="flex-row items-baseline gap-2.5 space-y-0 border-b border-hair px-5 pb-3 pt-2">
                <SheetTitle className="text-[15px] font-medium text-ink">
                  {APP_MAP[active].name}
                </SheetTitle>
                <SheetDescription className="min-w-0 truncate text-[13px] text-ink-muted">
                  {APP_MAP[active].tagline}
                </SheetDescription>
                <button
                  onClick={closeSheet}
                  aria-label="Close"
                  className="ml-auto shrink-0 rounded-[3px] px-2 py-1 text-[14px] text-ink-muted transition-colors active:bg-window-2"
                >
                  Close
                </button>
              </SheetHeader>
              <div className="paper-scroll min-h-0 flex-1 touch-pan-y overflow-y-auto overscroll-contain px-5 py-7">
                {ActiveContent && <ActiveContent />}
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
