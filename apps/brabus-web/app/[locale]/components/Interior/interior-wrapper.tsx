import { Interior as InteriorUI } from '@repo/ui';
import { getDictionary } from '@/lib/i18n';

export function Interior({ locale }: { locale: string }) {
    const t = getDictionary(locale);

    return (
        <InteriorUI
            titleBold={t.interior.titleBold}
            titleRegular={t.interior.titleRegular}
            description={t.interior.description}
            images={[
                { src: '/images/interior-1.jpg', alt: t.interior.titleBold },
                { src: '/images/interior-2.jpg', alt: t.interior.titleBold },
                { src: '/images/interior-3.jpg', alt: t.interior.titleBold },
                { src: '/images/interior-4.jpg', alt: t.interior.titleBold },
                { src: '/images/interior-5.jpg', alt: t.interior.titleBold },
                { src: '/images/interior-6.jpg', alt: t.interior.titleBold },
                { src: '/images/interior-7.jpg', alt: t.interior.titleBold },
            ]}
            arrowLeftSrc="/images/left.svg"
            arrowRightSrc="/images/right.svg"
        />
    );
}