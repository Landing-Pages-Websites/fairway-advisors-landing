"use client";

import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { FormCard } from "@/components/FormCard";
import { Icon } from "@/components/icons";
import { HERO, PHONE, PHONE_HREF } from "@/lib/content";

export function Hero(): React.ReactElement {
  return (
    <section
      id="hero"
      className="relative isolate overflow-hidden bg-[var(--color-primary)] pb-16 pt-28 md:pb-24 md:pt-36"
    >
      {/* Full-bleed golf-course photography + cinematic navy wash */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/hero-wide.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="photo-wash absolute inset-0" />
        <div className="photo-wash-side absolute inset-0 hidden lg:block" />
      </div>

      <div className="mx-auto grid max-w-[1200px] items-center gap-10 px-5 md:px-8 lg:grid-cols-12 lg:gap-14">
        {/* Copy */}
        <div className="relative lg:col-span-7">
          {/* Localized text scrim — mobile/tablet only (desktop uses .photo-wash-side).
              Keeps cream heading + muted supporting copy legible over the now-lighter
              photo wash, fading to transparent so the golf course still shows through. */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-x-5 -top-28 bottom-0 -z-[1] bg-[linear-gradient(180deg,rgba(10,13,27,0.62)_0%,rgba(10,13,27,0.55)_62%,rgba(10,13,27,0.28)_88%,rgba(10,13,27,0)_100%)] lg:hidden"
          />
          <Reveal className="space-y-6">
            <p className="eyebrow">{HERO.eyebrow}</p>

            <h1 className="font-display font-black leading-[1.02] tracking-[-0.02em] text-[var(--color-text)] text-[2.75rem] sm:text-6xl lg:text-[5rem]">
              {HERO.h1Lead}
              <span className="align-super text-[0.4em] text-[var(--color-accent)]">
                {HERO.h1Trademark}
              </span>
              <span className="text-[var(--color-accent)]">{HERO.h1Punct}</span>
            </h1>

            <p className="max-w-xl text-lg font-light leading-relaxed text-[var(--color-text)]/90 md:text-xl">
              {HERO.subhead}
            </p>

            <p className="max-w-xl text-base leading-relaxed text-[var(--color-muted)]">
              {HERO.supporting}
            </p>

            <div className="flex flex-col gap-4 pt-1 sm:flex-row sm:items-center">
              <a
                href="#lead-form"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-accent)] px-7 py-3.5 text-base font-semibold text-[var(--color-primary)] shadow-cta transition-all hover:bg-[var(--color-accent-hover)] hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-primary)] lg:hidden"
              >
                Find out what your course is worth
                <Icon name="arrow" className="h-4 w-4" strokeWidth={2.2} />
              </a>
              <a
                href={PHONE_HREF}
                className="inline-flex items-center gap-2 rounded-md px-1 font-semibold text-[var(--color-text)] transition-colors hover:text-[var(--color-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
                aria-label={`Call Fairway Advisors at ${PHONE}`}
              >
                <Icon name="phone" className="h-5 w-5 text-[var(--color-accent)]" strokeWidth={0} fill="currentColor" />
                <span>
                  <span className="mr-1.5 text-sm font-light text-[var(--color-muted)]">Prefer to talk?</span>
                  {PHONE}
                </span>
              </a>
            </div>
          </Reveal>
        </div>

        {/* Form */}
        <div className="lg:col-span-5">
          <Reveal delay={120}>
            <FormCard idPrefix="hero" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
