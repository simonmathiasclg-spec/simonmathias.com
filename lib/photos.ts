import type { AppId } from "./app-ids";

// The floating photos are doorways: clicking one opens a themed window. They also
// double as the gallery (a small "view all photos" affordance opens a lightbox).
// Drop real files at these paths in /public/photos; until then each slot shows a
// labeled placeholder with its filename.
export type PhotoDef = {
  id: string;
  src: string;
  label: string; // short label (placeholder + alt)
  caption: string; // hover + viewer caption
  target: AppId; // the window this photo opens
  note: number; // pentatonic note played on click (gated by sound toggle)
  // desktop floating layout
  left: number; // % (frame center)
  top: number; // %
  w: number; // px width
  ratio: string; // CSS aspect-ratio
  tilt: number; // resting rotation (deg)
  bob: number; // idle vertical bob (px)
  drift: number; // idle horizontal drift (px)
  dur: number; // idle loop seconds
};

export const PHOTOS: PhotoDef[] = [
  {
    id: "stage",
    src: "/photos/photo-stage.jpg",
    label: "On stage",
    caption: "Sax solo · 3,000 people · age 15",
    target: "music-stage",
    note: 261.63,
    left: 12,
    top: 27,
    w: 164,
    ratio: "4 / 5",
    tilt: -4,
    bob: 14,
    drift: 10,
    dur: 9.5,
  },
  {
    id: "perform",
    src: "/photos/photo-perform.jpg",
    label: "Performing",
    caption: "Guitar, live",
    target: "music-stage",
    note: 293.66,
    left: 88,
    top: 28,
    w: 150,
    ratio: "4 / 5",
    tilt: 4,
    bob: 16,
    drift: 9,
    dur: 8.5,
  },
  {
    id: "build",
    src: "/photos/photo-build.jpg",
    label: "Building",
    caption: "Building software people use",
    target: "work",
    note: 329.63,
    left: 87,
    top: 64,
    w: 160,
    ratio: "4 / 3",
    tilt: -3,
    bob: 12,
    drift: 12,
    dur: 10.5,
  },
  {
    id: "lead",
    src: "/photos/photo-lead.jpg",
    label: "Leading",
    caption: "Elected College President",
    target: "leadership",
    note: 392.0,
    left: 11,
    top: 65,
    w: 152,
    ratio: "4 / 3",
    tilt: 3,
    bob: 11,
    drift: 11,
    dur: 12,
  },
  {
    id: "candid",
    src: "/photos/photo-candid.jpg",
    label: "Off the clock",
    caption: "Off the clock",
    target: "about",
    note: 440.0,
    left: 50,
    top: 13,
    w: 128,
    ratio: "1 / 1",
    tilt: -2,
    bob: 13,
    drift: 14,
    dur: 11,
  },
];
