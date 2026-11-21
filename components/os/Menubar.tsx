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
    : "·· ··";

  return (
    <span
      suppressHydrationWarning
      className="font-mono text-[12px] tabular-nums text-menubar-ink"
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
          className="cursor-hover grid size-7 place-items-center rounded-[3px] text-ink-muted transition-colors hover:bg-window-2 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cerulean)] focus-visible:ring-offset-1 focus-visible:ring-offset-transparent"
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
      className="fixed inset-x-0 top-0 z-[100] flex h-9 items-center justify-between border-b border-hair bg-window px-3 text-[13px] sm:px-5"
    >
      {/* left: identity + active section */}
      <div className="flex items-baseline gap-3">
        <span className="font-display text-[16px] font-medium text-ink">Simon Mathias</span>
        {focusedName && (
          <span className="hidden text-ink-muted sm:inline">{focusedName}</span>
        )}
      </div>

      {/* right: status cluster */}
      <div className="flex items-center gap-1.5 text-ink-muted sm:gap-3">
        <span className="hidden sm:inline">Toronto</span>
        <span className="hidden h-3 w-px bg-hair-strong sm:block" />
        <Clock />
        <span className="h-3 w-px bg-hair-strong" />
        <BarButton
          label={sound ? "Sound on" : "Sound off"}
          onClick={toggleSound}
        >
          {sound ? (
            <SpeakerSimpleHigh weight="fill" className="size-3.5" />
          ) : (
            <SpeakerSimpleSlash weight="regular" className="size-3.5" />
          )}
        </BarButton>
        <BarButton
          label={theme === "day" ? "Switch to night" : "Switch to day"}
          onClick={toggleTheme}
        >
          {theme === "day" ? (
            <Moon weight="fill" className="size-3.5" />
          ) : (
            <Sun weight="fill" className="size-3.5" />
          )}
        </BarButton>
      </div>
    </motion.header>
  );
}
