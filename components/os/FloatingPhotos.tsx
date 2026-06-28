"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useSpring, useTransform } from "motion/react";
import { ImageSquare } from "@phosphor-icons/react";
import { useOS } from "@/lib/os-store";
import { playNote } from "@/lib/sound";
import { PHOTOS, type PhotoDef } from "@/lib/photos";
import { pointerX, pointerY } from "./pointer";

function ratioToHeight(w: number, ratio: string) {
  const [rw, rh] = ratio.split("/").map((s) => parseFloat(s));
  return Math.round((w * rh) / rw);
}

function PhotoFrame({
  photo,
  index,
  still,
  wave,
  showHint,
}: {
  photo: PhotoDef;
  index: number;
  still: boolean;
  wave: boolean;
  showHint: boolean;
}) {
  const sound = useOS((s) => s.sound);
  const openApp = useOS((s) => s.openApp);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const [hovered, setHovered] = useState(false);

  const h = ratioToHeight(photo.w, photo.ratio);
  const file = photo.src.split("/").pop();

  const handleClick = () => {
    if (sound) playNote(photo.note);
    openApp(photo.target); // the photo is a doorway → opens its window
  };

  const restRotate = photo.tilt;
  const buttonAnimate =
    !still && wave
      ? { rotate: [restRotate, restRotate - 7, restRotate + 7, restRotate], scale: [1, 1.08, 1, 1] }
      : { rotate: restRotate, scale: 1 };

  return (
    <motion.div
      className="absolute"
      style={{
        left: `${photo.left}%`,
        top: `${photo.top}%`,
        width: photo.w,
        height: h,
        marginLeft: -photo.w / 2,
        marginTop: -h / 2,
      }}
      animate={
        still
          ? undefined
          : {
              y: [0, -photo.bob, 0, photo.bob * 0.5, 0],
              x: [0, photo.drift, 0, -photo.drift * 0.6, 0],
            }
      }
      transition={still ? undefined : { duration: photo.dur, repeat: Infinity, ease: "easeInOut" }}
    >
      <motion.button
        type="button"
        onClick={handleClick}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        aria-label={`Open — ${photo.caption}`}
        animate={buttonAnimate}
        whileHover={still ? undefined : { rotate: 0, scale: 1.08, y: -12 }}
        whileTap={{ scale: 0.97 }}
        transition={
          !still && wave
            ? { duration: 0.7, delay: index * 0.13, ease: "easeInOut" }
            : { type: "spring", stiffness: 300, damping: 22 }
        }
        className="cursor-hover pointer-events-auto relative block h-full w-full cursor-pointer rounded-2xl bg-photo-frame p-1.5 shadow-[0_10px_26px_-10px_rgba(6,22,40,0.5)] ring-1 ring-hair"
      >
        <div
          className="relative overflow-hidden rounded-[11px] bg-window-2"
          style={{ aspectRatio: photo.ratio, filter: hovered ? "brightness(1.07)" : "brightness(1)", transition: "filter 0.2s" }}
        >
          {!loaded && (
            <div className="absolute inset-0 grid place-items-center bg-[radial-gradient(120%_120%_at_30%_20%,color-mix(in_srgb,var(--ink)_8%,var(--window-2)),var(--window-2))]">
              <div className="flex flex-col items-center gap-1.5 px-2 text-center">
                <ImageSquare weight="thin" className="size-6 text-ink-muted/55" />
                <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink-muted">
                  {photo.label}
                </span>
                <span className="font-mono text-[9px] text-ink-muted/55">{file}</span>
              </div>
            </div>
          )}
          {!failed && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={photo.src}
              alt={`Simon Mathias — ${photo.caption}`}
              loading="lazy"
              decoding="async"
              onLoad={() => setLoaded(true)}
              onError={() => setFailed(true)}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
            />
          )}
        </div>

        {/* hover caption */}
        <AnimatePresence>
          {hovered && (
            <motion.span
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.18 }}
              className="pointer-events-none absolute left-1/2 top-full mt-2 w-max max-w-[210px] -translate-x-1/2 rounded-full border border-[var(--menubar-hair)] bg-[var(--menubar)] px-3 py-1 text-center font-mono text-[10px] leading-snug text-menubar-ink shadow-lg backdrop-blur-xl"
            >
              {photo.caption}
            </motion.span>
          )}
        </AnimatePresence>

        {/* one-time "click me" nudge (first photo only) */}
        <AnimatePresence>
          {showHint && !hovered && (
            <motion.span
              initial={{ opacity: 0, y: -6, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="pointer-events-none absolute left-full top-1/2 ml-3 flex w-max -translate-y-1/2 items-center gap-1 rounded-full bg-saffron px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-[#3a2a06] shadow-[0_4px_14px_rgba(255,210,63,0.5)]"
            >
              ← click me
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </motion.div>
  );
}

export default function FloatingPhotos({
  parallax,
  still,
}: {
  parallax: boolean;
  still: boolean;
}) {
  const pxs = useSpring(pointerX, { stiffness: 32, damping: 20, mass: 1 });
  const pys = useSpring(pointerY, { stiffness: 32, damping: 20, mass: 1 });
  const x = useTransform(pxs, (v) =>
    parallax && typeof window !== "undefined" ? (v / window.innerWidth - 0.5) * -40 : 0,
  );
  const y = useTransform(pys, (v) =>
    parallax && typeof window !== "undefined" ? (v / window.innerHeight - 0.5) * -26 : 0,
  );

  // one wave of life on load, then a one-time "click me" nudge
  const [wave, setWave] = useState(false);
  const [hint, setHint] = useState(false);
  useEffect(() => {
    if (still) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setWave(true), 900));
    let seen = false;
    try {
      seen = !!localStorage.getItem("simon-os-photo-hint");
    } catch {}
    if (!seen) {
      timers.push(setTimeout(() => setHint(true), 1700));
      timers.push(
        setTimeout(() => {
          setHint(false);
          try {
            localStorage.setItem("simon-os-photo-hint", "1");
          } catch {}
        }, 5200),
      );
    }
    return () => timers.forEach(clearTimeout);
  }, [still]);

  return (
    <div className="objects-tint pointer-events-none fixed inset-0 z-[2]">
      <motion.div style={{ x, y }} className="absolute inset-0">
        {PHOTOS.map((photo, i) => (
          <PhotoFrame
            key={photo.id}
            photo={photo}
            index={i}
            still={still}
            wave={wave}
            showHint={hint && i === 0}
          />
        ))}
      </motion.div>
    </div>
  );
}
