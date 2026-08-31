import { Amenities as AmenitiesUI } from '@repo/ui';
import { getDictionary } from '@/lib/i18n';

const IMAGES = [
  '/images/amenities-1.png',
  '/images/amenities-2.png',
  '/images/amenities-3.png',
  '/images/amenities-4.png',
];

export function Amenities({ locale }: { locale: string }) {
  const t = getDictionary(locale);

  const items = t.amenities.items.map((item, index) => ({
    ...item,
    imageSrc: IMAGES[index] ?? '',
    imageAlt: item.title,
  }));

  return <AmenitiesUI items={items} />;
}