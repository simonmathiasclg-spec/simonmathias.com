"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  SpeakerSimpleHigh,
  SpeakerSimpleSlash,
  Moon,
  Sun,
} from "@phosphor-icons/react";
import { useOS } from "@/lib/os-store";
import { APP_MAP } from "@/lib/apps";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function Clock() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const text = now
    ? new Intl.DateTimeFormat("en-US", {
        weekday: "short",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
        timeZone: "America/Toronto",
      }).format(now)
    : "—— ——";

  return (
    <span
      suppressHydrationWarning
      className="tabular-nums tracking-tight text-menubar-ink"
    >
      {text}
    </span>
  );
}

function BarButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          onClick={onClick}
          aria-label={label}
          className="cursor-hover grid size-7 place-items-center rounded-md text-menubar-ink/85 transition-colors hover:bg-white/10 hover:text-menubar-ink"
        >
          {children}
        </button>
      </TooltipTrigger>
      <TooltipContent sideOffset={6}>{label}</TooltipContent>
    </Tooltip>
  );
}

export default function Menubar({ show }: { show: boolean }) {
  const reduce = useReducedMotion();
  const focusedId = useOS((s) => s.focusedId);
  const theme = useOS((s) => s.theme);
  const sound = useOS((s) => s.sound);
  const toggleTheme = useOS((s) => s.toggleTheme);
  const toggleSound = useOS((s) => s.toggleSound);

  const focusedName = focusedId ? APP_MAP[focusedId].name : null;

  return (
    <motion.header
      initial={false}
      animate={
        show
          ? { y: 0, opacity: 1 }
          : { y: reduce ? 0 : -44, opacity: reduce ? 1 : 0 }
      }
      transition={
        reduce ? { duration: 0 } : { type: "spring", stiffness: 220, damping: 30 }
      }
      className="fixed inset-x-0 top-0 z-[100] flex h-9 items-center justify-between border-b border-[var(--menubar-hair)] bg-[var(--menubar)] px-3 font-mono text-[12px] backdrop-blur-xl backdrop-saturate-150 sm:px-4"
    >
      {/* left: identity + active app */}
      <div className="flex items-center gap-3">
        <span className="flex items-center gap-2 font-semibold text-menubar-ink">
          <span className="size-2 rounded-full bg-saffron shadow-[0_0_8px_var(--saffron)]" />
          Simon Mathias
        </span>
        {focusedName && (
          <span className="hidden text-menubar-ink/55 sm:inline">
            {focusedName}
          </span>
        )}
      </div>

      {/* right: status cluster */}
      <div className="flex items-center gap-1.5 text-menubar-ink/85 sm:gap-2.5">
        <span className="hidden items-center gap-1.5 sm:flex">
          <span className="size-1 rounded-full bg-menubar-ink/40" />
          Toronto
        </span>
        <span className="hidden h-3 w-px bg-[var(--menubar-hair)] sm:block" />
        <Clock />
        <span className="h-3 w-px bg-[var(--menubar-hair)]" />
        <BarButton
          label={sound ? "Sound on" : "Sound off"}
          onClick={toggleSound}
        >
          {sound ? (
            <SpeakerSimpleHigh weight="fill" className="size-4" />
          ) : (
            <SpeakerSimpleSlash weight="regular" className="size-4" />
          )}
        </BarButton>
        <BarButton
          label={theme === "day" ? "Switch to night" : "Switch to day"}
          onClick={toggleTheme}
        >
          {theme === "day" ? (
            <Moon weight="fill" className="size-4" />
          ) : (
            <Sun weight="fill" className="size-4" />
          )}
        </BarButton>
      </div>
    </motion.header>
  );
}
