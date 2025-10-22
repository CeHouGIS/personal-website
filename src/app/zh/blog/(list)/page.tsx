import { generateBlogJsonLd } from "@/app/jsonld";
import { BlogCard } from "@/components/blog/blog-card";
import { BlurFade } from "@/components/ui/blur-fade";
import { BLUR_FADE_DELAY, DATA } from "@/data";
import { getBlogPosts } from "@/lib/blog";
import { jsonldScript } from "@/lib/utils";

export default async function BlogPage() {
  const posts = await getBlogPosts("zh");
  const blogJsonLd = generateBlogJsonLd(posts);

  return (
    <section className="pt-16 pb-12 sm:pt-24 sm:pb-14 md:pt-32 md:pb-16 lg:pt-36 xl:pt-40">
      {jsonldScript(blogJsonLd)}
      <div className="mx-auto w-full max-w-3xl px-6 sm:px-8 md:px-10">
        <BlurFade delay={BLUR_FADE_DELAY}>
          <h1 className="mb-4 text-3xl font-semibold tracking-tighter md:text-4xl">
            博客
          </h1>
          <p className="text-muted-foreground mb-8 max-w-2xl text-sm md:text-base">
            {DATA.chinese.blogDescription}
          </p>
        </BlurFade>
      </div>

      <div className="mx-auto w-full max-w-3xl px-6 sm:px-8 md:px-10">
        <div className="grid grid-cols-1 gap-4 sm:gap-5">
          {posts
            .sort((a, b) => {
              if (new Date(a.metadata.date) > new Date(b.metadata.date)) {
                return -1;
              }
              return 1;
            })
            .map((post, id) => (
              <BlurFade delay={BLUR_FADE_DELAY * (2 + id)} key={post.slug}>
                <BlogCard
                  locale="zh"
                  slug={post.slug}
                  title={post.metadata.title}
                  date={post.metadata.date}
                  summary={post.metadata.summary}
                />
              </BlurFade>
            ))}
        </div>
      </div>
    </section>
  );
}
