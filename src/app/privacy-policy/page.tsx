import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Fairway Advisors",
  description:
    "Privacy Policy for Fairway Advisors, including how we collect, use, and protect information and our SMS/text messaging practices.",
};

export default function PrivacyPolicyPage(): React.ReactElement {
  return (
    <main className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      <header className="border-b border-[var(--color-border)] bg-[var(--color-bg)]">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-5 md:px-8">
          <Link href="/" className="font-display text-lg font-semibold tracking-tight">
            Fairway Advisors
          </Link>
          <Link
            href="/"
            className="text-sm font-semibold text-[var(--color-accent)] underline underline-offset-4"
          >
            Back to site
          </Link>
        </div>
      </header>

      <article className="mx-auto max-w-4xl px-5 py-12 md:px-8 md:py-16">
        <p className="eyebrow">Legal</p>
        <h1 className="mt-3 font-display text-4xl md:text-5xl">Privacy Policy</h1>
        <p className="mt-4 text-sm text-[var(--color-muted)]">
          Effective date: August 19, 2026
        </p>

        <div className="mt-10 space-y-10 text-[1rem] leading-8 text-[var(--color-muted)]">
          <section>
            <h2 className="mb-3 text-2xl text-[var(--color-text)]">Who we are</h2>
            <p>
              Fairway Advisors (“we,” “us,” or “our”) is a golf course brokerage and advisory firm.
              This Privacy Policy explains how information may be collected, used, and protected
              when you visit{" "}
              <a
                href="https://info.fairwayadvisors.com/"
                className="font-semibold text-[var(--color-accent)] underline underline-offset-4"
              >
                info.fairwayadvisors.com
              </a>
              ,{" "}
              <a
                href="https://fairwayadvisors.com/"
                className="font-semibold text-[var(--color-accent)] underline underline-offset-4"
              >
                fairwayadvisors.com
              </a>
              , submit a form, call, or opt in to SMS/text messaging.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl text-[var(--color-text)]">Information We Collect</h2>
            <p>
              We may collect information you voluntarily provide through evaluation or contact
              forms, including your name, email address, phone number, golf course type, annual
              gross revenue range, and other details you share about a sale, recapitalization, or
              advisory inquiry.
            </p>
            <p className="mt-4">
              We may also automatically receive technical information such as IP address, browser
              type, device information, pages viewed, referring pages, cookies, and similar
              analytics data.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl text-[var(--color-text)]">How We Use Information</h2>
            <ul className="list-disc space-y-2 pl-6">
              <li>Respond to confidential evaluation and brokerage inquiries.</li>
              <li>Prepare evaluations and communicate about next steps, calls, and appointments.</li>
              <li>Operate, maintain, secure, and improve the website.</li>
              <li>Prevent fraud, abuse, spam, and security issues.</li>
              <li>Comply with applicable legal obligations.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-2xl text-[var(--color-text)]">Who we share your data with</h2>
            <p>
              We do not sell or rent your personal information. We may share information with
              service providers who help us host the website, process forms, deliver
              communications, or operate our business, and only as needed to provide those
              services. We may also disclose information when required by law or to protect our
              rights, clients, or safety.
            </p>
            <p className="mt-4">
              Your mobile information will not be sold or shared with third parties for promotional
              or marketing purposes. We will not share mobile information with third parties for
              promotional or marketing purposes. All the above categories exclude text messaging
              originator opt-in data and consent; this information will not be shared with any
              third parties. We will not share your opt-in to an SMS campaign with any third party
              for purposes unrelated to providing you with the services of that campaign. We may
              share your Personal Data, including your SMS opt-in or consent status, with third
              parties that help us provide our messaging services, including but not limited to
              platform providers, phone companies, and any other vendors who assist us in the
              delivery of text messages.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl text-[var(--color-text)]">Cookies</h2>
            <p>
              We may use cookies and similar technologies to operate the site, understand traffic,
              and improve user experience. You can control cookies through your browser settings.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl text-[var(--color-text)]">Your Choices</h2>
            <p>
              You may request access, correction, or deletion of certain information, or ask us not
              to contact you, by using the contact details below. Reply STOP to opt out of SMS at
              any time.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl text-[var(--color-text)]">Updates</h2>
            <p>
              We may update this Privacy Policy from time to time. The latest version will be
              posted on this page with the effective date.
            </p>
          </section>

          <section className="rounded-2xl bg-[var(--color-surface)] p-5 md:p-7">
            <h2 className="mb-4 text-2xl text-[var(--color-text)]">SMS/Text Messaging</h2>
            <div className="space-y-4">
              <p>
                If you affirmatively check the optional SMS consent checkbox on our website form,
                Fairway Advisors may send you SMS/text messages. These messages may include inquiry
                responses, evaluation follow-ups, appointment confirmations, scheduling reminders,
                and service updates. Providing a phone number or submitting the form without
                checking the SMS box does not constitute consent to receive text messages.
              </p>
              <p>
                Message frequency may vary. Message and data rates may apply. Consent is
                not a condition of purchase. Reply STOP to opt out. Reply HELP for help or contact
                us at{" "}
                <a
                  href="mailto:jeff.davis@fairwayadvisors.com"
                  className="font-semibold text-[var(--color-accent)] underline underline-offset-4"
                >
                  jeff.davis@fairwayadvisors.com
                </a>
                .
              </p>
              <p>
                Your mobile information will not be sold or shared with third parties for
                promotional or marketing purposes. We will not share mobile information with third
                parties for promotional or marketing purposes.
              </p>
              <p>
                All the above categories exclude text messaging originator opt-in data and consent;
                this information will not be shared with any third parties. We will not share your
                opt-in to an SMS campaign with any third party for purposes unrelated to providing
                you with the services of that campaign. We may share your Personal Data, including
                your SMS opt-in or consent status, with third parties that help us provide our
                messaging services, including but not limited to platform providers, phone
                companies, and any other vendors who assist us in the delivery of text messages.
              </p>
              <p>
                Your phone number is used solely for communicating with you about the services you
                requested.
              </p>
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-2xl text-[var(--color-text)]">Contact Us</h2>
            <p>
              Fairway Advisors
              <br />
              Dallas, Texas
              <br />
              Email:{" "}
              <a
                href="mailto:jeff.davis@fairwayadvisors.com"
                className="font-semibold text-[var(--color-accent)] underline underline-offset-4"
              >
                jeff.davis@fairwayadvisors.com
              </a>
              <br />
              Phone:{" "}
              <a
                href="tel:2144851500"
                className="font-semibold text-[var(--color-accent)] underline underline-offset-4"
              >
                (214) 485-1500
              </a>
            </p>
          </section>
        </div>

        <nav className="mt-12 flex flex-wrap gap-5 border-t border-[var(--color-border)] pt-7 text-sm font-semibold">
          <Link href="/" className="text-[var(--color-accent)] underline underline-offset-4">
            Home
          </Link>
          <Link
            href="/terms-and-conditions"
            className="text-[var(--color-accent)] underline underline-offset-4"
          >
            Terms &amp; Conditions
          </Link>
        </nav>
      </article>
    </main>
  );
}
