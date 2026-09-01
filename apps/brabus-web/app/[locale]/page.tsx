import { notFound } from 'next/navigation';
import { isValidLocale } from '@/lib/i18n';
import { Hero } from './components/Hero/hero-wrapper';
import { About } from './components/About/about-wrapper';
import { Exterior } from './components/Exterior/exterior-wrapper';
import { Cta } from './components/Cta/cta-wrapper';
import { Interior } from './components/Interior/interior-wrapper';
import { Amenities } from './components/Amenities/amenities-wrapper';
import { Consultation } from './components/Consultation/consultation-wrapper';
import { Plans } from './components/Plans/plans-wrapper';

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

  return (
    <>
      <Hero locale={locale} />
      <About locale={locale} />
      <Exterior locale={locale} />
      <Cta locale={locale} />
      <Interior locale={locale} />
      <Amenities locale={locale} />
      <Consultation locale={locale} />
      <Plans locale={locale}/>

    </>
  );
}