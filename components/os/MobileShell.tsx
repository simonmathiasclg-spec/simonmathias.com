"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { CaretRight, Star, ArrowRight } from "@phosphor-icons/react";
import { DOCK_APPS, APP_MAP } from "@/lib/apps";
import { useOS, type AppId } from "@/lib/os-store";
import { PHOTOS } from "@/lib/photos";
import { Photo } from "@/components/apps/_kit";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

// performing · building · leading — the throughline, seen first
const CLUSTER = [0, 2, 3];

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

  const list: Variants = {
    hidden: {},
    visible: { transition: reduce ? {} : { staggerChildren: 0.05, delayChildren: 0.1 } },
  };
  const row: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: reduce ? { duration: 0 } : { type: "spring", stiffness: 320, damping: 28 },
    },
  };

  return (
    <div className="relative z-10 min-h-dvh px-5 pb-16 pt-14">
      {/* hero */}
      <motion.header
        initial={{ opacity: 0, y: reduce ? 0 : 14 }}
        animate={show ? { opacity: 1, y: 0 } : {}}
        transition={reduce ? { duration: 0 } : { duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-start gap-5 pb-9 pt-2"
      >
        {/* photo cluster — tap to open that part of the world */}
        <div className="flex flex-col gap-2">
          <div className="flex gap-3">
            {CLUSTER.map((i, k) => {
              const p = PHOTOS[i];
              return (
                <button
                  key={p.id}
                  onClick={() => setActive(p.target)}
                  aria-label={`Open ${p.caption}`}
                  className="flex flex-col items-center gap-1.5 transition-transform active:scale-95"
                >
                  <span
                    style={{ transform: `rotate(${k === 1 ? 0 : p.tilt}deg)` }}
                    className="block rounded-xl bg-photo-frame p-1 shadow-[0_8px_20px_-8px_rgba(6,22,40,0.5)] ring-1 ring-white/15"
                  >
                    <Photo src={p.src} label={p.label} className="size-[88px] rounded-lg" />
                  </span>
                  <span className="flex items-center gap-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-white/80">
                    {p.label}
                    <ArrowRight weight="bold" className="size-2.5 text-saffron" />
                  </span>
                </button>
              );
            })}
          </div>
          <button
            onClick={() => setViewer(0)}
            className="self-start font-mono text-[11px] text-white/55 underline decoration-white/30 underline-offset-4 active:text-white/80"
          >
            view all photos →
          </button>
        </div>
        <div className="flex flex-col gap-2.5">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/45">
            Simon&nbsp;OS
          </p>
          <h1 className="font-display text-[2.6rem] font-extrabold leading-[0.95] tracking-[-0.03em] text-white">
            Simon Mathias
          </h1>
          <p className="max-w-[32ch] text-[15px] font-light leading-relaxed text-white/60">
            Obsessed with how people work, on stage and in software. Builder,
            musician, operator. Tap in.
          </p>
        </div>
      </motion.header>

      {/* app launcher */}
      <motion.ul
        variants={list}
        initial="hidden"
        animate={show ? "visible" : "hidden"}
        className="flex flex-col gap-2.5"
      >
        {DOCK_APPS.map((app) => {
          const Icon = app.icon;
          const star = app.id === "startup-school";
          return (
            <motion.li key={app.id} variants={row}>
              <button
                onClick={() => setActive(app.id)}
                className={`flex w-full items-center gap-4 rounded-2xl border px-4 py-3.5 text-left backdrop-blur-md transition-colors active:bg-white/[0.1] ${
                  star ? "border-saffron/45 bg-saffron/[0.09]" : "border-white/10 bg-white/[0.04]"
                }`}
              >
                <span
                  className={`grid size-11 shrink-0 place-items-center rounded-xl ring-1 ring-inset ${
                    star ? "bg-saffron/20 text-white ring-saffron/60" : "bg-white/8 text-white/90 ring-white/10"
                  }`}
                >
                  <Icon weight="duotone" className="size-6" />
                </span>
                <span className="flex min-w-0 flex-col">
                  <span className="font-mono text-[15px] font-medium text-white">
                    {app.dockLabel}
                  </span>
                  <span className="truncate text-[13px] text-white/50">{app.tagline}</span>
                </span>
                {star ? (
                  <span className="ml-auto flex shrink-0 items-center gap-1 rounded-full bg-saffron px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-[#3a2a06]">
                    <Star weight="fill" className="size-2.5" />
                    read this
                  </span>
                ) : (
                  <CaretRight weight="bold" className="ml-auto size-4 shrink-0 text-white/35" />
                )}
              </button>
            </motion.li>
          );
        })}
      </motion.ul>

      <p className="mt-10 font-mono text-[10px] uppercase tracking-[0.25em] text-white/30">
        Toronto · built by hand
      </p>

      {/* app sheet */}
      <Sheet open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <SheetContent side="bottom" className="h-[93dvh] rounded-t-[22px] border-hair bg-window p-0">
          {active && (
            <>
              <SheetHeader className="flex-row items-baseline gap-2 space-y-0 border-b border-hair px-5 py-3.5">
                <SheetTitle className="font-mono text-[13px] font-medium lowercase text-ink">
                  {APP_MAP[active].name}
                </SheetTitle>
                <SheetDescription className="font-mono text-[11px] text-ink-muted">
                  {APP_MAP[active].tagline}
                </SheetDescription>
              </SheetHeader>
              <div className="paper-scroll h-[calc(93dvh-52px)] overflow-y-auto px-5 py-7">
                {ActiveContent && <ActiveContent />}
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
