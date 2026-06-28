"use client";

import { useState, type ReactNode } from "react";
import {
  EnvelopeSimple,
  LinkedinLogo,
  GithubLogo,
  Copy,
  Check,
  type IconProps,
} from "@phosphor-icons/react";
import { AppHeader } from "./_kit";
import { cn } from "@/lib/utils";

/*
  TODO(simon): drop in your real handles below (and the matching rows in
  README.md → "Fill in your contact handles"). Each placeholder is marked in the
  UI with a dashed saffron underline so you can spot what's left to wire up.
*/
const EMAIL = "hello@simonmathias.dev"; // TODO(simon): real email
const LINKEDIN_URL = "https://linkedin.com/in/your-handle"; // TODO(simon)
const LINKEDIN_LABEL = "/in/your-handle";
const GITHUB_URL = "https://github.com/your-handle"; // TODO(simon)
const GITHUB_LABEL = "@your-handle";

function Placeholder({ children }: { children: ReactNode }) {
  return (
    <span className="relative whitespace-nowrap underline decoration-dashed decoration-saffron/70 decoration-1 underline-offset-4">
      {children}
      <sup className="ml-1 align-super font-mono text-[8px] font-semibold uppercase tracking-wider text-saffron">
        to add
      </sup>
    </span>
  );
}

function Row({
  icon: Icon,
  channel,
  children,
  action,
}: {
  icon: React.ComponentType<IconProps>;
  channel: string;
  children: ReactNode;
  action: ReactNode;
}) {
  return (
    <li className="flex items-center gap-4 border-t border-hair py-4 first:border-t-0">
      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-window-2 ring-1 ring-inset ring-hair">
        <Icon weight="duotone" className="size-5 text-ink" />
      </span>
      <div className="flex min-w-0 flex-col">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
          {channel}
        </span>
        <span className="truncate text-[15px] font-medium text-ink">
          {children}
        </span>
      </div>
      <div className="ml-auto shrink-0">{action}</div>
    </li>
  );
}

export default function ContactApp() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard blocked — the mailto link still works */
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <AppHeader
        index="05"
        kicker="Contact"
        title="Let&rsquo;s talk"
        lead="Recruiting, building, or just want to compare notes — I answer everything."
      />

      <ul className="flex flex-col">
        <Row
          icon={EnvelopeSimple}
          channel="Email"
          action={
            <button
              onClick={copyEmail}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 font-mono text-[11px] font-medium uppercase tracking-wider transition-colors",
                copied
                  ? "bg-saffron/15 text-[color-mix(in_srgb,var(--saffron)_72%,var(--ink))]"
                  : "bg-window-2 text-ink-muted hover:text-ink",
              )}
              aria-label="Copy email address"
            >
              {copied ? (
                <Check weight="bold" className="size-3.5" />
              ) : (
                <Copy weight="bold" className="size-3.5" />
              )}
              {copied ? "Copied" : "Copy"}
            </button>
          }
        >
          <a
            href={`mailto:${EMAIL}`}
            className="transition-colors hover:text-saffron"
          >
            <Placeholder>{EMAIL}</Placeholder>
          </a>
        </Row>

        <Row
          icon={LinkedinLogo}
          channel="LinkedIn"
          action={<ActionArrow href={LINKEDIN_URL} />}
        >
          <Placeholder>{LINKEDIN_LABEL}</Placeholder>
        </Row>

        <Row
          icon={GithubLogo}
          channel="GitHub"
          action={<ActionArrow href={GITHUB_URL} />}
        >
          <Placeholder>{GITHUB_LABEL}</Placeholder>
        </Row>
      </ul>

      <p className="font-mono text-[11px] leading-relaxed text-ink-muted/80">
        Based in Toronto · open to internships, founder conversations, and the
        occasional gig.
      </p>
    </div>
  );
}

function ActionArrow({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="grid size-8 place-items-center rounded-lg text-ink-muted transition-colors hover:bg-window-2 hover:text-ink"
      aria-label="Open profile"
    >
      <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
        <path
          d="M5 11L11 5M11 5H6M11 5V10"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  );
}
