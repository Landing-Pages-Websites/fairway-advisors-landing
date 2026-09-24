"use client";

import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { FormCard } from "@/components/FormCard";
import { Icon } from "@/components/icons";
import { BRAND, CTA, TRANSACTION_SCOPE } from "@/lib/content";

const ASSURANCES = [
  "No-obligation conversation",
  "Completely confidential process",
  "Reviewed by a Fairway Advisors principal",
];

// Lead-form section — the shared buy/sell form as a card on golf photography.
export function LeadForm(): React.ReactElement {
  return (
    <section
      id="lead-form"
      className="relative isolate overflow-hidden bg-[var(--color-primary)] py-20 md:py-28"
    >
      <div className="absolute inset-0 -z-10">
        <Image src="/images/hero-edgewood.jpg" alt="" fill sizes="100vw" className="object-cover object-center" />
        <div className="photo-wash absolute inset-0" />
      </div>

      <div className="mx-auto grid max-w-[1200px] items-center gap-12 px-5 md:px-8 lg:grid-cols-2 lg:gap-16">
        <Reveal className="space-y-6">
          <p className="eyebrow">{BRAND.tagline}</p>
          <h2 className="font-display text-4xl leading-[1.08] text-[var(--color-text)] md:text-[3rem]">
            Buying or selling a golf course?
          </h2>
          <p className="max-w-lg text-lg font-light leading-relaxed text-[var(--color-text)]/90">
            {CTA.primary}. We advise buyers and sellers of {TRANSACTION_SCOPE} nationwide —
            with over $1 billion sold and advised.
          </p>
          <ul className="space-y-3 pt-2">
            {ASSURANCES.map((a) => (
              <li key={a} className="flex items-center gap-3 text-base text-[var(--color-text)]">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-accent)]/15">
                  <Icon name="check" className="h-3.5 w-3.5 text-[var(--color-accent)]" strokeWidth={2.6} />
                </span>
                {a}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120}>
          <FormCard idPrefix="lead" />
        </Reveal>
      </div>
    </section>
  );
}
