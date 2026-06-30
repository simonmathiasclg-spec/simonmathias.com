"use client";

import { type ReactNode } from "react";
import { ArrowUpRight } from "@phosphor-icons/react";
import { AppHeader, SectionLabel, Tag, Figure, Highlight } from "./_kit";
import { cn } from "@/lib/utils";

const focusRing =
  "rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cerulean)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--window)]";

// A live build links out to the running app via a saffron tag.
function LiveTag({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label}, live (opens in a new tab)`}
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
      <p className="max-w-[62ch] text-[15px] leading-relaxed text-ink/85 [&_strong]:font-semibold [&_strong]:text-ink">
        {children}
      </p>
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
          <Build title="KnowYou (Solas)" tag={<Tag tone="build">company product</Tag>}>
            An AI workforce-intelligence platform I&rsquo;m <strong>lead builder</strong>{" "}
            on, built during my internship. It reads a company&rsquo;s people data and
            strategy and turns it into a full picture of the org: explore the whole chart
            with filters and color-coding by risk, performance, or engagement; flag
            organizational risks before they break you; rank internal successors for any
            critical role; and model reorg scenarios before making them real. An AI agent
            surfaces live signals from how people are working, and you can ask it anything
            about your org and get an analyst-level answer grounded in real data. The edge
            is the behavioral layer woven through all of it.{" "}
            <Highlight>It&rsquo;s live and heading into its first customer pilot.</Highlight>
          </Build>

          <Build
            title="The Power of Yes"
            tag={<LiveTag href="https://power-of-yes.vercel.app" label="The Power of Yes" />}
          >
            A decision-making tool based on the framework in our CEO&rsquo;s book. You
            frame a decision, then an AI &ldquo;council&rdquo; of advisors debates it from
            different angles and surfaces what you missed, tuned to how you tend to
            decide. You keep the final call.
          </Build>

          <Build title="Competency-assessment tool" tag={<Tag tone="past">client work</Tag>}>
            A tool I built for a client that turns behavioral and role data into a clear
            read on team fit and capability.
          </Build>

          <Build title="Client-mapping tool" tag={<Tag tone="internal">internal tool</Tag>}>
            An internal planning tool for our sales reps. When a rep plans a visit to a
            client, it surfaces every other client nearby so they can build and customize
            the whole trip around it.
          </Build>

          <Build
            title="Read the Room"
            tag={<LiveTag href="https://read-the-room-lime.vercel.app" label="Read the Room" />}
          >
            A multiplayer game that trains people to read behavioral patterns,{" "}
            <strong>built solo</strong> with Claude Code, Firebase, and Vercel. It&rsquo;s
            early and I&rsquo;m still building it out, but it&rsquo;s{" "}
            <strong>already in use at the company.</strong>
          </Build>
        </div>

        <p className="mt-1 max-w-[62ch] text-[14px] leading-relaxed text-ink-muted [&_strong]:font-semibold [&_strong]:text-ink">
          I also do ongoing automation work across departments. Most of these are{" "}
          <strong>products the company actually sells</strong>, not side experiments.
        </p>
      </section>
    </div>
  );
}
