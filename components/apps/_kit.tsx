"use client";

import { useState, type ComponentType, type ReactNode } from "react";
import {
  ImageSquare,
  ArrowUpRight,
  ArrowRight,
  Images,
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
}: {
  src: string;
  label: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  icon?: AppIcon;
  objectPosition?: string;
}) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const file = src.split("/").pop();

  return (
    <div
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

/* ------------------------------------------------------------- prose body --- */

export function Body({ children }: { children: ReactNode }) {
  return (
    <div className="flex max-w-[58ch] flex-col gap-4 text-[15px] leading-[1.72] text-ink/85 [&_strong]:font-semibold [&_strong]:text-ink">
      {children}
    </div>
  );
}

/* ----------------------------------------------------------- section head --- */

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <h3 className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-muted">
      {children}
    </h3>
  );
}
