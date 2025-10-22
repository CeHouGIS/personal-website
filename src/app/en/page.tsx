import Link from "next/link";

import AwardsSection from "@/components/portfolio/awards-section";
import Brief from "@/components/portfolio/brief";
import Contact from "@/components/portfolio/contact";
import Education from "@/components/portfolio/education";
import NewsSection from "@/components/portfolio/news";
import ProjectsSection from "@/components/portfolio/projects-section/projects-section";
import Services from "@/components/portfolio/services";
import Skills from "@/components/portfolio/skills";
import SocialLinks from "@/components/portfolio/socallinks";
import Talks from "@/components/portfolio/talks";
import Work from "@/components/portfolio/work";
import { CustomReactMarkdown } from "@/components/react-markdown";
import { BlurFade } from "@/components/ui/blur-fade";
import { BLUR_FADE_DELAY, DATA } from "@/data";

export default function Page() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-7xl flex-col space-y-8 px-6 py-8 pb-24 sm:space-y-10 sm:px-16 md:px-20 md:py-16 md:pt-14 lg:px-24 lg:py-20 xl:px-32 xl:py-24">
      {/* Hero Section */}
      <section id="hero" className="mt-16 sm:mt-28">
        <BlurFade delay={BLUR_FADE_DELAY * 1}>
          <Brief
            name={DATA.name}
            firstName={DATA.firstName}
            surname={DATA.surname}
            initials={DATA.initials}
            subtitle={DATA.subtitle}
            description={DATA.description}
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
          <h2 className="text-xl font-bold">About</h2>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 2}>
          <div className="prose text-muted-foreground dark:prose-invert max-w-full font-sans text-sm text-pretty [&_img]:my-0 [&_img]:inline-block [&_img]:h-[1em] [&_img]:w-auto [&_img]:align-baseline">
            <CustomReactMarkdown>{DATA.summary}</CustomReactMarkdown>
          </div>
        </BlurFade>
      </section>

      {/* News Section */}
      <section id="news">
        <NewsSection news={DATA.news} delay={BLUR_FADE_DELAY * 2} />
      </section>

      {/* Projects Section */}
      <section id="projects">
        <div className="w-full space-y-12 py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 2}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="bg-foreground text-background inline-block rounded-lg px-3 py-1 text-sm">
                  Selected Projects
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Check out my latest work
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  From research to web applications. View the full list of
                  publications on{" "}
                  <Link
                    href={DATA.contact.social.GoogleScholar.url}
                    className="text-blue-500 underline hover:no-underline"
                  >
                    Google Scholar
                  </Link>
                </p>
              </div>
            </div>
          </BlurFade>
          <ProjectsSection
            projects={DATA.projects}
            delay={BLUR_FADE_DELAY * 3}
          />
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <h2 className="text-xl font-bold">Skills</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <Skills skills={DATA.skills} />
          </BlurFade>
        </div>
      </section>

      {/* Education Section */}
      <section id="education">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <h2 className="text-xl font-bold">Education</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <Education educations={DATA.education} />
          </BlurFade>
        </div>
      </section>

      {/* Work Section */}
      <section id="work">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <h2 className="text-xl font-bold">Internship & Work Experience</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 6}>
            <Work work={DATA.work} />
          </BlurFade>
        </div>
      </section>

      {/* Awards Section */}
      <section id="awards">
        <BlurFade delay={BLUR_FADE_DELAY * 6}>
          <h2 className="text-xl font-bold">Awards & Honors</h2>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 7}>
          <AwardsSection awards={DATA.awards} />
        </BlurFade>
      </section>

      {/* Academic Services Section */}
      <section id="academic-services">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <h2 className="text-xl font-bold">Academic Services</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 8}>
            <Services
              reviewerConferences={DATA.reviewerConferences}
              reviewerJournals={DATA.reviewerJournals}
              teaching={DATA.teaching}
            />
          </BlurFade>
        </div>
      </section>

      {/* Invited Talks Section */}
      <section id="invited-talks">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 8}>
            <h2 className="text-xl font-bold">Invited Talks</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <Talks talks={DATA.invitedTalks} />
          </BlurFade>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact">
        <div className="grid w-full items-center justify-center gap-4 px-4 py-12 text-center md:px-6">
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <Contact
              emailUrl={DATA.contact.social.email.url}
              calendlyUrl={DATA.contact.social.calendly.url}
            />
          </BlurFade>
        </div>
      </section>

    </main>
  );
}
