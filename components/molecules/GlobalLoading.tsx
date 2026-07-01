'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Loading from '../atom/Loading';
import * as S from '../../styles/components/molecules/GlobalLoading';

const LOADING_DELAY_MS = 120;

const isModifiedClick = (event: globalThis.MouseEvent) => {
    return event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0;
};

const findAnchor = (target: EventTarget | null) => {
    if (!(target instanceof Element)) {
        return null;
    }

    return target.closest('a');
};

const shouldShowLoading = (anchor: HTMLAnchorElement) => {
    const href = anchor.getAttribute('href');
    const target = anchor.getAttribute('target');

    if (!href || href.startsWith('#') || anchor.hasAttribute('download') || (target && target !== '_self')) {
        return false;
    }

    const nextUrl = new URL(href, window.location.href);
    const currentUrl = new URL(window.location.href);

    if (nextUrl.origin !== currentUrl.origin) {
        return false;
    }

    return nextUrl.pathname !== currentUrl.pathname || nextUrl.search !== currentUrl.search;
};

const GlobalLoading = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const timer = window.setTimeout(() => {
            setIsLoading(false);
        }, LOADING_DELAY_MS);

        return () => window.clearTimeout(timer);
    }, [pathname, searchParams]);

    useEffect(() => {
        const handleClick = (event: globalThis.MouseEvent) => {
            if (isModifiedClick(event)) {
                return;
            }

            const anchor = findAnchor(event.target);

            if (!anchor || !shouldShowLoading(anchor)) {
                return;
            }

            setIsLoading(true);
        };

        const handlePageHide = () => {
            setIsLoading(false);
        };

        document.addEventListener('click', handleClick);
        window.addEventListener('pagehide', handlePageHide);

        return () => {
            document.removeEventListener('click', handleClick);
            window.removeEventListener('pagehide', handlePageHide);
        };
    }, []);

    if (!isLoading) {
        return null;
    }

    return (
        <S.GlobalLoadingOverlay>
            <Loading label="불러오는 중입니다." size="38px" color="#1f8a5b" thickness="4px" />
        </S.GlobalLoadingOverlay>
    );
};

export default GlobalLoading;
