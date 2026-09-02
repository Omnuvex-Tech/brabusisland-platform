import { Contact as ContactUI } from '@repo/ui';
import { getDictionary } from '@/lib/i18n';

// Sol tərəfdəki 3 sətrin icon-ları — sıra: email, ünvan, telefon
const INFO_ICONS = [
  '/images/contacticon-1.svg',
  '/images/contacticon-2.svg',
  '/images/contacticon-3.svg',
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
      countryFlagSrc="/images/az.svg"
      countryCode="+994"
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