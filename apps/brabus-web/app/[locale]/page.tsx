import { notFound } from 'next/navigation';
import { isValidLocale, type Locale } from '@/lib/i18n';
import { getHomeSchema } from '@/lib/structured-data';
import { Hero } from './components/Hero/hero-wrapper';
import { About } from './components/About/about-wrapper';
import { Exterior } from './components/Exterior/exterior-wrapper';
import { Cta } from './components/Cta/cta-wrapper';
import { Interior } from './components/Interior/interior-wrapper';
import { Amenities } from './components/Amenities/amenities-wrapper';
import { Consultation } from './components/Consultation/consultation-wrapper';
import { Plans } from './components/Plans/plans-wrapper';
import { Contact } from './components/Contact/contact-wrapper';

export const dynamic = 'force-dynamic';

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

 const structuredData = getHomeSchema(locale as Locale);

  return (
    <>
     <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Hero locale={locale} />
      <About locale={locale} />
      <Exterior locale={locale} />
      <Cta locale={locale} />
      <Interior locale={locale} />
      <Amenities locale={locale} />
      <Consultation locale={locale} />
      <Plans locale={locale}/>
      <Contact locale={locale}/>

    </>
  );
}