"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { Images, ArrowRight } from "@phosphor-icons/react";
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

// The mobile home is a true Simon OS springboard: the same photo doorways as the
// desktop sky, laid out as app icons. Five tiles use the photo AS the icon;
// Contact is a frosted glass tile.
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
  const Icon = app.icon;
  return (
    <button
      onClick={() => onOpen(app.id)}
      aria-label={`Open ${app.dockLabel}`}
      className="flex w-full flex-col items-center gap-2 transition-transform active:scale-95"
    >
      {photo ? (
        <span className="block w-full rounded-[22px] bg-photo-frame p-1 shadow-[0_10px_26px_-10px_rgba(6,22,40,0.55)] ring-1 ring-white/20">
          <Photo
            src={photo.src}
            label={app.dockLabel}
            className="aspect-square w-full rounded-[18px]"
          />
        </span>
      ) : (
        <span className="grid aspect-square w-full place-items-center rounded-[22px] border border-white/20 bg-white/12 shadow-[0_10px_26px_-10px_rgba(6,22,40,0.55)] backdrop-blur-md">
          <Icon weight="duotone" className="size-9 text-white" />
        </span>
      )}
      <span className="sky-headline-shadow font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] text-white/95">
        {app.dockLabel}
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

  // deep link: open the shared sheet on load
  useEffect(() => {
    if (initialApp) setActive(initialApp);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // reflect the open sheet in the URL (shareable)
  useEffect(() => {
    const path = active ? `/${active}` : "/";
    if (typeof window !== "undefined" && window.location.pathname !== path) {
      window.history.replaceState(null, "", path);
    }
  }, [active]);

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
      {/* hero — the name leads, centered over the sky like the desktop */}
      <motion.header
        initial={{ opacity: 0, y: reduce ? 0 : 14 }}
        animate={show ? { opacity: 1, y: 0 } : {}}
        transition={reduce ? { duration: 0 } : { duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-1 flex-col items-center justify-center gap-3.5 py-8 text-center"
      >
        <p className="sky-headline-shadow font-mono text-[11px] uppercase tracking-[0.3em] text-white">
          builder · performer · learner
        </p>
        <h1 className="sky-headline-shadow font-display text-[clamp(2.7rem,13vw,3.4rem)] font-extrabold leading-[0.95] tracking-[-0.03em] text-white">
          Simon Mathias
        </h1>
        <p className="sky-headline-shadow text-[17px] font-light leading-snug text-white/95">
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
            <Tile app={app} onOpen={setActive} />
          </motion.div>
        ))}
      </motion.nav>

      <motion.button
        initial={{ opacity: 0 }}
        animate={show ? { opacity: 1 } : {}}
        transition={{ delay: reduce ? 0 : 0.7, duration: 0.5 }}
        onClick={() => setViewer(0)}
        className="mx-auto mt-7 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-white/75 active:text-white"
      >
        <Images weight="bold" className="size-3.5 text-saffron" />
        View all photos
        <ArrowRight weight="bold" className="size-3" />
      </motion.button>

      <p className="mt-6 text-center font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
        Toronto · built by hand
      </p>

      {/* app sheet */}
      <Sheet open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <SheetContent
          side="bottom"
          className="flex h-[93dvh] flex-col gap-0 rounded-t-[22px] border-hair bg-window p-0"
        >
          {active && (
            <>
              <div className="mx-auto mt-2.5 h-1 w-10 shrink-0 rounded-full bg-ink/15" aria-hidden />
              <SheetHeader className="flex-row items-baseline gap-2 space-y-0 border-b border-hair px-5 pb-3.5 pt-2">
                <SheetTitle className="font-mono text-[13px] font-medium lowercase text-ink">
                  {APP_MAP[active].name}
                </SheetTitle>
                <SheetDescription className="font-mono text-[11px] text-ink-muted">
                  {APP_MAP[active].tagline}
                </SheetDescription>
              </SheetHeader>
              <div className="paper-scroll min-h-0 flex-1 overflow-y-auto px-5 py-7">
                {ActiveContent && <ActiveContent />}
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
