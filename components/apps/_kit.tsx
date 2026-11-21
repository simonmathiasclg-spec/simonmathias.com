"use client";

import { useState, type ComponentType, type CSSProperties, type ReactNode } from "react";
import type { IconProps } from "@phosphor-icons/react";
import { useOS } from "@/lib/os-store";
import { cn } from "@/lib/utils";

export type AppIcon = ComponentType<IconProps>;

/* -------------------------------------------------------------- appheader --- */

/** The window's opening: a serif headline and an optional lead, left-aligned. */
export function AppHeader({
  title,
  lead,
  meta,
}: {
  title: ReactNode;
  lead?: ReactNode;
  /** a quiet line under the title (role, dates, place) */
  meta?: ReactNode;
}) {
  return (
    <header className="flex flex-col gap-3">
      <h2 className="font-display text-[clamp(2.2rem,4.4vw,3.1rem)] font-medium leading-[1.04] tracking-[-0.015em] text-ink">
        {title}
      </h2>
      {meta && <p className="text-[14px] leading-snug text-ink-muted">{meta}</p>}
      {lead && (
        <p className="max-w-[46ch] text-pretty font-display text-[1.2rem] leading-[1.5] text-ink-muted">
          {lead}
        </p>
      )}
    </header>
  );
}

/* ------------------------------------------------------------------- tag --- */

/** A plain-text label for an entry's status. No pill, no dot. */
export function Tag({ children }: { children: ReactNode }) {
  return <span className="text-[13px] text-ink-muted">{children}</span>;
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
  newTab = true,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  newTab?: boolean;
}) {
  return (
    <a
      href={href}
      {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "cursor-hover font-medium text-sky-ink underline decoration-[color-mix(in_srgb,var(--sky-ink)_40%,transparent)] decoration-1 underline-offset-[4px] transition-colors hover:decoration-current",
        className,
      )}
    >
      {children}
      {newTab && <span aria-hidden> ↗</span>}
    </a>
  );
}

/* ----------------------------------------------------------------- entry --- */

/**
 * One item in a list of work or projects: a serif name, an optional quiet meta
 * line, a short description, and a row of links. Entries are separated by thin
 * rules rather than boxed in cards.
 */
export function Entry({
  title,
  meta,
  links,
  children,
}: {
  title: ReactNode;
  meta?: ReactNode;
  links?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <article className="flex flex-col gap-2 border-t border-hair pt-5">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h4 className="font-display text-[1.4rem] font-medium leading-snug tracking-[-0.005em] text-ink">
          {title}
        </h4>
        {meta && <span className="text-[13px] text-ink-muted">{meta}</span>}
      </div>
      {children && (
        <div className="flex max-w-[62ch] flex-col gap-3 text-[15.5px] leading-[1.65] text-ink/90 [&_strong]:font-semibold [&_strong]:text-ink">
          {children}
        </div>
      )}
      {links && (
        <div className="flex flex-wrap gap-x-5 gap-y-1.5 pt-1 text-[14px]">{links}</div>
      )}
    </article>
  );
}

/* ------------------------------------------------------------- fact list --- */

/** Short facts as a ruled list. Text only, no icon tiles. */
export function FactList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="grid grid-cols-1 gap-x-8 border-t border-hair sm:grid-cols-2">
      {items.map((it, i) => (
        <li key={i} className="border-b border-hair py-3 text-[15px] leading-snug text-ink">
          {it}
        </li>
      ))}
    </ul>
  );
}

/* --------------------------------------------------------- view all photos --- */

/**
 * A quiet "view all photos" link that opens the gallery lightbox. The primary
 * navigation is clicking a photo on the home; this is the secondary way in.
 */
export function ViewAllPhotos({ className }: { className?: string }) {
  const setViewer = useOS((s) => s.setPhotoViewer);
  return (
    <button
      type="button"
      onClick={() => setViewer(0)}
      className={cn(
        "cursor-hover self-start text-[14px] font-medium text-sky-ink underline decoration-[color-mix(in_srgb,var(--sky-ink)_40%,transparent)] decoration-1 underline-offset-[4px] transition-colors hover:decoration-current",
        className,
      )}
    >
      View all photos <span aria-hidden>→</span>
    </button>
  );
}

/* ------------------------------------------------------------------ photo --- */

/**
 * A self-healing photo slot: shows a plain placeholder until the file at `src`
 * loads, then fades the photo in. A missing file 404s silently and the
 * placeholder stays, so the site looks finished with or without the .jpgs.
 */
export function Photo({
  src,
  label,
  alt,
  className,
  imgClassName,
  priority,
  objectPosition,
  style,
}: {
  src: string;
  /** short placeholder shown while loading; also the alt text unless `alt` is set */
  label: string;
  alt?: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  objectPosition?: string;
  style?: CSSProperties;
}) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <div
      style={style}
      className={cn(
        "relative isolate overflow-hidden rounded-[3px] bg-window-2 ring-1 ring-inset ring-hair",
        className,
      )}
    >
      <div
        className={cn(
          "absolute inset-0 grid place-items-center transition-opacity duration-700",
          loaded ? "opacity-0" : "opacity-100",
        )}
      >
        <span className="px-3 text-center text-[12px] text-ink-muted">{label}</span>
      </div>

      {!failed && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt ?? label}
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
    <figure className="flex flex-col gap-2">
      <Photo
        src={src}
        label={label}
        priority
        objectPosition={objectPosition}
        className={cn("aspect-[16/9] w-full", className)}
      />
      {caption && <figcaption className="text-[13px] text-ink-muted">{caption}</figcaption>}
    </figure>
  );
}

/* ----------------------------------------------------------------- figure --- */

/** A captioned photo for weaving real pictures through a window's prose. */
export function Figure({
  src,
  label,
  alt,
  caption,
  aspect = "4 / 5",
  objectPosition,
  priority,
  className,
}: {
  src: string;
  label: string;
  alt?: string;
  caption?: ReactNode;
  aspect?: string;
  objectPosition?: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <figure className={cn("flex flex-col gap-2", className)}>
      <Photo
        src={src}
        label={label}
        alt={alt}
        priority={priority}
        objectPosition={objectPosition}
        style={{ aspectRatio: aspect }}
        className="w-full"
      />
      {caption && (
        <figcaption className="text-[13px] leading-snug text-ink-muted">{caption}</figcaption>
      )}
    </figure>
  );
}

/* ------------------------------------------------------------ play button --- */

function PlayLabel({ children }: { children: ReactNode }) {
  return (
    <span className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-[3px] bg-window px-3 py-1.5 text-[13px] font-medium text-ink">
      <svg viewBox="0 0 12 12" className="size-2.5" aria-hidden>
        <path d="M2 1.2 L10.5 6 L2 10.8 Z" fill="currentColor" />
      </svg>
      {children}
    </span>
  );
}

/* ----------------------------------------------------------- youtube facade --- */

/**
 * A privacy-friendly, lazy YouTube embed: a thumbnail with a play label; the
 * (no-cookie) iframe only mounts once clicked.
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
  // maxresdefault is true 16:9; some videos lack it, so fall back to hqdefault.
  const [thumb, setThumb] = useState(`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`);
  return (
    <figure className="flex flex-col gap-2">
      <div className="relative aspect-video w-full overflow-hidden rounded-[3px] bg-black ring-1 ring-inset ring-hair">
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
              className="h-full w-full object-cover transition-opacity duration-300 group-hover:opacity-90"
            />
            <PlayLabel>Play</PlayLabel>
          </button>
        )}
      </div>
      {caption && <figcaption className="text-[13px] text-ink-muted">{caption}</figcaption>}
    </figure>
  );
}

/* --------------------------------------------------------- instagram reel --- */

/**
 * A privacy-friendly, lazy Instagram reel embed (portrait, 9:16). Mirrors
 * YouTubeFacade. `href` is the public reel URL.
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
    <figure className="flex flex-col gap-2">
      <div className="relative aspect-[9/16] w-full max-w-[300px] overflow-hidden rounded-[3px] bg-black ring-1 ring-inset ring-hair">
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
              className="h-full w-full object-cover transition-opacity duration-300 group-hover:opacity-90"
            />
            <PlayLabel>Play reel</PlayLabel>
          </button>
        )}
      </div>
      {caption && (
        <figcaption className="text-[13px] text-ink-muted">
          {caption}
          {href && (
            <>
              {". "}
              <ExternalLink href={href} className="font-normal">
                Open on Instagram
              </ExternalLink>
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
    <div className="flex max-w-[60ch] flex-col gap-4 text-[16px] leading-[1.7] text-ink/90 [&_strong]:font-semibold [&_strong]:text-ink">
      {children}
    </div>
  );
}

/* --------------------------------------------------------------- highlight --- */

/** The single thesis phrase in a window, set in the sky accent. */
export function Highlight({ children }: { children: ReactNode }) {
  return <mark className="bg-transparent font-medium text-sky-ink">{children}</mark>;
}

/* ----------------------------------------------------------- section head --- */

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <h3 className="font-display text-[1.6rem] font-medium leading-tight tracking-[-0.01em] text-ink">
      {children}
    </h3>
  );
}
