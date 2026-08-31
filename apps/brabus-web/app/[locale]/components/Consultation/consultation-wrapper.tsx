import { Consultation as ConsultationUI } from '@repo/ui';
import { getDictionary } from '@/lib/i18n';

export function Consultation({ locale }: { locale: string }) {
  const t = getDictionary(locale);

  return (
    <ConsultationUI
      imageSrc="/images/consultation.jpg"
      imageAlt={t.consultation.buttonText}
      buttonText={t.consultation.buttonText}
      href="#contacts"
    />
  );
}