import { notFound } from 'next/navigation';
import { isValidLocale } from '@/lib/i18n';
import { PrivacyPolicy } from '../components/PrivacyPolicy/privacy-policy-wrapper';

export default async function PrivacyPolicyPage({
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
      <PrivacyPolicy locale={locale} />
    </>
  );
}