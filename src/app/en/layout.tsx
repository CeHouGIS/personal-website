import type { Metadata } from "next";

import {
  generateBreadcrumbListJsonLd,
  generatePersonJsonLd,
  generateWebsiteJsonLd,
} from "@/app/jsonld";
import { DATA } from "@/data";
import { jsonldScript } from "@/lib/utils";

/* Metadata */
export const metadata: Metadata = {
  description: DATA.description,
  // Also: opengraph-image.png, opengraph-image.alt.txt
  openGraph: {
    title: `${DATA.name}`,
    description: DATA.description,
    url: DATA.url,
    siteName: `${DATA.name}`,
    locale: "en_US",
    type: "website",
  },
  // Also: twitter-image.png, twitter-image.alt.txt
  twitter: {
    title: `${DATA.name}`,
    card: "summary_large_image",
  },
  alternates: {
    canonical: DATA.url,
    languages: {
      "en-US": DATA.url,
      "zh-CN": `${DATA.url}/zh`,
    },
    types: {
      "application/atom+xml": "/api/feed/atom.xml",
    },
  },
};

export default function EnglishLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {jsonldScript(generateWebsiteJsonLd())}
      {jsonldScript(generateBreadcrumbListJsonLd())}
      {jsonldScript(generatePersonJsonLd())}
      {children}
    </>
  );
}
