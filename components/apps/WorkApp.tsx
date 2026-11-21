"use client";

import { type ReactNode } from "react";
import {
  AppHeader,
  Divider,
  Entry,
  ExternalLink,
  Figure,
  SectionLabel,
} from "./_kit";

const COMPANY_URL = "https://www.predictivesuccess.com/";
const TALENT_ATLAS_URL = "https://talentatlas-psc.vercel.app";

function Item({ children }: { children: ReactNode }) {
  return (
    <li className="border-t border-hair py-4 text-[15.5px] leading-[1.65] text-ink/90 [&_strong]:font-semibold [&_strong]:text-ink">
      {children}
    </li>
  );
}

export default function WorkApp() {
  return (
    <div className="flex flex-col gap-9">
      <Figure
        src="/photos/photo-build.jpg"
        label="Building"
        caption="Building software people use"
        aspect="4 / 5"
        priority
        className="mx-auto w-full max-w-[300px]"
      />

      <AppHeader
        title="AI Developer & Solutions Specialist"
        meta={
          <>
            <ExternalLink href={COMPANY_URL} className="font-normal">
              Predictive Success Corporation
            </ExternalLink>
            <br />
            Intern, now part&#8209;time{" · "}May 2026 to present{" · "}Toronto
          </>
        }
        lead="I started at Predictive Success, a Predictive Index consulting firm, as an intern and stayed on part-time. My job is to turn their behavioral science into software people actually use. Most of what I build, the company sells."
      />

      <section className="flex flex-col gap-1">
        <SectionLabel>What I&rsquo;ve done</SectionLabel>
        <ul className="mt-3 border-b border-hair">
          <Item>
            Rebuilt and launched the{" "}
            <ExternalLink href={COMPANY_URL}>company website</ExternalLink>{" "}end to end
            (Next.js, Vercel, headless WordPress), running the SEO migration and DNS
            cutover. It reached <strong>#1 on Google for &ldquo;talent
            optimization&rdquo;</strong>{" "}in Canada and the US within a week.
          </Item>
          <Item>
            Built <ExternalLink href={TALENT_ATLAS_URL}>Talent Atlas</ExternalLink>{" "}end
            to end as the <strong>sole developer</strong>: a workforce intelligence
            platform that maps behavioral data onto live org charts (Next.js,
            TypeScript, Supabase, Claude API). It&rsquo;s now in beta with a Pepsi
            department and Nautical Lands Group.
          </Item>
          <Item>
            Shipped <strong>10+ production web apps</strong>, including a Leadership
            Growth Assessment for a 20+ leader dealership group, a Sales Intelligence
            Dashboard, and a coaching playbook for Montreal Canadiens staff.
          </Item>
          <Item>
            Led the company&rsquo;s AI rollout and trained the leadership team,
            including the CEO, on a prompting framework I wrote.
          </Item>
          <Item>
            Ran the analysis behind an NHL roster study presented to the Montreal
            Canadiens head coach, and a workplace friendship white paper with a
            Hamilton College professor (credited).
          </Item>
        </ul>
      </section>

      <section className="flex flex-col gap-5">
        <SectionLabel>Other builds there</SectionLabel>
        <div className="flex flex-col gap-5">
          <Entry
            title="The Power of Yes"
            links={
              <ExternalLink href="https://power-of-yes.vercel.app">Live site</ExternalLink>
            }
          >
            A decision-making tool based on the framework in our CEO&rsquo;s book. You
            frame a decision, then an AI &ldquo;council&rdquo; of advisors debates it from
            different angles and surfaces what you missed, tuned to how you tend to
            decide. You keep the final call.
          </Entry>
          <Entry title="Competency-assessment tool" meta="Client work">
            A tool I built for a client that turns behavioral and role data into a
            clear read on team fit and capability.
          </Entry>
          <Entry title="Client-mapping tool" meta="Internal tool">
            An internal planning tool for our sales reps. When a rep plans a visit to a
            client, it surfaces every other client nearby so they can build and
            customize the whole trip around it.
          </Entry>
        </div>
        <p className="max-w-[62ch] text-[14.5px] leading-relaxed text-ink-muted [&_strong]:font-semibold [&_strong]:text-ink">
          I also do ongoing automation work across departments. Most of these are{" "}
          <strong>products the company actually sells</strong>, not side experiments.
        </p>
      </section>

      <Divider />

      <section className="flex flex-col gap-5">
        <SectionLabel>Before that</SectionLabel>
        <div className="flex flex-col gap-5">
          <Entry title="Wayfair" meta="Oct to Dec 2025">
            <p>
              <strong>AI Automation Extern</strong>, Professional Award
            </p>
            <p>
              Built a multi-agent system (n8n, Gemini) that benchmarks Amazon and IKEA
              pricing against Wayfair, with a live dashboard.
            </p>
          </Entry>
          <Entry title="Beats by Dre" meta="2025">
            <p>
              <strong>Data Analytics Extern</strong>, Professional Award
            </p>
            <p>
              Analyzed the purchase journey using survey data and sentiment analysis on
              scraped reviews.
            </p>
          </Entry>
        </div>
      </section>
    </div>
  );
}
