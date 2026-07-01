import type { Metadata } from 'next';
import { Suspense } from 'react';
import localFont from 'next/font/local';
import GlobalLoading from '../../components/molecules/GlobalLoading';
import StyledComponentsRegistry from '../../components/StyledComponentsRegistry';
import './globals.css';

const pretendard = localFont({
    src: [
        {
            path: '../../public/assets/fonts/Pretendard-Thin.woff2',
            weight: '100',
            style: 'normal',
        },
        {
            path: '../../public/assets/fonts/Pretendard-ExtraLight.woff2',
            weight: '200',
            style: 'normal',
        },
        {
            path: '../../public/assets/fonts/Pretendard-Light.woff2',
            weight: '300',
            style: 'normal',
        },
        {
            path: '../../public/assets/fonts/Pretendard-Regular.woff2',
            weight: '400',
            style: 'normal',
        },
        {
            path: '../../public/assets/fonts/Pretendard-Medium.woff2',
            weight: '500',
            style: 'normal',
        },
        {
            path: '../../public/assets/fonts/Pretendard-SemiBold.woff2',
            weight: '600',
            style: 'normal',
        },
        {
            path: '../../public/assets/fonts/Pretendard-Bold.woff2',
            weight: '700',
            style: 'normal',
        },
        {
            path: '../../public/assets/fonts/Pretendard-ExtraBold.woff2',
            weight: '800',
            style: 'normal',
        },
        {
            path: '../../public/assets/fonts/Pretendard-Black.woff2',
            weight: '900',
            style: 'normal',
        },
    ],
    variable: '--font-pretendard',
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'BizHelp',
    description: 'BizHelp',
};

export default function RootLayout({ children }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko" className={pretendard.variable}>
        <body>
        <StyledComponentsRegistry>
            {children}
            <Suspense fallback={null}>
                <GlobalLoading />
            </Suspense>
        </StyledComponentsRegistry>
        </body>
        </html>
    );
}
