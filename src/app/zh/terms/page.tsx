import { Metadata } from "next";

import { DATA } from "@/data";

export const metadata: Metadata = {
  title: "服务条款与免责声明",
  description: `${DATA.chinese.name}个人网站的服务条款与免责声明`,
  alternates: {
    canonical: `${DATA.url}/zh/terms`,
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
        <h1 className="mb-8 text-3xl font-bold">服务条款与免责声明</h1>

        <p className="text-muted-foreground mb-6">
          <strong>最后更新：</strong>{" "}
          {new Date().toLocaleDateString("zh-CN", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>

        <div className="space-y-6">
          <section>
            <h2 className="mb-4 text-2xl font-semibold">服务条款</h2>
            <p>通过访问和使用本网站，您接受并同意受本协议条款和规定的约束。</p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">使用许可</h2>
            <p>
              允许临时下载本网站材料的一份副本，仅供个人、非商业临时查看。这是许可的授予，不是所有权的转移，在此许可下您不得：
            </p>
            <ul className="mt-2 list-disc pl-6">
              <li>修改或复制材料</li>
              <li>将材料用于任何商业目的或任何公开展示</li>
              <li>尝试对网站上包含的任何软件进行逆向工程</li>
              <li>从材料中删除任何版权或其他专有标记</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">免责声明</h2>
            <p>
              本网站上的材料按"现状"提供。我们不作任何明示或暗示的保证，并在此声明和否定所有其他保证，包括但不限于适销性、特定用途适用性或知识产权不侵权或其他权利侵犯的暗示保证或条件。
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">限制</h2>
            <p>
              在任何情况下，我们或其供应商均不对因使用或无法使用本网站材料而产生的任何损害（包括但不限于数据或利润损失或因业务中断造成的损害）承担责任，即使我们或授权代表已被告知此类损害的可能性。由于某些司法管辖区不允许对暗示保证的限制，或对后果性或偶然性损害的责任限制，这些限制可能不适用于您。
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">材料准确性</h2>
            <p>
              本网站上出现的材料可能包含技术、排版或摄影错误。我们不保证其网站上的任何材料都是准确、完整或最新的。我们可以随时更改其网站上包含的材料，恕不另行通知。但是，我们不承诺更新材料。
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">链接</h2>
            <p>
              我们尚未审查链接到本网站的所有网站，不对任何此类链接网站的内容负责。包含任何链接并不意味着我们对该网站的认可。使用任何此类链接网站的风险由用户自行承担。
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">修改</h2>
            <p>
              我们可以随时修改其网站的服务条款，恕不另行通知。通过使用本网站，您同意受当时这些服务条款的当前版本约束。
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">联系方式</h2>
            <p>
              如果您对这些服务条款与免责声明有任何疑问，请通过主网站上提供的联系信息与我联系。
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
