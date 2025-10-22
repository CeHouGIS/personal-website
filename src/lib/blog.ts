import fs from "fs";
import matter from "gray-matter";
import path from "path";
import rehypeKatex from "rehype-katex";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

// Define the expected metadata structure
interface BlogPostMetadata {
  title: string;
  date: string;
  summary: string;
  [key: string]: unknown;
}

// Define the blog post type
export interface BlogPost {
  metadata: BlogPostMetadata;
  slug: string;
  source: string;
  locale: string;
}

function getMDXFiles(dir: string) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

export async function markdownToHTML(markdown: string) {
  const p = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeKatex)
    .use(rehypePrettyCode, {
      // https://rehype-pretty.pages.dev/#usage
      theme: {
        light: "github-light",
        dark: "github-dark-dimmed",
      },
      keepBackground: false,
    })
    .use(rehypeStringify)
    .process(markdown);

  return p.toString();
}

export async function getPost(
  slug: string,
  locale: string = "en",
): Promise<BlogPost | null> {
  const contentDir = locale === "zh" ? "content/zh" : "content";
  const filePath = path.join(contentDir, `${slug}.mdx`);

  // Check if file exists
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const source = fs.readFileSync(filePath, "utf-8");
  const { content: rawContent, data: rawMetadata } = matter(source);
  const content = await markdownToHTML(rawContent);

  // Ensure required fields exist and type the metadata properly
  const metadata: BlogPostMetadata = {
    title: rawMetadata.title || "",
    date: rawMetadata.date || "",
    summary: rawMetadata.summary || "",
    ...rawMetadata,
  };

  return {
    source: content,
    metadata,
    slug,
    locale,
  };
}

async function getAllPosts(
  dir: string,
  locale: string = "en",
): Promise<BlogPost[]> {
  const mdxFiles = getMDXFiles(dir);
  const posts = await Promise.all(
    mdxFiles.map(async (file) => {
      const slug = path.basename(file, path.extname(file));
      const post = await getPost(slug, locale);
      if (!post) {
        return null;
      }
      return post;
    }),
  );

  // Filter out null values (posts that don't exist)
  return posts.filter((post): post is BlogPost => post !== null);
}

export async function getBlogPosts(locale: string = "en"): Promise<BlogPost[]> {
  const contentDir = locale === "zh" ? "content/zh" : "content";
  return getAllPosts(path.join(process.cwd(), contentDir), locale);
}

export async function hasChineseVersion(slug: string): Promise<boolean> {
  const chineseFilePath = path.join("content/zh", `${slug}.mdx`);
  return fs.existsSync(chineseFilePath);
}

export async function hasEnglishVersion(slug: string): Promise<boolean> {
  const englishFilePath = path.join("content", `${slug}.mdx`);
  return fs.existsSync(englishFilePath);
}
