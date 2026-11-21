"use client";

import { AppHeader, Body, Divider, SectionLabel, Figure, Highlight, FactList } from "./_kit";

const facts = [
  "Sunglasses indoors: occasionally",
  "Will dance, uninvited",
  "Takes food photos too seriously",
  "Mid-photobomb in someone's pic",
];

export default function GoofyApp() {
  return (
    <div className="flex flex-col gap-8">
      <Figure
        src="/photos/photo-goofy.jpg"
        label="Goofy"
        caption="Not taking myself too seriously"
        aspect="4 / 5"
        priority
        className="mx-auto w-full max-w-[290px]"
      />

      <AppHeader
        title="The unserious bit"
        lead="Every résumé makes a person sound like a LinkedIn headline. Consider this the antidote."
      />

      <Body>
        <p>
          I take the work seriously. Myself, much less so. I&rsquo;ll dance at any
          opportunity, badly and with full commitment, and I have strong, unsolicited
          opinions about the right way to plate a midnight snack.
        </p>
        <p>
          If we end up working together, you get the version of me that ships things
          and the version wearing sunglasses indoors for no reason. Both, it turns out,
          are <Highlight>load-bearing</Highlight>.
        </p>
      </Body>

      <Divider />

      <section className="flex flex-col gap-4">
        <SectionLabel>The evidence</SectionLabel>
        <div className="grid grid-cols-2 gap-4">
          <Figure
            src="/photos/goofy-1.jpg"
            label="Guitar"
            caption="Guitar solo, behind the head"
            aspect="4 / 5"
          />
          <Figure
            src="/photos/goofy-2.jpg"
            label="Superman"
            caption="The Superman era"
            aspect="4 / 5"
            className="mt-6"
          />
        </div>
      </section>

      <FactList items={facts} />
    </div>
  );
}
