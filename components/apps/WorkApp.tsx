"use client";

import { ChartLineUp, GraduationCap, Cpu, Compass } from "@phosphor-icons/react";
import { AppHeader, Body, Divider, SectionLabel, PhotoHero } from "./_kit";

const focus = [
  {
    icon: ChartLineUp,
    title: "Dashboards",
    note: "Live behavioral + assessment data, readable at a glance.",
  },
  {
    icon: GraduationCap,
    title: "Training tools",
    note: "Turning Predictive Index theory into things people practice with.",
  },
  {
    icon: Cpu,
    title: "AI workforce analytics",
    note: "Surfacing the signal in how teams are actually built.",
  },
  {
    icon: Compass,
    title: "SSAT selling stages",
    note: "Hands-on with the methodology, not just the slides.",
  },
];

export default function WorkApp() {
  return (
    <div className="flex flex-col gap-8">
      <PhotoHero
        src="/photos/photo-build.jpg"
        label="Building"
        caption="Building software people use"
        objectPosition="center 35%"
      />
      <AppHeader
        index="01"
        kicker="Work"
        title="Predictive Success"
        lead="I turn behavioral data into software people actually use."
      />

      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="font-mono text-sm font-medium text-ink">
          Solution Specialist Intern
        </span>
        <span className="font-mono text-xs text-ink-muted">
          · a Predictive Index consulting firm
        </span>
      </div>

      <Body>
        <p>
          Predictive Success helps companies hire and build teams using the{" "}
          <strong>Predictive Index</strong>{" "}— the behavioral assessment behind a lot
          of how modern teams understand themselves. My job is to take that science
          and make it land as software.
        </p>
        <p>
          Day to day I work hands-on with <strong>Reference Profiles</strong>,{" "}
          <strong>behavioral factors</strong>, and the <strong>SSAT selling
          stages</strong>{" "}— and then build the dashboards, training tools, and
          AI-powered analytics that turn all of it into something a real team opens
          on a Monday morning.
        </p>
      </Body>

      <Divider />

      <section className="flex flex-col gap-4">
        <SectionLabel>What I work on</SectionLabel>
        <ul className="grid gap-x-6 gap-y-5 sm:grid-cols-2">
          {focus.map(({ icon: Icon, title, note }) => (
            <li key={title} className="flex gap-3.5">
              <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-lg bg-window-2 ring-1 ring-inset ring-hair">
                <Icon weight="duotone" className="size-[18px] text-ink" />
              </span>
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-semibold text-ink">{title}</span>
                <span className="text-[13px] leading-snug text-ink-muted">
                  {note}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
