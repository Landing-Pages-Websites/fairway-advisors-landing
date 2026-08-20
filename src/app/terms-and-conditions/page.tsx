import type { Metadata } from "next";
import { BRAND, CURRENT_YEAR, PHONE, PHONE_HREF } from "@/lib/content";

export const metadata: Metadata = {
  title: `Terms & Conditions — ${BRAND.company}`,
  description: `Terms and Conditions for ${BRAND.company}, including website use, confidential evaluations, and SMS/text messaging.`,
};

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <section className="mt-12">
      <h2 className="font-display text-2xl leading-tight text-[var(--color-text)] md:text-3xl">
        {title}
      </h2>
      <div className="mt-4 space-y-4 text-[var(--color-muted)] leading-relaxed">
        {children}
      </div>
    </section>
  );
}

export default function TermsAndConditionsPage(): React.ReactElement {
  return (
    <main className="min-h-screen bg-[var(--color-primary)] text-[var(--color-text)]">
      <div className="mx-auto max-w-[800px] px-5 py-20 md:px-8 md:py-28">
        <a
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-muted)] transition-colors hover:text-[var(--color-accent)]"
        >
          <span aria-hidden="true">←</span> Back to home
        </a>

        <header className="mt-10 border-b border-[var(--color-border)] pb-10">
          <p className="eyebrow">{BRAND.company}</p>
          <h1 className="mt-4 font-display text-4xl leading-[1.08] tracking-[-0.01em] text-[var(--color-text)] md:text-[3rem]">
            Terms &amp; Conditions
          </h1>
          <p className="mt-4 text-sm text-[var(--color-muted)]">
            Last updated {CURRENT_YEAR}
          </p>
        </header>

        <div className="mt-10 space-y-4 text-[var(--color-muted)] leading-relaxed">
          <p>
            These Terms &amp; Conditions govern your use of this website and related
            communications from {BRAND.company} (&ldquo;{BRAND.company},&rdquo;
            &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;), a golf course
            brokerage and advisory firm. By accessing this website or submitting an
            evaluation form, you agree to these terms.
          </p>
        </div>

        <Section title="Website Use">
          <p>
            You may use this website for lawful purposes only. You agree to provide
            accurate information when requesting an evaluation and not to interfere
            with the operation, security, or availability of the site. We may update,
            suspend, or discontinue any part of the website at any time.
          </p>
        </Section>

        <Section title="Evaluations and Advisory Services">
          <p>
            A form submission, phone call, or evaluation request does not create a
            brokerage engagement or advisory contract. Evaluations are free and
            confidential for qualifying courses and are provided for informational
            purposes. Pricing, engagement terms, and any representation agreement are
            subject to separate confirmation.
          </p>
        </Section>

        <Section title="Confidentiality">
          <p>
            {BRAND.company} treats owner inquiries as confidential. Submitting a form
            does not authorize us to market your course publicly. Any listing,
            invitation-only process, or disclosure to prospective buyers occurs only
            under a separate engagement.
          </p>
        </Section>

        <Section title="Intellectual Property">
          <p>
            The website, including text, graphics, logos, photos, and layout, is owned
            by {BRAND.company} or used with permission. The Business of Golf® and
            There&apos;s a Major Difference® are trademarks of {BRAND.company}. You
            may not copy or reuse site content for commercial purposes without our
            prior written consent.
          </p>
        </Section>

        <Section title="Disclaimer">
          <p>
            Website content is provided for general information about golf course
            brokerage and advisory services. It is not a guarantee of value, sale,
            timing, or results. To the fullest extent permitted by law, we are not
            liable for errors or interruptions on the website, or for delayed or
            undelivered communications, including text messages.
          </p>
        </Section>

        <Section title="Privacy">
          <p>
            Personal information submitted through this website is handled in
            accordance with our{" "}
            <a
              href="https://info.fairwayadvisors.com/privacy-policy"
              className="font-semibold text-[var(--color-accent)] underline underline-offset-4"
            >
              Privacy Policy
            </a>
            .
          </p>
        </Section>

        <Section title="Changes">
          <p>
            We may update these Terms &amp; Conditions by posting a revised version on
            this page. Continued use of the website after an update constitutes
            acceptance of the revised terms to the extent permitted by law.
          </p>
        </Section>

        <Section title="SMS/Text Messaging">
          <p>
            {BRAND.company} may send you SMS/text messages only if you affirmatively
            check the optional SMS consent checkbox. Providing a phone number or
            submitting a form without checking that box does not constitute consent.
            Messages may include inquiry responses, evaluation follow-ups, appointment
            confirmations, reminders, and service updates.
          </p>
          <p>
            Message frequency may vary. Message and data rates may apply.
            Carriers are not liable for delayed or undelivered messages. Consent is not
            a condition of purchase. Reply STOP to opt out. Reply HELP for help.
          </p>
          <p>
            Your mobile information will not be sold or shared with third parties for
            promotional or marketing purposes. We will not share mobile information
            with third parties for promotional or marketing purposes.
          </p>
          <p>
            All the above categories exclude text messaging originator opt-in data and
            consent; this information will not be shared with any third parties. We
            will not share your opt-in to an SMS campaign with any third party for
            purposes unrelated to providing you with the services of that campaign. We
            may share your Personal Data, including your SMS opt-in or consent status,
            with third parties that help us provide our messaging services, including
            but not limited to platform providers, phone companies, and any other
            vendors who assist us in the delivery of text messages.
          </p>
          <p>
            To opt out, reply STOP to any text message. To get help, reply HELP or
            contact{" "}
            <a
              href={BRAND.emailHref}
              className="font-semibold text-[var(--color-accent)] underline underline-offset-4"
            >
              {BRAND.email}
            </a>
            . Opting out of text messages does not affect other communications from{" "}
            {BRAND.company}.
          </p>
        </Section>

        <Section title="Contact">
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-card">
            <p className="font-display text-lg text-[var(--color-text)]">
              {BRAND.company}
            </p>
            <p className="mt-3">
              <a
                href={BRAND.emailHref}
                className="transition-colors hover:text-[var(--color-accent)]"
              >
                {BRAND.email}
              </a>
            </p>
            <p className="mt-1">
              <a
                href={PHONE_HREF}
                className="transition-colors hover:text-[var(--color-accent)]"
                aria-label={`Call ${BRAND.company} at ${PHONE}`}
              >
                {PHONE}
              </a>
            </p>
          </div>
        </Section>

        <footer className="mt-16 border-t border-[var(--color-border)] pt-6 text-xs text-[var(--color-muted)]">
          <p>
            © {CURRENT_YEAR} {BRAND.company}. All rights reserved.
          </p>
          <p className="mt-3">
            <a
              href="https://info.fairwayadvisors.com/privacy-policy"
              className="font-semibold text-[var(--color-accent)] underline underline-offset-4"
            >
              Privacy Policy
            </a>
          </p>
        </footer>
      </div>
    </main>
  );
}
