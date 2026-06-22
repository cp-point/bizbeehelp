'use client';

import useSWR from 'swr';
import FaqCategories from '../../../../../components/pages/admin/faqs/categories/FaqCategories';
import axiosInstance from '../../../../../libs/axios';
import type { Request as ApiRequest } from '../../../../../types/Common';
import type { MajorList, MinorList } from '../../../../../types/Faq';

const fetcher = (payload: ApiRequest) => axiosInstance.post('/api/backend', payload).then((res) => res.data.result);

const Page = () => {
    const { data: majorData, mutate: mutateMajorData } = useSWR<MajorList>(
        {
            url: '/major',
            method: 'GET',
        },
        fetcher,
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            fallbackData: [],
        },
    );

    const { data: minorData, mutate: mutateMinorData } = useSWR<MinorList>(
        {
            url: '/minor',
            method: 'GET',
        },
        fetcher,
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            fallbackData: [],
        },
    );

    const handleRefresh = async () => {
        await Promise.all([mutateMajorData(), mutateMinorData()]);
    };

    return <FaqCategories majorData={majorData} minorData={minorData} onRefresh={handleRefresh} />;
};

export default Page;
