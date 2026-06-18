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
