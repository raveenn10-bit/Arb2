import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";
import { COMPANY } from "@/data/company";
import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { ScrollProgressBar } from "@/components/animations/ScrollProgressBar";
import { getOrganizationSchema, getLocalBusinessSchema } from "@/lib/seo";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(COMPANY.domain),
  title: {
    default: "Pak Arab Manpower Supply LLC | Industrial Manpower Supply Abu Dhabi, UAE",
    template: "%s | Pak Arab Manpower Supply LLC",
  },
  description:
    "Reliable industrial manpower supply in Abu Dhabi and across the UAE for Oil & Gas, Civil Construction, Mechanical, Electrical, MEP, and Workforce Support.",
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
      { url: "/favicon.ico" },
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const orgSchema = getOrganizationSchema();
  const localSchema = getLocalBusinessSchema();

  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col bg-white text-[#111315] antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-md focus:bg-[#D40820] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to main content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localSchema) }}
        />
        <ScrollProgressBar />
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
