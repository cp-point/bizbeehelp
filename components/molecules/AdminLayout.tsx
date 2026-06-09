'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import NavBar from './NavBar';
import { AdminContent, AdminLayoutWrapper } from '../../styles/components/molecules/AdminLayout';

type AdminLayoutProps = {
    children: ReactNode;
};

const AdminLayout = ({ children }: AdminLayoutProps) => {
    const pathname = usePathname();

    if (pathname === '/admin/login') {
        return <>{children}</>;
    }

    return (
        <AdminLayoutWrapper>
            <NavBar />
            <AdminContent>{children}</AdminContent>
        </AdminLayoutWrapper>
    );
};

export default AdminLayout;
