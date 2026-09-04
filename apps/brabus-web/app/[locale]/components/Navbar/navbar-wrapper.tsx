import { Navbar as NavbarUI } from '@repo/ui';
import { LanguageSwitcher } from '@/app/[locale]/components/LanguageSwitcher/language-switcher';
import { getDictionary } from '@/lib/i18n';
import { getPriceListHref } from '@/lib/priceList';
import { getBrokersHref } from '@/lib/brokers';

const CATALOGS: Record<string, string> = {
  az: '/catalogue/brabus-island-catalogue-az.pdf',
  en: '/catalogue/brabus-island-catalogue-en.pdf',
  ru: '/catalogue/brabus-island-catalogue-ru.pdf',
};

export function Navbar({ locale }: { locale: string }) {
  const t = getDictionary(locale);

  const navLinks = [
    { label: t.navbar.navLinks.about, href: '#about' },
    { label: t.navbar.navLinks.brokers, href: getBrokersHref(locale), target: '_blank' },
    { label: t.navbar.navLinks.units, href: getPriceListHref(locale), target: '_blank' },
    { label: t.navbar.navLinks.contacts, href: '#contact' },
  ];

  return (
    <NavbarUI
      navLinks={navLinks}
      catalogLabel={t.navbar.catalog}
      catalogHref={CATALOGS[locale] ?? CATALOGS.az ?? '/catalogs/brabus-catalog-az.pdf'}
      languageSwitcher={<LanguageSwitcher locale={locale} />}
      mobileLanguageSwitcher={<LanguageSwitcher locale={locale} variant="inline" />}
    />
  );
}