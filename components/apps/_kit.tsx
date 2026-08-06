"use client";

import { useState, type ComponentType, type CSSProperties, type ReactNode } from "react";
import {
  ImageSquare,
  ArrowUpRight,
  ArrowRight,
  Images,
  Play,
  InstagramLogo,
  type IconProps,
} from "@phosphor-icons/react";
import { useOS } from "@/lib/os-store";
import { cn } from "@/lib/utils";

export type AppIcon = ComponentType<IconProps>;

/* ---------------------------------------------------------------- kicker --- */

export function Kicker({
  index,
  children,
}: {
  index: string;
  children: ReactNode;
}) {
  return (
    <div className="flex items-center gap-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-ink-muted">
      <span className="text-saffron">{index}</span>
      <span className="h-px w-6 bg-hair-strong" aria-hidden />
      <span>{children}</span>
    </div>
  );
}

/* -------------------------------------------------------------- appheader --- */

export function AppHeader({
  index,
  kicker,
  title,
  lead,
}: {
  index: string;
  kicker: string;
  title: ReactNode;
  lead?: ReactNode;
}) {
  return (
    <header className="flex flex-col gap-4">
      <Kicker index={index}>{kicker}</Kicker>
      <h2 className="font-display text-[clamp(2.4rem,5vw,3.5rem)] font-extrabold leading-[0.98] tracking-[-0.025em] text-ink">
        {title}
      </h2>
      {lead && (
        <p className="max-w-[42ch] text-pretty text-lg font-light leading-relaxed text-ink-muted">
          {lead}
        </p>
      )}
    </header>
  );
}

/* ------------------------------------------------------------------- tag --- */

const tagTone = {
  live: "border-saffron/40 bg-saffron/15 text-[color-mix(in_srgb,var(--saffron)_72%,var(--ink))]",
  build: "border-cerulean/30 bg-cerulean/12 text-cerulean",
  internal: "border-hair-strong bg-window-2 text-ink-muted",
  past: "border-hair-strong bg-transparent text-ink-muted",
} as const;

export function Tag({
  tone = "past",
  children,
}: {
  tone?: keyof typeof tagTone;
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.14em]",
        tagTone[tone],
      )}
    >
      {tone === "live" && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-saffron opacity-60" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-saffron" />
        </span>
      )}
      {children}
    </span>
  );
}

/* --------------------------------------------------------------- divider --- */

export function Divider({ className }: { className?: string }) {
  return <hr className={cn("border-0 border-t border-hair", className)} />;
}

/* ----------------------------------------------------------- external link --- */

export function ExternalLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group inline-flex items-center gap-1 font-medium text-ink underline decoration-saffron decoration-2 underline-offset-[5px] transition-colors hover:text-saffron",
        className,
      )}
    >
      {children}
      <ArrowUpRight
        weight="bold"
        className="size-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      />
    </a>
  );
}

/* --------------------------------------------------------- view all photos --- */

/**
 * A quiet "view all photos" link that opens the gallery lightbox. This is the
 * SECONDARY way to see the photos — the primary navigation is clicking a photo
 * on the home, which opens its themed window. Lives inside a window so the
 * lightbox is never the prominent click target.
 */
export function ViewAllPhotos({ className }: { className?: string }) {
  const setViewer = useOS((s) => s.setPhotoViewer);
  return (
    <button
      type="button"
      onClick={() => setViewer(0)}
      className={cn(
        "cursor-hover group inline-flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-ink-muted transition-colors hover:text-ink",
        className,
      )}
    >
      <Images weight="bold" className="size-3.5 text-saffron" />
      View all photos
      <ArrowRight
        weight="bold"
        className="size-3 transition-transform duration-200 group-hover:translate-x-0.5"
      />
    </button>
  );
}

/* ------------------------------------------------------------------ photo --- */

/**
 * A self-healing photo slot: shows a tasteful, on-brand placeholder until a real
 * file is dropped at `src`. When the image loads it fades in; if the file is
 * missing it 404s silently and the placeholder stays. So the site looks finished
 * with zero photos, and finished again once Simon drops the real .jpgs in.
 */
export function Photo({
  src,
  label,
  className,
  imgClassName,
  priority,
  icon: Icon = ImageSquare,
  objectPosition,
  style,
}: {
  src: string;
  label: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  icon?: AppIcon;
  objectPosition?: string;
  style?: CSSProperties;
}) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const file = src.split("/").pop();

  return (
    <div
      style={style}
      className={cn(
        "relative isolate overflow-hidden rounded-xl bg-window-2",
        "ring-1 ring-inset ring-hair",
        className,
      )}
    >
      {/* placeholder (under the image) */}
      <div
        className={cn(
          "absolute inset-0 grid place-items-center transition-opacity duration-700",
          "bg-[radial-gradient(120%_120%_at_30%_20%,color-mix(in_srgb,var(--ink)_7%,var(--window-2)),var(--window-2))]",
          loaded ? "opacity-0" : "opacity-100",
        )}
      >
        <div className="absolute inset-2.5 rounded-lg border border-dashed border-hair-strong" />
        <div className="flex flex-col items-center gap-2 px-4 text-center">
          <Icon weight="thin" className="size-7 text-ink-muted/60" />
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
            {label}
          </span>
          <span className="font-mono text-[10px] text-ink-muted/55">
            /photos/{file}
          </span>
        </div>
      </div>

      {!failed && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={label}
          loading={priority ? "eager" : "lazy"}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          style={objectPosition ? { objectPosition } : undefined}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-700",
            loaded ? "opacity-100" : "opacity-0",
            imgClassName,
          )}
        />
      )}
    </div>
  );
}

/* --------------------------------------------------------- featured photo --- */

/** A featured banner photo at the top of a window (the photo that opened it). */
export function PhotoHero({
  src,
  label,
  caption,
  objectPosition,
  className,
}: {
  src: string;
  label: string;
  caption?: string;
  objectPosition?: string;
  className?: string;
}) {
  return (
    <figure className="flex flex-col gap-2.5">
      <Photo
        src={src}
        label={label}
        priority
        objectPosition={objectPosition}
        className={cn("aspect-[16/9] w-full", className)}
      />
      {caption && (
        <figcaption className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-muted">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/* ----------------------------------------------------------------- figure --- */

/**
 * A captioned, optionally-tilted photo "plate" with a paper frame — for weaving
 * real photos through a window's prose (varied sizes + slight tilts → a story,
 * not a grid). `aspect` is any CSS aspect-ratio string ("4 / 5", "3 / 4", ...).
 */
export function Figure({
  src,
  label,
  caption,
  aspect = "4 / 5",
  objectPosition,
  tilt = 0,
  priority,
  className,
}: {
  src: string;
  label: string;
  caption?: ReactNode;
  aspect?: string;
  objectPosition?: string;
  tilt?: number;
  priority?: boolean;
  className?: string;
}) {
  return (
    <figure
      className={cn("flex flex-col gap-2", className)}
      style={tilt ? { transform: `rotate(${tilt}deg)` } : undefined}
    >
      <div className="rounded-2xl bg-photo-frame p-1.5 shadow-[0_18px_44px_-22px_rgba(7,18,33,0.6)] ring-1 ring-black/[0.06]">
        <Photo
          src={src}
          label={label}
          priority={priority}
          objectPosition={objectPosition}
          style={{ aspectRatio: aspect }}
          className="w-full rounded-[10px]"
        />
      </div>
      {caption && (
        <figcaption className="px-1 font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink-muted">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/* ----------------------------------------------------------- youtube facade --- */

/**
 * A privacy-friendly, lazy YouTube embed: shows a thumbnail with a play button;
 * only mounts the (no-cookie) iframe once clicked. Keeps the window light.
 */
export function YouTubeFacade({
  id,
  start = 0,
  title,
  caption,
}: {
  id: string;
  start?: number;
  title: string;
  caption?: ReactNode;
}) {
  const [playing, setPlaying] = useState(false);
  // maxresdefault is true 16:9 (no letterbox bars); some videos lack it, so
  // fall back to the always-present hqdefault on error.
  const [thumb, setThumb] = useState(`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`);
  return (
    <figure className="flex flex-col gap-2.5">
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black ring-1 ring-inset ring-hair">
        {playing ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${id}?start=${start}&autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play video: ${title}`}
            className="cursor-hover group absolute inset-0 block"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={thumb}
              alt={title}
              loading="lazy"
              onError={() => setThumb(`https://i.ytimg.com/vi/${id}/hqdefault.jpg`)}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10" />
            <span className="absolute left-1/2 top-1/2 grid size-[58px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-saffron text-[#2a1d04] shadow-[0_8px_28px_-6px_rgba(0,0,0,0.6)] transition-transform duration-300 group-hover:scale-110">
              <Play weight="fill" className="ml-0.5 size-7" />
            </span>
          </button>
        )}
      </div>
      {caption && (
        <figcaption className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-muted">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/* --------------------------------------------------------- instagram reel --- */

/**
 * A privacy-friendly, lazy Instagram reel embed: a poster with a play button;
 * only mounts the embed iframe once clicked. Reels are portrait, so the frame is
 * 9:16. Mirrors YouTubeFacade. `href` is the public reel URL (fallback: opens in
 * a new tab if the in-page embed is unavailable).
 */
export function InstagramReel({
  embedUrl,
  href,
  poster,
  title,
  caption,
}: {
  embedUrl: string;
  href: string;
  poster: string;
  title: string;
  caption?: ReactNode;
}) {
  const [playing, setPlaying] = useState(false);
  return (
    <figure className="flex flex-col gap-2.5">
      <div className="relative mx-auto aspect-[9/16] w-full max-w-[320px] overflow-hidden rounded-xl bg-black ring-1 ring-inset ring-hair">
        {playing ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={embedUrl}
            title={title}
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            allowFullScreen
            scrolling="no"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play reel: ${title}`}
            className="cursor-hover group absolute inset-0 block"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={poster}
              alt={title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/30" />
            <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-black/45 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
              <InstagramLogo weight="fill" className="size-3.5" />
              Reel
            </span>
            <span className="absolute left-1/2 top-1/2 grid size-[58px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-saffron text-[#2a1d04] shadow-[0_8px_28px_-6px_rgba(0,0,0,0.6)] transition-transform duration-300 group-hover:scale-110">
              <Play weight="fill" className="ml-0.5 size-7" />
            </span>
          </button>
        )}
      </div>
      {caption && (
        <figcaption className="text-center font-mono text-[11px] uppercase tracking-[0.16em] text-ink-muted">
          {caption}
          {href && (
            <>
              {" · "}
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-saffron decoration-2 underline-offset-2 transition-colors hover:text-ink"
              >
                open on Instagram
              </a>
            </>
          )}
        </figcaption>
      )}
    </figure>
  );
}

/* ------------------------------------------------------------- prose body --- */

export function Body({ children }: { children: ReactNode }) {
  return (
    <div className="flex max-w-[58ch] flex-col gap-4 text-[15px] leading-[1.72] text-ink/85 [&_strong]:font-semibold [&_strong]:text-ink">
      {children}
    </div>
  );
}

/* --------------------------------------------------------------- highlight --- */

/**
 * The single thesis phrase in a window, lifted into the sun accent. A second,
 * warmer tier of emphasis above the plain ink-bold <strong>. Uses a <mark> (not
 * <strong>) so Body's `[&_strong]` ink color never overrides the saffron, and a
 * color-mix that stays legible in both day and night themes.
 */
export function Highlight({ children }: { children: ReactNode }) {
  return (
    <mark className="bg-transparent font-semibold text-[color-mix(in_srgb,var(--saffron)_70%,var(--ink))]">
      {children}
    </mark>
  );
}

/* ----------------------------------------------------------- section head --- */

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <h3 className="flex items-center gap-3 font-display text-2xl font-bold leading-none tracking-[-0.02em] text-ink">
      <span className="h-[1.05em] w-1 shrink-0 rounded-full bg-saffron" aria-hidden />
      {children}
    </h3>
  );
}
