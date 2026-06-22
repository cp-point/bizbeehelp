'use client';

import { useEffect, useMemo, useState } from 'react';

import Button from '../../../../atom/Button';
import Checkbox from '../../../../atom/Checkbox';
import Input from '../../../../atom/Input';
import { ResponseType } from '../../../../../enum/Common';
import { Post } from '../../../../../service/crud';
import type { MajorList, MinorList } from '../../../../../types/Faq';
import {
    FaqCategoriesButtonGroup,
    FaqCategoriesCellInputBox,
    FaqCategoriesContent,
    FaqCategoriesDataTable,
    FaqCategoriesEmptyCell,
    FaqCategoriesField,
    FaqCategoriesHeader,
    FaqCategoriesPage,
    FaqCategoriesSearchControl,
    FaqCategoriesSearchGrid,
    FaqCategoriesSearchLabel,
    FaqCategoriesSection,
    FaqCategoriesSectionHeader,
    FaqCategoriesSelect,
    FaqCategoriesTabList,
    FaqCategoriesTableScroll,
    FaqCategoriesTitle,
    FaqCategoriesToast,
} from '../../../../../styles/pages/admin/faqs/categories/FaqCategories';

type CategoryTab = 'major' | 'minor';

type CategoryRow = {
    id: string;
    code: string;
    name: string;
    sortOrder: number;
    useYn: boolean;
    remark: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
    majorCode?: string;
    majorName?: string;
};

type EditableField = 'code' | 'name' | 'sortOrder' | 'remark';
type EditingCell = {
    rowId: string;
    field: EditableField;
} | null;
type ActiveCell = {
    rowId: string;
    column: string;
} | null;
type CategoryRowsByTab = Record<CategoryTab, CategoryRow[]>;
type EditedRowsByTab = Record<CategoryTab, Record<string, Partial<CategoryRow>>>;
type DeletedIdsByTab = Record<CategoryTab, string[]>;
type CategorySavePayload = {
    majorCode?: string;
    majorName?: string;
    minorCode?: string;
    minorName?: string;
    sortOrder: number;
    useYn: 'Y' | 'N';
    remark: string;
};
type CategoryDeletePayload = {
    majorCode?: string;
    minorCode?: string;
};
type CategoryRequestPayload = CategorySavePayload | CategoryDeletePayload;

type FaqCategoriesProps = {
    majorData?: MajorList;
    minorData?: MinorList;
    onRefresh?: () => Promise<void>;
};

const colors = {
    primaryWhite: '#ffffff',
    coolGray200: '#cdd3dd',
    coolGray800: '#0f1b2a',
    greenPrimary: '#16b364',
    red500: '#f04438',
};

const createEmptyRowsByTab = (): CategoryRowsByTab => ({
    major: [],
    minor: [],
});

const createEmptyEditedRowsByTab = (): EditedRowsByTab => ({
    major: {},
    minor: {},
});

const createEmptyDeletedIdsByTab = (): DeletedIdsByTab => ({
    major: [],
    minor: [],
});

const formatDateTime = (value?: string | null) => {
    if (!value) {
        return '';
    }

    const normalizedValue = value.replace('T', ' ');

    return normalizedValue.length >= 19 ? normalizedValue.slice(0, 19) : normalizedValue;
};

const mapMajorRows = (majorData: MajorList = []): CategoryRow[] => {
    return majorData.map((major, index) => ({
        id: major.majorCode,
        code: major.majorCode,
        name: major.majorName,
        sortOrder: major.sortOrder ?? (index + 1) * 10,
        useYn: major.useYn !== 'N',
        remark: major.remark ?? '',
        createdAt: formatDateTime(major.createdAt),
        updatedAt: formatDateTime(major.updatedAt),
        deletedAt: formatDateTime(major.deletedAt),
    }));
};

const mapMinorRows = (minorData: MinorList = []): CategoryRow[] => {
    return minorData.map((minor, index) => ({
        id: minor.minorCode,
        code: minor.minorCode,
        name: minor.minorName,
        sortOrder: minor.sortOrder ?? (index + 1) * 10,
        useYn: minor.useYn !== 'N',
        remark: minor.remark ?? '',
        createdAt: formatDateTime(minor.createdAt),
        updatedAt: formatDateTime(minor.updatedAt),
        deletedAt: formatDateTime(minor.deletedAt),
        majorCode: minor.majorCode,
        majorName: minor.majorName,
    }));
};

const getTabLabel = (tab: CategoryTab) => {
    return tab === 'major' ? '대분류' : '소분류';
};

const getCodeLabel = (tab: CategoryTab) => {
    return tab === 'major' ? '대분류 코드' : '소분류 코드';
};

const getNameLabel = (tab: CategoryTab) => {
    return tab === 'major' ? '대분류명' : '소분류명';
};

const createEmptyRow = (rows: CategoryRow[]): CategoryRow => {
    const nextOrder = rows.length > 0 ? Math.max(...rows.map((row) => row.sortOrder)) + 10 : 10;

    return {
        id: `new-${Date.now()}`,
        code: '',
        name: '',
        sortOrder: nextOrder,
        useYn: true,
        remark: '',
        createdAt: '-',
        updatedAt: '',
        deletedAt: '',
    };
};

const toUseYn = (useYn: boolean): 'Y' | 'N' => (useYn ? 'Y' : 'N');

const toMajorPayload = (row: CategoryRow): CategorySavePayload => ({
    majorCode: row.code,
    majorName: row.name,
    sortOrder: row.sortOrder,
    useYn: toUseYn(row.useYn),
    remark: row.remark,
});

const toMinorPayload = (row: CategoryRow): CategorySavePayload => ({
    minorCode: row.code,
    majorCode: row.majorCode,
    minorName: row.name,
    sortOrder: row.sortOrder,
    useYn: toUseYn(row.useYn),
    remark: row.remark,
});

const postRows = (url: string, rows: CategoryRequestPayload[]) => {
    return new Promise<boolean>((resolve) => {
        if (rows.length === 0) {
            resolve(true);
            return;
        }

        Post(
            url,
            rows,
            (response) => {
                if (response.type === ResponseType.SUCCESS) {
                    resolve(true);
                    return;
                }

                alert(response.message || '저장 요청에 실패했습니다.');
                resolve(false);
            },
            false,
        );
    });
};

const FaqCategories = ({ majorData = [], minorData = [], onRefresh }: FaqCategoriesProps) => {
    const [activeTab, setActiveTab] = useState<CategoryTab>('major');
    const [addedRowsByTab, setAddedRowsByTab] = useState<CategoryRowsByTab>(createEmptyRowsByTab);
    const [editedRowsByTab, setEditedRowsByTab] = useState<EditedRowsByTab>(createEmptyEditedRowsByTab);
    const [deletedIdsByTab, setDeletedIdsByTab] = useState<DeletedIdsByTab>(createEmptyDeletedIdsByTab);
    const [selectedRowId, setSelectedRowId] = useState('');
    const [activeCell, setActiveCell] = useState<ActiveCell>(null);
    const [editingCell, setEditingCell] = useState<EditingCell>(null);
    const [toastMessage, setToastMessage] = useState('');
    const [hasChanges, setHasChanges] = useState(false);
    const baseRowsByTab = useMemo<CategoryRowsByTab>(
        () => ({
            major: mapMajorRows(majorData),
            minor: mapMinorRows(minorData),
        }),
        [majorData, minorData],
    );
    const rows = useMemo(() => {
        const deletedIds = new Set(deletedIdsByTab[activeTab]);
        const editedRows = editedRowsByTab[activeTab];
        const baseRows = baseRowsByTab[activeTab]
            .filter((row) => !deletedIds.has(row.id))
            .map((row) => ({
                ...row,
                ...editedRows[row.id],
            }));

        return [...baseRows, ...addedRowsByTab[activeTab]];
    }, [activeTab, addedRowsByTab, baseRowsByTab, deletedIdsByTab, editedRowsByTab]);
    const tabLabel = getTabLabel(activeTab);
    const effectiveSelectedRowId = selectedRowId || rows[0]?.id || '';

    useEffect(() => {
        if (!toastMessage) {
            return;
        }

        const timer = window.setTimeout(() => setToastMessage(''), 3000);

        return () => window.clearTimeout(timer);
    }, [toastMessage]);

    const buttonProps = {
        height: '32px',
        padding: '8px 12px',
        fontSize: '13px',
        borderRadius: '4px',
        shadow: 'none',
        backgroundColor: colors.primaryWhite,
        color: colors.coolGray800,
        border: `1px solid ${colors.coolGray200}`,
    };

    const deleteButtonProps = {
        ...buttonProps,
        color: colors.red500,
        border: `1px solid ${colors.red500}`,
    };

    const updateRow = <K extends keyof CategoryRow>(rowId: string, field: K, value: CategoryRow[K]) => {
        const addedRow = addedRowsByTab[activeTab].find((row) => row.id === rowId);

        if (addedRow) {
            setAddedRowsByTab((prevRowsByTab) => ({
                ...prevRowsByTab,
                [activeTab]: prevRowsByTab[activeTab].map((row) => (row.id === rowId ? { ...row, [field]: value } : row)),
            }));
        } else {
            setEditedRowsByTab((prevRowsByTab) => ({
                ...prevRowsByTab,
                [activeTab]: {
                    ...prevRowsByTab[activeTab],
                    [rowId]: {
                        ...prevRowsByTab[activeTab][rowId],
                        [field]: value,
                    },
                },
            }));
        }

        setHasChanges(true);
    };

    const restoreRows = (tab: CategoryTab) => {
        setAddedRowsByTab((prevRowsByTab) => ({
            ...prevRowsByTab,
            [tab]: [],
        }));
        setEditedRowsByTab((prevRowsByTab) => ({
            ...prevRowsByTab,
            [tab]: {},
        }));
        setDeletedIdsByTab((prevRowsByTab) => ({
            ...prevRowsByTab,
            [tab]: [],
        }));
    };

    const handleSearch = () => {
        if (hasChanges && !window.confirm('변경사항이 저장되지 않습니다. 무시하고 조회하시겠습니까?')) {
            return;
        }

        if (hasChanges) {
            restoreRows(activeTab);
            setSelectedRowId('');
            setActiveCell(null);
            setEditingCell(null);
        }

        setHasChanges(false);
    };

    const handleTabChange = (tab: CategoryTab) => {
        if (tab === activeTab) {
            return;
        }

        if (hasChanges && !window.confirm('변경사항이 저장되지 않습니다. 무시하고 이동하시겠습니까?')) {
            return;
        }

        if (hasChanges) {
            restoreRows(activeTab);
        }

        setActiveTab(tab);
        setSelectedRowId('');
        setActiveCell(null);
        setEditingCell(null);
        setHasChanges(false);
    };

    const handleAdd = () => {
        const nextRow = createEmptyRow(rows);
        const selectedRow = rows.find((row) => row.id === effectiveSelectedRowId);
        const defaultMajor = majorData[0];
        const rowToAdd =
            activeTab === 'minor'
                ? {
                      ...nextRow,
                      majorCode: selectedRow?.majorCode ?? defaultMajor?.majorCode,
                      majorName: selectedRow?.majorName ?? defaultMajor?.majorName,
                  }
                : nextRow;

        setAddedRowsByTab((prevRowsByTab) => ({
            ...prevRowsByTab,
            [activeTab]: [...prevRowsByTab[activeTab], rowToAdd],
        }));
        setSelectedRowId(rowToAdd.id);
        setActiveCell({ rowId: rowToAdd.id, column: 'code' });
        setEditingCell({ rowId: rowToAdd.id, field: 'code' });
        setHasChanges(true);
    };

    const handleDelete = () => {
        if (!effectiveSelectedRowId || !window.confirm('삭제하시겠습니까?')) {
            return;
        }

        const isAddedRow = addedRowsByTab[activeTab].some((row) => row.id === effectiveSelectedRowId);

        if (isAddedRow) {
            setAddedRowsByTab((prevRowsByTab) => ({
                ...prevRowsByTab,
                [activeTab]: prevRowsByTab[activeTab].filter((row) => row.id !== effectiveSelectedRowId),
            }));
        } else {
            setDeletedIdsByTab((prevRowsByTab) => ({
                ...prevRowsByTab,
                [activeTab]: [...prevRowsByTab[activeTab], effectiveSelectedRowId],
            }));
        }

        setSelectedRowId('');
        setActiveCell(null);
        setEditingCell(null);
        setHasChanges(true);
    };

    const createUpsertRows = (tab: CategoryTab) => {
        const editedRows = editedRowsByTab[tab];
        const deleteIds = new Set(deletedIdsByTab[tab]);
        const baseUpsertRows = baseRowsByTab[tab]
            .filter((row) => editedRows[row.id] && !deleteIds.has(row.id))
            .map((row) => ({
                ...row,
                ...editedRows[row.id],
            }));

        return [...baseUpsertRows, ...addedRowsByTab[tab]];
    };

    const validateRows = (tab: CategoryTab, rowsToValidate: CategoryRow[]) => {
        const invalidRow = rowsToValidate.find((row) => {
            const commonInvalid = !row.code.trim() || !row.name.trim() || !row.sortOrder;
            const minorInvalid = tab === 'minor' && !row.majorCode?.trim();

            return commonInvalid || minorInvalid;
        });

        if (!invalidRow) {
            return true;
        }

        alert(tab === 'major' ? '대분류 코드, 대분류명, 순번을 입력해주세요.' : '대분류 코드, 소분류 코드, 소분류명, 순번을 입력해주세요.');
        return false;
    };

    const handleSave = async () => {
        const majorDeleteRows = deletedIdsByTab.major.map((majorCode) => ({
            majorCode,
        }));
        const minorDeleteRows = deletedIdsByTab.minor.map((minorCode) => ({
            minorCode,
        }));
        const majorUpsertRows = createUpsertRows('major');
        const minorUpsertRows = createUpsertRows('minor');

        if (majorDeleteRows.length === 0 && minorDeleteRows.length === 0 && majorUpsertRows.length === 0 && minorUpsertRows.length === 0) {
            setToastMessage('변경내역이 없습니다.');
            return;
        }

        if (!validateRows('major', majorUpsertRows) || !validateRows('minor', minorUpsertRows)) {
            return;
        }

        const requests = [
            () => postRows('/minor/delete', minorDeleteRows),
            () => postRows('/major/delete', majorDeleteRows),
            () => postRows('/major/upsert', majorUpsertRows.map(toMajorPayload)),
            () => postRows('/minor/upsert', minorUpsertRows.map(toMinorPayload)),
        ];

        for (const request of requests) {
            const isSuccess = await request();

            if (!isSuccess) {
                return;
            }
        }

        restoreRows('major');
        restoreRows('minor');
        setSelectedRowId('');
        setActiveCell(null);
        setEditingCell(null);
        setHasChanges(false);
        setToastMessage('저장되었습니다.');
        await onRefresh?.();
    };

    const handleCellSelect = (rowId: string, column: string) => {
        setSelectedRowId(rowId);
        setActiveCell({ rowId, column });
    };

    const getCellProps = (rowId: string, column: string, align?: 'left') => ({
        'data-align': align,
        'data-active': activeCell?.rowId === rowId && activeCell.column === column,
        onClick: () => handleCellSelect(rowId, column),
    });

    const updateEditableCell = (rowId: string, field: EditableField, value: string) => {
        if (field === 'sortOrder') {
            updateRow(rowId, 'sortOrder', Number(value.replace(/\D/g, '')));
            return;
        }

        updateRow(rowId, field, value);
    };

    const renderEditableCell = (row: CategoryRow, field: EditableField, value: string | number, align?: 'left') => {
        const isEditing = editingCell?.rowId === row.id && editingCell.field === field;

        return (
            <td
                {...getCellProps(row.id, field, align)}
                data-editable="true"
                data-editing={isEditing}
                onDoubleClick={() => setEditingCell({ rowId: row.id, field })}
            >
                {isEditing ? (
                    <FaqCategoriesCellInputBox>
                        <Input
                            type="text"
                            value={value}
                            autoFocus
                            width="100%"
                            height="24px"
                            padding="0 8px"
                            fontSize="13px"
                            border={`1px solid ${colors.coolGray200}`}
                            borderRadius="4px"
                            onChange={(event) => updateEditableCell(row.id, field, event.target.value)}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    event.currentTarget.blur();
                                }
                            }}
                            onBlur={() => setEditingCell(null)}
                        />
                    </FaqCategoriesCellInputBox>
                ) : (
                    value || ''
                )}
            </td>
        );
    };

    return (
        <FaqCategoriesPage>
            <FaqCategoriesHeader>
                <FaqCategoriesTitle>FAQ 분류관리</FaqCategoriesTitle>
                <FaqCategoriesTabList aria-label="분류관리 탭">
                    <button type="button" data-active={activeTab === 'major'} onClick={() => handleTabChange('major')}>
                        대분류
                    </button>
                    <button type="button" data-active={activeTab === 'minor'} onClick={() => handleTabChange('minor')}>
                        소분류
                    </button>
                </FaqCategoriesTabList>
            </FaqCategoriesHeader>

            <FaqCategoriesContent>
                <FaqCategoriesSection>
                    <FaqCategoriesSectionHeader>
                        <h2>조회조건</h2>
                        <Button {...buttonProps} onClick={handleSearch}>
                            조회
                        </Button>
                    </FaqCategoriesSectionHeader>

                    <FaqCategoriesSearchGrid>
                        <FaqCategoriesField>
                            <FaqCategoriesSearchLabel htmlFor="categoryName">{tabLabel}</FaqCategoriesSearchLabel>
                            <FaqCategoriesSearchControl>
                                <FaqCategoriesSelect id="categoryName" defaultValue="전체" aria-label={tabLabel}>
                                    <option value="전체">전체</option>
                                    {rows.map((row) => (
                                        <option key={row.id} value={row.code}>
                                            {row.name}
                                        </option>
                                    ))}
                                </FaqCategoriesSelect>
                            </FaqCategoriesSearchControl>
                        </FaqCategoriesField>
                        <FaqCategoriesField>
                            <FaqCategoriesSearchLabel htmlFor="useYn">사용여부</FaqCategoriesSearchLabel>
                            <FaqCategoriesSearchControl>
                                <FaqCategoriesSelect id="useYn" defaultValue="전체" aria-label="사용여부">
                                    <option value="전체">전체</option>
                                    <option value="Y">사용</option>
                                    <option value="N">미사용</option>
                                </FaqCategoriesSelect>
                            </FaqCategoriesSearchControl>
                        </FaqCategoriesField>
                        <FaqCategoriesField>
                            <FaqCategoriesSearchLabel htmlFor="remark">비고</FaqCategoriesSearchLabel>
                            <FaqCategoriesSearchControl>
                                <Input
                                    id="remark"
                                    placeholder="비고 입력"
                                    width="100%"
                                    height="28px"
                                    padding="0 10px"
                                    fontSize="13px"
                                    border={`1px solid ${colors.coolGray200}`}
                                    borderRadius="4px"
                                />
                            </FaqCategoriesSearchControl>
                        </FaqCategoriesField>
                    </FaqCategoriesSearchGrid>
                </FaqCategoriesSection>

                <FaqCategoriesSection>
                    <FaqCategoriesSectionHeader>
                        <h2>
                            {tabLabel} 조회결과 ({rows.length}건)
                        </h2>
                        <FaqCategoriesButtonGroup>
                            <Button {...deleteButtonProps} onClick={handleDelete}>
                                삭제
                            </Button>
                            <Button {...buttonProps} onClick={handleAdd}>
                                추가
                            </Button>
                            <Button {...buttonProps} onClick={handleSave}>
                                저장
                            </Button>
                        </FaqCategoriesButtonGroup>
                    </FaqCategoriesSectionHeader>

                    <FaqCategoriesTableScroll>
                        <FaqCategoriesDataTable>
                            <colgroup>
                                <col style={{ width: 40 }} />
                                <col style={{ width: 120 }} />
                                <col />
                                <col style={{ width: 64 }} />
                                <col style={{ width: 64 }} />
                                <col style={{ width: '35%' }} />
                                <col style={{ width: 160 }} />
                                <col style={{ width: 160 }} />
                                <col style={{ width: 160 }} />
                            </colgroup>
                            <thead>
                                <tr>
                                    <th aria-label="번호" />
                                    <th>{getCodeLabel(activeTab)}</th>
                                    <th>{getNameLabel(activeTab)}</th>
                                    <th>순번</th>
                                    <th>사용여부</th>
                                    <th>비고</th>
                                    <th>등록일시</th>
                                    <th>수정일시</th>
                                    <th>삭제일시</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rows.map((row, index) => (
                                    <tr key={row.id} data-selected={row.id === effectiveSelectedRowId} onClick={() => setSelectedRowId(row.id)}>
                                        <td {...getCellProps(row.id, 'index')}>{index + 1}</td>
                                        {renderEditableCell(row, 'code', row.code)}
                                        {renderEditableCell(row, 'name', row.name, 'left')}
                                        {renderEditableCell(row, 'sortOrder', row.sortOrder)}
                                        <td {...getCellProps(row.id, 'useYn')}>
                                            <Checkbox
                                                checked={row.useYn}
                                                size="16px"
                                                color={colors.greenPrimary}
                                                border={`1px solid ${colors.coolGray200}`}
                                                borderRadius="3px"
                                                onChange={(event) => updateRow(row.id, 'useYn', event.target.checked)}
                                            />
                                        </td>
                                        {renderEditableCell(row, 'remark', row.remark, 'left')}
                                        <td {...getCellProps(row.id, 'createdAt')}>{row.createdAt}</td>
                                        <td {...getCellProps(row.id, 'updatedAt')}>{row.updatedAt}</td>
                                        <td {...getCellProps(row.id, 'deletedAt')}>{row.deletedAt}</td>
                                    </tr>
                                ))}
                                {rows.length === 0 ? (
                                    <tr>
                                        <FaqCategoriesEmptyCell colSpan={9}>조회 결과가 없습니다.</FaqCategoriesEmptyCell>
                                    </tr>
                                ) : null}
                            </tbody>
                        </FaqCategoriesDataTable>
                    </FaqCategoriesTableScroll>
                </FaqCategoriesSection>
            </FaqCategoriesContent>

            {toastMessage ? <FaqCategoriesToast role="status">{toastMessage}</FaqCategoriesToast> : null}
        </FaqCategoriesPage>
    );
};

export default FaqCategories;
