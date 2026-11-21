"use client";

import { useState, type ReactNode } from "react";
import { AppHeader } from "./_kit";
import { cn } from "@/lib/utils";

// Real, working contact details.
const EMAIL = "simon.mathiasclg@gmail.com";
const LINKEDIN_URL = "https://www.linkedin.com/in/simonnandmathias/";
const LINKEDIN_LABEL = "/in/simonnandmathias";
const GITHUB_URL = "https://github.com/simonmathiasclg-spec";
const GITHUB_LABEL = "simonmathiasclg-spec";
const PHONE_DISPLAY = "+1 437 430 8003";
const PHONE_TEL = "+14374308003";

const focusRing =
  "rounded-[2px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cerulean)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--window)]";

const linkClass = cn(
  "cursor-hover text-sky-ink underline decoration-[color-mix(in_srgb,var(--sky-ink)_40%,transparent)] decoration-1 underline-offset-[4px] transition-colors hover:decoration-current",
  focusRing,
);

function Row({
  channel,
  children,
  action,
}: {
  channel: string;
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <li className="flex flex-wrap items-baseline gap-x-6 gap-y-1 border-t border-hair py-4">
      <span className="w-20 shrink-0 text-[13px] text-ink-muted">{channel}</span>
      <span className="min-w-0 break-all text-[16px] font-medium">{children}</span>
      {action && <span className="ml-auto shrink-0">{action}</span>}
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
      /* clipboard blocked; the mailto link still works */
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <AppHeader
        title="Let&rsquo;s talk"
        lead="Recruiting, building, or just comparing notes: I answer everything."
      />

      <ul className="flex flex-col border-b border-hair">
        <Row
          channel="Email"
          action={
            <button
              onClick={copyEmail}
              aria-label={copied ? "Email copied" : "Copy email address"}
              className={cn(
                "cursor-hover text-[13px] text-ink-muted transition-colors hover:text-ink",
                focusRing,
              )}
            >
              {copied ? "Copied" : "Copy"}
            </button>
          }
        >
          <a href={`mailto:${EMAIL}`} className={linkClass}>
            {EMAIL}
          </a>
        </Row>

        <Row channel="LinkedIn">
          <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>
            {LINKEDIN_LABEL}
            <span aria-hidden> ↗</span>
          </a>
        </Row>

        <Row channel="GitHub">
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>
            {GITHUB_LABEL}
            <span aria-hidden> ↗</span>
          </a>
        </Row>

        <Row channel="Phone">
          <a href={`tel:${PHONE_TEL}`} className={linkClass}>
            {PHONE_DISPLAY}
          </a>
        </Row>
      </ul>

      <p className="text-[14px] leading-relaxed text-ink-muted">
        Based in Toronto. Open to internships, founder conversations, and the
        occasional gig.
      </p>
    </div>
  );
}
