import type { Metadata } from "next";
import Script from "next/script";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd, { organizationSchema, websiteSchema } from "@/components/seo/JsonLd";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const BASE_URL = "https://www.trackopinion.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: "Track Opinion® — Global Market Research & Online Panel",
    template: "%s | Track Opinion®",
  },
  description:
    "Track Opinion® is a global market research and outsourcing firm. Bank on a panel of 4.5 Million members for tailor-made online surveys, data collection, analytics, and market intelligence.",
  keywords: [
    "market research",
    "online panel",
    "survey programming",
    "data collection",
    "data analytics",
    "translation services",
    "desk research",
    "CATI solutions",
    "global panel",
    "Track Opinion",
  ],
  authors: [{ name: "Track Opinion", url: BASE_URL }],
  creator: "Track Opinion",
  publisher: "Track Opinion",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: {
    canonical: BASE_URL,
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Track Opinion",
    title: "Track Opinion® — Global Market Research & Online Panel",
    description:
      "Bank on a Global panel of 4.5 Million members. Get tailor-made online surveys and market research processes. Unlock user behaviour and market intelligence.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Track Opinion — Global Market Research",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: "@TrackOpinion",
    creator: "@TrackOpinion",
    title: "Track Opinion® — Global Market Research & Online Panel",
    description:
      "Bank on a Global panel of 4.5 Million members for tailor-made surveys and market research.",
    images: ["/og-image.png"],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  verification: {
    google: "YOUR_GOOGLE_SITE_VERIFICATION_TOKEN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        {/* CookieYes — consent banner. Loads before hydration so the banner
            appears on first paint and blocks tags before they fire. */}
        <Script
          id="cookieyes"
          strategy="beforeInteractive"
          src="https://cdn-cookieyes.com/client_data/bb74aacc1520c6fb02d1e3cb/script.js"
        />
      </head>
      <body className={`${montserrat.className} min-h-full flex flex-col`}>
        {/* Site-wide structured data — identifies the publisher for every page */}
        <JsonLd data={[organizationSchema, websiteSchema]} />

        <Navbar />
        <div className="flex-1 pt-[76px]">{children}</div>
        <Footer />

        {/* Relay CookieYes consent changes to Google Consent Mode.
            `gtag` is guarded because no GA/GTM tag is installed on the site yet —
            without the guard every consent change throws a ReferenceError. */}
        <Script id="cookieyes-consent-relay" strategy="afterInteractive">
          {`
            document.addEventListener("cookieyes_consent_update", function (event) {
              var consent = event.detail || {};
              var ads = consent.accepted && consent.accepted.indexOf("advertisement") !== -1
                ? "granted" : "denied";

              if (typeof gtag !== "function") return;

              gtag("consent", "update", {
                analytics_storage: "granted",
                ad_storage: ads,
                ad_user_data: ads,
                ad_personalization: ads
              });
            });
          `}
        </Script>
      </body>
    </html>
  );
}
