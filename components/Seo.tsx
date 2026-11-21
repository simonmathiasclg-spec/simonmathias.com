import type { AppId } from "@/lib/app-ids";

// Server-rendered, visually hidden content so the site is crawlable and
// screen-reader accessible even though the interactive OS is canvas-like.
// These are concise summaries — the real, full copy lives in the app windows.
const ENTRIES: { id: AppId; name: string; blurb: string }[] = [
  { id: "about", name: "About", blurb: "From Bangalore to Toronto on a scholarship, now at the University of Toronto. A musician (saxophone and guitar) and a builder who ships real software." },
  { id: "work", name: "Work", blurb: "AI Developer & Solutions Specialist at Predictive Success Corporation in Toronto (intern, now part-time, since May 2026). Rebuilt the company website, built Talent Atlas as sole developer, shipped 10+ production web apps, and led the company's AI rollout. Earlier: AI Automation Extern at Wayfair and Data Analytics Extern at Beats by Dre." },
  { id: "projects", name: "Projects", blurb: "NoteAlong, a play-along app that puts a song's melody notes above each lyric; Talent Atlas, a workforce intelligence platform; and Read the Room, a multiplayer Predictive Index training game." },
  { id: "music-stage", name: "Music & Stage", blurb: "Self-taught saxophonist who played a solo for 3,000 at 15; saxophonist in the band Project Going Nowhere; taught guitar to differently-abled kids." },
  { id: "leadership", name: "Leadership", blurb: "Elected College President by a record 70% margin, leading ~2,500 students; an undefeated festing season; raised $18,000 for charity." },
  { id: "goofy", name: "Goofy", blurb: "The unserious side. He doesn't take himself too seriously." },
  { id: "contact", name: "Contact", blurb: "Get in touch by email, LinkedIn, or phone." },
];

export default function Seo({ active }: { active?: AppId }) {
  return (
    <div className="sr-only">
      <h1>Simon Mathias</h1>
      <p>
        Builder, musician, and operator obsessed with how people work, on stage
        and in software. Toronto, University of Toronto.
      </p>
      <nav aria-label="Sections">
        <ul>
          {ENTRIES.map((e) => (
            <li key={e.id}>
              <a href={`/${e.id}`} aria-current={active === e.id ? "page" : undefined}>
                {e.name}
              </a>
              {": "}
              {e.blurb}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
