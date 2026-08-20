"use client";

import { useRef, useState } from "react";
import { useMegaLeadForm } from "@/hooks/useMegaLeadForm";
import { Icon } from "@/components/icons";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    MegaTag?: {
      trackEvent?: (event: string, payload?: Record<string, unknown>) => void;
    };
  }
}

const EMAIL_RE = /^[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$/;
const NANP_RE = /^[2-9](?!11)\d{2}[2-9](?!11)\d{2}\d{4}$/;
const PHONE = "(214) 485-1500";

const SUBMIT_ERROR_MESSAGE =
  "Something went wrong sending your request. Please try again, or call us at " + PHONE + ".";

const COURSE_TYPE_OPTIONS = ["9-hole", "18-hole", "27-hole or more"] as const;
const GROSS_REVENUE_OPTIONS = ["Under $1M", "$1M-$2M", "$2M+"] as const;

type FieldKey = "firstName" | "lastName" | "email" | "phone" | "courseType" | "grossRevenue";

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  courseType: string;
  grossRevenue: string;
  smsConsent: boolean;
}

const INITIAL: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  courseType: "",
  grossRevenue: "",
  smsConsent: false,
};

const PRIVACY_POLICY_URL = "https://info.fairwayadvisors.com/privacy";
const TERMS_URL = "https://info.fairwayadvisors.com/terms-and-conditions";

const SMS_CONSENT_TEXT =
  "By checking this box, you agree to receive SMS customer-care messages from Fairway Advisors, including inquiry responses, evaluation follow-ups, appointment confirmations, reminders, and service updates. Message frequency may vary. Message and data rates may apply. Reply STOP to opt out. Reply HELP for help. Consent is not a condition of purchase. Your mobile information will not be sold or shared with third parties for promotional or marketing purposes.";

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
  idPrefix = "hero",
  eyebrow = "Free confidential evaluation",
  heading = "Find out what your course is worth",
  subheading = "No obligation. Completely confidential. For courses with 18+ holes and $1M+ gross revenue.",
  submitLabel = "Get my free evaluation",
  routeSlug,
  thankYouBody = "Thank you — your request is confidential and in good hands. A Fairway Advisors principal will reach out personally to begin your evaluation.",
}: FormCardProps): React.JSX.Element {
  const { submit } = useMegaLeadForm();

  const [data, setData] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Partial<Record<FieldKey, boolean>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const inFlightRef = useRef(false);
  const fieldRefs = useRef<Partial<Record<FieldKey, HTMLElement | null>>>({});

  const update = (k: FieldKey, v: string) => {
    setData((d) => ({ ...d, [k]: v }));
    setErrors((prev) => {
      if (!prev[k]) return prev;
      const err = validateField(k, v);
      if (err) return prev;
      const next = { ...prev };
      delete next[k];
      return next;
    });
  };

  const markTouched = (k: FieldKey, currentValue: string) => {
    setTouched((t) => ({ ...t, [k]: true }));
    const err = validateField(k, currentValue);
    setErrors((prev) => {
      const next = { ...prev };
      if (err) next[k] = err;
      else delete next[k];
      return next;
    });
  };

  const handleValidateAndSubmit = async () => {
    if (inFlightRef.current || submitting || submitted) return;
    const allErrors = validateAll(data);
    if (Object.keys(allErrors).length > 0) {
      setErrors(allErrors);
      setTouched(
        REQUIRED_ORDER.reduce<Partial<Record<FieldKey, boolean>>>((acc, k) => {
          acc[k] = true;
          return acc;
        }, {})
      );
      const firstBad = REQUIRED_ORDER.find((k) => allErrors[k]);
      if (firstBad) fieldRefs.current[firstBad]?.focus();
      return;
    }
    inFlightRef.current = true;
    setSubmitting(true);
    setSubmitError(null);
    const nineHole = data.courseType === "9-hole";
    const under1m = data.grossRevenue === "Under $1M";
    const qualified = !(nineHole || under1m);
    const route =
      routeSlug || (typeof window !== "undefined" ? window.location.pathname : "/");
    try {
      const res = await submit({
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
        email: data.email.trim(),
        phone: data.phone.replace(/\D/g, ""),
        courseType: data.courseType,
        grossRevenue: data.grossRevenue,
        smsConsent: data.smsConsent,
        smsConsentText: data.smsConsent
          ? `${SMS_CONSENT_TEXT} Privacy Policy: ${PRIVACY_POLICY_URL} | Terms & Conditions: ${TERMS_URL}`
          : "Not provided",
        qualified,
        disqualification_reason:
          nineHole && under1m
            ? "nine_hole_and_revenue_under_1m"
            : nineHole
              ? "nine_hole"
              : under1m
                ? "revenue_under_1m"
                : null,
        route_slug: route,
      });
      if (res?.ok !== true) {
        throw new Error("Submission not confirmed by server.");
      }
      if (typeof window !== "undefined") {
        window.MegaTag?.trackEvent?.("form_submit", { form_route: route, qualified });
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({ event: "form_submit", form_route: route, qualified });
        if (qualified) {
          window.MegaTag?.trackEvent?.("qualified_lead", { form_route: route });
          window.dataLayer.push({ event: "qualified_lead", form_route: route });
        }
      }
      setSubmitted(true);
    } catch (err) {
      console.error("Form submission error:", err);
      setSubmitError(SUBMIT_ERROR_MESSAGE);
    } finally {
      inFlightRef.current = false;
      setSubmitting(false);
    }
  };

  const cardBase = "bg-[var(--color-surface)] border border-[var(--color-border)] shadow-card-lg";

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
          <p className="text-base leading-relaxed text-[var(--color-muted)]">{thankYouBody}</p>
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

  const showErr = (k: FieldKey) => Boolean(touched[k] && errors[k]);
  const errId = (k: FieldKey) => `${idPrefix}-${k}-error`;
  const fieldCls =
    "w-full rounded-lg px-3.5 py-3 text-sm bg-[var(--color-primary)] border border-[var(--color-border-strong)] text-[var(--color-text)] placeholder:text-[var(--color-muted)] transition-colors focus:outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/35";
  const inputCls = (k: FieldKey) => `${fieldCls} ${showErr(k) ? "lp-input-error" : ""}`;
  const selectCls = (k: FieldKey) =>
    `${inputCls(k)} appearance-none pr-9 ${data[k] ? "" : "text-[var(--color-muted)]"}`;

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
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

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor={`${idPrefix}-firstName`} className="sr-only">
            First name
          </label>
          <input
            ref={(el) => {
              fieldRefs.current.firstName = el;
            }}
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
            <p id={errId("firstName")} role="alert" className="lp-field-error">
              {errors.firstName}
            </p>
          )}
        </div>
        <div>
          <label htmlFor={`${idPrefix}-lastName`} className="sr-only">
            Last name
          </label>
          <input
            ref={(el) => {
              fieldRefs.current.lastName = el;
            }}
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
            <p id={errId("lastName")} role="alert" className="lp-field-error">
              {errors.lastName}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor={`${idPrefix}-email`} className="sr-only">
          Email
        </label>
        <input
          ref={(el) => {
            fieldRefs.current.email = el;
          }}
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
          <p id={errId("email")} role="alert" className="lp-field-error">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor={`${idPrefix}-phone`} className="sr-only">
          Phone
        </label>
        <input
          ref={(el) => {
            fieldRefs.current.phone = el;
          }}
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
          <p id={errId("phone")} role="alert" className="lp-field-error">
            {errors.phone}
          </p>
        )}
      </div>

      <QualifierSelect
        idPrefix={idPrefix}
        fieldKey="courseType"
        value={data.courseType}
        label="What type of golf course are you looking to sell?"
        placeholder="What type of course are you selling?"
        options={[...COURSE_TYPE_OPTIONS]}
        className={selectCls("courseType")}
        error={showErr("courseType") ? errors.courseType : undefined}
        errId={errId("courseType")}
        disabled={submitting}
        setRef={(el) => {
          fieldRefs.current.courseType = el;
        }}
        onChange={(v) => {
          update("courseType", v);
          markTouched("courseType", v);
        }}
        onBlur={(v) => markTouched("courseType", v)}
      />
      <QualifierSelect
        idPrefix={idPrefix}
        fieldKey="grossRevenue"
        value={data.grossRevenue}
        label="Annual gross revenue"
        placeholder="Annual gross revenue"
        options={[...GROSS_REVENUE_OPTIONS]}
        className={selectCls("grossRevenue")}
        error={showErr("grossRevenue") ? errors.grossRevenue : undefined}
        errId={errId("grossRevenue")}
        disabled={submitting}
        setRef={(el) => {
          fieldRefs.current.grossRevenue = el;
        }}
        onChange={(v) => {
          update("grossRevenue", v);
          markTouched("grossRevenue", v);
        }}
        onBlur={(v) => markTouched("grossRevenue", v)}
      />

      <div>
        <label
          htmlFor={`${idPrefix}-smsConsent`}
          className="flex cursor-pointer items-start gap-2.5 text-xs leading-relaxed text-[var(--color-muted)]"
        >
          <input
            id={`${idPrefix}-smsConsent`}
            name="smsConsent"
            type="checkbox"
            checked={data.smsConsent}
            onChange={(e) => setData((d) => ({ ...d, smsConsent: e.target.checked }))}
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-[var(--color-border-strong)] accent-[var(--color-secondary)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]/35"
            disabled={submitting}
          />
          <span>
            {SMS_CONSENT_TEXT} Privacy Policy:{" "}
            <a
              href={PRIVACY_POLICY_URL}
              className="font-semibold text-[var(--color-accent)] underline"
            >
              {PRIVACY_POLICY_URL}
            </a>
            {" | "}
            Terms:{" "}
            <a
              href={TERMS_URL}
              className="font-semibold text-[var(--color-accent)] underline"
            >
              {TERMS_URL}
            </a>
          </span>
        </label>
        <p className="mt-1.5 pl-[1.625rem] text-[11px] leading-relaxed text-[var(--color-muted)]">
          Optional. You can submit this form without opting in to text messages.
        </p>
      </div>

      {submitError && (
        <p
          role="alert"
          aria-live="polite"
          className="lp-field-error !mt-0 rounded-lg border border-[var(--color-error)]/35 px-3.5 py-2.5"
        >
          {submitError}
        </p>
      )}

      <button
        type="button"
        onClick={handleValidateAndSubmit}
        disabled={submitting || submitted}
        className="mt-1 flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--color-secondary)] px-6 py-3.5 text-base font-semibold text-white transition-all hover:bg-[var(--color-secondary-hover)] disabled:cursor-not-allowed disabled:bg-[var(--color-disabled)]"
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

interface QualifierSelectProps {
  idPrefix: string;
  fieldKey: string;
  value: string;
  label: string;
  placeholder: string;
  options: string[];
  className: string;
  error?: string;
  errId: string;
  disabled: boolean;
  setRef: (el: HTMLSelectElement | null) => void;
  onChange: (value: string) => void;
  onBlur: (value: string) => void;
}

function QualifierSelect({
  idPrefix,
  fieldKey,
  value,
  label,
  placeholder,
  options,
  className,
  error,
  errId,
  disabled,
  setRef,
  onChange,
  onBlur,
}: QualifierSelectProps): React.JSX.Element {
  const id = `${idPrefix}-${fieldKey}`;
  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <div className="relative">
        <select
          ref={setRef}
          id={id}
          name={fieldKey}
          required
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={(e) => onBlur(e.target.value)}
          className={className}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errId : undefined}
          disabled={disabled}
        >
          <option value="">{placeholder}</option>
          {options.map((o) => (
            <option key={o} value={o} className="text-[var(--color-text)]">
              {o}
            </option>
          ))}
        </select>
        <ChevronDown />
      </div>
      {error && (
        <p id={errId} role="alert" className="lp-field-error">
          {error}
        </p>
      )}
    </div>
  );
}

function ChevronDown(): React.JSX.Element {
  return (
    <svg
      className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-muted)]"
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
