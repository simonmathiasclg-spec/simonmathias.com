"use client";

import { useState, type ReactNode } from "react";
import {
  EnvelopeSimple,
  LinkedinLogo,
  Phone,
  Copy,
  Check,
  type IconProps,
} from "@phosphor-icons/react";
import { AppHeader } from "./_kit";
import { cn } from "@/lib/utils";

// Real, working contact details.
const EMAIL = "simon.mathiasclg@gmail.com";
const LINKEDIN_URL = "https://www.linkedin.com/in/simonnandmathias/";
const LINKEDIN_LABEL = "/in/simonnandmathias";
const PHONE_DISPLAY = "+1 437 430 8003";
const PHONE_TEL = "+14374308003";

const focusRing =
  "rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cerulean)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--window)]";

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
        <span className="truncate text-[15px] font-medium text-ink">{children}</span>
      </div>
      <div className="ml-auto shrink-0">{action}</div>
    </li>
  );
}

function OpenLink({ href, external, label }: { href: string; external?: boolean; label: string }) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      aria-label={label}
      className={cn(
        "cursor-hover grid size-8 place-items-center rounded-lg text-ink-muted transition-colors hover:bg-window-2 hover:text-ink",
        focusRing,
      )}
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
        lead="Recruiting, building, or just want to compare notes: I answer everything."
      />

      <ul className="flex flex-col">
        <Row
          icon={EnvelopeSimple}
          channel="Email"
          action={
            <button
              onClick={copyEmail}
              aria-label={copied ? "Email copied" : "Copy email address"}
              className={cn(
                "cursor-hover inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 font-mono text-[11px] font-medium uppercase tracking-wider transition-colors",
                copied
                  ? "bg-saffron/15 text-[color-mix(in_srgb,var(--saffron)_72%,var(--ink))]"
                  : "bg-window-2 text-ink-muted hover:text-ink",
                focusRing,
              )}
            >
              {copied ? <Check weight="bold" className="size-3.5" /> : <Copy weight="bold" className="size-3.5" />}
              {copied ? "Copied" : "Copy"}
            </button>
          }
        >
          <a href={`mailto:${EMAIL}`} className={cn("transition-colors hover:text-saffron", focusRing)}>
            {EMAIL}
          </a>
        </Row>

        <Row
          icon={LinkedinLogo}
          channel="LinkedIn"
          action={<OpenLink href={LINKEDIN_URL} external label="Open LinkedIn profile in a new tab" />}
        >
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={cn("transition-colors hover:text-saffron", focusRing)}
          >
            {LINKEDIN_LABEL}
          </a>
        </Row>

        <Row
          icon={Phone}
          channel="Phone"
          action={<OpenLink href={`tel:${PHONE_TEL}`} label="Call this number" />}
        >
          <a href={`tel:${PHONE_TEL}`} className={cn("transition-colors hover:text-saffron", focusRing)}>
            {PHONE_DISPLAY}
          </a>
        </Row>
      </ul>

      <p className="font-mono text-[11px] leading-relaxed text-ink-muted/80">
        Based in Toronto · open to internships, founder conversations, and the
        occasional gig.
      </p>
    </div>
  );
}
