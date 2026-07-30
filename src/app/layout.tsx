import type { Metadata } from "next";
import { Playfair_Display, Raleway } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const display = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-display-active",
  display: "swap",
});

const body = Raleway({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body-active",
  display: "swap",
});

// === MEGA TAG CONFIG === (real Fairway Advisors values — Meta is OFF, so NO pixelId)
const SITE_KEY = "d4xupx8w9e0lki33";
const SITE_ID = "005ce0e3-8326-4670-933e-bfcf8a7ddd65";
const GTM_ID = "GTM-KRNF4P5";

export const metadata: Metadata = {
  metadataBase: new URL("https://fairwayadvisors.com"),
  title: "The Business of Golf® | Fairway Advisors — Sell Your Golf Course",
  description:
    "Fairway Advisors is a golf course brokerage and advisory firm with over $1 billion sold and advised. Find out what your course is worth — a free, confidential evaluation for courses with 18+ holes and $1M+ gross revenue.",
  openGraph: {
    title: "The Business of Golf® | Fairway Advisors",
    description:
      "Over $1 billion sold and advised. An unrivaled track record from California to New York. Find out what your golf course is worth — free and confidential.",
    images: ["/images/hero-wide.jpg"],
    type: "website",
  },
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
  robots: { index: false, follow: false }, // ads LP — not indexed
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  const megaTagConfig = `window.MEGA_TAG_CONFIG={siteKey:"${SITE_KEY}",siteId:"${SITE_ID}",gtmId:"${GTM_ID}"};window.API_ENDPOINT="https://optimizer.gomega.ai";window.TRACKING_API_ENDPOINT="https://events-api.gomega.ai";`;

  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <head>
        <meta name="mega-site-id" content={SITE_ID} />
        <script
          id="mega-tag-config"
          dangerouslySetInnerHTML={{ __html: megaTagConfig }}
        />
        <script
          id="optimizer-script"
          src="https://cdn.gomega.ai/scripts/optimizer.min.js"
          data-site-id={SITE_ID}
          async
        />
      </head>
      <body className="bg-[var(--color-bg)] text-[var(--color-text)] antialiased">
        {children}
        {/* CallTrackingMetrics — shared Mega account (never remove) */}
        <Script src="https://572388.tctm.co/t.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
