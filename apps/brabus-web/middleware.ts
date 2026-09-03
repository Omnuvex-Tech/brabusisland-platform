import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { LOCALES, DEFAULT_LOCALE } from '@/lib/i18n';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const localeInPath = LOCALES.find(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  if (localeInPath === DEFAULT_LOCALE) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(`/${DEFAULT_LOCALE}`, '') || '/';
    return NextResponse.redirect(url);
  }

  if (localeInPath) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE}${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|images|fonts|catalogue).*)',
  ],
};