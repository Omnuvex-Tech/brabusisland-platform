import { Terms as TermsUI } from '@repo/ui';
import { getDictionary } from '@/lib/i18n';

export function Terms({ locale }: { locale: string }) {
  const t = getDictionary(locale);

  return <TermsUI title={t.terms.title} sections={t.terms.sections} />;
}