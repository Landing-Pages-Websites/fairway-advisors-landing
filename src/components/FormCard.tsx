"use client";

import { useRef, useState } from "react";
import { useMegaLeadForm } from "@/hooks/useMegaLeadForm";
import {
  CTA,
  PHONE,
  COURSE_TYPE_OPTIONS,
  GROSS_REVENUE_OPTIONS,
  DISQUALIFYING,
} from "@/lib/content";
import { Icon } from "@/components/icons";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    MegaTag?: {
      trackEvent?: (event: string, payload?: Record<string, unknown>) => void;
    };
  }
}

// ─── Validation (HARD RULE — inline per-field, no native tooltips) ───

// RFC-5322-lite — the lead API server-validates the rest.
const EMAIL_RE = /^[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$/;

// NANP: area code & exchange each start 2-9 and may not be an N11.
const NANP_RE = /^[2-9](?!11)\d{2}[2-9](?!11)\d{2}\d{4}$/;

// Submit-level failure copy. Retryable, and points to the phone line as a fallback.
const SUBMIT_ERROR_MESSAGE =
  "Something went wrong sending your request. Please try again, or call us at " + PHONE + ".";

type FieldKey =
  | "firstName"
  | "lastName"
  | "email"
  | "phone"
  | "courseType"
  | "grossRevenue";

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  courseType: string;
  grossRevenue: string;
}

const INITIAL: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  courseType: "",
  grossRevenue: "",
};

type FieldErrors = Partial<Record<FieldKey, string>>;

const REQUIRED_ORDER: FieldKey[] = [
  "firstName",
  "lastName",
  "email",
  "phone",
  "courseType",
  "grossRevenue",
];

function validateField(key: FieldKey, value: string): string | undefined {
  switch (key) {
    case "firstName":
      return value.trim() ? undefined : "First name is required.";
    case "lastName":
      return value.trim() ? undefined : "Last name is required.";
    case "email": {
      const v = value.trim();
      if (!v) return "Email address is required.";
      if (!EMAIL_RE.test(v)) return "Please enter a valid email address.";
      return undefined;
    }
    case "phone": {
      const digits = value.replace(/\D/g, "");
      if (!digits) return "Phone number is required.";
      if (digits.length !== 10) return "Please enter a valid 10-digit phone number.";
      if (!NANP_RE.test(digits)) return "Please enter a valid US phone number.";
      return undefined;
    }
    case "courseType":
      return value ? undefined : "Please select your course type.";
    case "grossRevenue":
      return value ? undefined : "Please select your annual gross revenue.";
  }
}

function validateAll(data: FormState): FieldErrors {
  const errors: FieldErrors = {};
  REQUIRED_ORDER.forEach((k) => {
    const err = validateField(k, data[k]);
    if (err) errors[k] = err;
  });
  return errors;
}

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 10);
  if (!digits) return "";
  if (digits.length <= 3) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

interface FormCardProps {
  idPrefix?: string;
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  submitLabel?: string;
  routeSlug?: string;
  thankYouBody?: string;
}

export function FormCard({
  idPrefix = "lead",
  eyebrow = "Free confidential evaluation",
  heading = "Find out what your course is worth",
  subheading = "No obligation. Completely confidential. For courses with 18+ holes and $1M+ gross revenue.",
  submitLabel = "Get my free evaluation",
  routeSlug,
  thankYouBody = "Thank you — your request is confidential and in good hands. A Fairway Advisors principal will reach out personally to begin your evaluation.",
}: FormCardProps): React.ReactElement {
  const { submit } = useMegaLeadForm();

  const [data, setData] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Partial<Record<FieldKey, boolean>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Synchronous re-entrancy guard — blocks duplicate fires from rapid clicks.
  const inFlightRef = useRef(false);
  const fieldRefs = useRef<Partial<Record<FieldKey, HTMLElement | null>>>({});

  const update = (k: keyof FormState, v: string): void => {
    setData((d) => ({ ...d, [k]: v }));
    setErrors((prev) => {
      if (!(k in prev)) return prev;
      const key = k as FieldKey;
      if (!prev[key]) return prev;
      const err = validateField(key, v);
      if (err) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const markTouched = (k: FieldKey, currentValue: string): void => {
    setTouched((t) => ({ ...t, [k]: true }));
    const err = validateField(k, currentValue);
    setErrors((prev) => {
      const next = { ...prev };
      if (err) next[k] = err;
      else delete next[k];
      return next;
    });
  };

  const fireTracking = (qualified: boolean): void => {
    if (typeof window === "undefined") return;
    const route =
      routeSlug || (typeof window !== "undefined" ? window.location.pathname : "/");
    // Mega optimizer event FIRST, then the GTM dataLayer signal.
    window.MegaTag?.trackEvent?.("form_submit", { form_route: route, qualified });
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "form_submit", form_route: route, qualified });
    // Gated qualified-lead optimization event — only for 18+ holes AND $1M+.
    if (qualified) {
      window.MegaTag?.trackEvent?.("qualified_lead", { form_route: route });
      window.dataLayer.push({ event: "qualified_lead", form_route: route });
    }
  };

  // Validate FIRST, then submit. Button is type="button" so the optimizer's
  // capture-phase listener never fires on empty/invalid clicks.
  const handleValidateAndSubmit = async (): Promise<void> => {
    if (inFlightRef.current || submitting || submitted) return;
    const allErrors = validateAll(data);
    if (Object.keys(allErrors).length > 0) {
      setErrors(allErrors);
      setTouched({
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        courseType: true,
        grossRevenue: true,
      });
      const firstBad = REQUIRED_ORDER.find((k) => allErrors[k]);
      if (firstBad) {
        const el = fieldRefs.current[firstBad];
        try {
          (el as HTMLElement | null)?.focus({ preventScroll: false });
        } catch {
          el?.focus();
        }
      }
      return;
    }
    inFlightRef.current = true;
    setSubmitting(true);
    setSubmitError(null);
    // Qualification gate — 9-hole OR Under $1M disqualifies the optimization
    // event, but ALL leads still submit to CRM + email.
    const courseDQ = data.courseType === DISQUALIFYING.courseType;
    const revenueDQ = data.grossRevenue === DISQUALIFYING.grossRevenue;
    const qualified = !(courseDQ || revenueDQ);
    const disqualification_reason =
      courseDQ && revenueDQ
        ? "nine_hole_and_revenue_under_1m"
        : courseDQ
          ? "nine_hole"
          : revenueDQ
            ? "revenue_under_1m"
            : null;
    try {
      const res = await submit({
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
        email: data.email.trim(),
        phone: data.phone.replace(/\D/g, ""),
        courseType: data.courseType,
        grossRevenue: data.grossRevenue,
        qualified,
        disqualification_reason,
        route_slug:
          routeSlug ||
          (typeof window !== "undefined" ? window.location.pathname : "/"),
      });
      // A 2xx with a body that isn't {ok:true} is still a dropped lead. Only
      // confirmed success fires conversions and shows the thank-you card.
      if (res?.ok !== true) {
        throw new Error("Submission not confirmed by server.");
      }
      fireTracking(qualified);
      setSubmitted(true);
    } catch (err) {
      console.error("Form submission error:", err);
      // The visitor is fine, but the LEAD would be dropped: surface a retryable
      // error and fire NO tracking so we never bill a phantom conversion.
      setSubmitError(SUBMIT_ERROR_MESSAGE);
    } finally {
      inFlightRef.current = false;
      setSubmitting(false);
    }
  };

  const handleNativeSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
  };

  const cardBase =
    "bg-[var(--color-surface)] border border-[var(--color-border)] shadow-card-lg";

  if (submitted) {
    return (
      <div className={`${cardBase} rounded-2xl p-8 md:p-10`}>
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-accent)]/15">
            <Icon name="check" className="h-7 w-7 text-[var(--color-accent)]" strokeWidth={2.4} />
          </div>
          <h3 className="font-display text-2xl text-[var(--color-text)] md:text-3xl">
            Request received.
          </h3>
          <p className="text-base leading-relaxed text-[var(--color-muted)]">
            {thankYouBody}
          </p>
          <p className="text-sm text-[var(--color-muted)]">
            Prefer to talk now? Call{" "}
            <span className="whitespace-nowrap font-semibold text-[var(--color-text)]">
              {PHONE}
            </span>
            .
          </p>
        </div>
      </div>
    );
  }

  const showErr = (k: FieldKey): boolean => Boolean(touched[k] && errors[k]);
  const errId = (k: FieldKey): string => `${idPrefix}-${k}-error`;
  const fieldCls =
    "w-full rounded-lg px-3.5 py-3 text-sm bg-[var(--color-primary)] border border-[var(--color-border-strong)] text-[var(--color-text)] placeholder:text-[var(--color-muted)] transition-colors focus:outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/35";
  const inputCls = (k: FieldKey): string =>
    `${fieldCls} ${showErr(k) ? "lp-input-error" : ""}`;

  return (
    <form
      onSubmit={handleNativeSubmit}
      noValidate
      aria-label="Request a free, confidential golf course evaluation"
      className={`${cardBase} space-y-3.5 rounded-2xl p-6 md:p-7`}
    >
      <div className="mb-1 space-y-1.5">
        <p className="eyebrow">{eyebrow}</p>
        <h3 className="font-display text-2xl leading-tight text-[var(--color-text)] md:text-[1.9rem]">
          {heading}
        </h3>
        <p className="text-sm leading-snug text-[var(--color-muted)]">{subheading}</p>
      </div>

      {/* First / Last */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor={`${idPrefix}-firstName`} className="sr-only">First name</label>
          <input
            ref={(el) => { fieldRefs.current.firstName = el; }}
            id={`${idPrefix}-firstName`}
            name="firstName"
            type="text"
            required
            autoComplete="given-name"
            placeholder="First name"
            value={data.firstName}
            onChange={(e) => update("firstName", e.target.value)}
            onBlur={(e) => markTouched("firstName", e.target.value)}
            className={inputCls("firstName")}
            aria-invalid={showErr("firstName") || undefined}
            aria-describedby={showErr("firstName") ? errId("firstName") : undefined}
            disabled={submitting}
          />
          {showErr("firstName") && (
            <p id={errId("firstName")} role="alert" aria-live="polite" className="lp-field-error">
              {errors.firstName}
            </p>
          )}
        </div>
        <div>
          <label htmlFor={`${idPrefix}-lastName`} className="sr-only">Last name</label>
          <input
            ref={(el) => { fieldRefs.current.lastName = el; }}
            id={`${idPrefix}-lastName`}
            name="lastName"
            type="text"
            required
            autoComplete="family-name"
            placeholder="Last name"
            value={data.lastName}
            onChange={(e) => update("lastName", e.target.value)}
            onBlur={(e) => markTouched("lastName", e.target.value)}
            className={inputCls("lastName")}
            aria-invalid={showErr("lastName") || undefined}
            aria-describedby={showErr("lastName") ? errId("lastName") : undefined}
            disabled={submitting}
          />
          {showErr("lastName") && (
            <p id={errId("lastName")} role="alert" aria-live="polite" className="lp-field-error">
              {errors.lastName}
            </p>
          )}
        </div>
      </div>

      {/* Email */}
      <div>
        <label htmlFor={`${idPrefix}-email`} className="sr-only">Email</label>
        <input
          ref={(el) => { fieldRefs.current.email = el; }}
          id={`${idPrefix}-email`}
          name="email"
          type="email"
          required
          pattern="[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}"
          autoComplete="email"
          placeholder="Email address"
          value={data.email}
          onChange={(e) => update("email", e.target.value)}
          onBlur={(e) => markTouched("email", e.target.value)}
          className={inputCls("email")}
          aria-invalid={showErr("email") || undefined}
          aria-describedby={showErr("email") ? errId("email") : undefined}
          disabled={submitting}
        />
        {showErr("email") && (
          <p id={errId("email")} role="alert" aria-live="polite" className="lp-field-error">
            {errors.email}
          </p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label htmlFor={`${idPrefix}-phone`} className="sr-only">Phone</label>
        <input
          ref={(el) => { fieldRefs.current.phone = el; }}
          id={`${idPrefix}-phone`}
          name="phone"
          type="tel"
          required
          inputMode="numeric"
          autoComplete="tel"
          placeholder="Phone (10 digits)"
          value={data.phone}
          onChange={(e) => update("phone", formatPhone(e.target.value))}
          onBlur={(e) => markTouched("phone", e.target.value)}
          className={inputCls("phone")}
          aria-invalid={showErr("phone") || undefined}
          aria-describedby={showErr("phone") ? errId("phone") : undefined}
          disabled={submitting}
        />
        {showErr("phone") && (
          <p id={errId("phone")} role="alert" aria-live="polite" className="lp-field-error">
            {errors.phone}
          </p>
        )}
      </div>

      {/* Course type (qualifying select) */}
      <div>
        <label htmlFor={`${idPrefix}-courseType`} className="sr-only">
          What type of golf course are you looking to sell?
        </label>
        <div className="relative">
          <select
            ref={(el) => { fieldRefs.current.courseType = el; }}
            id={`${idPrefix}-courseType`}
            name="courseType"
            required
            value={data.courseType}
            onChange={(e) => {
              update("courseType", e.target.value);
              markTouched("courseType", e.target.value);
            }}
            onBlur={(e) => markTouched("courseType", e.target.value)}
            className={`${inputCls("courseType")} appearance-none pr-9 ${data.courseType ? "" : "text-[var(--color-muted)]"}`}
            aria-invalid={showErr("courseType") || undefined}
            aria-describedby={showErr("courseType") ? errId("courseType") : undefined}
            disabled={submitting}
          >
            <option value="">What type of course are you selling?</option>
            {COURSE_TYPE_OPTIONS.map((o) => (
              <option key={o} value={o} className="text-[var(--color-text)]">{o}</option>
            ))}
          </select>
          <ChevronDown />
        </div>
        {showErr("courseType") && (
          <p id={errId("courseType")} role="alert" aria-live="polite" className="lp-field-error">
            {errors.courseType}
          </p>
        )}
      </div>

      {/* Gross revenue (qualifying select) */}
      <div>
        <label htmlFor={`${idPrefix}-grossRevenue`} className="sr-only">
          What is your annual gross revenue?
        </label>
        <div className="relative">
          <select
            ref={(el) => { fieldRefs.current.grossRevenue = el; }}
            id={`${idPrefix}-grossRevenue`}
            name="grossRevenue"
            required
            value={data.grossRevenue}
            onChange={(e) => {
              update("grossRevenue", e.target.value);
              markTouched("grossRevenue", e.target.value);
            }}
            onBlur={(e) => markTouched("grossRevenue", e.target.value)}
            className={`${inputCls("grossRevenue")} appearance-none pr-9 ${data.grossRevenue ? "" : "text-[var(--color-muted)]"}`}
            aria-invalid={showErr("grossRevenue") || undefined}
            aria-describedby={showErr("grossRevenue") ? errId("grossRevenue") : undefined}
            disabled={submitting}
          >
            <option value="">Annual gross revenue</option>
            {GROSS_REVENUE_OPTIONS.map((o) => (
              <option key={o} value={o} className="text-[var(--color-text)]">{o}</option>
            ))}
          </select>
          <ChevronDown />
        </div>
        {showErr("grossRevenue") && (
          <p id={errId("grossRevenue")} role="alert" aria-live="polite" className="lp-field-error">
            {errors.grossRevenue}
          </p>
        )}
      </div>

      {submitError && (
        <p
          role="alert"
          aria-live="polite"
          className="lp-field-error !mt-0 rounded-lg border border-[var(--color-error)]/35 bg-[#fef3f2] px-3.5 py-2.5"
        >
          {submitError}
        </p>
      )}

      <button
        type="button"
        onClick={handleValidateAndSubmit}
        disabled={submitting || submitted}
        className="mt-1 flex w-full items-center justify-center gap-2 rounded-full bg-[var(--color-accent)] px-6 py-3.5 text-base font-semibold text-[var(--color-primary)] shadow-cta transition-all hover:bg-[var(--color-accent-hover)] hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-surface)] disabled:cursor-not-allowed disabled:bg-[var(--color-disabled)] disabled:translate-y-0"
      >
        {submitting ? "Submitting…" : submitLabel}
        {!submitting && <Icon name="arrow" className="h-4 w-4" strokeWidth={2.4} />}
      </button>

      <p className="text-center text-xs leading-relaxed text-[var(--color-muted)]">
        Completely confidential. We&apos;ll only use your details to prepare your evaluation.
      </p>
    </form>
  );
}

function ChevronDown(): React.ReactElement {
  return (
    <svg
      className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-accent)]"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
