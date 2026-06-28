"use client";

import {
  MapPin,
  GraduationCap,
  MusicNoteSimple,
  Confetti,
} from "@phosphor-icons/react";
import { AppHeader, Body, Photo, Divider } from "./_kit";

const facts = [
  { icon: MapPin, label: "Bangalore → Toronto" },
  { icon: GraduationCap, label: "University of Toronto" },
  { icon: MusicNoteSimple, label: "Saxophone & guitar" },
  { icon: Confetti, label: "Elected College President" },
];

export default function AboutApp() {
  return (
    <div className="flex flex-col gap-8">
      <AppHeader
        index="00"
        kicker="Readme"
        title={
          <>
            Hi, I&rsquo;m Simon.
            <span className="mt-2 block text-[0.42em] font-light tracking-[0.04em] text-ink-muted">
              I&rsquo;m obsessed with how people work — on stage and in software.
            </span>
          </>
        }
      />

      <div className="flex flex-col gap-7 sm:flex-row sm:gap-8">
        <Body>
          <p>
            I grew up in <strong>Bangalore</strong>{" "}and came to Toronto on a
            scholarship. Now I&rsquo;m at the <strong>University of Toronto</strong>,
            building software during the week and chasing the things that don&rsquo;t
            fit in a resume the rest of the time.
          </p>
          <p>
            There&rsquo;s one throughline to all of it. Whether it&rsquo;s a room of
            three thousand people or a dashboard a sales team opens every morning,
            the job is the same: <strong>read the room, then give it exactly what it
            needs.</strong>{" "}I&rsquo;ve spent years doing that from a stage, and now I
            do it in product.
          </p>
          <p>
            I play saxophone and guitar, I&rsquo;ve performed for crowds in the
            thousands, and I came up through city-wide public-speaking and
            personality competitions in Bangalore. I was elected College President
            because I like being responsible for things that matter to other people.
          </p>
          <p>
            Mostly I just like making things that are useful and a little bit
            beautiful — and then watching real people actually use them.
          </p>
        </Body>

        <figure className="sm:w-[230px] sm:shrink-0">
          <Photo
            src="/photos/portrait.jpg"
            label="Portrait"
            priority
            className="aspect-[4/5] w-full shadow-[0_12px_30px_-12px_rgba(7,12,22,0.4)]"
            objectPosition="center 30%"
          />
          <figcaption className="mt-2.5 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted">
            <span>Simon Mathias</span>
            <span className="text-saffron">online</span>
          </figcaption>
        </figure>
      </div>

      <Divider />

      <ul className="grid grid-cols-2 gap-x-6 gap-y-4">
        {facts.map(({ icon: Icon, label }) => (
          <li key={label} className="flex items-center gap-3">
            <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-window-2 ring-1 ring-inset ring-hair">
              <Icon weight="duotone" className="size-[18px] text-ink" />
            </span>
            <span className="text-sm font-medium text-ink">{label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
