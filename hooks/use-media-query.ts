"use client";

import { useEffect, useState } from "react";

/** SSR-safe matchMedia hook. Returns `false` until mounted. */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

/** True below the desktop window-manager breakpoint. */
export function useIsMobile(): boolean {
  return useMediaQuery("(max-width: 700px)");
}

/** True when the device has a precise pointer (mouse/trackpad), not touch. */
export function useHasFinePointer(): boolean {
  return useMediaQuery("(hover: hover) and (pointer: fine)");
}
