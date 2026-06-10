'use client';

import type { CSSProperties } from 'react';

import {
    PaginationButton,
    PaginationInfo,
    PaginationWrapper,
} from '../../styles/components/molecules/Pagination';

export type PaginationProps = {
    current: number;
    total: number;
    pageSize: number;
    siblingCount?: number;
    showInfo?: boolean;
    margin?: string;
    style?: CSSProperties;
    onChange: (page: number) => void;
};

const getPageNumbers = (current: number, totalPages: number, siblingCount: number) => {
    const start = Math.max(1, current - siblingCount);
    const end = Math.min(totalPages, current + siblingCount);

    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
};

const Pagination = ({
    current,
    total,
    pageSize,
    siblingCount = 2,
    showInfo = true,
    margin,
    style,
    onChange,
}: PaginationProps) => {
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const safeCurrent = Math.min(Math.max(current, 1), totalPages);
    const pageNumbers = getPageNumbers(safeCurrent, totalPages, siblingCount);

    const handleChange = (page: number) => {
        if (page < 1 || page > totalPages || page === safeCurrent) {
            return;
        }

        onChange(page);
    };

    return (
        <PaginationWrapper $margin={margin} style={style}>
            <PaginationButton type="button" disabled={safeCurrent === 1} aria-label="처음 페이지" onClick={() => handleChange(1)}>
                {'<<'}
            </PaginationButton>
            <PaginationButton
                type="button"
                disabled={safeCurrent === 1}
                aria-label="이전 페이지"
                onClick={() => handleChange(safeCurrent - 1)}
            >
                {'<'}
            </PaginationButton>
            {pageNumbers.map((page) => (
                <PaginationButton
                    key={page}
                    type="button"
                    $isActive={page === safeCurrent}
                    aria-current={page === safeCurrent ? 'page' : undefined}
                    onClick={() => handleChange(page)}
                >
                    {page}
                </PaginationButton>
            ))}
            <PaginationButton
                type="button"
                disabled={safeCurrent === totalPages}
                aria-label="다음 페이지"
                onClick={() => handleChange(safeCurrent + 1)}
            >
                {'>'}
            </PaginationButton>
            <PaginationButton
                type="button"
                disabled={safeCurrent === totalPages}
                aria-label="마지막 페이지"
                onClick={() => handleChange(totalPages)}
            >
                {'>>'}
            </PaginationButton>
            {showInfo ? (
                <PaginationInfo>
                    {safeCurrent} / {totalPages}
                </PaginationInfo>
            ) : null}
        </PaginationWrapper>
    );
};

export default Pagination;
