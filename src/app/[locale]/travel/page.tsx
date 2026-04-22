import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { TravelMap } from "@/components/travel/travel-map";
import { routing } from "@/i18n/routing";
import { constructMetadata } from "@/lib/metadata";

type MetadataProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return constructMetadata({
    title: t("travel.title"),
    description: t("travel.description"),
    path: "/travel",
    locale,
  });
}

export default async function TravelPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const params = await props.params;
  const locale = params.locale || routing.defaultLocale;
  const t = await getTranslations({ locale });

  return (
    <main className="pb-12 pt-16 sm:pb-14 sm:pt-24 md:pb-16 md:pt-32 lg:pt-36 xl:pt-40">
      <div className="mx-auto w-full max-w-5xl px-6 sm:px-8 md:px-10">
        <h1 className="mb-4 text-3xl font-semibold tracking-tighter md:text-4xl">
          {t("travel.title")}
        </h1>
        <p className="text-muted-foreground mb-8 max-w-2xl text-sm md:text-base">
          {t("travel.description")}
        </p>

        <div className="h-[65vh] min-h-96 w-full">
          <TravelMap />
        </div>

        <p className="text-muted-foreground mt-3 text-xs">
          {t("travel.mapHint")}
        </p>
      </div>
    </main>
  );
}
