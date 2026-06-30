"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { useOS } from "@/lib/os-store";
import { DOCK_APPS } from "@/lib/apps";

export default function Dock({ show }: { show: boolean }) {
  const reduce = useReducedMotion();
  const openApp = useOS((s) => s.openApp);
  const windows = useOS((s) => s.windows);

  const container: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 26 },
    visible: {
      opacity: 1,
      y: 0,
      transition: reduce
        ? { duration: 0 }
        : { type: "spring", stiffness: 260, damping: 30, staggerChildren: 0.06, delayChildren: 0.08 },
    },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 16, scale: reduce ? 1 : 0.6 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: reduce ? { duration: 0 } : { type: "spring", stiffness: 480, damping: 24 },
    },
  };

  return (
    <motion.nav
      aria-label="Apps"
      variants={container}
      initial="hidden"
      animate={show ? "visible" : "hidden"}
      className="fixed inset-x-0 bottom-0 z-[100] flex justify-center pb-3 sm:pb-4"
    >
      <ul className="flex items-start gap-1 rounded-[20px] border border-[var(--menubar-hair)] bg-[var(--dock)] px-2.5 pb-2 pt-2.5 shadow-[0_12px_40px_-8px_rgba(4,8,15,0.6)] backdrop-blur-2xl backdrop-saturate-150">
        {DOCK_APPS.map((app) => {
          const Icon = app.icon;
          const open = windows.some((w) => w.id === app.id);
          return (
            <motion.li key={app.id} variants={item} className="relative">
              <motion.button
                onClick={() => openApp(app.id)}
                aria-label={`Open ${app.dockLabel}`}
                whileHover={reduce ? undefined : { y: -4, scale: 1.08 }}
                whileTap={reduce ? undefined : { scale: 0.95 }}
                transition={{ type: "spring", stiffness: 420, damping: 18 }}
                className="cursor-hover flex min-w-[64px] flex-col items-center gap-2 rounded-xl px-3 pt-2"
              >
                <span className="grid size-[50px] place-items-center rounded-xl bg-white/5 text-white/85 ring-1 ring-inset ring-white/10 transition-colors hover:bg-white/12 hover:text-white">
                  <Icon weight="duotone" className="size-7" />
                </span>
                <span className="whitespace-nowrap font-mono text-[13px] font-medium leading-none tracking-tight text-white/80">
                  {app.dockLabel}
                </span>
                {/* open indicator */}
                <span
                  className={`h-1 w-1 rounded-full bg-saffron transition-opacity duration-300 ${
                    open ? "opacity-100" : "opacity-0"
                  }`}
                />
              </motion.button>
            </motion.li>
          );
        })}
      </ul>
    </motion.nav>
  );
}
