import { normalizer } from "@repo/shared/utils";

export const project = {
    url: normalizer.string(process.env.NEXT_PUBLIC_APP_URL),
    name: normalizer.string(process.env.NEXT_PUBLIC_APP_NAME),
    projectName: "BRABUS Island Baku",
    projectDescription: "BRABUS Island Baku — Sea Breeze-də eksklüziv rezidensiya və villalar",
    keywords: ["BRABUS Island Baku", "Brabus Baku", "Sea Breeze"],
    defLang: "az",
} as const;

export interface SeoContent {
    title: string;
    description: string;
    keywords: string[];
}

export const seo: Record<string, SeoContent> = {
    az: {
        title: 'BRABUS Island Baku | Sea Breeze-də Lüks Rezidensiya və Villalar',
        description:
            'BRABUS Island Baku mənzilləri və villaları Sea Breeze-də. Sabah Investment Group və BRABUS əməkdaşlığı ilə eksklüziv dənizkənarı yaşayış. Rəsmi satış: Treva Real Estate.',
        keywords: [
            'BRABUS Island Baku',
            'Brabus Baku',
            'lüks mənzillər Bakı',
            'Sea Breeze villalar',
            'Sabah Investment Group',
            'Treva Real Estate',
            'Sea Breeze Brabus',
            'satılıq mənzillər Bakı',
            'lüks rezidensiya',
            'Sea Breeze',
            'Brabus',
            'Brabus mənzil qiymətləri',
            'BRABUS Island Baku mənzil qiymətləri',
            'mənzil qiymətləri',
            'Sea Breeze mənzil qiymətləri',
            'Bakı',
            'Azərbaycan',
        ],
    },
    en: {
        title: 'BRABUS Island Baku | Luxury Residences & Villas in Sea Breeze',
        description:
            'Discover BRABUS Island Baku apartments and villas in Sea Breeze by Sabah Investment Group & BRABUS. Exclusive beachfront living. Official sales: Treva Real Estate.',
        keywords: [
            'BRABUS Island Baku',
            'Brabus Baku',
            'luxury apartments Baku',
            'Sea Breeze villas',
            'Sabah Investment Group',
            'Treva Real Estate',
            'Sea Breeze Brabus',
            'apartments for sale Baku',
            'luxury residence',
            'Sea Breeze',
            'Brabus',
            'Brabus apartment prices',
            'BRABUS Island Baku apartment prices',
            'apartment prices',
            'Sea Breeze apartment prices',
            'Baku',
            'Azerbaijan',
        ],
    },
    ru: {
        title: 'BRABUS Island Baku | Элитные резиденции и виллы в Sea Breeze',
        description:
            'Квартиры и виллы BRABUS Island Baku в Sea Breeze от Sabah Investment Group и BRABUS. Эксклюзивная жизнь на побережье. Официальные продажи: Treva Real Estate.',
        keywords: [
            'BRABUS Island Baku',
            'Brabus Baku',
            'элитные квартиры Баку',
            'Sea Breeze виллы',
            'Sabah Investment Group',
            'Treva Real Estate',
            'Sea Breeze Brabus',
            'купить квартиру в Баку',
            'элитная резиденция',
            'Sea Breeze',
            'Brabus',
            'цены на квартиры Brabus',
            'BRABUS Island Baku цены на квартиры',
            'цены на квартиры',
            'Sea Breeze цены на квартиры',
            'Баку',
            'Азербайджан',
        ],
    },
};

const FALLBACK_SEO: SeoContent = seo.az ?? {
    title: '',
    description: '',
    keywords: [],
};

export function getSeo(locale: string): SeoContent {
    return seo[locale] ?? FALLBACK_SEO;
}