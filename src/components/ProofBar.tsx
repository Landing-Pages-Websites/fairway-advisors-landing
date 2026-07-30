"use client";

import { Reveal } from "@/components/Reveal";
import { PROOF_STATS } from "@/lib/content";

// Trust bar — verbatim proof stats. 4-up on desktop, 2×2 on mobile.
export function ProofBar(): React.ReactElement {
  return (
    <section
      id="trust-bar"
      className="border-y border-[var(--color-border)] bg-[var(--color-surface)] py-12 md:py-14"
    >
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">
        <Reveal>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4 md:divide-x md:divide-[var(--color-border)]">
            {PROOF_STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center text-center md:px-4">
                <dt className="font-display text-5xl font-bold leading-none text-[var(--color-accent)] md:text-[3.75rem]">
                  {stat.value}
                </dt>
                <dd className="mt-3 text-sm font-medium uppercase tracking-[0.12em] text-[var(--color-muted)]">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
