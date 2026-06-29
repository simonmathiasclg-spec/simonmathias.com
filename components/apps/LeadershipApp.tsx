"use client";

import { AppHeader, Body, Divider, SectionLabel, Figure, ViewAllPhotos } from "./_kit";

const stats = [
  { big: "70%", label: "winning margin — a school record" },
  { big: "~2,500", label: "students led as College President" },
  { big: "8 / 8", label: "inter-school championships won" },
  { big: "$18K", label: "raised for charity (CAD)" },
];

export default function LeadershipApp() {
  return (
    <div className="flex flex-col gap-8">
      <Figure
        src="/photos/photo-lead.jpg"
        label="Leading"
        caption="Elected College President"
        aspect="4 / 5"
        priority
        className="mx-auto w-full max-w-[290px]"
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

      {/* the personality moment */}
      <Figure
        src="/photos/gallery-saxy-president.jpg"
        label="Saxy Simon, President"
        caption="“Saxy Simon · President” — with the hardware to back it up"
        aspect="3 / 4"
        tilt={-1}
        className="mx-auto w-full max-w-[330px]"
      />

      <Divider />

      <section className="flex flex-col gap-5">
        <SectionLabel>The trophy wall</SectionLabel>
        <div className="grid grid-cols-2 gap-x-4 gap-y-5">
          <Figure
            src="/photos/gallery-trophy-1.jpg"
            label="Silverware"
            caption="Hardware"
            aspect="3 / 4"
            tilt={1.5}
          />
          <Figure
            src="/photos/gallery-trophy-2.jpg"
            label="More silverware"
            caption="…and more"
            aspect="3 / 4"
            tilt={-1.5}
            className="mt-7"
          />
          <Figure
            src="/photos/gallery-team.jpg"
            label="The team"
            caption="8 / 8 — the championship season, with the team"
            aspect="4 / 3"
            className="col-span-2"
          />
          <Figure
            src="/photos/gallery-poster.jpg"
            label="Campaign poster"
            caption="The campaign"
            aspect="4 / 5"
            tilt={1}
            className="col-span-2 mx-auto w-full max-w-[230px]"
          />
        </div>
      </section>

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

      <Divider />

      <ViewAllPhotos />
    </div>
  );
}
