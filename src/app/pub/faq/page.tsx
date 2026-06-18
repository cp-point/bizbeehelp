'use client';

import Faq from '../../../../components/pages/pub/faq/Faq';
import useSWR from 'swr';
import axiosInstance from '../../../../libs/axios';
import type { Request as ApiRequest } from '../../../../types/Common';
import type { MajorCategoryData } from '../../../../types/Faq';
import { useEffect } from 'react';

const fetcher = (payload: ApiRequest) => axiosInstance.post('/api/backend', payload).then((res) => res.data.result);
const Page = () => {


    const { data: faqData } = useSWR<MajorCategoryData[]>(
        {
            url: `/faq`,
            method: 'GET',
        },
        fetcher,
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            fallbackData: [],
        },
    );

    useEffect(() => {
        console.log(faqData);
    }, [faqData]);

    return <Faq faqData={faqData} />;
};

export default Page;
