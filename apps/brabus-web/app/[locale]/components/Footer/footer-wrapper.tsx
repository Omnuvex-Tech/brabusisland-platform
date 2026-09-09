'use client';

import { Footer as FooterUI } from '@repo/ui';
import { getDictionary, Locale } from '@/lib/i18n';
import { useRouter } from 'next/navigation';
import { getPriceListHref } from '@/lib/priceList';
import { getBrokersHref } from '@/lib/brokers';
import { localizedPath } from '@/lib/localized-path';

const LOCALES = ['az', 'en', 'ru'];

const CATALOGS: Record<string, string> = {
  az: '/catalogue/brabus-island-catalogue-az.pdf',
  en: '/catalogue/brabus-island-catalogue-en.pdf',
  ru: '/catalogue/brabus-island-catalogue-ru.pdf',
};

export function Footer({ locale }: { locale: string }) {
  const t = getDictionary(locale);
  const router = useRouter();

  const handleLocaleChange = (nextLocale: string) => {
    router.push(`/${nextLocale}`);
  };

  return (
    <FooterUI
      logoSrc="/images/logo.svg"
      logoAlt="Brabus Island Baku"
      navLinks={[
        { label: t.navbar.navLinks.about, href: '#about' },
       { label: t.navbar.navLinks.brokers, href: getBrokersHref(locale), target: '_blank' },
        { label: t.navbar.navLinks.units, href: getPriceListHref(locale), target: '_blank' },
        { label: t.navbar.navLinks.contacts, href: '#contact' },
      ]}
      catalogLabel={t.navbar.catalog}
      catalogHref={CATALOGS[locale] ?? CATALOGS.az ?? '/catalogue/brabus-island-catalogue-az.pdf'}
      locales={LOCALES}
      activeLocale={locale}
      onLocaleChange={handleLocaleChange}
      privacyLabel={t.footer.privacy}
      termsLabel={t.footer.terms}
privacyHref={localizedPath('/privacy-policy', locale as Locale)}
termsHref={localizedPath('/terms', locale as Locale)}
      copyrightText={t.footer.copyright}
    />
  );
}