"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useSpring, useTransform } from "motion/react";
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
        aria-label={`Open ${photo.caption}`}
        animate={buttonAnimate}
        whileHover={still ? undefined : { rotate: restRotate * 0.5, scale: 1.03, y: -4 }}
        whileTap={{ scale: 0.98 }}
        transition={
          !still && wave
            ? { duration: 0.7, delay: index * 0.13, ease: "easeInOut" }
            : { type: "spring", stiffness: 300, damping: 26 }
        }
        className="cursor-hover pointer-events-auto relative block h-full w-full cursor-pointer rounded-[3px] bg-photo-frame p-[5px] shadow-[0_1px_2px_rgba(6,22,40,0.18),0_4px_10px_rgba(6,22,40,0.12)]"
      >
        <div
          className="relative overflow-hidden rounded-[2px] bg-window-2"
          style={{ aspectRatio: photo.ratio }}
        >
          {!loaded && (
            <div className="absolute inset-0 grid place-items-center">
              <span className="px-2 text-center text-[11px] text-ink-muted">{photo.label}</span>
            </div>
          )}
          {!failed && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={photo.src}
              alt={`Simon Mathias, ${photo.caption}`}
              loading="lazy"
              decoding="async"
              onLoad={() => setLoaded(true)}
              onError={() => setFailed(true)}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
            />
          )}
        </div>

        {/* permanent doorway caption, like a label under a print */}
        <span className="sky-ink absolute left-1/2 top-full mt-2 flex -translate-x-1/2 items-baseline gap-1.5 whitespace-nowrap text-[14px] font-medium">
          <span className={hovered ? "underline decoration-1 underline-offset-[4px]" : ""}>
            {photo.label}
          </span>
          <motion.span
            aria-hidden
            animate={{ x: hovered ? 3 : 0 }}
            transition={{ type: "spring", stiffness: 420, damping: 22 }}
          >
            →
          </motion.span>
        </span>

        {/* one-time nudge (first photo only) */}
        <AnimatePresence>
          {showHint && !hovered && (
            <motion.span
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="sky-ink pointer-events-none absolute left-full top-1/2 ml-4 w-max -translate-y-1/2 font-display text-[17px] italic"
            >
              ← start here
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
