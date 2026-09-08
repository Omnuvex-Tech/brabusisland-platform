import { notFound } from 'next/navigation';
import { isValidLocale } from '@/lib/i18n';
import { Terms } from '../components/Terms/terms-wrapper';

export default async function TermsPage({
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
      <Terms locale={locale} />
    </>
  );
}