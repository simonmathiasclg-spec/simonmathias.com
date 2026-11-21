"use client";

import { AppHeader, Body, Photo, Divider, Highlight, FactList, ExternalLink } from "./_kit";

const PI_REPORT = "/simon-mathias-pi-behavioral-report.pdf";

const facts = [
  "Bangalore → Toronto",
  "University of Toronto",
  "Saxophone & guitar",
  "Elected College President",
];

export default function AboutApp() {
  return (
    <div className="flex flex-col gap-8">
      <AppHeader
        title="Hi, I’m Simon."
        lead="I’m obsessed with how people work, on stage and in software."
      />

      <div className="flex flex-col gap-7 sm:flex-row sm:gap-8">
        <Body>
          <p>
            I grew up in <strong>Bangalore</strong>{" "}and came to Toronto on a
            scholarship. Now I&rsquo;m at the <strong>University of Toronto</strong>,
            building software during the week and chasing the things that don&rsquo;t
            fit on a r&eacute;sum&eacute; the rest of the time.
          </p>
          <p>
            There&rsquo;s one throughline to all of it. Whether it&rsquo;s a room of
            three thousand people or a dashboard a sales team opens every morning,
            the job is the same: <Highlight>read the room, then give it exactly
            what it needs.</Highlight>{" "}I&rsquo;ve spent years doing that from a
            stage, and now I do it in product.
          </p>
          <p>
            I play saxophone and guitar, I&rsquo;ve performed for crowds in the
            thousands, and I came up through city-wide public-speaking and
            personality competitions in Bangalore. I was elected College President
            because I like being responsible for things that matter to other people.
          </p>
          <p>
            Mostly I just like making things that are useful and a little bit
            beautiful, and then watching real people actually use them.
          </p>
        </Body>

        <figure className="sm:w-[230px] sm:shrink-0">
          <Photo
            src="/photos/portrait.jpg"
            label="Portrait"
            priority
            className="aspect-[4/5] w-full"
            objectPosition="center 30%"
          />
          <figcaption className="mt-2 text-[13px] text-ink-muted">Simon Mathias</figcaption>

          {/* PI behavioral report: opens the official PDF */}
          <p className="mt-4 text-[14px] leading-snug">
            <ExternalLink
              href={PI_REPORT}
              className="font-normal"
            >
              My PI behavioral report (PDF)
            </ExternalLink>
          </p>
        </figure>
      </div>

      <Divider />

      <FactList items={facts} />
    </div>
  );
}
