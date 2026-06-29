import styled, { css } from 'styled-components';

type TableAlign = 'left' | 'center' | 'right';
type TableVariant = 'default' | 'admin';

type TableWrapperProps = {
    $width?: string;
    $margin?: string;
};

type TableContainerProps = {
    $variant?: TableVariant;
    $maxHeight?: string;
};

type TableElementProps = {
    $minWidth?: string;
    $variant?: TableVariant;
    $stickyHeader?: boolean;
};

type TableCellProps = {
    $width?: string;
    $align?: TableAlign;
    $variant?: TableVariant;
};

type TableRowProps = {
    $variant?: TableVariant;
    $isSelected?: boolean;
    $isClickable?: boolean;
};

type TableEmptyCellProps = {
    $variant?: TableVariant;
    $height?: string;
};

export const TableWrapper = styled.div<TableWrapperProps>`
    width: ${(props) => props.$width};
    margin: ${(props) => props.$margin};
    min-width: 0;
`;

export const TableContainer = styled.div<TableContainerProps>`
    width: 100%;
    max-width: 100%;
    overflow-x: auto;
    border: 1px solid #d9dde3;
    border-radius: 6px;
    background-color: #ffffff;

    ${(props) =>
        props.$variant === 'admin' &&
        css`
            overflow-y: auto;
            max-height: ${props.$maxHeight};
            border: 0;
            border-radius: 0;
            background: #f8f9fb;

            &::-webkit-scrollbar {
                height: 12px;
            }

            &::-webkit-scrollbar-thumb {
                border: 4px solid transparent;
                border-radius: 999px;
                background: #cdd3dd;
                background-clip: content-box;
            }
        `}
`;

export const TableElement = styled.table<TableElementProps>`
    width: 100%;
    min-width: ${(props) => props.$minWidth};
    border-collapse: collapse;
    table-layout: fixed;

    ${(props) =>
        props.$variant === 'admin' &&
        css`
            border-collapse: separate;
            border-spacing: 0;
            border-left: 1px solid #cdd3dd;

            ${props.$stickyHeader &&
            css`
                thead {
                    position: sticky;
                    top: 0;
                    z-index: 20;
                }
            `}
        `};

    @media (max-width: 768px) {
        min-width: ${(props) => props.$minWidth ?? '720px'};
    }
`;

export const TableHeaderCell = styled.th<TableCellProps>`
    width: ${(props) => props.$width};
    padding: 10px 12px;
    border-bottom: 1px solid #d9dde3;
    background-color: #f5f6f8;
    color: #1f2937;
    font-size: 14px;
    font-weight: 700;
    line-height: 1.4;
    text-align: ${(props) => props.$align ?? 'center'};

    ${(props) =>
        props.$variant === 'admin' &&
        css`
            position: sticky;
            top: 0;
            overflow: hidden;
            height: 30px;
            padding: 0 8px;
            border-top: 1px solid #cdd3dd;
            border-right: 1px solid #cdd3dd;
            border-bottom: 1px solid #cdd3dd;
            background: #f4f7f9;
            color: #0f1b2a;
            font-size: 13px;
            font-weight: 500;
            line-height: 1.4;
            white-space: nowrap;
            text-overflow: ellipsis;
            z-index: 20;
        `}
`;

export const TableRow = styled.tr<TableRowProps>`
    &:hover {
        background-color: #f9fafb;
    }

    ${(props) =>
        props.$variant === 'admin' &&
        css`
            cursor: ${props.$isClickable ? 'pointer' : 'default'};

            &:hover {
                background-color: transparent;
            }

            ${props.$isSelected &&
            css`
                td {
                    background: #d1fadf;
                }

                td:first-child {
                    background: #6ce9a6;
                }
            `}
        `}
`;

export const TableCell = styled.td<TableCellProps>`
    padding: 9px 12px;
    border-bottom: 1px solid #edf0f4;
    color: #374151;
    font-size: 14px;
    line-height: 1.4;
    text-align: ${(props) => props.$align ?? 'center'};
    word-break: keep-all;

    ${(props) =>
        props.$variant === 'admin' &&
        css`
            vertical-align: middle;
            overflow: hidden;
            height: 30px;
            padding: 0 8px;
            border-right: 1px solid #cdd3dd;
            border-bottom: 1px solid #cdd3dd;
            color: #0f1b2a;
            background: #ffffff;
            font-size: 13px;
            line-height: 1.4;
            white-space: nowrap;
            text-overflow: ellipsis;
            word-break: normal;
        `}
`;

export const TableEmptyCell = styled.td<TableEmptyCellProps>`
    padding: 32px 12px;
    color: #6b7280;
    font-size: 14px;
    line-height: 1.4;
    text-align: center;

    ${(props) =>
        props.$variant === 'admin' &&
        css`
            height: ${props.$height};
            padding: 0 !important;
            border-right: 1px solid #cdd3dd;
            border-bottom: 1px solid #cdd3dd;
            color: #8d99a8 !important;
            background: #ffffff;
            font-size: 15px !important;
            font-weight: 500;
        `}
`;
