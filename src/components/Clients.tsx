"use client";

import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { CLIENTS } from "@/lib/content";

// Clients — institution logos on light plaques (grayscale → color on hover),
// with notable-club name chips for added credibility.
export function Clients(): React.ReactElement {
  return (
    <section id="clients" className="bg-[var(--color-primary)] py-16 md:py-20">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">
        <Reveal className="text-center">
          <p className="eyebrow">{CLIENTS.eyebrow}</p>
          <h2 className="mx-auto mt-4 max-w-2xl font-display text-3xl leading-tight text-[var(--color-text)] md:text-4xl">
            {CLIENTS.headline}
          </h2>
        </Reveal>

        <Reveal delay={80}>
          <ul className="mt-12 flex flex-wrap items-center justify-center gap-5 md:gap-8">
            {CLIENTS.logos.map((logo) => (
              <li
                key={logo.alt}
                className="group flex h-24 w-52 items-center justify-center rounded-xl bg-[var(--color-text)] px-6 shadow-card grayscale transition-all duration-300 hover:grayscale-0 hover:-translate-y-0.5"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={180}
                  height={60}
                  className="h-auto max-h-14 w-auto max-w-[150px] object-contain"
                />
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={140}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-3 gap-y-2.5">
            {CLIENTS.clubs.map((club) => (
              <span
                key={club}
                className="rounded-full border border-[var(--color-border)] px-4 py-1.5 text-sm text-[var(--color-muted)]"
              >
                {club}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
