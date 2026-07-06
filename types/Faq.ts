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

export type PopularKeywordData = {
    popularId?: number;
    keyword: string;
    searchCount?: number;
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
    majorId?: number;
    majorCode: string;
    majorName: string;
    sortOrder: number;
    useYn: string;
    remark: string | null;
    minorCategories: MinorCategoryData[];
}

export type MinorCategoryData = {
    minorId?: number;
    minorCode: string;
    minorName: string;
    sortOrder: number;
    useYn: string;
    remark: string | null;
    faqs: FaqData[];
}

export type MajorListItem = {
    majorId?: number;
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
    majorId?: number;
    majorCode?: string;
    majorName?: string;
    minorId?: number;
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
export type FaqsProps = {
    faqData?: FaqListData[];
    majorData?: MajorList;
    minorData?: MinorList;
    total: number;
    currentPage: number;
    pageSize: number;
    onSearch: (condition: FaqSearchCondition) => void;
    onMajorCodeChange: (majorCode: string) => void;
    onPageChange: (page: number) => void;
    onRefresh: () => void;
}

export type FaqRegisterFormState = {
    faqId: string;
    createdAt: string;
    updatedAt: string;
    majorCode: string;
    majorName: string;
    minorCode: string;
    minorName: string;
    title: string;
    content: string;
    metaTag: string;
    sortOrder: string;
    useYn: 'Y' | 'N';
    remark: string;
}

export type FaqRegisterEditableField = 'metaTag' | 'title' | 'content' | 'sortOrder' | 'useYn' | 'remark';

export type PendingImage = {
    temporarySrc: string;
    originFileName: string;
    fileData: string;
    fileSize: number;
    mimeType: string;
}

export type CategoryTab = 'major' | 'minor';

export type CategoryRow = {
    id: string;
    majorId?: number;
    minorId?: number;
    code: string;
    name: string;
    sortOrder: number;
    useYn: boolean;
    remark: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
    majorCode?: string;
    majorName?: string;
}

export type CategoryEditableField = 'code' | 'name' | 'sortOrder' | 'remark';

export type CategoryEditingCell = {
    rowId: string;
    field: CategoryEditableField;
} | null;

export type CategoryActiveCell = {
    rowId: string;
    column: string;
} | null;

export type CategoryRowsByTab = Record<CategoryTab, CategoryRow[]>;

export type EditedRowsByTab = Record<CategoryTab, Record<string, Partial<CategoryRow>>>;

export type DeletedIdsByTab = Record<CategoryTab, string[]>;

export type CategorySavePayload = {
    majorId?: number;
    minorId?: number;
    majorCode?: string;
    majorName?: string;
    minorCode?: string;
    minorName?: string;
    sortOrder: number;
    useYn: 'Y' | 'N';
    remark: string;
}

export type CategoryDeletePayload = {
    majorId?: number;
    minorId?: number;
    majorCode?: string;
    minorCode?: string;
}

export type CategoryRequestPayload = CategorySavePayload | CategoryDeletePayload;

export type CategorySearchCondition = {
    majorCode: string;
    minorCode: string;
    useYn: string;
    remark: string;
}

export type FaqCategoriesProps = {
    majorData?: MajorList;
    minorData?: MinorList;
    onRefresh?: () => Promise<void>;
}
