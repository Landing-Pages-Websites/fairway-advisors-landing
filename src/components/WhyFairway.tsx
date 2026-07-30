"use client";

import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { DualCTA } from "@/components/DualCTA";
import { Icon } from "@/components/icons";
import { WHY } from "@/lib/content";

// Why Fairway — PAS: problem → agitate → solution, with differentiators.
export function WhyFairway(): React.ReactElement {
  return (
    <section id="why-fairway" className="bg-[var(--color-primary)] py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Editorial image */}
          <Reveal className="order-2 lg:order-1">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-[var(--color-border)] shadow-card-lg">
              <Image
                src="/images/clubhouse.jpg"
                alt="A private golf clubhouse at dusk"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary)]/70 via-transparent to-transparent" />
            </div>
          </Reveal>

          {/* Narrative */}
          <div className="order-1 lg:order-2">
            <Reveal className="space-y-6">
              <p className="eyebrow">{WHY.eyebrow}</p>
              <h2 className="font-display text-4xl leading-[1.08] tracking-[-0.01em] text-[var(--color-text)] md:text-[2.75rem]">
                {WHY.headline}
              </h2>
              <div className="space-y-5 text-base leading-relaxed text-[var(--color-muted)] md:text-lg">
                <p>{WHY.problem}</p>
                <p>{WHY.agitate}</p>
                <p className="border-l-2 border-[var(--color-accent)] pl-5 text-[var(--color-text)]">
                  {WHY.solution}
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Differentiators */}
        <Reveal delay={80}>
          <ul className="mt-16 grid gap-6 md:grid-cols-3 md:mt-20">
            {WHY.differentiators.map((d) => (
              <li
                key={d.title}
                className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-7 transition-colors hover:border-[var(--color-accent)]/50"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-accent)]/12 text-[var(--color-accent)]">
                  <Icon name={d.icon} className="h-6 w-6" strokeWidth={1.6} />
                </div>
                <h3 className="mt-5 font-display text-xl text-[var(--color-text)]">{d.title}</h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-[var(--color-muted)]">{d.body}</p>
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="mt-14">
          <DualCTA />
        </div>
      </div>
    </section>
  );
}
