import React from 'react';
import AdminLayout from '../../../components/molecules/AdminLayout';

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return <AdminLayout>{children}</AdminLayout>;
};

export default Layout;
