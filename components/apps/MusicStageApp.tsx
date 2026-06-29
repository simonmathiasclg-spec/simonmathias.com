"use client";

import { MusicNoteSimple, Guitar, MicrophoneStage, Confetti } from "@phosphor-icons/react";
import {
  AppHeader,
  Body,
  Divider,
  SectionLabel,
  Figure,
  YouTubeFacade,
  ViewAllPhotos,
} from "./_kit";

const facts = [
  { icon: MusicNoteSimple, label: "Saxophone & guitar" },
  { icon: MicrophoneStage, label: "Solo for 3,000 — at 15" },
  { icon: Confetti, label: "Project Going Nowhere" },
  { icon: Guitar, label: "Self-taught, then taught others" },
];

export default function MusicStageApp() {
  return (
    <div className="flex flex-col gap-8">
      <Figure
        src="/photos/photo-stage.jpg"
        label="On stage"
        caption="On stage with the band"
        aspect="4 / 5"
        priority
        className="mx-auto w-full max-w-[290px]"
      />

      <AppHeader
        index="♪"
        kicker="Music & Stage"
        title="Self-taught, on stage"
        lead="My parents handed me a saxophone to strengthen my asthmatic lungs. It became the thing I&rsquo;m most myself doing."
      />

      <Body>
        <p>
          There were no saxophone teachers near me in Bangalore, so I taught myself
          off YouTube for a year — with one goal: to <strong>surprise-perform at my
          sister&rsquo;s wedding.</strong> Then I trained two more years over Zoom.
        </p>
        <p>
          By fifteen, I played a <strong>solo for three thousand people.</strong>
        </p>
        <p>
          These days I&rsquo;m the saxophonist in <strong>Project Going Nowhere</strong>,
          a band that gigs for crowds of 100&ndash;400 at venues like the Catholic Club
          and The Raft.
        </p>
      </Body>

      {/* two from the stage — varied sizes + slight tilts */}
      <div className="grid grid-cols-2 gap-4">
        <Figure
          src="/photos/photo-perform.jpg"
          label="Performing"
          caption="Solo, mid-set"
          aspect="4 / 5"
          tilt={-1.5}
        />
        <Figure
          src="/photos/gallery-mic.jpg"
          label="On the mic"
          caption="On the mic"
          aspect="4 / 5"
          tilt={1.5}
          className="mt-6"
        />
      </div>

      {/* the live video — lazy YouTube facade, jumps to the solo */}
      <YouTubeFacade
        id="TbWnnb5J-Ec"
        start={134}
        title="Simon Mathias — live saxophone solo"
        caption="Me, live — starts at the solo."
      />

      <Divider />

      <section className="flex flex-col gap-4">
        <SectionLabel>Passing it on</SectionLabel>
        <Body>
          <p>
            I taught guitar every week at a school for differently-abled kids. I
            trained an autistic student named <strong>Roshan</strong> for a solo —
            and quietly saved up to surprise him with a guitar of his own.
          </p>
          <p className="text-ink-muted">
            The best part of music has never been the stage. It&rsquo;s watching
            someone realize they can do the thing they thought they couldn&rsquo;t.
          </p>
        </Body>
      </section>

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

      <Divider />

      <ViewAllPhotos />
    </div>
  );
}
