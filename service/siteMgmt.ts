import type { FooterInfoData, FooterInfoResponse, RelatedSite, RelatedSiteResponse } from '../types/Footer';

const SITE_MGMT_DOMAIN = 'https://service.aio.bizbee.co.kr';
const MGMT_CORP_CD = '10';

const SITE_MGMT_HEADERS = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
};

const createSiteMgmtPayload = () => ({
    mgmtCorpCd: MGMT_CORP_CD,
});

const isSafeExternalUrl = (value?: string | null) => {
    if (!value) {
        return false;
    }

    try {
        const url = new URL(value);

        return url.protocol === 'https:' || url.protocol === 'http:';
    } catch {
        return false;
    }
};

const postSiteMgmt = async <T>(url: string): Promise<T | null> => {
    try {
        const response = await fetch(`${SITE_MGMT_DOMAIN}${url}`, {
            method: 'POST',
            cache: 'no-store',
            headers: SITE_MGMT_HEADERS,
            body: JSON.stringify(createSiteMgmtPayload()),
        });

        if (!response.ok) {
            return null;
        }

        return await response.json() as T;
    } catch {
        return null;
    }
};

export const getFooterInfo = async (): Promise<FooterInfoData | null> => {
    const data = await postSiteMgmt<FooterInfoResponse>('/api/siteMgmt/footerInfo');

    return data?.data ?? null;
};

export const getRelatedSites = async (): Promise<RelatedSite[]> => {
    const data = await postSiteMgmt<RelatedSiteResponse>('/api/siteMgmt/siteUrl');

    return (data?.data ?? [])
        .filter((site) => site.useYn === '1' && site.siteNm?.trim() && isSafeExternalUrl(site.siteUrl))
        .sort((a, b) => (a.seq ?? 0) - (b.seq ?? 0))
        .map((site) => ({
            label: site.siteNm?.trim() ?? '',
            href: site.siteUrl?.trim() ?? '',
        }));
};
