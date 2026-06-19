'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import AdminHeader from './AdminHeader';
import NavBar from './NavBar';
import { AdminBody, AdminContent, AdminLayoutWrapper } from '../../styles/components/molecules/AdminLayout';

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
            <AdminHeader />
            <AdminBody>
                <NavBar />
                <AdminContent>{children}</AdminContent>
            </AdminBody>
        </AdminLayoutWrapper>
    );
};

export default AdminLayout;
