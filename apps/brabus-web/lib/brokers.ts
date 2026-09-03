export const BROKERS_URLS: Record<string, string> = {
  az: 'https://treva.realestate/az/brokers',
  en: 'https://treva.realestate/en/brokers',
  ru: 'https://treva.realestate/ru/brokers',
};

export function getBrokersHref(locale: string): string {
  return (
    BROKERS_URLS[locale] ??
    BROKERS_URLS.az ??
    'https://treva.realestate/az/brokers'
  );
}