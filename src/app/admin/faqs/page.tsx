'use client';

import { useState } from 'react';
import useSWR from 'swr';
import Faqs from '../../../../components/pages/admin/faqs/Faqs';
import axiosInstance from '../../../../libs/axios';
import type { Request as ApiRequest } from '../../../../types/Common';
import { FaqListSearchParam, FaqPageData, FaqSearchCondition, MajorList, MinorList } from '../../../../types/Faq';

const fetcher = (payload: ApiRequest) => axiosInstance.post('/api/backend', payload).then((res) => res.data.result);
const PAGE_SIZE = 10;

const initialSearchCondition: FaqSearchCondition = {
    startDate: '',
    endDate: '',
    metaTag: '',
    majorName: '',
    minorName: '',
    title: '',
};

const Page = () => {
    const [searchCondition, setSearchCondition] = useState<FaqSearchCondition>(initialSearchCondition);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedMajorCode, setSelectedMajorCode] = useState('');
    const searchParam: FaqListSearchParam = {
        ...searchCondition,
        page: currentPage - 1,
        size: PAGE_SIZE,
    };
    const { data: faqData, mutate: mutateFaqData } = useSWR<FaqPageData>(
        {
            url: `/faq/list`,
            method: 'GET',
            param: searchParam,
        },
        fetcher,
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            fallbackData: {
                content: [],
                totalElements: 0,
                totalPages: 0,
                size: PAGE_SIZE,
                number: 0,
            },
        },
    );

    const { data: majorData } = useSWR<MajorList>(
        {
            url: `/major`,
            method: 'GET',
        },
        fetcher,
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            fallbackData: [],
        },
    );

    const { data: minorData } = useSWR<MinorList>(
        selectedMajorCode
            ? {
                url: `/minor`,
                method: 'GET',
                param: {
                    majorCode: selectedMajorCode,
                },
            }
            : null,
        fetcher,
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            fallbackData: [],
        },
    );

    const handleSearch = (condition: FaqSearchCondition) => {
        setCurrentPage(1);
        setSearchCondition(condition);
    };

    return (
        <Faqs
            faqData={faqData?.content}
            majorData={majorData}
            minorData={selectedMajorCode ? minorData : []}
            total={faqData?.totalElements ?? 0}
            currentPage={currentPage}
            pageSize={PAGE_SIZE}
            onSearch={handleSearch}
            onMajorCodeChange={setSelectedMajorCode}
            onPageChange={setCurrentPage}
            onRefresh={() => mutateFaqData()}
        />
    );
};

export default Page;
