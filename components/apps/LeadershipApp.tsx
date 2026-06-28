"use client";

import { AppHeader, Body, Divider, SectionLabel, PhotoHero } from "./_kit";

const stats = [
  { big: "70%", label: "winning margin — a school record" },
  { big: "~2,500", label: "students led as College President" },
  { big: "8 / 8", label: "inter-school championships won" },
  { big: "$18K", label: "raised for charity (CAD)" },
];

export default function LeadershipApp() {
  return (
    <div className="flex flex-col gap-8">
      <PhotoHero
        src="/photos/photo-lead.jpg"
        label="Leading"
        caption="Elected College President"
        objectPosition="center 30%"
      />

      <AppHeader
        index="★"
        kicker="Leadership"
        title="Leading people"
        lead="Whether it&rsquo;s 2,500 students or 50 strangers in a foreign train station, I like being the one who&rsquo;s responsible."
      />

      <Body>
        <p>
          I was elected <strong>College President</strong> by 70% of the student body —
          the largest margin in my school&rsquo;s history — and led roughly{" "}
          <strong>2,500 students.</strong>
        </p>
        <p>
          I ran our festing team to an undefeated season: we won{" "}
          <strong>all eight</strong> inter-school championships across Bangalore. I
          organized a 5K Peace Run and a charity drive that raised{" "}
          <strong>$18,000 CAD.</strong>
        </p>
        <p>
          And once, in Europe, I led fifty stranded people — my principal among them —
          out of a transit mess in broken French. The title was never the point; being
          useful when it counts is.
        </p>
      </Body>

      <Divider />

      <section className="flex flex-col gap-4">
        <SectionLabel>By the numbers</SectionLabel>
        <ul className="grid grid-cols-2 gap-3">
          {stats.map((s) => (
            <li
              key={s.big}
              className="flex flex-col gap-1 rounded-xl bg-window-2 p-4 ring-1 ring-inset ring-hair"
            >
              <span className="font-display text-3xl font-extrabold tracking-tight text-ink">
                {s.big}
              </span>
              <span className="text-[13px] leading-snug text-ink-muted">{s.label}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
