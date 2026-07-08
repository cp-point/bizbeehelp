import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Login from '../../../../components/pages/admin/login/Login';

const ADMIN_FAQ_LIST_PATH = '/admin/faqs';
const SESSION_COOKIE_NAME = 'JSESSIONID';

type PageProps = {
    searchParams?: Promise<{
        loginRequired?: string;
    }>;
};

const Page = async ({ searchParams }: PageProps) => {
    const cookieStore = await cookies();

    if (cookieStore.has(SESSION_COOKIE_NAME)) {
        redirect(ADMIN_FAQ_LIST_PATH);
    }

    const params = await searchParams;

    return <Login loginRequired={params?.loginRequired === 'true'} />;
};

export default Page;
