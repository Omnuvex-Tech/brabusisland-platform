import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import localFont from 'next/font/local';
import { NotifyProvider, NotifyContainer } from '@repo/ui';
import { QueryProvider } from './providers';
import { Navbar } from './components/Navbar/navbar-wrapper';
import { Footer } from './components/Footer/footer-wrapper';
import { isValidLocale, LOCALES } from '@/lib/i18n';
import { getSeo } from '@/config/project';
import '../globals.css';

const inter = localFont({
  src: [
    { path: '../fonts/Inter-VariableFont_opsz,wght.ttf', style: 'normal' },
    { path: '../fonts/Inter-Italic-VariableFont_opsz,wght.ttf', style: 'italic' },
  ],
  variable: '--font-inter',
  display: 'swap',
});

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const seo = getSeo(locale);

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
          integrity="sha512-1ycn6IcaQQ40/MKBW2W4Rhis/DbILU74C1vSrLJxCq57o941Ym01SwNsOMqvEBFlcgUa6xLiPY/NS5R+E6ztJQ=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body className={inter.variable}>
        <QueryProvider>
          <NotifyProvider>
            <Navbar locale={locale} />
            <main>{children}</main>
            <Footer locale={locale}/>
            <NotifyContainer />
          </NotifyProvider>
        </QueryProvider>
      </body>
    </html>
  );
}