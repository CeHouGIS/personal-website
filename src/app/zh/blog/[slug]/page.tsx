import { Suspense } from "react";

import { getBlogPosts, getPost } from "@/lib/blog";
import { formatDate } from "@/lib/utils";

export async function generateStaticParams() {
  const posts = await getBlogPosts("zh");
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function Blog(props: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const params = await props.params;
  const post = await getPost(params.slug, "zh");

  if (!post) {
    return null; // Layout will handle notFound()
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-6 sm:px-8 md:px-10">
      <h1 className="mb-3 text-3xl font-semibold tracking-tighter md:text-4xl">
        {post.metadata.title}
      </h1>
      <div className="mb-8 flex items-center justify-between text-sm">
        <Suspense fallback={<p className="h-5" />}>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {formatDate(post.metadata.date, "zh")}
          </p>
        </Suspense>
      </div>
      <article
        className="prose dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: post.source }}
      ></article>
    </div>
  );
}
