"use client";

import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { Icon } from "@/components/icons";
import { BUY_SIDE, PHONE, PHONE_HREF } from "@/lib/content";

// Buy-side — secondary acquisition-advisory section serving the Buy-Side ad group.
export function BuySide(): React.ReactElement {
  return (
    <section id="buy-side" className="bg-[var(--color-surface)] py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">
        <div className="grid items-stretch overflow-hidden rounded-3xl border border-[var(--color-border)] lg:grid-cols-2">
          {/* Aerial course imagery */}
          <Reveal className="relative min-h-[280px]">
            <Image
              src="/images/hero-bluehill.jpg"
              alt="Aerial view of a golf course"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary)]/60 to-transparent lg:bg-gradient-to-r" />
            <span className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full border border-[var(--color-secondary)]/70 bg-[var(--color-primary)]/70 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--color-text)] backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-[var(--color-secondary)]" />
              Acquisition Advisory
            </span>
          </Reveal>

          {/* Copy */}
          <div className="bg-[var(--color-primary)] p-8 md:p-12">
            <Reveal className="space-y-5">
              <p className="eyebrow">{BUY_SIDE.eyebrow}</p>
              <h2 className="font-display text-4xl leading-[1.08] text-[var(--color-text)] md:text-[2.5rem]">
                {BUY_SIDE.headline}
              </h2>
              <p className="text-base leading-relaxed text-[var(--color-muted)] md:text-lg">
                {BUY_SIDE.body}
              </p>
              <p className="text-base leading-relaxed text-[var(--color-text)]/90">
                {BUY_SIDE.detail}
              </p>
              <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
                <a
                  href="#lead-form"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--color-secondary)] bg-[var(--color-secondary)] px-6 py-3.5 text-base font-semibold text-[var(--color-text)] transition-all hover:bg-[var(--color-secondary-hover)] hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-primary)]"
                >
                  {BUY_SIDE.cta}
                  <Icon name="arrow" className="h-4 w-4" strokeWidth={2.2} />
                </a>
                <a
                  href={PHONE_HREF}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--color-border-strong)] px-6 py-3.5 text-base font-semibold text-[var(--color-text)] transition-colors hover:border-[var(--color-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
                  aria-label={`Call Fairway Advisors at ${PHONE}`}
                >
                  <Icon name="phone" className="h-4 w-4 text-[var(--color-accent)]" strokeWidth={0} fill="currentColor" />
                  {PHONE}
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
