import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { APP_IDS, isAppId, type AppId } from "@/lib/app-ids";
import SimonOS from "@/components/os/SimonOS";
import Seo from "@/components/Seo";

// only the app routes exist; anything else 404s + they prerender (crawlable)
export const dynamicParams = false;

export function generateStaticParams() {
  return APP_IDS.map((app) => ({ app }));
}

const TITLES: Record<AppId, string> = {
  about: "About",
  work: "Work",
  projects: "Projects",
  contact: "Contact",
  "music-stage": "Music & Stage",
  leadership: "Leadership",
  goofy: "Goofy",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ app: string }>;
}): Promise<Metadata> {
  const { app } = await params;
  if (!isAppId(app)) return {};
  // Only override the title — let the OG/Twitter image, card type, and
  // description inherit from the root layout + opengraph-image so every deep
  // link still unfurls with the headshot card. (og:title falls back to title.)
  return { title: `Simon Mathias · ${TITLES[app]}` };
}

export default async function AppRoute({
  params,
}: {
  params: Promise<{ app: string }>;
}) {
  const { app } = await params;
  if (!isAppId(app)) notFound();
  return (
    <>
      <Seo active={app} />
      <SimonOS initialApp={app} />
    </>
  );
}
