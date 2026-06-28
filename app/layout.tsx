import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

const DESCRIPTION =
  "Simon Mathias — builder, musician, and operator obsessed with how people work, on stage and in software. A personal site that lives inside a little sky.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Simon Mathias",
  description: DESCRIPTION,
  authors: [{ name: "Simon Mathias" }],
  keywords: [
    "Simon Mathias",
    "University of Toronto",
    "Predictive Success",
    "Predictive Index",
    "saxophone",
    "founder",
    "Read the Room",
  ],
  openGraph: {
    title: "Simon Mathias",
    description: DESCRIPTION,
    type: "website",
    siteName: "Simon Mathias",
    locale: "en_CA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Simon Mathias",
    description: DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#4fb8ff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${bricolage.variable} ${geist.variable} ${geistMono.variable}`}
    >
      <body>
        <TooltipProvider delayDuration={200} skipDelayDuration={400}>
          {children}
        </TooltipProvider>
      </body>
    </html>
  );
}
