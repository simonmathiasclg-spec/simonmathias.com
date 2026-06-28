"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, useReducedMotion } from "motion/react";
import { useOS } from "@/lib/os-store";
import type { AppId } from "@/lib/app-ids";
import { PHOTOS } from "@/lib/photos";
import { useIsMobile, useHasFinePointer } from "@/hooks/use-media-query";
import { usePointerTracker } from "./pointer";
import Sky from "./Sky";
import FloatingPhotos from "./FloatingPhotos";
import PhotoViewer from "./PhotoViewer";
import CustomCursor from "./CustomCursor";
import Menubar from "./Menubar";
import Dock from "./Dock";
import WindowManager from "./WindowManager";
import MobileShell from "./MobileShell";
import Home from "./Home";
import Intro from "./Intro";
import Shortcuts from "./Shortcuts";
import EasterEgg from "./EasterEgg";

export default function SimonOS({ initialApp }: { initialApp?: AppId }) {
  const [mounted, setMounted] = useState(false);
  const reduce = !!useReducedMotion();
  const isMobile = useIsMobile();
  const finePointer = useHasFinePointer();

  const booted = useOS((s) => s.booted);
  const markBooted = useOS((s) => s.markBooted);
  const windows = useOS((s) => s.windows);
  const focusedId = useOS((s) => s.focusedId);
  const openApp = useOS((s) => s.openApp);
  const theme = useOS((s) => s.theme);
  const sound = useOS((s) => s.sound);
  const setTheme = useOS((s) => s.setTheme);

  const ambient = finePointer && !reduce && !isMobile;
  usePointerTracker(ambient);

  // photo viewer — secondary "view all photos" lightbox, opened only from a
  // small link inside a window (or the mobile launcher). The primary photo
  // click opens its themed WINDOW; this is just the optional gallery browse.
  const viewer = useOS((s) => s.photoViewer);
  const setViewer = useOS((s) => s.setPhotoViewer);
  const n = PHOTOS.length;
  const nextPhoto = () => setViewer(viewer === null ? null : (viewer + 1) % n);
  const prevPhoto = () => setViewer(viewer === null ? null : (viewer - 1 + n) % n);

  // resolve theme + intro state once mounted
  useEffect(() => {
    setMounted(true);
    let savedTheme: string | null = null;
    let introSeen: string | null = null;
    try {
      savedTheme = localStorage.getItem("simon-os-theme");
      introSeen = localStorage.getItem("simon-os-intro-seen");
    } catch {}
    if (savedTheme === "night") setTheme("night");
    if (introSeen) markBooted();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleIntroComplete = () => {
    markBooted();
    try {
      localStorage.setItem("simon-os-intro-seen", "1");
    } catch {}
  };

  // deep link → open that window once (desktop). Home route opens nothing.
  const openedInitial = useRef(false);
  useEffect(() => {
    if (!booted || openedInitial.current) return;
    openedInitial.current = true;
    if (initialApp && !isMobile) openApp(initialApp);
  }, [booted, initialApp, isMobile, openApp]);

  // reflect the focused window in the URL (shareable deep links) — desktop.
  // Don't write "/" on first load, so a deep link survives until its window
  // opens; only fall back to "/" once a window has actually been opened + closed.
  const hadWindow = useRef(false);
  useEffect(() => {
    if (!mounted || isMobile) return;
    if (focusedId) hadWindow.current = true;
    if (!focusedId && !hadWindow.current) return;
    const path = focusedId ? `/${focusedId}` : "/";
    if (window.location.pathname !== path) {
      window.history.replaceState(null, "", path);
    }
  }, [focusedId, mounted, isMobile]);

  // pre-mount: paint the sky immediately (seamless under the intro)
  if (!mounted) {
    return (
      <main className="relative h-dvh w-full overflow-hidden bg-desk">
        <Sky parallax={false} reduced />
      </main>
    );
  }

  const showHome = booted && !isMobile && windows.length === 0;

  return (
    <main
      className={
        isMobile
          ? "relative min-h-dvh w-full bg-desk text-ink"
          : "relative h-dvh w-full overflow-hidden bg-desk text-ink"
      }
    >
      <Sky parallax={ambient} reduced={isMobile || reduce} />

      {/* desktop only — on mobile the springboard shows a photo cluster instead */}
      {!isMobile && <FloatingPhotos parallax={ambient} still={reduce} />}

      {/* mobile reads white-on-sky, so dim the sky just enough for legibility */}
      {isMobile && (
        <div
          className="pointer-events-none fixed inset-0 z-[1]"
          style={{
            background:
              "linear-gradient(180deg, rgba(5,16,34,0.58) 0%, rgba(5,16,34,0.26) 42%, rgba(5,16,34,0.5) 100%)",
          }}
        />
      )}

      <Menubar show={booted} />

      <AnimatePresence>{showHome && <Home key="home" />}</AnimatePresence>

      {isMobile ? (
        <MobileShell show={booted} initialApp={initialApp} />
      ) : (
        <WindowManager />
      )}

      {!isMobile && <Dock show={booted} />}

      {!isMobile && booted && <Shortcuts />}

      <EasterEgg />

      {ambient && <CustomCursor />}

      <AnimatePresence>
        {viewer !== null && (
          <PhotoViewer
            index={viewer}
            onClose={() => setViewer(null)}
            onPrev={prevPhoto}
            onNext={nextPhoto}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!booted && (
          <Intro
            instant={reduce}
            quick={isMobile}
            night={theme === "night"}
            sound={sound}
            onComplete={handleIntroComplete}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
