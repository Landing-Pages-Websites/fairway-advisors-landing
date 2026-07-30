import Image from "next/image";
import { BRAND, CURRENT_YEAR, PHONE, PHONE_HREF } from "@/lib/content";
import { Icon } from "@/components/icons";

export function SiteFooter(): React.ReactElement {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-primary)] text-[var(--color-muted)]">
      <div className="mx-auto max-w-[1200px] px-5 py-14 md:px-8">
        <div className="grid gap-10 md:grid-cols-2 md:items-start">
          <div>
            <Image
              src="/images/logo-fairway.png"
              alt="Fairway Advisors"
              width={712}
              height={96}
              className="h-7 w-auto object-contain"
            />
            <p className="mt-5 font-display text-xl italic text-[var(--color-text)]">
              {BRAND.tagline}
            </p>
            <p className="mt-2 max-w-sm text-sm leading-relaxed">
              Golf course brokerage and advisory — over $1 billion sold and advised, an
              unrivaled track record from California to New York.
            </p>
          </div>

          <address className="space-y-2 text-sm not-italic leading-relaxed md:text-right">
            <p className="font-semibold text-[var(--color-text)]">Fairway Advisors</p>
            <p>
              <a
                href={PHONE_HREF}
                className="inline-flex items-center gap-2 transition-colors hover:text-[var(--color-accent)] md:justify-end"
                aria-label={`Call Fairway Advisors at ${PHONE}`}
              >
                <Icon name="phone" className="h-4 w-4 text-[var(--color-accent)]" strokeWidth={0} fill="currentColor" />
                {PHONE}
              </a>
            </p>
            <p>
              <a href={BRAND.emailHref} className="transition-colors hover:text-[var(--color-accent)]">
                {BRAND.email}
              </a>
            </p>
            <p>
              <a href="#lead-form" className="transition-colors hover:text-[var(--color-accent)]">
                Contact us
              </a>
            </p>
          </address>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-[var(--color-border)] pt-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>© {CURRENT_YEAR} Fairway Advisors. All rights reserved. The Business of Golf® and There&apos;s a Major Difference® are registered trademarks.</p>
          <a href="/privacy" className="transition-colors hover:text-[var(--color-accent)]">
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
}
