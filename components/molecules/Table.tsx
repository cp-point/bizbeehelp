import { useMemo } from 'react';
import type { Key } from 'react';

import Checkbox from '../atom/Checkbox';
import type { TableColumn, TableProps } from '../../types/Table';
import {
    TableCell,
    TableContainer,
    TableElement,
    TableEmptyCell,
    TableHeaderCell,
    TableRow,
    TableWrapper,
} from '../../styles/components/molecules/Table';


const getRecordKey = <T extends object>(
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

const getColumnField = <T extends object>(column: TableColumn<T>) => {
    return column.dataIndex ?? column.key;
};

const getColumnValue = <T extends object>(record: T, field: keyof T | string) => {
    return record[field as keyof T];
};

const isCheckedColumn = <T extends object>(column: TableColumn<T>, checkedList?: Array<keyof T | string>) => {
    if (!checkedList) {
        return false;
    }

    const field = getColumnField(column);

    return checkedList.some((checkedKey) => checkedKey === field || checkedKey === column.key);
};

const toKeyString = (key: Key) => String(key);

const Table = <T extends Record<string, unknown>>({
    columns,
    dataSource,
    rowKey,
    emptyText = '조회된 데이터가 없습니다.',
    width = '100%',
    minWidth = '720px',
    maxHeight,
    margin,
    style,
    variant = 'default',
    stickyHeader = false,
    selectedRowKey,
    selectedRowKeys,
    emptyCellHeight,
    checkboxColor,
    checkboxBorder,
    checkboxBorderRadius,
    checkedList,
    onRowClick,
    onCheckedChange,
}: TableProps<T>) => {
    const selectedRowKeySet = useMemo(() => new Set(selectedRowKeys?.map(toKeyString) ?? []), [selectedRowKeys]);
    const selectedRowKeyValue = selectedRowKey !== undefined && selectedRowKey !== null ? String(selectedRowKey) : null;

    return (
        <TableWrapper $width={width} $margin={margin} style={style}>
            <TableContainer $variant={variant} $maxHeight={maxHeight}>
                <TableElement $minWidth={minWidth} $variant={variant} $stickyHeader={stickyHeader}>
                    <thead>
                        <tr>
                            {columns.map((column) => (
                                <TableHeaderCell key={column.key} $width={column.width} $align={column.align} $variant={variant}>
                                    {column.title}
                                </TableHeaderCell>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {dataSource.length > 0 ? (
                            dataSource.map((record, rowIndex) => {
                                const recordKey = getRecordKey(record, rowIndex, rowKey);
                                const recordKeyValue = String(recordKey);
                                const isSelected = selectedRowKeySet.has(recordKeyValue) || selectedRowKeyValue === recordKeyValue;

                                return (
                                    <TableRow
                                        key={recordKey}
                                        $variant={variant}
                                        $isSelected={isSelected}
                                        $isClickable={Boolean(onRowClick)}
                                        data-selected={isSelected}
                                        onClick={(event) => onRowClick?.(record, rowIndex, event)}
                                    >
                                        {columns.map((column) => {
                                            const field = getColumnField(column);
                                            const value = getColumnValue(record, field);
                                            const isCheckbox = isCheckedColumn(column, checkedList);

                                            return (
                                                <TableCell key={column.key} $align={column.align} $variant={variant}>
                                                    {column.render ? column.render(value, record, rowIndex) : null}
                                                    {!column.render && isCheckbox ? (
                                                        <Checkbox
                                                            checked={getCheckedValue(value)}
                                                            readOnly={!onCheckedChange}
                                                            color={checkboxColor}
                                                            border={checkboxBorder}
                                                            borderRadius={checkboxBorderRadius}
                                                            onChange={(event) => onCheckedChange?.(record, field, event.target.checked, rowIndex)}
                                                        />
                                                    ) : null}
                                                    {!column.render && !isCheckbox ? String(value ?? '') : null}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })
                        ) : (
                            <tr>
                                <TableEmptyCell colSpan={columns.length} $variant={variant} $height={emptyCellHeight}>
                                    {emptyText}
                                </TableEmptyCell>
                            </tr>
                        )}
                    </tbody>
                </TableElement>
            </TableContainer>
        </TableWrapper>
    );
};

export default Table;
