import { SITE_URL } from './site';
import { getDictionary, type Locale } from './i18n';
import { getBrokersHref } from './brokers';
import { getPriceListHref } from './priceList';

export function getHomeSchema(locale: Locale) {
  const t = getDictionary(locale);
  const path = locale === 'az' ? '' : `/${locale}`;
  const pageUrl = `${SITE_URL}${path}`;

  const organization = {
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: 'BRABUS Island Baku',
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/images/logo.svg`,
    },
  };

  const amenityFeature = t.amenities.items.map((item) => ({
    '@type': 'LocationFeatureSpecification',
    name: item.title,
    value: true,
  }));

  const containsPlace = t.plans.units.map((unit) => ({
    '@type': 'Accommodation',
    name: unit.tabLabel.replace('\n', ' '),
    floorSize: unit.meta.find((m) => /daxili|internal|внутренн/i.test(m.label))
      ? {
          '@type': 'QuantitativeValue',
          value: unit.meta.find((m) => /daxili|internal|внутренн/i.test(m.label))?.value,
        }
      : undefined,
  }));

  const property = {
    '@type': 'ApartmentComplex',
    '@id': `${SITE_URL}/#property`,
    name: t.hero.title,
    description: t.about.description,
    url: pageUrl,
    image: [`${SITE_URL}/images/heroimg.svg`],
    telephone: `+${t.contact.phoneHref}`,
    email: t.contact.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: t.contact.address,
      addressLocality: 'Baku',
      addressCountry: 'AZ',
    },
    geo: {
      // TODO: dəqiq koordinatlarla əvəz et (hazırda Bakı mərkəzi təxmini dəyər)
      '@type': 'GeoCoordinates',
      latitude: 40.3897,
      longitude: 49.8671,
    },
    amenityFeature,
    containsPlace,
    makesOffer: {
      '@type': 'Offer',
      url: getPriceListHref(locale),
      availability: 'https://schema.org/InStock',
      businessFunction: 'https://schema.org/Sell',
    },
    parentOrganization: { '@id': `${SITE_URL}/#organization` },
    isPartOf: { '@id': `${SITE_URL}/#website` },
  };

  const realEstateAgent = {
    '@type': 'RealEstateAgent',
    '@id': 'https://treva.realestate/#agent',
    name: 'Treva Real Estate',
    url: getBrokersHref(locale),
    areaServed: {
      '@type': 'City',
      name: 'Baku',
    },
  };

  const website = {
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: 'BRABUS Island Baku',
    inLanguage: locale,
    publisher: { '@id': `${SITE_URL}/#organization` },
  };

  const breadcrumb = {
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: t.hero.title,
        item: pageUrl,
      },
    ],
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [organization, property, realEstateAgent, website, breadcrumb],
  };
}