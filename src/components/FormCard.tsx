import type { Metadata } from "next";
import { BRAND, CURRENT_YEAR, PHONE, PHONE_HREF } from "@/lib/content";

export const metadata: Metadata = {
  title: `Privacy Policy — ${BRAND.company}`,
  description: `How ${BRAND.company} collects, uses, and protects the information you share when requesting a confidential golf course evaluation.`,
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

export default function PrivacyPage(): React.ReactElement {
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
            Privacy Policy
          </h1>
          <p className="mt-4 text-sm text-[var(--color-muted)]">
            Last updated {CURRENT_YEAR}
          </p>
        </header>

        <div className="mt-10 space-y-4 text-[var(--color-muted)] leading-relaxed">
          <p>
            {BRAND.company} (&ldquo;{BRAND.company},&rdquo; &ldquo;we,&rdquo;
            &ldquo;us,&rdquo; or &ldquo;our&rdquo;) is a golf course brokerage and
            advisory firm. Confidentiality is core to how we serve course owners, and
            that commitment extends to how we handle your information online. This
            Privacy Policy explains what we collect when you visit our website or
            request a confidential evaluation, how we use it, and the choices you have.
          </p>
        </div>

        <Section title="Information We Collect">
          <p>
            <strong className="font-semibold text-[var(--color-text)]">
              Information you provide.
            </strong>{" "}
            When you request a free, confidential course evaluation through our form,
            we collect the details you submit — typically your name, email address,
            phone number, and information about your course, such as its type,
            location, and gross revenue. Providing this information is voluntary, but
            it is what allows us to respond to and qualify your request.
          </p>
          <p>
            <strong className="font-semibold text-[var(--color-text)]">
              Information collected automatically.
            </strong>{" "}
            Like most websites, we and our analytics and advertising partners
            automatically collect certain technical data when you browse — such as your
            IP address, device and browser type, pages viewed, referring URLs, and how
            you arrived at our site (including from an online advertisement). This data
            is gathered through cookies and similar technologies described below.
          </p>
        </Section>

        <Section title="How We Use Your Information">
          <p>We use the information we collect to:</p>
          <ul className="list-disc space-y-2 pl-6 marker:text-[var(--color-accent)]">
            <li>Respond to your evaluation request and communicate with you about it;</li>
            <li>
              Provide brokerage and advisory services and prepare a confidential
              assessment of your course;
            </li>
            <li>Operate, maintain, and improve our website and its content;</li>
            <li>
              Measure the performance of our advertising campaigns and understand which
              channels bring qualified owners to us;
            </li>
            <li>Comply with legal obligations and protect our rights.</li>
          </ul>
        </Section>

        <Section title="Cookies & Tracking Technologies">
          <p>
            We use cookies and similar technologies for both analytics and advertising.
            Analytics cookies help us understand how visitors use our site so we can
            improve it. Advertising cookies help us and our partners measure the
            performance of our online campaigns — for example, understanding which ads
            lead to an evaluation request.
          </p>
          <p>
            You can control or disable cookies through your browser settings. Most
            browsers let you refuse or delete cookies; note that some parts of the site
            may not function as intended if you do.
          </p>
        </Section>

        <Section title="How We Share Information">
          <p>
            <strong className="font-semibold text-[var(--color-text)]">
              We do not sell your personal information.
            </strong>{" "}
            Confidentiality is the foundation of our business, and we treat your
            information accordingly.
          </p>
          <p>
            We share information only with trusted service providers who perform
            functions on our behalf — such as website hosting, analytics, and
            advertising measurement — and only to the extent needed to provide those
            services. We may also disclose information when required by law, to comply
            with legal process, or to protect our rights, safety, and property.
          </p>
          <p>
            Your mobile information will not be sold or shared with third parties for
            promotional or marketing purposes. We will not share mobile information
            with third parties for promotional or marketing purposes. All the above
            categories exclude text messaging originator opt-in data and consent; this
            information will not be shared with any third parties. We will not share
            your opt-in to an SMS campaign with any third party for purposes unrelated
            to providing you with the services of that campaign. We may share your
            Personal Data, including your SMS opt-in or consent status, with third
            parties that help us provide our messaging services, including but not
            limited to platform providers, phone companies, and any other vendors who
            assist us in the delivery of text messages.
          </p>
        </Section>

        <Section title="Data Security">
          <p>
            We maintain reasonable administrative, technical, and physical safeguards
            designed to protect the information you share with us against unauthorized
            access, use, or disclosure. No method of transmission or storage is ever
            completely secure, however, and we cannot guarantee absolute security.
          </p>
        </Section>

        <Section title="Your Choices & Rights">
          <p>
            You may opt out of our communications at any time by following the
            unsubscribe instructions in an email or by contacting us directly.
            Depending on your location, you may also have the right to request access
            to, correction of, or deletion of the personal information we hold about
            you. To make a request, reach us using the details below. Reply STOP to
            opt out of SMS at any time.
          </p>
        </Section>

        <Section title="SMS/Text Messaging">
          <p>
            If you affirmatively check the optional SMS consent checkbox on our
            website form, {BRAND.company} may send you SMS/text messages. These
            messages may include inquiry responses, evaluation follow-ups, appointment
            confirmations, scheduling reminders, and service updates. Providing a
            phone number or submitting the form without checking the SMS box does not
            constitute consent to receive text messages.
          </p>
          <p>
            Message frequency may vary. Standard Message and Data Rates may apply.
            Consent is not a condition of purchase. Reply STOP to opt out. Reply HELP
            for help or contact us at{" "}
            <a
              href={BRAND.emailHref}
              className="font-semibold text-[var(--color-accent)] underline underline-offset-4"
            >
              {BRAND.email}
            </a>
            .
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
            Your phone number is used solely for communicating with you about the
            services you requested.
          </p>
        </Section>

        <Section title="Contact Us">
          <p>
            If you have questions about this Privacy Policy or how we handle your
            information, please contact us:
          </p>
          <div className="mt-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-card">
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
          <p>© {CURRENT_YEAR} {BRAND.company}. All rights reserved.</p>
          <p className="mt-3">
            <a
              href="/terms-and-conditions"
              className="font-semibold text-[var(--color-accent)] underline underline-offset-4"
            >
              Terms &amp; Conditions
            </a>
          </p>
        </footer>
      </div>
    </main>
  );
}
