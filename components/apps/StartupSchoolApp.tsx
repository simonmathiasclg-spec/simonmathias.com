"use client";

import { AppHeader, Body, Divider, SectionLabel, Tag, ExternalLink, Photo } from "./_kit";

const lessons = [
  {
    n: "01",
    title: "Distribution is a product feature, not an afterthought.",
    body: "Juno's reach didn't come from a growth hack — it came from telling a true story people recognized. I build the story in now, not later.",
  },
  {
    n: "02",
    title: "Talk to the people doing the work.",
    body: "Tutors and students taught me more in a week of DMs than a month of planning. Now I start every idea by finding the person whose Monday it would change.",
  },
  {
    n: "03",
    title: "Ship it, then learn from real users.",
    body: "Read the Room taught me more the week it went live than in all the planning before. Built-and-deployed beats almost-ready every time.",
  },
];

export default function StartupSchoolApp() {
  return (
    <div className="flex flex-col gap-8">
      <AppHeader
        index="03"
        kicker="Startup School"
        title="Founder&rsquo;s notes"
        lead="Honest notes on everything I&rsquo;ve tried to make work — written for whoever&rsquo;s reading this from YC."
      />

      <Body>
        <p>
          I&rsquo;ve been building since before I knew the word &ldquo;founder.&rdquo;
          Some of it worked, most of it taught me something, and all of it came from
          the same place: I see how people are doing something and I can&rsquo;t stop
          thinking about how it could be better.
        </p>
      </Body>

      <Divider />

      {/* Juno — the featured story */}
      <section className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <SectionLabel>The one that taught me the most</SectionLabel>
          <Tag tone="past">Past venture</Tag>
        </div>
        <h3 className="font-display text-3xl font-extrabold tracking-tight text-ink">
          Juno
        </h3>
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-ink-muted">
          &ldquo;Uber for tutors&rdquo;
        </p>

        <figure className="my-1 border-l-2 border-saffron pl-5">
          <blockquote className="text-pretty font-display text-xl font-light italic leading-snug text-ink">
            &ldquo;It hit roughly a million views on LinkedIn and got me into VC
            meetings — and then I pivoted, on purpose.&rdquo;
          </blockquote>
        </figure>

        <Body>
          <p>
            Juno was a marketplace matching students with the right tutor on demand.
            I built it, I told its story, and the story{" "}
            <strong>traveled — ~1M LinkedIn views</strong>{" "}and a handful of investor
            conversations I was not expecting at my age. Then I pivoted — not because
            the attention dried up, but because I&rsquo;d learned enough to know the
            version in front of me wasn&rsquo;t the one worth a decade.
          </p>
        </Body>
      </section>

      <Divider />

      {/* What I've shipped — the projects, folded in as evidence */}
      <section className="flex flex-col gap-4">
        <SectionLabel>What I&rsquo;ve shipped since</SectionLabel>
        <Body>
          <p>
            I don&rsquo;t just have ideas — I put them in front of real users, end to
            end.
          </p>
        </Body>

        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <h4 className="font-display text-xl font-bold tracking-tight text-ink">
              Read the Room
            </h4>
            <Tag tone="live">Live</Tag>
          </div>
          <p className="max-w-[54ch] text-[15px] leading-relaxed text-ink/85">
            A gamified Predictive Index training platform — you learn to read
            behavioral profiles by actually playing through scenarios. Designed, built,
            and deployed end-to-end.
          </p>
          <Photo
            src="/photos/read-the-room.jpg"
            label="Read the Room — screenshot"
            className="aspect-[16/9] w-full max-w-md"
          />
          <ExternalLink href="https://read-the-room-lime.vercel.app">
            read-the-room-lime.vercel.app
          </ExternalLink>
        </div>

        <div className="mt-2 flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <h4 className="font-display text-xl font-bold tracking-tight text-ink">
              Sales Performance Dashboard
            </h4>
            <Tag tone="build">In build</Tag>
          </div>
          <p className="max-w-[54ch] text-[15px] leading-relaxed text-ink/85">
            A live web app replacing aging Excel dashboards, built on real behavioral +
            assessment data — the same numbers, but something a sales leader actually
            wants to open.
          </p>
        </div>
      </section>

      <Divider />

      <section className="flex flex-col gap-5">
        <SectionLabel>What each attempt taught me</SectionLabel>
        <ol className="flex flex-col gap-5">
          {lessons.map((l) => (
            <li key={l.n} className="grid grid-cols-[2rem_1fr] gap-x-3">
              <span className="font-mono text-sm text-saffron">{l.n}</span>
              <div className="flex flex-col gap-1">
                <p className="font-display text-base font-bold leading-snug text-ink">
                  {l.title}
                </p>
                <p className="text-[14px] leading-relaxed text-ink-muted">{l.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <Divider />

      <section className="flex flex-col gap-3">
        <SectionLabel>What I&rsquo;m building toward</SectionLabel>
        <Body>
          <p>
            Since 2023 I&rsquo;ve wanted to build a <strong>&ldquo;Duolingo for
            music&rdquo;</strong> — real-time AI feedback that hears you play and tells
            you exactly what to fix. It comes straight from teaching myself saxophone
            the hard way: a year of YouTube and guesswork, with no one to tell me what
            was wrong. I want to be that missing teacher — for the kid in Bangalore who
            can&rsquo;t find one.
          </p>
          <p className="text-ink-muted">
            That&rsquo;s the through-line in all of this: people learning to do the
            thing they thought they couldn&rsquo;t — on stage, on a team, or in
            software. If that&rsquo;s your kind of problem, let&rsquo;s talk.
          </p>
        </Body>
      </section>
    </div>
  );
}
