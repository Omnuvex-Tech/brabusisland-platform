import { Exterior as ExteriorUI } from '@repo/ui';
import { getDictionary } from '@/lib/i18n';

export function Exterior({ locale }: { locale: string }) {
    const t = getDictionary(locale);

    return (
        <ExteriorUI
            titleBold={t.exterior.titleBold}
            titleRegular={t.exterior.titleRegular}
            description={t.exterior.description}
            caption={t.exterior.caption}
            images={[
                { src: '/images/exterior-1.jpg', alt: t.exterior.titleBold },
                { src: '/images/exterior-2.png', alt: t.exterior.titleBold },
                { src: '/images/exterior-3.png', alt: t.exterior.titleBold },
                { src: '/images/exterior-4.jpg', alt: t.exterior.titleBold }, 
                { src: '/images/exterior-5.png', alt: t.exterior.titleBold },
            ]}
            arrowLeftSrc="/images/left.svg"
            arrowRightSrc="/images/right.svg"
        />
    );
}