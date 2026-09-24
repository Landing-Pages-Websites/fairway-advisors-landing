"use client";

import { useEffect, useRef, useState } from "react";
import { useMegaLeadForm } from "@/hooks/useMegaLeadForm";
import { hasAcquireToken } from "@/lib/acquisitionMode";
import {
  PHONE,
  COURSE_TYPE_OPTIONS,
  GROSS_REVENUE_OPTIONS,
  FORM_COPY,
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
  | "inquiryRole"
  | "firstName"
  | "lastName"
  | "email"
  | "phone"
  | "courseType"
  | "grossRevenue";

interface FormState {
  inquiryRole: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  courseType: string;
  grossRevenue: string;
  smsConsent: boolean;
}

const INITIAL: FormState = {
  inquiryRole: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  courseType: "",
  grossRevenue: "",
  smsConsent: false,
};

// The dual path: the visitor MUST actively choose one before anything else.
const INQUIRY_ROLE_OPTIONS: ReadonlyArray<{ value: string; label: string }> = [
  { value: "sell", label: "I want to sell a golf course" },
  { value: "acquire", label: "I want to acquire a golf course" },
];

// Role-aware presentation: the acquire role (preselected by the Buy-Side token
// or chosen manually) and the sell role override the shared undecided copy.
type RoleCopy = typeof FORM_COPY.shared;

const ROLE_COPY: Readonly<Record<string, RoleCopy>> = {
  sell: FORM_COPY.sell,
  acquire: FORM_COPY.acquire,
};

// Shared field styling — reused by text inputs and the seller selects.
const FIELD_BASE_CLS =
  "w-full rounded-lg px-3.5 py-3 text-sm bg-[var(--color-primary)] border border-[var(--color-border-strong)] text-[var(--color-text)] placeholder:text-[var(--color-muted)] transition-colors focus:outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/35";

const PRIVACY_POLICY_URL = "https://info.fairwayadvisors.com/privacy-policy";
const TERMS_URL = "https://info.fairwayadvisors.com/terms-and-conditions";

const SMS_CONSENT_TEXT =
  "By checking this box, you agree to receive SMS customer-care messages from Fairway Advisors, including inquiry responses, evaluation follow-ups, appointment confirmations, reminders, and service updates. Message frequency may vary. Message and data rates may apply. Reply STOP to opt out. Reply HELP for help. Consent is not a condition of purchase. Your mobile information will not be sold or shared with third parties for promotional or marketing purposes.";

type FieldErrors = Partial<Record<FieldKey, string>>;

// Shared fields validate on every path; only the sell role adds the two seller
// fields, so the required set (and focus order) is derived from inquiryRole.
const SHARED_ORDER: FieldKey[] = [
  "inquiryRole",
  "firstName",
  "lastName",
  "email",
  "phone",
];

const SELLER_FIELDS: FieldKey[] = ["courseType", "grossRevenue"];

function requiredOrder(inquiryRole: string): FieldKey[] {
  return inquiryRole === "sell" ? [...SHARED_ORDER, ...SELLER_FIELDS] : SHARED_ORDER;
}

function validateField(key: FieldKey, value: string): string | undefined {
  switch (key) {
    case "inquiryRole":
      return value ? undefined : "Please tell us how we can help.";
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
  requiredOrder(data.inquiryRole).forEach((k) => {
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

// Only the active path's fields go on the payload: sellers add their two
// seller fields, buyers submit contact fields + inquiryRole only.
function buildFormData(data: FormState, routeSlug: string): Record<string, unknown> {
  const sellerFields =
    data.inquiryRole === "sell"
      ? { courseType: data.courseType, grossRevenue: data.grossRevenue }
      : {};
  return {
    inquiryRole: data.inquiryRole,
    firstName: data.firstName.trim(),
    lastName: data.lastName.trim(),
    email: data.email.trim(),
    phone: data.phone.replace(/\D/g, ""),
    ...sellerFields,
    smsConsent: data.smsConsent,
    smsConsentText: data.smsConsent
      ? `${SMS_CONSENT_TEXT} Privacy Policy: ${PRIVACY_POLICY_URL} | Terms & Conditions: ${TERMS_URL}`
      : "Not provided",
    route_slug: routeSlug,
  };
}

// Conversion signals — fired exactly once, only after a confirmed {ok:true}.
function fireTracking(route: string): void {
  // Mega optimizer event FIRST, then the GTM dataLayer signal.
  window.MegaTag?.trackEvent?.("form_submit", { form_route: route });
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: "form_submit", form_route: route });
}

interface FormCardProps {
  idPrefix?: string;
  routeSlug?: string;
}

export function FormCard({
  idPrefix = "lead",
  routeSlug,
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

  // Buy-Side token preselects the acquire path once on mount, only while the
  // visitor hasn't chosen a role yet — a later manual "sell" is never overridden.
  useEffect(() => {
    if (typeof window === "undefined" || !hasAcquireToken(window.location.search)) return;
    setData((d) => (d.inquiryRole ? d : { ...d, inquiryRole: "acquire" }));
  }, []);

  const roleCopy = ROLE_COPY[data.inquiryRole] ?? FORM_COPY.shared;

  const update = (k: FieldKey, v: string): void => {
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

  // Choosing a role clears its own error and drops any stale errors/touched
  // state left on the now-inactive path so hidden fields never flag or leak.
  const selectRole = (role: string): void => {
    const inactive: FieldKey[] = role === "sell" ? [] : SELLER_FIELDS;
    setData((d) => ({ ...d, inquiryRole: role }));
    setTouched((t) => {
      const next = { ...t, inquiryRole: true };
      inactive.forEach((k) => delete next[k]);
      return next;
    });
    setErrors((prev) => {
      const next = { ...prev };
      delete next.inquiryRole;
      inactive.forEach((k) => delete next[k]);
      return next;
    });
  };

  const focusFirstInvalid = (order: FieldKey[], allErrors: FieldErrors): void => {
    const firstBad = order.find((k) => allErrors[k]);
    if (!firstBad) return;
    const el = fieldRefs.current[firstBad];
    try {
      el?.focus({ preventScroll: false });
    } catch {
      el?.focus();
    }
  };

  // Validate FIRST, then submit. Button is type="button" so the optimizer's
  // capture-phase listener never fires on empty/invalid clicks.
  const handleValidateAndSubmit = async (): Promise<void> => {
    if (inFlightRef.current || submitting || submitted) return;
    const order = requiredOrder(data.inquiryRole);
    const allErrors = validateAll(data);
    if (Object.keys(allErrors).length > 0) {
      setErrors(allErrors);
      setTouched((t) => {
        const next = { ...t };
        order.forEach((k) => { next[k] = true; });
        return next;
      });
      focusFirstInvalid(order, allErrors);
      return;
    }
    inFlightRef.current = true;
    setSubmitting(true);
    setSubmitError(null);
    const route = routeSlug || window.location.pathname;
    try {
      const res = await submit(buildFormData(data, route));
      // A 2xx with a body that isn't {ok:true} is still a dropped lead. Only
      // confirmed success fires conversions and shows the thank-you card.
      if (res?.ok !== true) {
        throw new Error("Submission not confirmed by server.");
      }
      fireTracking(route);
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
            {roleCopy.thankYouBody}
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
  const inputCls = (k: FieldKey): string =>
    `${FIELD_BASE_CLS} ${showErr(k) ? "lp-input-error" : ""}`;

  return (
    <form
      onSubmit={handleNativeSubmit}
      noValidate
      aria-label="Start a confidential conversation with Fairway Advisors"
      className={`${cardBase} space-y-3.5 rounded-2xl p-6 md:p-7`}
    >
      <div className="mb-1 space-y-1.5">
        <p className="eyebrow">{FORM_COPY.eyebrow}</p>
        <h3 className="font-display text-2xl leading-tight text-[var(--color-text)] md:text-[1.9rem]">
          {roleCopy.heading}
        </h3>
        <p className="text-sm leading-snug text-[var(--color-muted)]">{FORM_COPY.subheading}</p>
      </div>

      {/* Inquiry role — REQUIRED first control; drives the sell/acquire path */}
      <fieldset className="space-y-2">
        <legend className="mb-2 block text-sm font-medium text-[var(--color-text)]">
          How can we help?
        </legend>
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {INQUIRY_ROLE_OPTIONS.map((opt, i) => {
            const selected = data.inquiryRole === opt.value;
            return (
              <label
                key={opt.value}
                htmlFor={`${idPrefix}-inquiryRole-${opt.value}`}
                className={`flex cursor-pointer items-center gap-2.5 rounded-lg border px-3.5 py-3 text-sm font-medium transition-colors ${
                  selected
                    ? "border-[var(--color-accent)] bg-[var(--color-accent)]/10 text-[var(--color-text)]"
                    : "border-[var(--color-border-strong)] bg-[var(--color-primary)] text-[var(--color-muted)] hover:border-[var(--color-accent)]/60"
                } ${showErr("inquiryRole") ? "lp-input-error" : ""}`}
              >
                <input
                  ref={i === 0 ? (el) => { fieldRefs.current.inquiryRole = el; } : undefined}
                  id={`${idPrefix}-inquiryRole-${opt.value}`}
                  name="inquiryRole"
                  type="radio"
                  value={opt.value}
                  checked={selected}
                  onChange={() => selectRole(opt.value)}
                  className="h-4 w-4 shrink-0 accent-[var(--color-accent)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]/35"
                  disabled={submitting}
                  aria-invalid={showErr("inquiryRole") || undefined}
                  aria-describedby={showErr("inquiryRole") ? errId("inquiryRole") : undefined}
                />
                <span>{opt.label}</span>
              </label>
            );
          })}
        </div>
        {showErr("inquiryRole") && (
          <p id={errId("inquiryRole")} role="alert" aria-live="polite" className="lp-field-error">
            {errors.inquiryRole}
          </p>
        )}
      </fieldset>

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

      {/* Sell path — seller-only selects */}
      {data.inquiryRole === "sell" && (
        <>
          <SelectField
            id={`${idPrefix}-courseType`}
            name="courseType"
            label="What type of golf course are you looking to sell?"
            placeholder="What type of course are you selling?"
            options={COURSE_TYPE_OPTIONS}
            value={data.courseType}
            showError={showErr("courseType")}
            error={errors.courseType}
            errorId={errId("courseType")}
            disabled={submitting}
            fieldRef={(el) => { fieldRefs.current.courseType = el; }}
            onSelect={(v) => { update("courseType", v); markTouched("courseType", v); }}
            onBlurField={(v) => markTouched("courseType", v)}
          />
          <SelectField
            id={`${idPrefix}-grossRevenue`}
            name="grossRevenue"
            label="What is your annual gross revenue?"
            placeholder="Annual gross revenue"
            options={GROSS_REVENUE_OPTIONS}
            value={data.grossRevenue}
            showError={showErr("grossRevenue")}
            error={errors.grossRevenue}
            errorId={errId("grossRevenue")}
            disabled={submitting}
            fieldRef={(el) => { fieldRefs.current.grossRevenue = el; }}
            onSelect={(v) => { update("grossRevenue", v); markTouched("grossRevenue", v); }}
            onBlurField={(v) => markTouched("grossRevenue", v)}
          />
        </>
      )}

      {/* SMS opt-in (optional — never required, never blocks submit) */}
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
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-[var(--color-border-strong)] accent-[var(--color-accent)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]/35"
            disabled={submitting}
          />
          <span>
            {SMS_CONSENT_TEXT}{" "}
            <a
              href={PRIVACY_POLICY_URL}
              className="font-semibold text-[var(--color-accent)] underline"
            >
              Privacy Policy
            </a>
            {" | "}
            <a
              href={TERMS_URL}
              className="font-semibold text-[var(--color-accent)] underline"
            >
              Terms &amp; Conditions
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
        {submitting ? "Submitting…" : roleCopy.submitLabel}
        {!submitting && <Icon name="arrow" className="h-4 w-4" strokeWidth={2.4} />}
      </button>

      <p className="text-center text-xs leading-relaxed text-[var(--color-muted)]">
        Completely confidential. We&apos;ll only use your details to respond to your inquiry.
      </p>
    </form>
  );
}

interface SelectFieldProps {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  options: string[];
  value: string;
  showError: boolean;
  error?: string;
  errorId: string;
  disabled: boolean;
  fieldRef: (el: HTMLSelectElement | null) => void;
  onSelect: (value: string) => void;
  onBlurField: (value: string) => void;
}

function SelectField(props: SelectFieldProps): React.ReactElement {
  const { id, name, label, placeholder, options, value } = props;
  const { showError, error, errorId, disabled, fieldRef, onSelect, onBlurField } = props;
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-[var(--color-text)]">
        {label}
      </label>
      <div className="relative">
        <select
          ref={fieldRef}
          id={id}
          name={name}
          required
          value={value}
          onChange={(e) => onSelect(e.target.value)}
          onBlur={(e) => onBlurField(e.target.value)}
          className={`${FIELD_BASE_CLS} ${showError ? "lp-input-error" : ""} appearance-none pr-9 ${value ? "" : "text-[var(--color-muted)]"}`}
          aria-invalid={showError || undefined}
          aria-describedby={showError ? errorId : undefined}
          disabled={disabled}
        >
          <option value="">{placeholder}</option>
          {options.map((o) => (
            <option key={o} value={o} className="text-[var(--color-text)]">{o}</option>
          ))}
        </select>
        <ChevronDown />
      </div>
      {showError && (
        <p id={errorId} role="alert" aria-live="polite" className="lp-field-error">
          {error}
        </p>
      )}
    </div>
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
