import { Hero as HeroUI } from '@repo/ui';
import { getDictionary } from '@/lib/i18n';
import { getPriceListHref } from '@/lib/priceList';

export function Hero({ locale }: { locale: string }) {
  const t = getDictionary(locale);

  return (
    <HeroUI
      title={t.hero.title}
      subtitle={t.hero.subtitle}
      buttonLabel={t.hero.button}
      buttonHref={getPriceListHref(locale)}
    />
  );
}