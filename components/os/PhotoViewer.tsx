"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { PHOTOS } from "@/lib/photos";

function ViewerPhoto({ index }: { index: number }) {
  const photo = PHOTOS[index];
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <div className="rounded-[3px] bg-photo-frame p-[6px]">
      <div
        className="relative overflow-hidden rounded-[2px] bg-window-2"
        style={{ aspectRatio: photo.ratio, maxHeight: "64vh", maxWidth: "84vw", height: "64vh" }}
      >
        {!loaded && (
          <div className="absolute inset-0 grid place-items-center">
            <span className="px-4 text-center text-[13px] text-ink-muted">{photo.label}</span>
          </div>
        )}
        {!failed && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={photo.src}
            src={photo.src}
            alt={`Simon Mathias, ${photo.caption}`}
            decoding="async"
            onLoad={() => setLoaded(true)}
            onError={() => setFailed(true)}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
          />
        )}
      </div>
    </div>
  );
}

function Arrow({ side, onClick }: { side: "left" | "right"; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={side === "left" ? "Previous photo" : "Next photo"}
      className={`cursor-hover absolute top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-[3px] bg-window text-ink transition-colors hover:bg-window-2 ${side === "left" ? "left-4 sm:left-8" : "right-4 sm:right-8"}`}
    >
      {side === "left" ? <CaretLeft weight="bold" className="size-5" /> : <CaretRight weight="bold" className="size-5" />}
    </button>
  );
}

export default function PhotoViewer({
  index,
  onClose,
  onPrev,
  onNext,
}: {
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const reduce = useReducedMotion();
  const photo = PHOTOS[index];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") onPrev();
      else if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onPrev, onNext]);

  return (
    <motion.div
      className="fixed inset-0 z-[118] flex flex-col items-center justify-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduce ? 0 : 0.25 }}
    >
      <button
        aria-label="Close viewer"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-[rgba(8,16,26,0.88)]"
      />

      <Arrow side="left" onClick={onPrev} />
      <Arrow side="right" onClick={onNext} />

      <button
        aria-label="Close viewer"
        onClick={onClose}
        className="cursor-hover absolute right-4 top-4 z-10 rounded-[3px] bg-window px-3 py-2 text-[14px] font-medium text-ink transition-colors hover:bg-window-2"
      >
        Close
      </button>

      <AnimatePresence mode="wait">
        <motion.figure
          key={index}
          initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
          transition={{ duration: reduce ? 0 : 0.22 }}
          className="relative z-[1] flex flex-col items-center gap-4"
        >
          <ViewerPhoto index={index} />
          <figcaption className="flex flex-col items-center gap-1 text-center">
            <span className="font-display text-[18px] italic text-white">{photo.caption}</span>
            <span className="text-[13px] text-white/55">
              {index + 1} / {PHOTOS.length}
              {/* keyboard hint is meaningless on touch — desktop only */}
              <span className="hidden sm:inline"> · use ← → to browse</span>
            </span>
          </figcaption>
        </motion.figure>
      </AnimatePresence>
    </motion.div>
  );
}
