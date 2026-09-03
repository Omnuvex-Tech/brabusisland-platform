'use client';

import { Footer as FooterUI } from '@repo/ui';
import { getDictionary } from '@/lib/i18n';
import { useRouter } from 'next/navigation';
import { getPriceListHref } from '@/lib/priceList';
import { getBrokersHref } from '@/lib/brokers';

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
        { label: t.navbar.navLinks.contacts, href: '#contacts' },
      ]}
      catalogLabel={t.navbar.catalog}
      catalogHref={CATALOGS[locale] ?? CATALOGS.az ?? '/catalogue/brabus-island-catalogue-az.pdf'}
      locales={LOCALES}
      activeLocale={locale}
      onLocaleChange={handleLocaleChange}
      privacyLabel={t.footer.privacy}
      privacyHref="/privacy-policy"
      termsLabel={t.footer.terms}
      termsHref="/terms"
      copyrightText={t.footer.copyright}
    />
  );
}