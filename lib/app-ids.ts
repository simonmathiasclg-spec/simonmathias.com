// Single source of truth for app ids — safe to import from server components
// (no client/runtime deps), so the deep-link routes can validate + prerender.
export const APP_IDS = [
  "about",
  "work",
  "projects",
  "contact",
  // windowed but not in the dock — opened by clicking the floating photos
  "music-stage",
  "leadership",
  "goofy",
] as const;

export type AppId = (typeof APP_IDS)[number];

export function isAppId(v: string): v is AppId {
  return (APP_IDS as readonly string[]).includes(v);
}
