import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const i18n = {
  defaultLocale: "en",
  locales: ["en", "zh"],
} as const;

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if pathname starts with any non-default locale
  if (
    i18n.locales.some(
      (locale) =>
        locale !== i18n.defaultLocale && pathname.startsWith(`/${locale}`),
    )
  ) {
    return NextResponse.next();
  }

  // For all other paths that don't start with a locale
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) =>
      !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  );

  // If no locale prefix, treat as English content
  if (pathnameIsMissingLocale) {
    return NextResponse.rewrite(
      new URL(
        `/${i18n.defaultLocale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
        request.url,
      ),
    );
  }

  return NextResponse.next();
}

export const config = {
  // Matcher ignoring `/_next/`, `/api/`, static files and docs routes
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.pdf|.*\\.png|.*\\.jpg|.*\\.xml|.*\\.txt).*)"],
};
