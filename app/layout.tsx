import type { Metadata, Viewport } from "next";
import { Newsreader, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

// Headings + the name: an optical-size serif with real italics.
const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  axes: ["opsz"],
});

// Body + interface: a sturdy, readable sans with engineered details.
const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

// Only the menubar clock and a few tabular details.
const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

const DESCRIPTION =
  "Simon Mathias is a builder, musician, and operator obsessed with how people work, on stage and in software. It's a personal site that lives inside a little sky.";

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
    "Talent Atlas",
    "NoteAlong",
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
      className={`${newsreader.variable} ${plexSans.variable} ${plexMono.variable}`}
    >
      <body>
        <TooltipProvider delayDuration={200} skipDelayDuration={400}>
          {children}
        </TooltipProvider>
      </body>
    </html>
  );
}
