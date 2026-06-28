import {
  IdentificationCard,
  Briefcase,
  RocketLaunch,
  PaperPlaneTilt,
  MicrophoneStage,
  Trophy,
} from "@phosphor-icons/react";
import type { AppId } from "@/lib/os-store";
import type { AppIcon } from "@/components/apps/_kit";
import AboutApp from "@/components/apps/AboutApp";
import WorkApp from "@/components/apps/WorkApp";
import StartupSchoolApp from "@/components/apps/StartupSchoolApp";
import ContactApp from "@/components/apps/ContactApp";
import MusicStageApp from "@/components/apps/MusicStageApp";
import LeadershipApp from "@/components/apps/LeadershipApp";

export type AppDef = {
  id: AppId;
  /** lowercase OS-style name shown in title bars */
  name: string;
  /** title-case label shown in the dock + mobile launcher (fits, no ellipsis) */
  dockLabel: string;
  /** one-line subtitle for mobile nav + viewer */
  tagline: string;
  icon: AppIcon;
  Content: React.ComponentType;
  /** default window size on desktop (px) */
  window: { w: number; h: number };
  /** shown in the dock? (photo-only windows are not) */
  dock: boolean;
};

export const APPS: AppDef[] = [
  {
    id: "about",
    name: "about",
    dockLabel: "About",
    tagline: "who I am",
    icon: IdentificationCard,
    Content: AboutApp,
    window: { w: 780, h: 600 },
    dock: true,
  },
  {
    id: "work",
    name: "work",
    dockLabel: "Work",
    tagline: "Predictive Success",
    icon: Briefcase,
    Content: WorkApp,
    window: { w: 680, h: 600 },
    dock: true,
  },
  {
    id: "startup-school",
    name: "startup-school",
    dockLabel: "Startup School",
    tagline: "founder's notes",
    icon: RocketLaunch,
    Content: StartupSchoolApp,
    window: { w: 720, h: 660 },
    dock: true,
  },
  {
    id: "contact",
    name: "contact",
    dockLabel: "Contact",
    tagline: "say hello",
    icon: PaperPlaneTilt,
    Content: ContactApp,
    window: { w: 580, h: 500 },
    dock: true,
  },
  // windowed, opened by clicking the floating photos (not in the dock)
  {
    id: "music-stage",
    name: "music & stage",
    dockLabel: "Music & Stage",
    tagline: "sax, guitar, the band",
    icon: MicrophoneStage,
    Content: MusicStageApp,
    window: { w: 720, h: 660 },
    dock: false,
  },
  {
    id: "leadership",
    name: "leadership",
    dockLabel: "Leadership",
    tagline: "president & more",
    icon: Trophy,
    Content: LeadershipApp,
    window: { w: 700, h: 620 },
    dock: false,
  },
];

/** the dock shows only these four */
export const DOCK_APPS = APPS.filter((a) => a.dock);

export const APP_MAP: Record<AppId, AppDef> = Object.fromEntries(
  APPS.map((a) => [a.id, a]),
) as Record<AppId, AppDef>;
