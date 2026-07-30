"use client";

import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { DualCTA } from "@/components/DualCTA";
import { Icon } from "@/components/icons";
import { TRACK_RECORD } from "@/lib/content";

// Track record — named transactions with hero photography. Three of the
// courses we've sold hosted a major championship.
export function TrackRecord(): React.ReactElement {
  return (
    <section id="track-record" className="bg-[var(--color-surface)] py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">{TRACK_RECORD.eyebrow}</p>
          <h2 className="mt-4 font-display text-4xl leading-[1.08] tracking-[-0.01em] text-[var(--color-text)] md:text-[2.75rem]">
            {TRACK_RECORD.headline}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[var(--color-muted)] md:text-lg">
            {TRACK_RECORD.subhead}
          </p>
        </Reveal>

        {/* Championship pedigree — named text-forward cards over a neutral,
            non-course-specific backdrop used purely as ambient texture. */}
        <Reveal delay={80}>
          <div className="relative mt-12 overflow-hidden rounded-2xl border border-[var(--color-border)] shadow-card">
            <Image
              src="/images/hero-wide.jpg"
              alt=""
              aria-hidden
              fill
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[var(--color-primary)]/88" />
            <div className="relative p-8 md:p-10">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--color-accent)]">
                <Icon name="trophy" className="h-4 w-4" strokeWidth={1.8} />
                {TRACK_RECORD.championship.title}
              </p>
              <p className="mt-2 max-w-xl text-lg text-[var(--color-text)]">
                {TRACK_RECORD.championship.note}
              </p>
              <div className="mt-8 grid gap-6 sm:grid-cols-3">
                {TRACK_RECORD.championship.venues.map((v) => (
                  <div key={v.name} className="border-t border-[var(--color-accent)]/30 pt-4">
                    <h3 className="font-display text-xl text-[var(--color-text)]">{v.name}</h3>
                    <p className="mt-1 flex items-center gap-1.5 text-sm text-[var(--color-muted)]">
                      <Icon name="map-pin" className="h-4 w-4 text-[var(--color-accent)]" strokeWidth={1.6} />
                      {v.location}
                    </p>
                    <p className="mt-2 text-sm font-medium text-[var(--color-text)]/90">{v.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Featured photo cards — each labeled with its own course name. */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {TRACK_RECORD.featured.map((t, i) => (
            <Reveal key={t.name} delay={i * 70}>
              <article className="group relative aspect-[16/10] overflow-hidden rounded-2xl border border-[var(--color-border)] shadow-card">
                <Image
                  src={t.image}
                  alt={`${t.name}, ${t.location}`}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary)] via-[var(--color-primary)]/40 to-transparent" />
                {t.major && (
                  <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-[var(--color-accent)]/50 bg-[var(--color-primary)]/70 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[var(--color-accent)] backdrop-blur-sm">
                    <Icon name="trophy" className="h-3.5 w-3.5" strokeWidth={1.8} />
                    Major venue
                  </span>
                )}
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="font-display text-2xl text-[var(--color-text)]">{t.name}</h3>
                  <p className="mt-1 flex items-center gap-1.5 text-sm text-[var(--color-muted)]">
                    <Icon name="map-pin" className="h-4 w-4 text-[var(--color-accent)]" strokeWidth={1.6} />
                    {t.location}
                  </p>
                  {t.note && (
                    <p className="mt-2 text-sm font-medium text-[var(--color-text)]/90">{t.note}</p>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Additional transactions */}
        <Reveal delay={120}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {TRACK_RECORD.others.map((o) => (
              <span
                key={o.name}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-primary)] px-4 py-2 text-sm text-[var(--color-text)]"
              >
                <Icon name="flag" className="h-4 w-4 text-[var(--color-accent)]" strokeWidth={1.8} />
                {o.name}
                <span className="text-[var(--color-muted)]">· {o.location}</span>
              </span>
            ))}
          </div>
        </Reveal>

        <div className="mt-14">
          <DualCTA />
        </div>
      </div>
    </section>
  );
}
