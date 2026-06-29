"use client";

import { type RefObject } from "react";
import { motion, useDragControls, useReducedMotion } from "motion/react";
import { X } from "@phosphor-icons/react";
import type { AppDef } from "@/lib/apps";

export default function Window({
  app,
  z,
  focused,
  left,
  top,
  width,
  height,
  constraintsRef,
  onFocus,
  onClose,
}: {
  app: AppDef;
  z: number;
  focused: boolean;
  left: number;
  top: number;
  width: number;
  height: number;
  constraintsRef: RefObject<HTMLDivElement | null>;
  onFocus: () => void;
  onClose: () => void;
}) {
  const reduce = useReducedMotion();
  const controls = useDragControls();
  const Icon = app.icon;
  const Content = app.Content;

  const startDrag = (e: React.PointerEvent) => {
    onFocus();
    controls.start(e);
  };

  return (
    <motion.section
      role="dialog"
      aria-label={`${app.name} window`}
      drag
      dragListener={false}
      dragControls={controls}
      dragConstraints={constraintsRef}
      dragElastic={0.04}
      dragMomentum={false}
      onPointerDownCapture={onFocus}
      initial={
        reduce ? { opacity: 0 } : { opacity: 0, scale: 0.92, filter: "blur(4px)" }
      }
      animate={
        reduce
          ? { opacity: 1 }
          : { opacity: 1, scale: 1, filter: "blur(0px)" }
      }
      exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.95, filter: "blur(2px)" }}
      transition={
        reduce
          ? { duration: 0.12 }
          : { type: "spring", stiffness: 380, damping: 30, mass: 0.8 }
      }
      style={{
        position: "absolute",
        left,
        top,
        width,
        height,
        zIndex: z,
        boxShadow: focused ? "var(--win-shadow-focus)" : "var(--win-shadow)",
      }}
      className="pointer-events-auto flex flex-col overflow-hidden rounded-xl bg-window ring-1 ring-[var(--hair-strong)] transition-shadow duration-300"
    >
      {/* title bar (drag handle) */}
      <div
        onPointerDown={startDrag}
        className="flex h-10 shrink-0 touch-none select-none items-center gap-2.5 border-b border-hair bg-window px-3.5"
        style={{ cursor: "grab" }}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          onPointerDown={(e) => e.stopPropagation()}
          aria-label={`Close ${app.name}`}
          className="cursor-hover group/dot grid size-3.5 place-items-center rounded-full bg-ink/15 transition-colors hover:bg-[var(--destructive)]"
        >
          <X
            weight="bold"
            className="size-2.5 text-white opacity-0 transition-opacity group-hover/dot:opacity-100"
          />
        </button>

        <div className="flex items-baseline gap-2">
          <span className="font-mono text-[12px] font-medium lowercase tracking-tight text-ink">
            {app.name}
          </span>
          <span className="hidden font-mono text-[11px] text-ink-muted sm:inline">
            {app.tagline}
          </span>
        </div>

        <Icon
          weight="duotone"
          className="ml-auto size-4 text-ink-muted/50"
        />
      </div>

      {/* body */}
      <div className="paper-scroll min-h-0 flex-1 overflow-y-auto overflow-x-hidden">
        <div className="p-7 sm:p-9">
          <Content />
        </div>
      </div>

      {/* recede when not focused */}
      {!focused && (
        <div className="pointer-events-none absolute inset-0 rounded-xl bg-ink/[0.04]" />
      )}
    </motion.section>
  );
}
