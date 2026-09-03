export const PRICE_LIST_URLS: Record<string, string> = {
  az: 'https://treva.realestate/az/off-plan?category=brabus-island-baku',
  en: 'https://treva.realestate/en/off-plan?category=brabus-island-baku',
  ru: 'https://treva.realestate/ru/off-plan?category=brabus-island-baku',
};

export function getPriceListHref(locale: string): string {
  return (
    PRICE_LIST_URLS[locale] ??
    PRICE_LIST_URLS.az ??
    'https://treva.realestate/az/off-plan?category=brabus-island-baku'
  );
}