import { Plans as PlansUI } from '@repo/ui';
import { getDictionary } from '@/lib/i18n';
import { getPriceListHref } from '@/lib/priceList';


const IMAGES: Record<string, string> = {
  'studio-a3': '/images/studio.jpeg',
  '1-yataq-a1': '/images/1bedroom.jpeg',
  '2-yataq-a': '/images/2bedroom.jpeg',
  '3-yataq-a': '/images/3bedroom.jpeg',
  'dupleks-a5': '/images/dublex-typea5.jpeg',
  'dupleks-a7': '/images/dublex-typea7.jpeg',
  'villa': '/images/villa.jpeg',
};


const ICONS: Record<string, number[]> = {
  'studio-a3': [4, 1, 3, 2],
  '1-yataq-a1': [4, 1, 3, 2],
  '2-yataq-a': [4, 1, 3, 2],
  '3-yataq-a': [4, 1, 3, 2],
  'dupleks-a5': [4, 1, 3, 2],
  'dupleks-a7': [4, 1, 3, 2],
  villa: [1, 3, 2],
};

export function Plans({ locale }: { locale: string }) {
  const t = getDictionary(locale);
  const units = t.plans.units.map((unit) => ({
    ...unit,
    imageSrc: IMAGES[unit.id] ?? '',
    meta: unit.meta.map((row, rowIndex) => ({
      ...row,
      icon: ICONS[unit.id]?.[rowIndex] ?? rowIndex + 1,
    })),
  }));

  return (
    <PlansUI
      title={t.plans.title}
      buttonLabel={t.plans.button}
      buttonHref={getPriceListHref(locale)} units={units}
      iconBasePath="/images/planicon-"
    />
  );
}