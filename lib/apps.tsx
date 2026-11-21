import type { AppId } from "@/lib/os-store";
import AboutApp from "@/components/apps/AboutApp";
import WorkApp from "@/components/apps/WorkApp";
import ProjectsApp from "@/components/apps/ProjectsApp";
import ContactApp from "@/components/apps/ContactApp";
import MusicStageApp from "@/components/apps/MusicStageApp";
import LeadershipApp from "@/components/apps/LeadershipApp";
import GoofyApp from "@/components/apps/GoofyApp";

export type AppDef = {
  id: AppId;
  /** shown in window title bars */
  name: string;
  /** label in the dock + mobile launcher */
  dockLabel: string;
  /** one-line subtitle for title bars + mobile sheets */
  tagline: string;
  Content: React.ComponentType;
  /** default window size on desktop (px) */
  window: { w: number; h: number };
  /** shown in the dock? */
  dock: boolean;
};

export const APPS: AppDef[] = [
  {
    id: "about",
    name: "About",
    dockLabel: "About",
    tagline: "who I am",
    Content: AboutApp,
    window: { w: 780, h: 600 },
    dock: true,
  },
  {
    id: "work",
    name: "Work",
    dockLabel: "Work",
    tagline: "Predictive Success",
    Content: WorkApp,
    window: { w: 700, h: 620 },
    dock: true,
  },
  {
    id: "projects",
    name: "Projects",
    dockLabel: "Projects",
    tagline: "things I built",
    Content: ProjectsApp,
    window: { w: 660, h: 600 },
    dock: true,
  },
  {
    id: "music-stage",
    name: "Music & Stage",
    dockLabel: "Music",
    tagline: "sax, guitar, the band",
    Content: MusicStageApp,
    window: { w: 720, h: 660 },
    dock: true,
  },
  {
    id: "leadership",
    name: "Leadership",
    dockLabel: "Leadership",
    tagline: "president and more",
    Content: LeadershipApp,
    window: { w: 700, h: 620 },
    dock: true,
  },
  {
    id: "goofy",
    name: "Goofy",
    dockLabel: "Goofy",
    tagline: "the fun side",
    Content: GoofyApp,
    window: { w: 660, h: 600 },
    dock: true,
  },
  {
    id: "contact",
    name: "Contact",
    dockLabel: "Contact",
    tagline: "say hello",
    Content: ContactApp,
    window: { w: 580, h: 520 },
    dock: true,
  },
];

/** every section is reachable from the dock (the floating photos are shortcuts) */
export const DOCK_APPS = APPS.filter((a) => a.dock);

export const APP_MAP: Record<AppId, AppDef> = Object.fromEntries(
  APPS.map((a) => [a.id, a]),
) as Record<AppId, AppDef>;
