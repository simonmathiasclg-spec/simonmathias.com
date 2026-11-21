"use client";

import { type RefObject } from "react";
import { motion, useDragControls, useReducedMotion } from "motion/react";
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
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
      animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      exit={reduce ? { opacity: 0 } : { opacity: 0, y: 6 }}
      transition={reduce ? { duration: 0.12 } : { duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: "absolute",
        left,
        top,
        width,
        height,
        zIndex: z,
        boxShadow: focused ? "var(--win-shadow-focus)" : "var(--win-shadow)",
      }}
      className="pointer-events-auto flex flex-col overflow-hidden rounded-md border border-hair-strong bg-window transition-shadow duration-300"
    >
      {/* title bar (drag handle) */}
      <div
        onPointerDown={startDrag}
        className="flex h-11 shrink-0 touch-none select-none items-center gap-3 border-b border-hair bg-window px-4"
        style={{ cursor: "grab" }}
      >
        <span className="text-[14px] font-medium text-ink">{app.name}</span>
        <span className="hidden text-[13px] text-ink-muted sm:inline">{app.tagline}</span>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          onPointerDown={(e) => e.stopPropagation()}
          aria-label={`Close ${app.name}`}
          className="cursor-hover ml-auto -mr-1.5 rounded-[3px] px-1.5 py-0.5 text-[13px] text-ink-muted transition-colors hover:bg-window-2 hover:text-ink"
        >
          Close
        </button>
      </div>

      {/* body */}
      <div className="paper-scroll min-h-0 flex-1 overflow-y-auto overflow-x-hidden">
        <div className="px-7 py-8 sm:px-10 sm:py-10">
          <Content />
        </div>
      </div>

      {/* recede when not focused */}
      {!focused && (
        <div className="pointer-events-none absolute inset-0 bg-ink/[0.03]" />
      )}
    </motion.section>
  );
}
