import { Metadata } from "next";

import { DATA } from "@/data";

export const metadata: Metadata = {
  title: "隐私政策",
  description: `${DATA.chinese.name}个人网站的隐私政策`,
  alternates: {
    canonical: `${DATA.url}/zh/privacy`,
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
        <h1 className="mb-8 text-3xl font-bold">隐私政策</h1>

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
            <h2 className="mb-4 text-2xl font-semibold">我们收集的信息</h2>
            <p>
              本网站使用 Google Analytics 4 (GA4)
              收集匿名使用统计数据。收集的数据包括：
            </p>
            <ul className="mt-2 list-disc pl-6">
              <li>访问的页面和在页面上停留的时间</li>
              <li>设备和浏览器信息</li>
              <li>大致地理位置（国家/城市级别）</li>
              <li>流量来源和推荐信息</li>
            </ul>
            <p className="mt-2">通过 GA4 不会收集任何个人身份信息。</p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">我们如何使用信息</h2>
            <p>通过 GA4 收集的匿名数据仅用于：</p>
            <ul className="mt-2 list-disc pl-6">
              <li>了解网站流量和用户行为</li>
              <li>改善网站性能和用户体验</li>
              <li>分析内容受欢迎程度和参与度</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">数据共享</h2>
            <p>
              我们不会出售、交易或以其他方式将您的数据转移给第三方。匿名分析数据由
              Google Analytics 根据 Google 的隐私政策进行处理。
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">Cookie</h2>
            <p>
              本网站通过 Google Analytics 使用 Cookie
              来跟踪用户交互。如果您不希望被跟踪，可以在浏览器设置中禁用
              Cookie。
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">联系方式</h2>
            <p>
              如果您对此隐私政策有任何疑问，请通过主网站上提供的联系信息与我联系。
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
