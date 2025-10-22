import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { generateBlogPostingJsonLd } from "@/app/jsonld";
import { MobileTOC } from "@/components/blog/toc/mobile-toc";
import { TableOfContents } from "@/components/blog/toc/table-of-contents";
import { DATA } from "@/data";
import { getPost, hasEnglishVersion } from "@/lib/blog";
import { jsonldScript } from "@/lib/utils";

export async function generateMetadata(props: {
  params: Promise<{
    slug: string;
  }>;
}): Promise<Metadata | undefined> {
  const params = await props.params;
  const post = await getPost(params.slug, "zh");

  if (!post) {
    return undefined;
  }

  const { title, date: publishedTime, summary: description } = post.metadata;
  const hasEnglish = await hasEnglishVersion(params.slug);

  const alternates: {
    canonical: string;
    languages?: {
      "en-US": string;
      "zh-CN": string;
    };
  } = {
    canonical: `${DATA.url}/zh/blog/${post.slug}`,
  };
  if (hasEnglish) {
    alternates.languages = {
      "en-US": `${DATA.url}/blog/${post.slug}`,
      "zh-CN": `${DATA.url}/zh/blog/${post.slug}`,
    };
  }

  return {
    title,
    description,
    alternates,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${DATA.url}/zh/blog/${post.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function BlogLayout(props: {
  children: React.ReactNode;
  params: Promise<{
    slug: string;
  }>;
}) {
  const params = await props.params;
  const post = await getPost(params.slug, "zh");

  if (!post) {
    notFound();
  }

  return (
    <section
      id="blog"
      className="pt-16 pb-12 sm:pt-24 sm:pb-14 md:pt-32 md:pb-16 lg:pt-36 xl:pt-40"
    >
      {jsonldScript(generateBlogPostingJsonLd(post))}

      {/* Desktop Table of Contents - Fixed on the left side */}
      <div className="fixed top-32 left-6 z-10 hidden xl:block">
        <TableOfContents content={post.source} />
      </div>

      {/* Mobile Table of Contents */}
      <MobileTOC content={post.source} />

      {props.children}
    </section>
  );
}
