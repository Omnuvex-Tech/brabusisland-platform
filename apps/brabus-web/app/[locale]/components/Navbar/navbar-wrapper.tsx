import { Navbar as NavbarUI } from '@repo/ui';
import { LanguageSwitcher } from "@/app/[locale]/components/LanguageSwitcher/language-switcher";
import { getDictionary } from '@/lib/i18n';

export function Navbar({ locale }: { locale: string }) {
  const t = getDictionary(locale);

  const navLinks = [
    { label: t.navbar.navLinks.about, href: '#about' },
    { label: t.navbar.navLinks.brokers, href: '#brokers' },
    { label: t.navbar.navLinks.units, href: '#units' },
    { label: t.navbar.navLinks.contacts, href: '#contacts' },
  ];

  return (
    <NavbarUI
      navLinks={navLinks}
      catalogLabel={t.navbar.catalog}
      catalogHref="/catalog.pdf"
      languageSwitcher={<LanguageSwitcher locale={locale} />}
    />
  );
}