export type FaqData = {
    faqId: number;
    title: string;
    content: string;
    useYn: string;
    viewCount: number;
    metaTag: string | null;
    createdAt: string;
    updatedAt: string | null;
    deletedAt: string | null;
}

export type FaqSearchCondition = {
    createdAtFrom: string;
    createdAtTo: string;
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
    faqId: number;
    createdAt: string;
    majorName: string;
    minorName: string;
    title: string;
    metaTag: string | null;
    useYn: string;
    remark: string | null;
}

export type FaqRow = {
    faqId: number;
    createdAt: string;
    metaTag: string;
    majorName: string;
    minorName: string;
    title: string;
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
