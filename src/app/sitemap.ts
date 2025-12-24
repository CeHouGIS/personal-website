import { MetadataRoute } from "next";

import { siteConfig } from "@/data/site";
import { DEFAULT_LOCALE, LOCALES } from "@/i18n/routing";
import { getBlogPosts } from "@/lib/blog";

const siteUrl = siteConfig.url;

// Next.js Portfolio Blog Research Docs routes (via rewrite)
const nextjsPortfolioDocsRoutes = [
  "/open-source/nextjs-portfolio-blog-research/docs",
  "/open-source/nextjs-portfolio-blog-research/docs/getting-started/overview",
  "/open-source/nextjs-portfolio-blog-research/docs/getting-started/configuration",
  "/open-source/nextjs-portfolio-blog-research/docs/getting-started/deployment",
  "/open-source/nextjs-portfolio-blog-research/docs/customization/portfolio",
  "/open-source/nextjs-portfolio-blog-research/docs/customization/blog",
  "/open-source/nextjs-portfolio-blog-research/docs/customization/favicon",
  "/open-source/nextjs-portfolio-blog-research/docs/seo-analytics/seo",
  "/open-source/nextjs-portfolio-blog-research/docs/seo-analytics/gsc-setup",
  "/open-source/nextjs-portfolio-blog-research/docs/seo-analytics/ga4-integration",
  "/open-source/nextjs-portfolio-blog-research/docs/advanced/dev-env-setup",
  "/open-source/nextjs-portfolio-blog-research/docs/advanced/ai-dev-guide",
  "/open-source/nextjs-portfolio-blog-research/docs/advanced/video-demo-for-projects",
];

type ChangeFrequency =
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never"
  | undefined;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages = [
    "",
    "/blog",
    "/privacy-policy",
    "/terms-of-service",
  ];

  const pages = LOCALES.flatMap((locale) => {
    return staticPages.map((page) => ({
      url: `${siteUrl}${locale === DEFAULT_LOCALE ? "" : `/${locale}`}${page}`,
      lastModified: new Date(),
      changeFrequency: (["", "/blog"].includes(page)
        ? "weekly"
        : "monthly") as ChangeFrequency,
      priority: page === "" ? 1.0 : page === "/blog" ? 0.8 : 0.5,
    }));
  });

  const allBlogSitemapEntries: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    const posts = await getBlogPosts(locale);
    posts
      .filter(
        (post) =>
          post.slug &&
          (post.metadata.status !== "draft" || !post.metadata.status),
      )
      .forEach((post) => {
        const slugPart = post.slug.replace(/^\//, "").replace(/^blogs\//, "");
        if (slugPart) {
          allBlogSitemapEntries.push({
            url: `${siteUrl}${
              locale === DEFAULT_LOCALE ? "" : `/${locale}`
            }/blog/${slugPart}`,
            lastModified: post.metadata.updatedAt
              ? new Date(post.metadata.updatedAt as string)
              : post.metadata.date
                ? new Date(post.metadata.date)
                : new Date(),
            changeFrequency: "monthly" as ChangeFrequency,
            priority: 0.7,
          });
        }
      });
  }

  const uniqueBlogPostEntries = Array.from(
    new Map(allBlogSitemapEntries.map((entry) => [entry.url, entry])).values(),
  );

  // Next.js Portfolio Docs routes (monthly, low priority)
  const nextjsPortfolioDocsSitemapEntries: MetadataRoute.Sitemap =
    nextjsPortfolioDocsRoutes.map((route) => ({
      url: `${siteUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as ChangeFrequency,
      priority: 0.5,
    }));

  return [
    ...pages,
    ...uniqueBlogPostEntries,
    ...nextjsPortfolioDocsSitemapEntries,
  ];
}
