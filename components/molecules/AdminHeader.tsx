'use client';

import Image from 'next/image';
import Link from 'next/link';
import { MouseEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Post } from '../../service/crud';
import { userStore } from '../../store/userStore';
import {
    AdminHeaderActions,
    AdminHeaderButton,
    AdminHeaderLogo,
    AdminHeaderWrapper,
} from '../../styles/components/molecules/AdminHeader';

const AdminHeader = () => {
    const router = useRouter();

    const handleClickLogout = (event: MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();

        Post(
            '/admin/logout',
            {},
            (response) => {
                if (response.type === 'SUCCESS') {
                    userStore.getState().reset();
                    router.push('/admin/login');
                    return;
                }

                alert(response.message || '로그아웃에 실패했습니다.');
            },
            false,
        );
    };

    return (
        <AdminHeaderWrapper>
            <AdminHeaderLogo href="/admin/faqs" aria-label="bizbee Help 관리자">
                <Image src="/assets/images/header-logo.svg" alt="bizbee Help" width={146} height={32} priority />
            </AdminHeaderLogo>
            <AdminHeaderActions>
                <AdminHeaderButton as={Link} href="/admin/faqs" $variant="line">
                    비즈비헬프
                </AdminHeaderButton>
                <AdminHeaderButton as={Link} href="/admin/login" $variant="sub" onClick={handleClickLogout}>
                    로그아웃
                </AdminHeaderButton>
            </AdminHeaderActions>
        </AdminHeaderWrapper>
    );
};

export default AdminHeader;
