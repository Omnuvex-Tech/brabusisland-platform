import { About as AboutUI } from '@repo/ui';
import { getDictionary } from '@/lib/i18n';

export function About({ locale }: { locale: string }) {
  const t = getDictionary(locale);

  return (
    <AboutUI
      title={t.about.title}
      description={t.about.description}
      imageSrc="/images/about.jpg"
      imageAlt={t.about.title}
    />
  );
}