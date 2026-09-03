import { Contact as ContactUI, type CountryCode } from '@repo/ui';
import { getDictionary } from '@/lib/i18n';

const INFO_ICONS = [
  '/images/contacticon-1.svg',
  '/images/contacticon-2.svg',
  '/images/contacticon-3.svg',
];

const COUNTRY_CODES: CountryCode[] = [
  { iso: 'AZE', label: 'Azerbaijan', dialCode: '+994' },
  { iso: 'CHN', label: 'China', dialCode: '+86' },
  { iso: 'DEU', label: 'Germany', dialCode: '+49' },
  { iso: 'ENG', label: 'United Kingdom', dialCode: '+44' },
  { iso: 'ESP', label: 'Spain', dialCode: '+34' },
  { iso: 'FRA', label: 'France', dialCode: '+33' },
  { iso: 'GEO', label: 'Georgia', dialCode: '+995' },
  { iso: 'IRN', label: 'Iran', dialCode: '+98' },
  { iso: 'ISR', label: 'Israel', dialCode: '+972' },
  { iso: 'ITA', label: 'Italy', dialCode: '+39' },
  { iso: 'KAZ', label: 'Kazakhstan', dialCode: '+7' },
  { iso: 'NLD', label: 'Netherlands', dialCode: '+31' },
  { iso: 'QAT', label: 'Qatar', dialCode: '+974' },
  { iso: 'RUS', label: 'Russia', dialCode: '+7' },
  { iso: 'SAU', label: 'Saudi Arabia', dialCode: '+966' },
  { iso: 'TUR', label: 'Turkey', dialCode: '+90' },
  { iso: 'UAE', label: 'United Arab Emirates', dialCode: '+971' },
  { iso: 'UKR', label: 'Ukraine', dialCode: '+380' },
  { iso: 'USA', label: 'United States', dialCode: '+1' },
  { iso: 'UZB', label: 'Uzbekistan', dialCode: '+998' },
];

export function Contact({ locale }: { locale: string }) {
  const t = getDictionary(locale);
  const c = t.contact;

  const infoItems = [
    { icon: INFO_ICONS[0] ?? '', value: c.email, href: `mailto:${c.email}` },
    { icon: INFO_ICONS[1] ?? '', value: c.address },
    { icon: INFO_ICONS[2] ?? '', value: c.phone, href: `tel:${c.phoneHref}` },
  ];

  return (
    <ContactUI
      heading={c.heading}
      infoItems={infoItems}
      formTitle={c.form.title}
      namePlaceholder={c.form.name}
      surnamePlaceholder={c.form.surname}
      messagePlaceholder={c.form.message}
      numberPlaceholder={c.form.number}
      countryCodes={COUNTRY_CODES}
      defaultCountryIso="AZE"
      arrowSrc="/images/numberarrow.svg"
      sendLabel={c.form.send}
      consentText={c.form.consent}
      mapImageSrc="/images/map.png"
      mapImageAlt={c.mapAlt}
      mapButtonLabel={c.mapButton}
      mapButtonHref="https://maps.google.com"
    />
  );
}