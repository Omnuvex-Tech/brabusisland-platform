'use client';

import { Footer as FooterUI } from '@repo/ui';
import { getDictionary } from '@/lib/i18n';
import { useRouter } from 'next/navigation';

const LOCALES = ['az', 'en', 'ru'];

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
        { label: t.navbar.navLinks.brokers, href: '#brokers' },
        { label: t.navbar.navLinks.units, href: '#units' },
        { label: t.navbar.navLinks.contacts, href: '#contacts' },
      ]}
      catalogLabel={t.navbar.catalog}
      catalogHref="/catalog.pdf"
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