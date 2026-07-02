import { cache } from 'react';
import type { Metadata } from 'next';
import Faq from '../../../components/pages/faq/Faq';
import type { FaqData, MajorCategoryData } from '../../../types/Faq';
import type { FooterInfoData, FooterInfoResponse, RelatedSite, RelatedSiteResponse } from '../../../types/Footer';
import { getPlainTextFromHtml, sanitizeEditorHtml } from '../../../utils/html';

const DOMAIN = process.env.BACK_URL || process.env.NEXT_PUBLIC_BACK_URL || process.env.BASE_URL || 'https://help-api.bizbee.co.kr';
const SITE_MGMT_DOMAIN = 'https://service.aio.bizbee.co.kr';
const MGMT_CORP_CD = '10';

export const dynamic = 'force-dynamic';

type BackendFaqResponse = {
    result?: MajorCategoryData[];
};

const getBackendUrl = (url: string) => {
    if (!DOMAIN) {
        return '';
    }

    return `${DOMAIN}${url}`;
};

const isUseYn = (useYn: string) => useYn === 'Y';

const getFaqData = cache(async (): Promise<MajorCategoryData[]> => {
    const backendUrl = getBackendUrl('/faq');

    if (!backendUrl) {
        return [];
    }

    try {
        const response = await fetch(backendUrl, {
            method: 'GET',
            cache: 'no-store',
            headers: {
                Accept: 'application/json',
            },
        });

        if (!response.ok) {
            return [];
        }

        const data: BackendFaqResponse | MajorCategoryData[] = await response.json();

        return Array.isArray(data) ? data : data.result ?? [];
    } catch {
        return [];
    }
});

const postSiteMgmt = async <T,>(url: string): Promise<T | null> => {
    try {
        const response = await fetch(`${SITE_MGMT_DOMAIN}${url}`, {
            method: 'POST',
            cache: 'no-store',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                mgmtCorpCd: MGMT_CORP_CD,
            }),
        });

        if (!response.ok) {
            return null;
        }

        return await response.json() as T;
    } catch {
        return null;
    }
};

const getFooterInfo = cache(async (): Promise<FooterInfoData | null> => {
    const data = await postSiteMgmt<FooterInfoResponse>('/api/siteMgmt/footerInfo');

    return data?.data ?? null;
});

const getRelatedSites = cache(async (): Promise<RelatedSite[]> => {
    const data = await postSiteMgmt<RelatedSiteResponse>('/api/siteMgmt/siteUrl');

    return (data?.data ?? [])
        .filter((site) => site.useYn === '1' && site.siteNm?.trim() && site.siteUrl?.trim())
        .sort((a, b) => (a.seq ?? 0) - (b.seq ?? 0))
        .map((site) => ({
            label: site.siteNm?.trim() ?? '',
            href: site.siteUrl?.trim() ?? '',
        }));
});

const getVisibleFaqs = (faqData: MajorCategoryData[]) => {
    return faqData
        .filter((majorCategory) => isUseYn(majorCategory.useYn))
        .flatMap((majorCategory) =>
            (majorCategory.minorCategories ?? [])
                .filter((minorCategory) => isUseYn(minorCategory.useYn))
                .flatMap((minorCategory) =>
                    (minorCategory.faqs ?? [])
                        .filter((faq) => isUseYn(faq.useYn))
                        .map((faq) => ({
                            ...faq,
                            majorName: majorCategory.majorName,
                            minorName: minorCategory.minorName,
                        })),
                ),
        );
};

const addKeyword = (keywords: Set<string>, keyword?: string | null) => {
    const value = keyword?.trim();

    if (value) {
        keywords.add(value);
    }
};

const getKeywords = (faqData: MajorCategoryData[]) => {
    const keywords = new Set<string>();

    faqData
        .filter((majorCategory) => isUseYn(majorCategory.useYn))
        .forEach((majorCategory) => {
            addKeyword(keywords, majorCategory.majorName);

            (majorCategory.minorCategories ?? [])
                .filter((minorCategory) => isUseYn(minorCategory.useYn))
                .forEach((minorCategory) => {
                    addKeyword(keywords, minorCategory.minorName);

                    (minorCategory.faqs ?? [])
                        .filter((faq) => isUseYn(faq.useYn))
                        .forEach((faq) => {
                            addKeyword(keywords, faq.metaTag);
                        });
                });
        });

    return Array.from(keywords);
};

const createFaqJsonLd = (faqs: Array<FaqData & { majorName: string; minorName: string }>) => ({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.title,
        acceptedAnswer: {
            '@type': 'Answer',
            text: getPlainTextFromHtml(sanitizeEditorHtml(faq.content)),
        },
    })),
});

const stringifyJsonLd = (value: unknown) => JSON.stringify(value).replace(/</g, '\\u003c');

export async function generateMetadata(): Promise<Metadata> {
    const faqData = await getFaqData();
    const keywords = getKeywords(faqData);

    return {
        title: 'FAQ | BizHelp',
        description: '비즈비 도입, ERP 사용, 그룹웨어 관련 자주 묻는 질문을 확인할 수 있습니다.',
        keywords,
    };
}

const Page = async () => {
    const [faqData, footerInfo, relatedSites] = await Promise.all([
        getFaqData(),
        getFooterInfo(),
        getRelatedSites(),
    ]);
    const visibleFaqs = getVisibleFaqs(faqData);


    return (
        <>
            {visibleFaqs.length > 0 && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: stringifyJsonLd(createFaqJsonLd(visibleFaqs)),
                    }}
                />
            )}
            <Faq faqData={faqData} footerInfo={footerInfo} relatedSites={relatedSites} />
        </>
    );
};

export default Page;
