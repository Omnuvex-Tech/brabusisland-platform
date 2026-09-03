'use client';

import { useRouter, usePathname } from 'next/navigation';
import { LanguageSwitcher as LanguageSwitcherUI } from '@repo/ui';
import { LOCALES } from '@/lib/i18n';

const LanguageSwitcher = ({
  locale,
  variant = 'dropdown',
}: {
  locale: string;
  variant?: 'dropdown' | 'inline';
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleLocaleChange = (newLocale: string) => {
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;
    const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/';
    router.push(`/${newLocale}${pathWithoutLocale}`);
  };

  return (
    <LanguageSwitcherUI
      locales={LOCALES}
      activeLocale={locale}
      onLocaleChange={handleLocaleChange}
      variant={variant}
    />
  );
};

export { LanguageSwitcher };