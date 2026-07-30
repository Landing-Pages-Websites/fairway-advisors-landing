"use client";

import { CTA, PHONE, PHONE_HREF } from "@/lib/content";
import { Icon } from "@/components/icons";

interface DualCTAProps {
  align?: "start" | "center";
  primaryLabel?: string;
  primaryHref?: string;
}

// Gold primary + gold-outline phone link. Every content section ends with this.
export function DualCTA({
  align = "center",
  primaryLabel = CTA.primary,
  primaryHref = CTA.formAnchor,
}: DualCTAProps): React.ReactElement {
  const justify = align === "start" ? "justify-start" : "justify-center";

  return (
    <div className={`flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center ${justify} gap-3`}>
      <a
        href={primaryHref}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-accent)] px-7 py-3.5 text-base font-semibold tracking-wide text-[var(--color-primary)] shadow-cta transition-all duration-200 hover:bg-[var(--color-accent-hover)] hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]"
      >
        {primaryLabel}
        <Icon name="arrow" className="h-4 w-4" strokeWidth={2.2} />
      </a>
      <a
        href={PHONE_HREF}
        className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--color-accent)]/60 px-6 py-3.5 text-base font-semibold text-[var(--color-text)] transition-colors duration-200 hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
        aria-label={`Call Fairway Advisors at ${PHONE}`}
      >
        <Icon name="phone" className="h-4 w-4 text-[var(--color-accent)]" strokeWidth={0} fill="currentColor" />
        {CTA.secondary}
      </a>
    </div>
  );
}
