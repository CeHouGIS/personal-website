import "./globals.css";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { ThemeProvider } from "next-themes";

import Footer from "@/components/blocks/footer";
import Navbar from "@/components/blocks/navbar/navbar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DATA } from "@/data";
import { cn } from "@/lib/utils";

/* Fonts */
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

/* Metadata */
export const metadata: Metadata = {
  metadataBase: new URL(DATA.url),
  title: {
    default: DATA.name,
    template: `%s | ${DATA.name}`,
  },
  // Also: robots.ts
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // Also: manifest.ts
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <head>
        {/* Google Tag Manager */}
        {/* Baidu Site Verification */}
      </head>
      <body
        className={cn(
          "bg-background min-h-screen font-sans antialiased",
          fontSans.variable,
        )}
      >
        {/* Google Tag Manager (noscript) */}
        {/* End Google Tag Manager (noscript) */}

        {/* Main Layout */}
        <ThemeProvider attribute="class" defaultTheme="system">
          <TooltipProvider delayDuration={0}>
            <Navbar />
            {children}
            <Footer />
          </TooltipProvider>
        </ThemeProvider>

        {/* Vercel Analytics and Speed Insights */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
