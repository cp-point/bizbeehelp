export type FaqData = {
    faqId: string;
    title: string;
    content: string;
    useYn: string;
    viewCount: number;
    metaTag: string | null;
    sortOrder: number | null;
    createdAt: string;
    updatedAt: string | null;
    deletedAt: string | null;
}

export type FaqSearchCondition = {
    startDate: string;
    endDate: string;
    metaTag: string;
    majorName: string;
    minorName: string;
    title: string;
}

export type FaqListSearchParam = FaqSearchCondition & {
    page: number;
    size: number;
}

export type FaqListData = {
    faqId: string;
    createdAt: string;
    updatedAt: string | null;
    majorCode?: string;
    minorCode?: string;
    majorName: string;
    minorName: string;
    title: string;
    content?: string;
    metaTag: string | null;
    sortOrder?: number;
    useYn: string;
    remark: string | null;
}

export type FaqDetailData = {
    faqId: string;
    createdAt: string;
    updatedAt: string | null;
    majorCode: string;
    majorName: string;
    minorCode: string;
    minorName: string;
    title: string;
    content: string;
    metaTag: string | null;
    sortOrder: number | null;
    useYn: string;
    remark: string | null;
}

export type FaqUseYnUpdateItem = {
    faqId: string;
    useYn: 'Y' | 'N';
    sortOrder?: number | null;
}

export type FaqUseYnUpdatePayload = FaqUseYnUpdateItem[];

export type FaqRow = {
    faqId: string;
    createdAt: string;
    metaTag: string;
    majorName: string;
    minorName: string;
    title: string;
    sortOrder?: number | null;
    useYn: string;
    remark: string;
}

export type PageData<T> = {
    content: T[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
}

export type FaqPageData = PageData<FaqListData>;

export type MajorCategoryData = {
    majorCode: string;
    majorName: string;
    sortOrder: number;
    useYn: string;
    remark: string | null;
    minorCategories: MinorCategoryData[];
}

export type MinorCategoryData = {
    minorCode: string;
    minorName: string;
    sortOrder: number;
    useYn: string;
    remark: string | null;
    faqs: FaqData[];
}

export type MajorListItem = {
    majorCode: string;
    majorName: string;
    sortOrder?: number | null;
    useYn: string;
    remark?: string | null;
    createdAt?: string | null;
    updatedAt?: string | null;
    deletedAt?: string | null;
}

export type MinorListItem = {
    majorCode?: string;
    majorName?: string;
    minorCode: string;
    minorName: string;
    sortOrder?: number | null;
    useYn: string;
    remark?: string | null;
    createdAt?: string | null;
    updatedAt?: string | null;
    deletedAt?: string | null;
}

export type MajorList = MajorListItem[];

export type MinorList = MinorListItem[];
