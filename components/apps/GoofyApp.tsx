"use client";

import { Sunglasses, Pizza, SneakerMove, HandPeace } from "@phosphor-icons/react";
import { AppHeader, Body, Divider, SectionLabel, Figure, Highlight } from "./_kit";

const facts = [
  { icon: Sunglasses, label: "Sunglasses indoors: occasionally" },
  { icon: SneakerMove, label: "Will dance, uninvited" },
  { icon: Pizza, label: "Takes food photos too seriously" },
  { icon: HandPeace, label: "Mid-photobomb in someone's pic" },
];

export default function GoofyApp() {
  return (
    <div className="flex flex-col gap-8">
      <Figure
        src="/photos/photo-goofy.jpg"
        label="Goofy"
        caption="Not taking myself too seriously"
        aspect="4 / 5"
        tilt={-1}
        priority
        className="mx-auto w-full max-w-[290px]"
      />

      <AppHeader
        index="B)"
        kicker="Goofy"
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
        <Figure
          src="/photos/goofy-1.jpg"
          label="Guitar"
          caption="Guitar solo, behind the head"
          aspect="4 / 5"
          tilt={-1}
          className="mx-auto w-full max-w-[300px]"
        />
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
    </div>
  );
}
