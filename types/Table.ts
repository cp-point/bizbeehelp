import type { CSSProperties, Key, MouseEvent, ReactNode } from 'react';

export type TableAlign = 'left' | 'center' | 'right';

export type TableVariant = 'default' | 'admin';

export type TableColumn<T extends object> = {
    key: string;
    title: ReactNode;
    dataIndex?: keyof T | string;
    width?: string;
    align?: TableAlign;
    render?: (value: unknown, record: T, index: number) => ReactNode;
}

export type TableProps<T extends object> = {
    columns: TableColumn<T>[];
    dataSource: T[];
    rowKey?: keyof T | ((record: T, index: number) => Key);
    emptyText?: ReactNode;
    width?: string;
    minWidth?: string;
    maxHeight?: string;
    margin?: string;
    style?: CSSProperties;
    variant?: TableVariant;
    stickyHeader?: boolean;
    selectedRowKey?: Key | null;
    selectedRowKeys?: Key[];
    emptyCellHeight?: string;
    checkboxColor?: string;
    checkboxBorder?: string;
    checkboxBorderRadius?: string;
    checkedList?: Array<keyof T | string>;
    onRowClick?: (record: T, index: number, event: MouseEvent<HTMLTableRowElement>) => void;
    onCheckedChange?: (record: T, field: keyof T | string, checked: boolean, index: number) => void;
}