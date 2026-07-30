import type { JSX, SVGProps } from "react";

// Single icon family — lucide-style stroked SVGs (24×24, currentColor).
// Never emoji. Keys map to the `icon` strings used in content.ts.

type IconPaths = JSX.Element;

const PATHS: Record<string, IconPaths> = {
  // Differentiators / services
  target: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.4" />
    </>
  ),
  shield: (
    <>
      <path d="M12 2.5 5 5.2v5.6c0 4.4 3 8.4 7 10.7 4-2.3 7-6.3 7-10.7V5.2Z" />
      <path d="m9 11.5 2 2 4-4" />
    </>
  ),
  handshake: (
    <>
      <path d="m11 17 2 2a1 1 0 0 0 1.4 0l4.6-4.6a2 2 0 0 0 0-2.8L14 6.5" />
      <path d="m14 6.5-1.4-1.4a2 2 0 0 0-2.8 0L6 9a2 2 0 0 0 0 2.8l.5.5a2 2 0 0 0 2.8 0l2.2-2.2" />
      <path d="m18 15 2-2M6 15l-2-2" />
    </>
  ),
  flag: (
    <>
      <path d="M5 22V3" />
      <path d="M5 4h11l-1.5 3.5L16 11H5" />
    </>
  ),
  users: (
    <>
      <path d="M17 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9.5" cy="7" r="3.2" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.5a4 4 0 0 1 0 7.5" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="9.2" />
      <path d="m15.5 8.5-2 5-5 2 2-5Z" />
    </>
  ),
  trophy: (
    <>
      <path d="M8 4h8v5a4 4 0 0 1-8 0Z" />
      <path d="M8 5H5v2a3 3 0 0 0 3 3M16 5h3v2a3 3 0 0 1-3 3" />
      <path d="M12 13v4M9 21h6M10 21v-2h4v2" />
    </>
  ),
  "map-pin": (
    <>
      <path d="M20 10c0 5.5-8 12-8 12s-8-6.5-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="2.6" />
    </>
  ),
  building: (
    <>
      <path d="M4 21V5a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v16" />
      <path d="M15 9h4a1 1 0 0 1 1 1v11M3 21h18" />
      <path d="M8 8h3M8 12h3M8 16h3" />
    </>
  ),
  // Utility
  phone: (
    <path d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.272.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
  ),
  arrow: <path d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />,
  check: <path d="m4.5 12.75 6 6 9-13.5" />,
  x: <path d="M6 6l12 12M18 6 6 18" />,
  plus: <path d="M12 4.5v15m7.5-7.5h-15" />,
  minus: <path d="M4.5 12h15" />,
  chevron: <path d="m6 9 6 6 6-6" />,
};

interface IconProps extends SVGProps<SVGSVGElement> {
  name: keyof typeof PATHS | string;
}

export function Icon({ name, className, ...rest }: IconProps): JSX.Element | null {
  const path = PATHS[name];
  if (!path) return null;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...rest}
    >
      {path}
    </svg>
  );
}
