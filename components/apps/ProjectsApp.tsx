"use client";

import { AppHeader, Entry, ExternalLink } from "./_kit";

export default function ProjectsApp() {
  return (
    <div className="flex flex-col gap-9">
      <AppHeader
        title="Projects"
        lead="Things I built end to end, from the first commit to people actually using them."
      />

      <div className="flex flex-col gap-6">
        <Entry
          title="NoteAlong"
          links={
            <>
              <ExternalLink href="https://notealong.vercel.app">Live site</ExternalLink>
              <ExternalLink href="https://github.com/simonmathiasclg-spec/notealong">
                Code on GitHub
              </ExternalLink>
            </>
          }
        >
          <p>
            Turns any song into a karaoke-style play-along, with the melody&rsquo;s notes
            above each lyric, transposed for your instrument.
          </p>
          <p>
            Demucs splits out the vocals, Basic Pitch transcribes the melody, and
            Whisper times the lyrics. Backed by <strong>250+ automated tests</strong>.
          </p>
        </Entry>

        <Entry
          title="Talent Atlas"
          meta="Built at Predictive Success, code private"
          links={
            <ExternalLink href="https://talentatlas-psc.vercel.app">Live site</ExternalLink>
          }
        >
          <p>
            A workforce intelligence platform that maps behavioral data onto live org
            charts. I built it end to end as the <strong>sole developer</strong>{" "}with
            Next.js, TypeScript, Supabase, and the Claude API. It&rsquo;s now in beta with
            a Pepsi department and Nautical Lands Group.
          </p>
        </Entry>

        <Entry
          title="Read the Room"
          links={
            <>
              <ExternalLink href="https://read-the-room-lime.vercel.app">Live site</ExternalLink>
              <ExternalLink href="https://github.com/simonmathiasclg-spec/read-the-room">
                Code on GitHub
              </ExternalLink>
            </>
          }
        >
          <p>
            A Kahoot-style multiplayer game for Predictive Index training, built solo.
            Players join by QR code and everything stays live-synced through Firebase.
            It&rsquo;s <strong>already in use at the company.</strong>
          </p>
        </Entry>
      </div>
    </div>
  );
}
