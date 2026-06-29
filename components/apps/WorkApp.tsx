"use client";

import { type ReactNode } from "react";
import { ArrowUpRight } from "@phosphor-icons/react";
import { AppHeader, SectionLabel, Tag, Figure } from "./_kit";
import { cn } from "@/lib/utils";

const focusRing =
  "rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cerulean)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--window)]";

// Read the Room is the only linked build — a live tag that opens the app.
function LiveTag({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Read the Room, live (opens in a new tab)"
      className={cn(
        "cursor-hover group inline-flex items-center gap-1.5 rounded-full border border-saffron/40 bg-saffron/15 px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[color-mix(in_srgb,var(--saffron)_72%,var(--ink))] transition-colors hover:bg-saffron/25",
        focusRing,
      )}
    >
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-saffron opacity-60" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-saffron" />
      </span>
      live
      <ArrowUpRight
        weight="bold"
        className="size-3 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      />
    </a>
  );
}

function Build({
  title,
  tag,
  children,
}: {
  title: string;
  tag: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2.5 rounded-xl bg-window-2 p-5 ring-1 ring-inset ring-hair">
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
        <h4 className="font-display text-xl font-bold tracking-tight text-ink">
          {title}
        </h4>
        {tag}
      </div>
      <p className="max-w-[62ch] text-[15px] leading-relaxed text-ink/85">{children}</p>
    </div>
  );
}

export default function WorkApp() {
  return (
    <div className="flex flex-col gap-8">
      <Figure
        src="/photos/photo-build.jpg"
        label="Building"
        caption="Building software people use"
        aspect="4 / 5"
        priority
        className="mx-auto w-full max-w-[300px]"
      />
      <AppHeader
        index="01"
        kicker="Work"
        title="Predictive Success"
        lead="I intern at Predictive Success, a Predictive Index consulting firm. My job is to turn their behavioral science into software people actually use. Most of what I build, the company sells."
      />

      <section className="flex flex-col gap-4">
        <SectionLabel>What I&rsquo;ve built</SectionLabel>

        <div className="flex flex-col gap-3.5">
          <Build title="KnowYou" tag={<Tag tone="build">company product</Tag>}>
            An AI workforce-intelligence platform I&rsquo;m lead builder on. It turns a
            company&rsquo;s own data into insight on how teams actually work, including an
            org-level view of team dynamics. Heading into its first customer pilot.
          </Build>

          <Build
            title="Read the Room"
            tag={<LiveTag href="https://read-the-room-lime.vercel.app" />}
          >
            A live multiplayer game that trains people to read behavioral patterns. I
            built it solo with Claude Code, Firebase, and Vercel in about two days.
            It&rsquo;s in use and approved to expand.
          </Build>

          <Build title="Decision tool" tag={<Tag tone="build">company product</Tag>}>
            Built on the framework from our CEO&rsquo;s book. It reads a person&rsquo;s
            behavioral profile, then runs several AI agents that weigh a decision from
            different angles and return a combined verdict.
          </Build>

          <Build title="Client-mapping tool" tag={<Tag tone="internal">internal tool</Tag>}>
            A planning tool for our sales reps. When a rep plans a trip to visit a
            client, it surfaces every other client nearby so they can build and customize
            the whole route around it.
          </Build>

          <Build title="Sales dashboard" tag={<Tag tone="build">company product</Tag>}>
            A web app I built to replace legacy Excel dashboards, running on live
            behavioral and assessment data.
          </Build>
        </div>

        <p className="mt-1 max-w-[62ch] text-[14px] leading-relaxed text-ink-muted">
          Most of these are products the company actually sells, not side experiments. I
          also do ongoing automation work across departments.
        </p>
      </section>
    </div>
  );
}
