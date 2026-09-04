import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';
import { LOCALES, DEFAULT_LOCALE, type Locale } from '@/lib/i18n';


const ROUTES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
  { path: '', priority: 1, changeFrequency: 'weekly' },
  { path: '/privacy-policy', priority: 0.3, changeFrequency: 'yearly' },
];

function localizedPath(path: string, locale: Locale): string {
  return locale === DEFAULT_LOCALE ? path || '/' : `/${locale}${path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ROUTES.flatMap((route) => {
    const languageAlternates = Object.fromEntries(
      LOCALES.map((locale) => [locale, `${SITE_URL}${localizedPath(route.path, locale)}`])
    );

    return LOCALES.map((locale) => ({
      url: `${SITE_URL}${localizedPath(route.path, locale)}`,
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: {
        languages: languageAlternates,
      },
    }));
  });
}