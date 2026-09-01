import { Plans as PlansUI } from '@repo/ui';
import { getDictionary } from '@/lib/i18n';

const IMAGES: Record<string, string> = {
  'studio-a3': '/images/plans-1.png',
  '1-yataq-a1': '/images/plans-2.png',
  '2-yataq-a': '/images/plans-3.png',
  '3-yataq-a': '/images/plans-4.png',
  'dupleks-a5': '/images/plans-5.png',
  'dupleks-a7': '/images/plans-6.png',
  villa: '/images/plans-7.png',
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
      buttonHref="#units"
      units={units}
      iconBasePath="/images/planicon-"
    />
  );
}