"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { CTA, PHONE, PHONE_HREF } from "@/lib/content";
import { Icon } from "@/components/icons";

// Minimal luxury header: FA wordmark left, phone + single gold CTA right.
// Transparent over the hero, solid navy once scrolled. No competing nav.
export function Header(): React.ReactElement {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = (): void => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        scrolled
          ? "bg-[var(--color-primary)]/95 backdrop-blur-md border-b border-[var(--color-border)] py-2.5"
          : "bg-transparent border-b border-transparent py-3 md:py-4"
      }`}
    >
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-3 px-5 md:px-8">
        <a
          href="#hero"
          className="flex min-w-0 max-w-[190px] shrink items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] md:max-w-[230px] lg:max-w-none"
          aria-label="Fairway Advisors — home"
        >
          <Image
            src="/images/logo-fairway.png"
            alt="Fairway Advisors"
            width={712}
            height={96}
            priority
            className="h-6 w-auto max-w-full object-contain md:h-7"
          />
        </a>

        <div className="flex shrink-0 items-center gap-2 md:gap-4">
          <a
            href={PHONE_HREF}
            className="hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-[var(--color-text)] transition-colors hover:text-[var(--color-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] sm:inline-flex"
            aria-label={`Call Fairway Advisors at ${PHONE}`}
          >
            <Icon name="phone" className="h-4 w-4 text-[var(--color-accent)]" strokeWidth={0} fill="currentColor" />
            <span>{PHONE}</span>
          </a>
          <a
            href={CTA.formAnchor}
            className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-[var(--color-accent)] px-3 text-[13px] font-semibold leading-[40px] text-[var(--color-primary)] shadow-cta transition-all hover:bg-[var(--color-accent-hover)] hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-primary)] md:gap-2 md:px-5 md:text-sm md:leading-[44px]"
          >
            <span className="hidden whitespace-nowrap md:inline">{CTA.primary}</span>
            <span className="whitespace-nowrap md:hidden">Free evaluation</span>
            <Icon name="arrow" className="h-3.5 w-3.5 shrink-0" strokeWidth={2.4} />
          </a>
        </div>
      </div>
    </header>
  );
}
