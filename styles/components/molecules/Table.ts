import styled from 'styled-components';

type TableAlign = 'left' | 'center' | 'right';

type TableWrapperProps = {
    $width?: string;
    $margin?: string;
};

type TableElementProps = {
    $minWidth?: string;
};

type TableCellProps = {
    $width?: string;
    $align?: TableAlign;
};

export const TableWrapper = styled.div<TableWrapperProps>`
    width: ${(props) => props.$width};
    margin: ${(props) => props.$margin};
`;

export const TableContainer = styled.div`
    width: 100%;
    overflow-x: auto;
    border: 1px solid #d9dde3;
    border-radius: 6px;
    background-color: #ffffff;
`;

export const TableElement = styled.table<TableElementProps>`
    width: 100%;
    min-width: ${(props) => props.$minWidth};
    border-collapse: collapse;
    table-layout: fixed;
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
`;

export const TableRow = styled.tr`
    &:hover {
        background-color: #f9fafb;
    }
`;

export const TableCell = styled.td<TableCellProps>`
    padding: 9px 12px;
    border-bottom: 1px solid #edf0f4;
    color: #374151;
    font-size: 14px;
    line-height: 1.4;
    text-align: ${(props) => props.$align ?? 'center'};
    word-break: keep-all;
`;

export const TableEmptyCell = styled.td`
    padding: 32px 12px;
    color: #6b7280;
    font-size: 14px;
    line-height: 1.4;
    text-align: center;
`;
