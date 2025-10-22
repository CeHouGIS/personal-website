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
  title: {
    default: DATA.chinese.name,
    template: `%s | ${DATA.chinese.name}`,
  },
  description: DATA.chinese.description,
  // Also: opengraph-image.png, opengraph-image.alt.txt
  openGraph: {
    title: `${DATA.chinese.name}`,
    description: DATA.chinese.description,
    url: `${DATA.url}/zh`,
    siteName: `${DATA.chinese.name}`,
    locale: "zh_CN",
    type: "website",
  },
  // Also: twitter-image.png, twitter-image.alt.txt
  twitter: {
    title: `${DATA.chinese.name}`,
    card: "summary_large_image",
  },
  alternates: {
    canonical: `${DATA.url}/zh`,
    languages: {
      "en-US": DATA.url,
      "zh-CN": `${DATA.url}/zh`,
    },
    types: {
      "application/atom+xml": "/api/feed/atom.xml",
    },
  },
};

export default function ChineseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {jsonldScript(generateWebsiteJsonLd("zh"))}
      {jsonldScript(generateBreadcrumbListJsonLd("zh"))}
      {jsonldScript(generatePersonJsonLd("zh"))}
      {children}
    </>
  );
}
