import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
      <body className={`${montserrat.className} min-h-full flex flex-col`}>
        <Navbar />
        <div className="flex-1 pt-[76px]">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
