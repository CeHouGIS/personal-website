import { MetadataRoute } from "next";

import { DATA } from "@/data";
import { getBlogPosts } from "@/lib/blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = DATA.url;

  // Get all blog posts for both languages
  const [englishPosts, chinesePosts] = await Promise.all([
    getBlogPosts("en"),
    getBlogPosts("zh"),
  ]);

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    // English
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    // Chinese
    {
      url: `${baseUrl}/zh`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/zh/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/zh/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/zh/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Dynamic blog post routes for English
  const englishBlogRoutes: MetadataRoute.Sitemap = englishPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.metadata.date || new Date()),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  // Dynamic blog post routes for Chinese
  const chineseBlogRoutes: MetadataRoute.Sitemap = chinesePosts.map((post) => ({
    url: `${baseUrl}/zh/blog/${post.slug}`,
    lastModified: new Date(post.metadata.date || new Date()),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...englishBlogRoutes, ...chineseBlogRoutes];
}
