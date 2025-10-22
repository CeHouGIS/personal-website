import Link from "next/link";

import Brief from "@/components/portfolio/brief";
import SocialLinks from "@/components/portfolio/socallinks";
import { CustomReactMarkdown } from "@/components/react-markdown";
import { BlurFade } from "@/components/ui/blur-fade";
import { BLUR_FADE_DELAY, DATA } from "@/data";

export default function ChinesePage() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-7xl flex-col space-y-8 px-6 py-8 pb-24 sm:space-y-10 sm:px-16 md:px-20 md:py-16 md:pt-14 lg:px-24 lg:py-20 xl:px-32 xl:py-24">
      {/* Hero Section */}
      <section id="hero" className="mt-16 sm:mt-28">
        <BlurFade delay={BLUR_FADE_DELAY * 1}>
          <Brief
            name={DATA.chinese.name}
            initials={DATA.initials}
            subtitle={DATA.chinese.subtitle}
            description={DATA.chinese.description}
            avatarUrl={DATA.avatarUrl}
            className="mx-auto w-full max-w-2xl space-y-8"
          />
        </BlurFade>
      </section>

      {/* Social Links Section */}
      <section id="social">
        <BlurFade delay={BLUR_FADE_DELAY * 1}>
          <SocialLinks socials={DATA.contact.social} />
        </BlurFade>
      </section>

      {/* About Section */}
      <section id="about">
        <BlurFade delay={BLUR_FADE_DELAY * 1}>
          <h2 className="text-xl font-bold">关于我</h2>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 2}>
          <div className="prose text-muted-foreground dark:prose-invert max-w-full font-sans text-sm text-pretty [&_img]:my-0 [&_img]:inline-block [&_img]:h-[1em] [&_img]:w-auto [&_img]:align-baseline">
            <CustomReactMarkdown>{DATA.chinese.summary}</CustomReactMarkdown>
          </div>
        </BlurFade>
      </section>

      {/* Link to English page */}
      <section id="more-info">
        <BlurFade delay={BLUR_FADE_DELAY * 4}>
          <div className="text-center">
            <p className="text-muted-foreground mb-4">更多信息请查看英文页面</p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-blue-500 underline transition-colors hover:text-blue-600 hover:no-underline"
            >
              查看完整英文页面
            </Link>
          </div>
        </BlurFade>
      </section>
    </main>
  );
}
