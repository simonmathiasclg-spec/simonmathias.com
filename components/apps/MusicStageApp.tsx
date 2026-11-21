"use client";

import {
  AppHeader,
  Body,
  Divider,
  SectionLabel,
  Figure,
  YouTubeFacade,
  InstagramReel,
  ViewAllPhotos,
  Highlight,
  FactList,
} from "./_kit";

const facts = [
  "Saxophone & guitar",
  "Solo for 3,000 at 15",
  "Project Going Nowhere",
  "Self-taught, then taught others",
];

export default function MusicStageApp() {
  return (
    <div className="flex flex-col gap-8">
      <Figure
        src="/photos/photo-perform.jpg"
        label="On stage"
        caption="Sax solo, 3,000 people, age 15"
        aspect="4 / 5"
        priority
        className="mx-auto w-full max-w-[290px]"
      />

      <AppHeader
        title="Self-taught, on stage"
        lead="My parents handed me a saxophone to strengthen my asthmatic lungs. It became the thing I’m most myself doing."
      />

      <Body>
        <p>
          There were no saxophone teachers near me in Bangalore, so I taught myself
          off YouTube for a year, with one goal: to <strong>surprise-perform at my
          sister&rsquo;s wedding.</strong> Then I trained two more years over Zoom.
        </p>
        <p>
          By fifteen, I played a{" "}
          <Highlight>solo for three thousand people.</Highlight>
        </p>
        <p>
          These days I&rsquo;m the saxophonist in <strong>Project Going Nowhere</strong>,
          a band that gigs for crowds of 100&ndash;400 at venues like the Catholic Club
          and The Raft.
        </p>
      </Body>

      <div className="grid grid-cols-2 gap-4">
        <Figure
          src="/photos/photo-stage.jpg"
          label="With the band"
          caption="With the band"
          aspect="4 / 5"
        />
        <Figure
          src="/photos/gallery-mic.jpg"
          label="On the mic"
          caption="On the mic"
          aspect="4 / 5"
          className="mt-6"
        />
      </div>

      <YouTubeFacade
        id="TbWnnb5J-Ec"
        start={134}
        title="Simon Mathias live saxophone solo"
        caption="Me, live. Starts at the solo."
      />

      <InstagramReel
        embedUrl="https://www.instagram.com/reel/C2ttamILGlA/embed/"
        href="https://www.instagram.com/reel/C2ttamILGlA/"
        poster="/photos/photo-stage.jpg"
        title="Simon Mathias performing, Instagram reel"
        caption="A reel from a set"
      />

      <Divider />

      <section className="flex flex-col gap-4">
        <SectionLabel>Passing it on</SectionLabel>
        <Body>
          <p>
            I taught guitar every week at a school for differently-abled kids. I
            trained an autistic student named <strong>Roshan</strong> for a solo,
            and quietly saved up to surprise him with a guitar of his own.
          </p>
          <p className="text-ink-muted">
            The best part of music has never been the stage. It&rsquo;s watching
            someone realize they can do the thing they thought they couldn&rsquo;t.
          </p>
        </Body>
      </section>

      <FactList items={facts} />

      <ViewAllPhotos />
    </div>
  );
}
