import type { AppId } from "./app-ids";

// The floating photos are doorways: clicking one opens a themed window. Each frame
// is ONE distinct facet of Simon — no repeats. The extra music/leadership photos
// live inside their windows as galleries. A small "view all photos" link inside a
// window opens the lightbox. Drop real files at these paths in /public/photos.
export type PhotoDef = {
  id: string;
  src: string;
  label: string; // the doorway facet, shown as a tag under the frame ("Music")
  caption: string; // hover + alt detail
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
    id: "music",
    src: "/photos/photo-perform.jpg", // Sax pic — red kurta, on stage
    label: "Music",
    caption: "Sax · the band · the stage",
    target: "music-stage",
    note: 261.63,
    left: 13,
    top: 25,
    w: 198,
    ratio: "4 / 5",
    tilt: -4,
    bob: 14,
    drift: 10,
    dur: 9.5,
  },
  {
    id: "about",
    src: "/photos/portrait.jpg", // studio headshot
    label: "About",
    caption: "Who I am",
    target: "about",
    note: 440.0,
    left: 87,
    top: 26,
    w: 186,
    ratio: "4 / 5",
    tilt: 4,
    bob: 16,
    drift: 9,
    dur: 8.5,
  },
  {
    id: "goofy",
    src: "/photos/photo-goofy.jpg", // the pharaoh-costume goofy shot
    label: "Goofy",
    caption: "Not taking myself too seriously",
    target: "goofy",
    note: 349.23,
    left: 50,
    top: 15,
    w: 156,
    ratio: "4 / 5",
    tilt: -2,
    bob: 13,
    drift: 14,
    dur: 11,
  },
  {
    id: "leadership",
    src: "/photos/photo-lead.jpg", // On Mike — suit + crowd
    label: "Leadership",
    caption: "President & more",
    target: "leadership",
    note: 392.0,
    left: 12.5,
    top: 61,
    w: 182,
    ratio: "4 / 5",
    tilt: 3,
    bob: 11,
    drift: 11,
    dur: 12,
  },
  {
    id: "work",
    src: "/photos/photo-build.jpg", // At Work — desk, thumbs up
    label: "Work",
    caption: "Building software people use",
    target: "work",
    note: 329.63,
    left: 87.5,
    top: 62,
    w: 188,
    ratio: "4 / 5",
    tilt: -3,
    bob: 12,
    drift: 12,
    dur: 10.5,
  },
];
