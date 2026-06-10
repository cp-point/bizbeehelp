import type { CSSProperties, Key, ReactNode } from 'react';

import Checkbox from '../atom/Checkbox';
import {
    TableCell,
    TableContainer,
    TableElement,
    TableEmptyCell,
    TableHeaderCell,
    TableRow,
    TableWrapper,
} from '../../styles/components/molecules/Table';

export type TableAlign = 'left' | 'center' | 'right';

export type TableColumn<T extends Record<string, unknown>> = {
    key: string;
    title: ReactNode;
    dataIndex?: keyof T | string;
    width?: string;
    align?: TableAlign;
    render?: (value: unknown, record: T, index: number) => ReactNode;
};

export type TableProps<T extends Record<string, unknown>> = {
    columns: TableColumn<T>[];
    dataSource: T[];
    rowKey?: keyof T | ((record: T, index: number) => Key);
    emptyText?: ReactNode;
    width?: string;
    minWidth?: string;
    margin?: string;
    style?: CSSProperties;
    checkedList?: Array<keyof T | string>;
    onCheckedChange?: (record: T, field: keyof T | string, checked: boolean, index: number) => void;
};

const getRecordKey = <T extends Record<string, unknown>>(
    record: T,
    index: number,
    rowKey?: keyof T | ((record: T, index: number) => Key),
) => {
    if (typeof rowKey === 'function') {
        return rowKey(record, index);
    }

    if (rowKey) {
        return String(record[rowKey] ?? index);
    }

    if ('id' in record) {
        return String(record.id ?? index);
    }

    return index;
};

const getCheckedValue = (value: unknown) => {
    return value === true || value === 'Y' || value === 'true' || value === 1;
};

const getColumnField = <T extends Record<string, unknown>>(column: TableColumn<T>) => {
    return column.dataIndex ?? column.key;
};

const getColumnValue = <T extends Record<string, unknown>>(record: T, field: keyof T | string) => {
    return record[field as keyof T];
};

const isCheckedColumn = <T extends Record<string, unknown>>(column: TableColumn<T>, checkedList?: Array<keyof T | string>) => {
    if (!checkedList) {
        return false;
    }

    const field = getColumnField(column);

    return checkedList.some((checkedKey) => checkedKey === field || checkedKey === column.key);
};

const Table = <T extends Record<string, unknown>>({
    columns,
    dataSource,
    rowKey,
    emptyText = '조회된 데이터가 없습니다.',
    width = '100%',
    minWidth = '720px',
    margin,
    style,
    checkedList,
    onCheckedChange,
}: TableProps<T>) => {
    return (
        <TableWrapper $width={width} $margin={margin} style={style}>
            <TableContainer>
                <TableElement $minWidth={minWidth}>
                    <thead>
                        <tr>
                            {columns.map((column) => (
                                <TableHeaderCell key={column.key} $width={column.width} $align={column.align}>
                                    {column.title}
                                </TableHeaderCell>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {dataSource.length > 0 ? (
                            dataSource.map((record, rowIndex) => (
                                <TableRow key={getRecordKey(record, rowIndex, rowKey)}>
                                    {columns.map((column) => {
                                        const field = getColumnField(column);
                                        const value = getColumnValue(record, field);
                                        const isCheckbox = isCheckedColumn(column, checkedList);

                                        return (
                                            <TableCell key={column.key} $align={column.align}>
                                                {column.render ? column.render(value, record, rowIndex) : null}
                                                {!column.render && isCheckbox ? (
                                                    <Checkbox
                                                        checked={getCheckedValue(value)}
                                                        readOnly={!onCheckedChange}
                                                        onChange={(event) => onCheckedChange?.(record, field, event.target.checked, rowIndex)}
                                                    />
                                                ) : null}
                                                {!column.render && !isCheckbox ? String(value ?? '') : null}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            ))
                        ) : (
                            <tr>
                                <TableEmptyCell colSpan={columns.length}>{emptyText}</TableEmptyCell>
                            </tr>
                        )}
                    </tbody>
                </TableElement>
            </TableContainer>
        </TableWrapper>
    );
};

export default Table;
