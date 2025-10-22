import { Metadata } from "next";

import { DATA } from "@/data";

export const metadata: Metadata = {
  title: "Blog",
  description: DATA.blogDescription,
  openGraph: {
    title: `${DATA.name}'s Blog`,
    description: DATA.blogDescription,
    url: `${DATA.url}/blog`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${DATA.name}'s Blog`,
    description: DATA.blogDescription,
  },
  alternates: {
    canonical: `${DATA.url}/blog`,
    languages: {
      "en-US": `${DATA.url}/blog`,
      "zh-CN": `${DATA.url}/zh/blog`,
    },
    types: {
      "application/atom+xml": "/api/feed/atom.xml",
    },
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
