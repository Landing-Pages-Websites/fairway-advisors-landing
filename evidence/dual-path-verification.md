# Fairway Advisors — sell/acquire dual-path form: verification

Task: add a required `inquiryRole` selector to `FormCard` that branches the form
into a sell path and an acquire path. Single file changed: `src/components/FormCard.tsx`.

## Build / typecheck
- `npm ci` (deps were absent; installed, not upgraded).
- `npm run build` → **passed**. `Compiled successfully`, TypeScript check finished, all
  7 routes generated. No TS/build errors.

## DOM verification (server-rendered, `next start`)
Chrome is not installed in this environment (`playwright install` deliberately NOT run,
per project rule). Verified against the real production build via HTTP + DOM inspection.
Both FormCard instances (`idPrefix="hero"` and `idPrefix="lead"`) were checked.

Initial (unselected) state on `/`:
- `name="inquiryRole"` radios: **4** (2 per card) — `type="radio"` × 4.
- Group legend `How can we help?` × 2; `I want to sell a golf course` × 2;
  `I want to acquire a golf course` × 2.
- Unique IDs present: `hero-inquiryRole-sell`, `hero-inquiryRole-acquire`,
  `lead-inquiryRole-sell`, `lead-inquiryRole-acquire`.
- Path-specific fields at initial (no role chosen): `courseType` 0, `grossRevenue` 0,
  `acquireCourseType` 0, `targetAcquisitionBudget` 0, `<select>` count 0 — fields only
  mount after a role is actively selected (selector starts unselected).
- Submit label `Get my free evaluation` × 2 (unchanged). Phone `(214) 485-1500` preserved.

## Source review (duplicate keys + inactive-branch leakage)
- Submit payload keys: `inquiryRole`, `firstName`, `lastName`, `email`, `phone`, then
  exactly one path's fields via `...pathFields` (sell → `courseType`+`grossRevenue`;
  acquire → `acquireCourseType`+`targetAcquisitionBudget`), plus `smsConsent`,
  `smsConsentText`, `qualified`, `disqualification_reason`, `route_slug`. No key appears
  twice; no camelCase/snake_case duplicates; inactive-path fields never submitted.
- Validation/focus order is derived from `requiredOrder(inquiryRole)`; inactive-path
  fields are never validated and can't produce required errors. Empty submit flags
  `inquiryRole` first (it heads the order and its ref points to the first radio).
- Switching roles (`selectRole`) unmounts the inactive selects and clears their stale
  `errors`/`touched`, plus clears the `inquiryRole` error.
- Qualification: seller logic unchanged (9-hole OR Under $1M disqualifies the optimization
  event, lead still submits). Acquire is treated as qualified and is NOT scored on seller
  fields.

## Deferred
- Live browser interaction (select a role → assert revealed fields, invalid-state focus)
  at 390x844 / 430x932 / 1365x900 is **deferred to orchestrator production QA** — no
  browser binary available here.
