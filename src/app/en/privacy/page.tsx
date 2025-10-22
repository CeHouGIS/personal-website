import { Metadata } from "next";

import { DATA } from "@/data";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${DATA.name}'s portfolio website`,
  alternates: {
    canonical: `${DATA.url}/privacy`,
    languages: {
      "en-US": `${DATA.url}/privacy`,
      "zh-CN": `${DATA.url}/zh/privacy`,
    },
  },
};

export default function PrivacyPolicy() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16 sm:px-16 md:px-20 lg:px-24 xl:px-32">
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <h1 className="mb-8 text-3xl font-bold">Privacy Policy</h1>

        <p className="text-muted-foreground mb-6">
          <strong>Last updated:</strong>{" "}
          {new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>

        <div className="space-y-6">
          <section>
            <h2 className="mb-4 text-2xl font-semibold">
              Information We Collect
            </h2>
            <p>
              This website uses Google Analytics 4 (GA4) to collect anonymous
              usage statistics. The data collected includes:
            </p>
            <ul className="mt-2 list-disc pl-6">
              <li>Pages visited and time spent on pages</li>
              <li>Device and browser information</li>
              <li>General geographic location (country/city level)</li>
              <li>Traffic sources and referral information</li>
            </ul>
            <p className="mt-2">
              No personally identifiable information is collected through GA4.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">
              How We Use Information
            </h2>
            <p>The anonymous data collected through GA4 is used solely to:</p>
            <ul className="mt-2 list-disc pl-6">
              <li>Understand website traffic and user behavior</li>
              <li>Improve website performance and user experience</li>
              <li>Analyze content popularity and engagement</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">Data Sharing</h2>
            <p>
              We do not sell, trade, or otherwise transfer your data to third
              parties. Anonymous analytics data is processed by Google Analytics
              in accordance with Google's privacy policy.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">Cookies</h2>
            <p>
              This website uses cookies through Google Analytics to track user
              interactions. You can disable cookies in your browser settings if
              you prefer not to be tracked.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">Contact</h2>
            <p>
              If you have any questions about this Privacy Policy, please
              contact me through the contact information provided on the main
              website.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
