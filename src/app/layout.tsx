import type { Metadata, Viewport } from "next";
import Script from "next/script";
import localFont from "next/font/local";
import "./globals.css";
import { COMPANY } from "@/data/company";
import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { ScrollProgressBar } from "@/components/animations/ScrollProgressBar";
import { PageAnimations } from "@/components/animations/PageAnimations";
import { getSiteSchemaGraph } from "@/lib/seo";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

// Self-hosted variable fonts: no request to Google Fonts, faster first paint, CSP-friendly.
const manrope = localFont({
  src: "./fonts/manrope-latin-wght-normal.woff2",
  weight: "200 800",
  variable: "--font-manrope",
  display: "swap",
  fallback: ["system-ui", "Segoe UI", "Arial", "sans-serif"],
});

const inter = localFont({
  src: "./fonts/inter-latin-wght-normal.woff2",
  weight: "100 900",
  variable: "--font-inter",
  display: "swap",
  fallback: ["system-ui", "Segoe UI", "Arial", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(COMPANY.domain),
  title: {
    default: "Manpower Supply Company in Abu Dhabi, UAE | Pak Arab Manpower",
    template: "%s | Pak Arab Manpower",
  },
  description:
    "Skilled industrial manpower in Abu Dhabi & all 7 UAE emirates for Oil & Gas, MEP, Civil, Mechanical & Electrical projects. Short- and long-term contracts.",
  keywords: [
    "Manpower Supply Company UAE",
    "Manpower Supply Abu Dhabi",
    "Industrial Manpower Supply UAE",
    "Oil and Gas Manpower UAE",
    "Construction Labour Supply Abu Dhabi",
    "Skilled Workforce UAE",
    "Mechanical Manpower Supply",
    "Electrical Manpower Supply",
    "Onshore Offshore Workforce UAE",
    "Pak Arab Manpower Supply LLC",
  ],
  alternates: {
    canonical: "/",
  },
  applicationName: COMPANY.name,
  authors: [{ name: COMPANY.name, url: COMPANY.domain }],
  creator: COMPANY.name,
  publisher: COMPANY.name,
  category: "Manpower Supply & Staffing",
  formatDetection: { telephone: true, email: true, address: true },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION || undefined,
    other: process.env.NEXT_PUBLIC_BING_VERIFICATION
      ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION }
      : undefined,
  },
  other: {
    "geo.region": "AE-AZ",
    "geo.placename": "Abu Dhabi",
  },
  openGraph: {
    type: "website",
    locale: "en_AE",
    url: COMPANY.domain,
    siteName: COMPANY.name,
    title: "Pak Arab Manpower Supply LLC | Industrial Workforce Solutions UAE",
    description:
      "Skilled onshore & offshore MEP, Oil & Gas, Civil Construction, and Electrical manpower supply in Abu Dhabi, UAE.",
    images: [
      {
        url: "/images/brand/og-cover.jpg",
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "Pak Arab Manpower Supply LLC — Industrial Workforce Solutions UAE",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pak Arab Manpower Supply LLC | Abu Dhabi, UAE",
    description:
      "Industrial manpower supply for Oil & Gas, Construction, Mechanical, and Electrical projects across the UAE.",
    images: ["/images/brand/og-cover.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#0b1f33",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteSchema = getSiteSchemaGraph();

  return (
    <html lang="en" id="top" className={`${manrope.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col bg-white text-navy-900 antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-md focus:bg-brand focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to main content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema).replace(/</g, "\\u003c") }}
        />
        <ScrollProgressBar />
        <PageAnimations />
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <FloatingWhatsApp />
        {GA_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
            <Script id="ga4" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
