// Buy-Side paid entry token. When the current URL carries this exact
// `utm_content` value the page opens in acquisition mode: the hero surfaces an
// "Acquire a Golf Course" action and the lead forms preselect the acquire path.
// This reuses the existing Buy-Side production URL — no route, redirect, or
// alternate paid URL is involved. Exact-match only; any other value (or none)
// leaves the seller-first experience untouched.
export const ACQUIRE_UTM_CONTENT = "822138158378";

// True only when `utm_content` exactly equals the Buy-Side token. Accepts a raw
// location.search string (e.g. "?utm_content=822138158378") so callers can pass
// window.location.search directly and the logic stays unit-testable.
export function hasAcquireToken(search: string): boolean {
  if (!search) return false;
  return new URLSearchParams(search).get("utm_content") === ACQUIRE_UTM_CONTENT;
}
