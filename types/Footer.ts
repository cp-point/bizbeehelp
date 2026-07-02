export type FooterInfoData = {
    bizRegNo?: string | null;
    corpAddr?: string | null;
    ceoNm?: string | null;
    phoneNo?: string | null;
    helpdeskPhoneNo?: string | null;
    email?: string | null;
    iprInfo?: string | null;
};

export type FooterInfoResponse = {
    result?: string;
    data?: FooterInfoData | null;
};

export type RelatedSiteData = {
    siteNm?: string | null;
    siteUrl?: string | null;
    useYn?: string | null;
    seq?: number | null;
};

export type RelatedSite = {
    label: string;
    href: string;
};

export type RelatedSiteResponse = {
    result?: string;
    data?: RelatedSiteData[] | null;
};
