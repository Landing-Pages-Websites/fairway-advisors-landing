"use client";

import { useEffect, useState } from "react";
import { CTA, PHONE, PHONE_HREF } from "@/lib/content";
import { Icon } from "@/components/icons";

// Mobile sticky action bar — the free-evaluation CTA + phone, always one tap away.
export function FloatingCTA(): React.ReactElement {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = (): void => setShow(window.scrollY > 620);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden={!show}
      className={`sm:hidden fixed inset-x-0 bottom-0 z-50 border-t border-[var(--color-border)] bg-[var(--color-primary)]/95 backdrop-blur-md px-3 py-2.5 transition-all duration-300 [box-shadow:0_-8px_28px_-12px_rgba(0,0,0,0.7)] ${
        show ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
      }`}
      style={{ paddingBottom: "max(0.625rem, env(safe-area-inset-bottom))" }}
    >
      <div className="flex items-center gap-2.5">
        <a
          href={CTA.formAnchor}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[var(--color-accent)] px-4 py-3 text-sm font-semibold text-[var(--color-primary)] shadow-cta"
        >
          What&apos;s my course worth?
          <Icon name="arrow" className="h-4 w-4" strokeWidth={2.2} />
        </a>
        <a
          href={PHONE_HREF}
          aria-label={`Call Fairway Advisors at ${PHONE}`}
          className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[var(--color-accent)]/60 text-[var(--color-accent)]"
        >
          <Icon name="phone" className="h-5 w-5" strokeWidth={0} fill="currentColor" />
        </a>
      </div>
    </div>
  );
}
