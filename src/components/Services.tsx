"use client";

import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { DualCTA } from "@/components/DualCTA";
import { Icon } from "@/components/icons";
import { SERVICES } from "@/lib/content";

// Services — sell-side brokerage focus with real body copy.
export function Services(): React.ReactElement {
  return (
    <section id="services" className="relative isolate overflow-hidden bg-[var(--color-primary)] py-20 md:py-28">
      {/* Subtle course backdrop */}
      <div className="absolute inset-0 -z-10">
        <Image src="/images/hero-oakwood.jpg" alt="" fill sizes="100vw" className="object-cover object-center opacity-[0.12]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-primary)] via-[var(--color-primary)]/85 to-[var(--color-primary)]" />
      </div>

      <div className="mx-auto max-w-[1200px] px-5 md:px-8">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">{SERVICES.eyebrow}</p>
          <h2 className="mt-4 font-display text-4xl leading-[1.08] tracking-[-0.01em] text-[var(--color-text)] md:text-[2.75rem]">
            {SERVICES.headline}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[var(--color-muted)] md:text-lg">
            {SERVICES.subhead}
          </p>
        </Reveal>

        <div className="mt-14 space-y-6">
          {SERVICES.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 70}>
              <article className="grid gap-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-7 md:grid-cols-[auto_1fr] md:gap-8 md:p-9">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-accent)]/12 text-[var(--color-accent)]">
                  <Icon name={item.icon} className="h-7 w-7" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-display text-2xl text-[var(--color-text)]">{item.title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-[var(--color-muted)]">{item.body}</p>
                  {"methods" in item && item.methods && (
                    <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                      {item.methods.map((m) => (
                        <li key={m} className="flex items-start gap-2.5 text-sm text-[var(--color-text)]/90">
                          <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-accent)]" strokeWidth={2.4} />
                          {m}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-14">
          <DualCTA />
        </div>
      </div>
    </section>
  );
}
