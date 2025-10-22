import { Metadata } from "next";

import { DATA } from "@/data";

export const metadata: Metadata = {
  title: "Terms & Disclaimer",
  description: `Terms of Service and Disclaimer for ${DATA.name}'s portfolio website`,
  alternates: {
    canonical: `${DATA.url}/terms`,
    languages: {
      "en-US": `${DATA.url}/terms`,
      "zh-CN": `${DATA.url}/zh/terms`,
    },
  },
};

export default function TermsAndDisclaimer() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16 sm:px-16 md:px-20 lg:px-24 xl:px-32">
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <h1 className="mb-8 text-3xl font-bold">Terms & Disclaimer</h1>

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
            <h2 className="mb-4 text-2xl font-semibold">Terms of Service</h2>
            <p>
              By accessing and using this website, you accept and agree to be
              bound by the terms and provision of this agreement.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">Use License</h2>
            <p>
              Permission is granted to temporarily download one copy of the
              materials on this website for personal, non-commercial transitory
              viewing only. This is the grant of a license, not a transfer of
              title, and under this license you may not:
            </p>
            <ul className="mt-2 list-disc pl-6">
              <li>Modify or copy the materials</li>
              <li>
                Use the materials for any commercial purpose or for any public
                display
              </li>
              <li>
                Attempt to reverse engineer any software contained on the
                website
              </li>
              <li>
                Remove any copyright or other proprietary notations from the
                materials
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">Disclaimer</h2>
            <p>
              The materials on this website are provided on an 'as is' basis.
              I make no warranties, expressed or implied, and
              hereby disclaim and negate all other warranties including
              without limitation, implied warranties or conditions of
              merchantability, fitness for a particular purpose, or
              non-infringement of intellectual property or other violation of
              rights.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">Limitations</h2>
            <p>
              In no event shall I or my suppliers be liable for any
              damages (including, without limitation, damages for loss of data
              or profit, or due to business interruption) arising out of the use
              or inability to use the materials on this website, even if I
              or an authorized representative has been notified orally or
              in writing of the possibility of such damage. Because some
              jurisdictions do not allow limitations on implied warranties, or
              limitations of liability for consequential or incidental damages,
              these limitations may not apply to you.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">
              Accuracy of Materials
            </h2>
            <p>
              The materials appearing on this website could include technical,
              typographical, or photographic errors. I do not
              warrant that any of the materials on this website are accurate,
              complete, or current. I may make changes to the
              materials contained on this website at any time without notice.
              However, I do not make any commitment to update the
              materials.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">Links</h2>
            <p>
              I have not reviewed all of the sites linked to this
              website and am not responsible for the contents of any such linked
              site. The inclusion of any link does not imply endorsement by
              me of the site. Use of any such linked website is at
              the user's own risk.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">Modifications</h2>
            <p>
              I may revise these terms of service for this website at
              any time without notice. By using this website, you are agreeing
              to be bound by the then current version of these terms of service.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">Contact</h2>
            <p>
              If you have any questions about these Terms & Disclaimer, please
              contact me through the contact information provided on the main
              website.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
