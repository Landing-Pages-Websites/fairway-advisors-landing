"use client";

import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { DualCTA } from "@/components/DualCTA";
import { FINAL_CTA } from "@/lib/content";

// Final CTA — cinematic full-bleed closing band reinforcing the free evaluation.
export function FinalCta(): React.ReactElement {
  return (
    <section
      id="final-cta"
      className="relative isolate overflow-hidden bg-[var(--color-primary)] py-24 md:py-32"
    >
      <div className="absolute inset-0 -z-10">
        <Image src="/images/hero-wide.jpg" alt="" fill sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-[var(--color-primary)]/80" />
        <div className="photo-wash absolute inset-0" />
      </div>

      <div className="mx-auto max-w-3xl px-5 text-center md:px-8">
        <Reveal className="space-y-6">
          <h2 className="font-display leading-[1.06] tracking-[-0.01em] text-[var(--color-text)] text-4xl md:text-[3.5rem]">
            {FINAL_CTA.headline}
            <br />
            <span className="text-[var(--color-accent)]">{FINAL_CTA.headlineAccent}</span>
          </h2>
          <p className="mx-auto max-w-xl text-lg font-light leading-relaxed text-[var(--color-text)]/85">
            {FINAL_CTA.body}
          </p>
          <div className="pt-2">
            <DualCTA align="center" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
