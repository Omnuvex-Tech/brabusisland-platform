import { Cta as CtaUI } from '@repo/ui';
import { getDictionary } from '@/lib/i18n';

export function Cta({ locale }: { locale: string }) {
  const t = getDictionary(locale);

  return (
    <CtaUI
      imageSrc="/images/cta.jpg"
      imageAlt={t.cta.buttonText}
      buttonText={t.cta.buttonText}
      href="#contacts"
    />
  );
}