import { PrivacyPolicy as PrivacyPolicyUI } from '@repo/ui';
import { getDictionary } from '@/lib/i18n';

export function PrivacyPolicy({ locale }: { locale: string }) {
  const t = getDictionary(locale);
  const p = t.privacyPolicy;

  return (
    <PrivacyPolicyUI
      title={p.title}
      intro={p.intro}
      sectionHeading={p.sectionHeading}
      sectionIntro={p.sectionIntro}
      purposeIntro={p.purposeIntro}
      bullets={p.bullets}
      closing={p.closing}
    />
  );
}