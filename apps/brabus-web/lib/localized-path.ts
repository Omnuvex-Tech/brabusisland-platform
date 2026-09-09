import { DEFAULT_LOCALE, type Locale } from './i18n';

export function localizedPath(path: string, locale: Locale): string {
  return locale === DEFAULT_LOCALE ? path || '/' : `/${locale}${path}`;
}