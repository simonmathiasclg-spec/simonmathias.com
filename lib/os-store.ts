"use client";

import { create } from "zustand";
import { uiSound } from "./sound";
import type { AppId } from "./app-ids";

export type { AppId };

export type Theme = "day" | "night";

export type OpenWindow = {
  id: AppId;
  z: number;
};

type OSState = {
  // intro
  booted: boolean;
  markBooted: () => void;

  // windows (desktop)
  windows: OpenWindow[];
  focusedId: AppId | null;
  zTop: number;
  openApp: (id: AppId) => void;
  closeApp: (id: AppId) => void;
  focusApp: (id: AppId) => void;
  isOpen: (id: AppId) => boolean;

  // chrome
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
  sound: boolean;
  toggleSound: () => void;

  // photo lightbox ("view all photos") — index of the open photo, or null
  photoViewer: number | null;
  setPhotoViewer: (v: number | null) => void;
};

const BASE_Z = 10;

export const useOS = create<OSState>((set, get) => ({
  booted: false,
  markBooted: () => set({ booted: true }),

  windows: [],
  focusedId: null,
  zTop: BASE_Z,

  openApp: (id) => {
    const { windows, zTop } = get();
    const nextZ = zTop + 1;
    if (windows.some((w) => w.id === id)) {
      // already open → just focus + raise
      set({
        windows: windows.map((w) => (w.id === id ? { ...w, z: nextZ } : w)),
        focusedId: id,
        zTop: nextZ,
      });
      if (get().sound) uiSound("focus");
      return;
    }
    set({
      windows: [...windows, { id, z: nextZ }],
      focusedId: id,
      zTop: nextZ,
    });
    if (get().sound) uiSound("open");
  },

  closeApp: (id) => {
    const { windows, focusedId } = get();
    const remaining = windows.filter((w) => w.id !== id);
    let nextFocus = focusedId === id ? null : focusedId;
    if (nextFocus === null && remaining.length) {
      // focus the topmost remaining window
      nextFocus = remaining.reduce((a, b) => (a.z > b.z ? a : b)).id;
    }
    set({ windows: remaining, focusedId: nextFocus });
    if (get().sound) uiSound("close");
  },

  focusApp: (id) => {
    const { windows, zTop, focusedId } = get();
    if (focusedId === id && windows.find((w) => w.id === id)?.z === zTop) return;
    const nextZ = zTop + 1;
    set({
      windows: windows.map((w) => (w.id === id ? { ...w, z: nextZ } : w)),
      focusedId: id,
      zTop: nextZ,
    });
  },

  isOpen: (id) => get().windows.some((w) => w.id === id),

  theme: "day",
  setTheme: (t) => {
    set({ theme: t });
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark", t === "night");
      try {
        localStorage.setItem("simon-os-theme", t);
      } catch {}
    }
  },
  toggleTheme: () => get().setTheme(get().theme === "day" ? "night" : "day"),

  sound: false,
  toggleSound: () => {
    const next = !get().sound;
    set({ sound: next });
    if (next) uiSound("on");
  },

  photoViewer: null,
  setPhotoViewer: (v) => set({ photoViewer: v }),
}));
