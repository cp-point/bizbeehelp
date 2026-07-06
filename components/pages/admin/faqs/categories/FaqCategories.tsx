'use client';

import type { KeyboardEvent, MouseEvent } from 'react';
import { useEffect, useMemo, useState } from 'react';

import Button from '../../../../atom/Button';
import Checkbox from '../../../../atom/Checkbox';
import Input from '../../../../atom/Input';
import { ResponseType } from '../../../../../enum/Common';
import { formatDateTime } from '../../../../../libs/date';
import { getLastSelectedId, getUniqueIds, toggleSelectedId } from '../../../../../libs/selection';
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
    FaqCategoriesTableSelect,
    FaqCategoriesTableScroll,
    FaqCategoriesTabList,
    FaqCategoriesTitle,
    FaqCategoriesToast,
} from '../../../../../styles/pages/admin/faqs/categories/FaqCategories';

type CategoryTab = 'major' | 'minor';

type CategoryRow = {
    id: string;
    majorId?: number;
    minorId?: number;
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
    majorId?: number;
    minorId?: number;
    majorCode?: string;
    majorName?: string;
    minorCode?: string;
    minorName?: string;
    sortOrder: number;
    useYn: 'Y' | 'N';
    remark: string;
};
type CategoryDeletePayload = {
    majorId?: number;
    minorId?: number;
    majorCode?: string;
    minorCode?: string;
};
type CategoryRequestPayload = CategorySavePayload | CategoryDeletePayload;
type CategorySearchCondition = {
    majorCode: string;
    minorCode: string;
    useYn: string;
    remark: string;
};

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

const createEmptySearchCondition = (): CategorySearchCondition => ({
    majorCode: '',
    minorCode: '',
    useYn: '',
    remark: '',
});

const mapMajorRows = (majorData: MajorList = []): CategoryRow[] => {
    return majorData.map((major, index) => ({
        id: major.majorId != null ? `major-${major.majorId}` : major.majorCode,
        majorId: major.majorId,
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
        id: minor.minorId != null ? `minor-${minor.minorId}` : minor.minorCode,
        majorId: minor.majorId,
        minorId: minor.minorId,
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
    majorId: row.majorId,
    majorCode: row.code,
    majorName: row.name,
    sortOrder: row.sortOrder,
    useYn: toUseYn(row.useYn),
    remark: row.remark,
});

const toMinorPayload = (row: CategoryRow): CategorySavePayload => ({
    minorId: row.minorId,
    minorCode: row.code,
    majorId: row.majorId,
    majorCode: row.majorCode,
    minorName: row.name,
    sortOrder: row.sortOrder,
    useYn: toUseYn(row.useYn),
    remark: row.remark,
});

const mergeCategoryRows = (
    tab: CategoryTab,
    baseRowsByTab: CategoryRowsByTab,
    addedRowsByTab: CategoryRowsByTab,
    editedRowsByTab: EditedRowsByTab,
    deletedIdsByTab: DeletedIdsByTab,
) => {
    const deletedIds = new Set(deletedIdsByTab[tab]);
    const editedRows = editedRowsByTab[tab];
    const baseRows = baseRowsByTab[tab]
        .filter((row) => !deletedIds.has(row.id))
        .map((row) => ({
            ...row,
            ...editedRows[row.id],
        }));

    return [...baseRows, ...addedRowsByTab[tab]];
};

const filterCategoryRows = (tab: CategoryTab, rows: CategoryRow[], searchCondition: CategorySearchCondition) => {
    const normalizedRemark = searchCondition.remark.trim().toLowerCase();

    return rows.filter((row) => {
        if (row.id.startsWith('new-')) {
            return true;
        }

        if (tab === 'major' && searchCondition.majorCode && row.code !== searchCondition.majorCode) {
            return false;
        }

        if (tab === 'minor' && searchCondition.majorCode && row.majorCode !== searchCondition.majorCode) {
            return false;
        }

        if (tab === 'minor' && searchCondition.minorCode && row.code !== searchCondition.minorCode) {
            return false;
        }

        if (searchCondition.useYn && toUseYn(row.useYn) !== searchCondition.useYn) {
            return false;
        }

        return !(normalizedRemark && !row.remark.toLowerCase().includes(normalizedRemark));


    });
};

const createUpsertRows = (
    tab: CategoryTab,
    baseRowsByTab: CategoryRowsByTab,
    addedRowsByTab: CategoryRowsByTab,
    editedRowsByTab: EditedRowsByTab,
    deletedIdsByTab: DeletedIdsByTab,
) => {
    const editedRows = editedRowsByTab[tab];
    const deletedIds = new Set(deletedIdsByTab[tab]);
    const baseUpsertRows = baseRowsByTab[tab]
        .filter((row) => editedRows[row.id] && !deletedIds.has(row.id))
        .map((row) => ({
            ...row,
            ...editedRows[row.id],
        }));

    return [...baseUpsertRows, ...addedRowsByTab[tab]];
};

const getSelectedRowIds = (rows: CategoryRow[], selectedRowId: string, selectedRowIds: string[]) => {
    const rowIdSet = new Set(rows.map((row) => row.id));
    const selectedRowsInPage = selectedRowIds.filter((rowId) => rowIdSet.has(rowId));

    if (selectedRowsInPage.length > 0) {
        return selectedRowsInPage;
    }

    if (selectedRowId && rowIdSet.has(selectedRowId)) {
        return [selectedRowId];
    }

    return rows[0]?.id ? [rows[0].id] : [];
};

const getPendingChangeCount = (
    addedRowsByTab: CategoryRowsByTab,
    editedRowsByTab: EditedRowsByTab,
    deletedIdsByTab: DeletedIdsByTab,
) => {
    return (['major', 'minor'] as CategoryTab[]).reduce((count, tab) => {
        return count + addedRowsByTab[tab].length + Object.keys(editedRowsByTab[tab]).length + deletedIdsByTab[tab].length;
    }, 0);
};

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
    const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);
    const [activeCell, setActiveCell] = useState<ActiveCell>(null);
    const [editingCell, setEditingCell] = useState<EditingCell>(null);
    const [toastMessage, setToastMessage] = useState('');
    const [hasChanges, setHasChanges] = useState(false);
    const [searchForm, setSearchForm] = useState<CategorySearchCondition>(createEmptySearchCondition);
    const [searchCondition, setSearchCondition] = useState<CategorySearchCondition>(createEmptySearchCondition);
    const baseRowsByTab = useMemo<CategoryRowsByTab>(
        () => ({
            major: mapMajorRows(majorData),
            minor: mapMinorRows(minorData),
        }),
        [majorData, minorData],
    );
    const allRowsByTab = useMemo<CategoryRowsByTab>(() => {
        return {
            major: mergeCategoryRows('major', baseRowsByTab, addedRowsByTab, editedRowsByTab, deletedIdsByTab),
            minor: mergeCategoryRows('minor', baseRowsByTab, addedRowsByTab, editedRowsByTab, deletedIdsByTab),
        };
    }, [addedRowsByTab, baseRowsByTab, deletedIdsByTab, editedRowsByTab]);
    const rows = useMemo(() => filterCategoryRows(activeTab, allRowsByTab[activeTab], searchCondition), [activeTab, allRowsByTab, searchCondition]);
    const majorOptions = baseRowsByTab.major;
    const minorOptions = useMemo(() => {
        return baseRowsByTab.minor.filter((row) => !searchForm.majorCode || row.majorCode === searchForm.majorCode);
    }, [baseRowsByTab.minor, searchForm.majorCode]);
    const allRows = allRowsByTab[activeTab];
    const tabLabel = getTabLabel(activeTab);
    const displayedSelectedRowIds = getSelectedRowIds(rows, selectedRowId, selectedRowIds);
    const pendingChangeCount = getPendingChangeCount(addedRowsByTab, editedRowsByTab, deletedIdsByTab);

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

    const resetSelection = () => {
        setSelectedRowId('');
        setSelectedRowIds([]);
        setActiveCell(null);
        setEditingCell(null);
    };

    const updateRow = <K extends keyof CategoryRow>(rowId: string, field: K, value: CategoryRow[K]) => {
        const addedRow = addedRowsByTab[activeTab].find((row) => row.id === rowId);

        if (addedRow) {
            setAddedRowsByTab((prevRowsByTab) => ({
                ...prevRowsByTab,
                [activeTab]: prevRowsByTab[activeTab].map((row) => (row.id === rowId ? {
                    ...row,
                    [field]: value,
                } : row)),
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

    const updateSearchForm = <K extends keyof CategorySearchCondition>(field: K, value: CategorySearchCondition[K]) => {
        setSearchForm((prevSearchForm) => {
            const nextSearchForm = {
                ...prevSearchForm,
                [field]: value,
            };

            if (field === 'majorCode' && activeTab === 'minor') {
                nextSearchForm.minorCode = '';
            }

            return nextSearchForm;
        });
    };

    const handleSearch = () => {
        if (hasChanges && !window.confirm('변경사항이 저장되지 않습니다. 무시하고 조회하시겠습니까?')) {
            return;
        }

        if (hasChanges) {
            restoreRows(activeTab);
            resetSelection();
        }

        setSearchCondition(searchForm);
        resetSelection();
        setHasChanges(false);
    };

    const handleSearchKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key !== 'Enter' || event.nativeEvent.isComposing) {
            return;
        }

        event.preventDefault();
        handleSearch();
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
        setSearchForm(createEmptySearchCondition());
        setSearchCondition(createEmptySearchCondition());
        resetSelection();
        setHasChanges(false);
    };

    const handleAdd = () => {
        const nextRow = createEmptyRow(allRows);
        const selectedRow = selectedRowId ? allRows.find((row) => row.id === selectedRowId) : undefined;
        const defaultMajorCode = selectedRow?.majorCode ?? searchCondition.majorCode ?? searchForm.majorCode;
        const defaultMajor = majorOptions.find((major) => major.code === defaultMajorCode);
        const rowToAdd =
            activeTab === 'minor'
                ? {
                    ...nextRow,
                    majorId: defaultMajor?.majorId,
                    majorCode: defaultMajor?.code ?? '',
                    majorName: defaultMajor?.name ?? '',
                }
                : nextRow;

        setAddedRowsByTab((prevRowsByTab) => ({
            ...prevRowsByTab,
            [activeTab]: [...prevRowsByTab[activeTab], rowToAdd],
        }));
        setSelectedRowId(rowToAdd.id);
        setSelectedRowIds([rowToAdd.id]);
        setActiveCell({ rowId: rowToAdd.id, column: 'code' });
        setEditingCell({ rowId: rowToAdd.id, field: 'code' });
        setHasChanges(true);
    };

    const handleDelete = () => {
        const targetRowIds = displayedSelectedRowIds;

        if (targetRowIds.length === 0 || !window.confirm('삭제하시겠습니까? \n(대분류 삭제시 포함된 소분류와 FAQ도 모두 삭제됩니다.)')) {
            return;
        }

        const targetRowIdSet = new Set(targetRowIds);
        const addedRowIdSet = new Set(addedRowsByTab[activeTab].filter((row) => targetRowIdSet.has(row.id)).map((row) => row.id));
        const existingRowIds = targetRowIds.filter((rowId) => !addedRowIdSet.has(rowId));

        if (addedRowIdSet.size > 0) {
            setAddedRowsByTab((prevRowsByTab) => ({
                ...prevRowsByTab,
                [activeTab]: prevRowsByTab[activeTab].filter((row) => !targetRowIdSet.has(row.id)),
            }));
        }

        if (existingRowIds.length > 0) {
            setDeletedIdsByTab((prevRowsByTab) => ({
                ...prevRowsByTab,
                [activeTab]: getUniqueIds([...prevRowsByTab[activeTab], ...existingRowIds]),
            }));
        }

        resetSelection();
        setHasChanges(true);
    };

    const validateUniqueCodes = (tab: CategoryTab, rowsToValidate: CategoryRow[]) => {
        const codeMap = new Map<string, string>();

        for (const row of rowsToValidate) {
            const code = row.code.trim();

            if (!code) {
                continue;
            }

            const duplicatedRowId = codeMap.get(code);

            if (duplicatedRowId && duplicatedRowId !== row.id) {
                alert('이미 존재하는 코드입니다.');
                return false;
            }

            codeMap.set(code, row.id);
        }

        return true;
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
        const majorDeleteRows = deletedIdsByTab.major
            .map((rowId) => baseRowsByTab.major.find((row) => row.id === rowId))
            .filter((row): row is CategoryRow => Boolean(row))
            .map((row) => ({
                majorId: row.majorId,
                majorCode: row.code,
            }));
        const minorDeleteRows = deletedIdsByTab.minor
            .map((rowId) => baseRowsByTab.minor.find((row) => row.id === rowId))
            .filter((row): row is CategoryRow => Boolean(row))
            .map((row) => ({
                minorId: row.minorId,
                minorCode: row.code,
            }));
        const majorUpsertRows = createUpsertRows('major', baseRowsByTab, addedRowsByTab, editedRowsByTab, deletedIdsByTab);
        const minorUpsertRows = createUpsertRows('minor', baseRowsByTab, addedRowsByTab, editedRowsByTab, deletedIdsByTab);

        if (majorDeleteRows.length === 0 && minorDeleteRows.length === 0 && majorUpsertRows.length === 0 && minorUpsertRows.length === 0) {
            setToastMessage('변경내역이 없습니다.');
            return;
        }

        if (!validateUniqueCodes('major', allRowsByTab.major) || !validateUniqueCodes('minor', allRowsByTab.minor)) {
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
        resetSelection();
        setHasChanges(false);
        setToastMessage('저장되었습니다.');
        await onRefresh?.();
    };

    const handleCellSelect = (rowId: string, column: string, isMultipleSelection = false) => {
        setActiveCell({ rowId, column });

        if (!isMultipleSelection) {
            setSelectedRowId(rowId);
            setSelectedRowIds([rowId]);
            return;
        }

        setSelectedRowIds((prevSelectedRowIds) => {
            const nextSelectedRowIds = toggleSelectedId(prevSelectedRowIds, rowId);

            setSelectedRowId(getLastSelectedId(nextSelectedRowIds, ''));
            return nextSelectedRowIds;
        });
    };

    const handleRowSelect = (rowId: string, event: MouseEvent<HTMLTableRowElement>) => {
        handleCellSelect(rowId, 'index', event.ctrlKey || event.metaKey);
    };

    const getCellProps = (rowId: string, column: string, align?: 'left') => ({
        'data-align': align,
        'data-active': activeCell?.rowId === rowId && activeCell.column === column,
        onClick: (event: MouseEvent<HTMLTableCellElement>) => {
            event.stopPropagation();
            handleCellSelect(rowId, column, event.ctrlKey || event.metaKey);
        },
    });

    const updateEditableCell = (rowId: string, field: EditableField, value: string) => {
        if (field === 'sortOrder') {
            updateRow(rowId, 'sortOrder', Number(value.replace(/\D/g, '')));
            return;
        }

        updateRow(rowId, field, value);
    };

    const updateMinorMajor = (rowId: string, majorCode: string) => {
        const selectedMajor = majorOptions.find((major) => major.code === majorCode);

        updateRow(rowId, 'majorId', selectedMajor?.majorId);
        updateRow(rowId, 'majorCode', majorCode);
        updateRow(rowId, 'majorName', selectedMajor?.name ?? '');
    };

    const renderMajorSelectCell = (row: CategoryRow) => (
        <td {...getCellProps(row.id, 'majorCode')} data-editable="true">
            <FaqCategoriesTableSelect
                value={row.majorCode ?? ''}
                aria-label="대분류명"
                onClick={(event) => event.stopPropagation()}
                onChange={(event) => updateMinorMajor(row.id, event.target.value)}
            >
                <option value="">선택</option>
                {majorOptions.map((major) => (
                    <option key={major.id} value={major.code}>
                        {major.name}
                    </option>
                ))}
            </FaqCategoriesTableSelect>
        </td>
    );

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

                    <FaqCategoriesSearchGrid onKeyDown={handleSearchKeyDown}>
                        <FaqCategoriesField>
                            <FaqCategoriesSearchLabel htmlFor="majorCode">대분류</FaqCategoriesSearchLabel>
                            <FaqCategoriesSearchControl>
                                <FaqCategoriesSelect
                                    id="majorCode"
                                    value={searchForm.majorCode}
                                    aria-label="대분류"
                                    onChange={(event) => updateSearchForm('majorCode', event.target.value)}
                                >
                                    <option value="">전체</option>
                                    {majorOptions.map((row) => (
                                        <option key={row.id} value={row.code}>
                                            {row.name}
                                        </option>
                                    ))}
                                </FaqCategoriesSelect>
                            </FaqCategoriesSearchControl>
                        </FaqCategoriesField>
                        {activeTab === 'minor' ? (
                            <FaqCategoriesField>
                                <FaqCategoriesSearchLabel htmlFor="minorCode">소분류</FaqCategoriesSearchLabel>
                                <FaqCategoriesSearchControl>
                                    <FaqCategoriesSelect
                                        id="minorCode"
                                        value={searchForm.minorCode}
                                        aria-label="소분류"
                                        onChange={(event) => updateSearchForm('minorCode', event.target.value)}
                                    >
                                        <option value="">전체</option>
                                        {minorOptions.map((row) => (
                                            <option key={row.id} value={row.code}>
                                                {row.name}
                                            </option>
                                        ))}
                                    </FaqCategoriesSelect>
                                </FaqCategoriesSearchControl>
                            </FaqCategoriesField>
                        ) : null}
                        <FaqCategoriesField>
                            <FaqCategoriesSearchLabel htmlFor="useYn">사용여부</FaqCategoriesSearchLabel>
                            <FaqCategoriesSearchControl>
                                <FaqCategoriesSelect
                                    id="useYn"
                                    value={searchForm.useYn}
                                    aria-label="사용여부"
                                    onChange={(event) => updateSearchForm('useYn', event.target.value)}
                                >
                                    <option value="">전체</option>
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
                                    value={searchForm.remark}
                                    onChange={(event) => updateSearchForm('remark', event.target.value)}
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
                                저장{pendingChangeCount > 0 ? ` (${pendingChangeCount})` : ''}
                            </Button>
                        </FaqCategoriesButtonGroup>
                    </FaqCategoriesSectionHeader>

                    <FaqCategoriesTableScroll>
                        <FaqCategoriesDataTable>
                            <colgroup>
                                <col style={{ width: 40 }} />
                                {activeTab === 'minor' ? <col style={{ width: 160 }} /> : null}
                                <col style={{ width: 120 }} />
                                <col style={{ width: 220 }} />
                                <col style={{ width: 64 }} />
                                <col style={{ width: 64 }} />
                                <col style={{ width: 320 }} />
                                <col style={{ width: 160 }} />
                                <col style={{ width: 160 }} />
                                <col style={{ width: 160 }} />
                            </colgroup>
                            <thead>
                            <tr>
                                <th aria-label="번호" />
                                {activeTab === 'minor' ? <th>대분류명</th> : null}
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
                                <tr
                                    key={row.id}
                                    data-selected={displayedSelectedRowIds.includes(row.id)}
                                    onClick={(event) => handleRowSelect(row.id, event)}
                                >
                                    <td {...getCellProps(row.id, 'index')}>{index + 1}</td>
                                    {activeTab === 'minor' ? renderMajorSelectCell(row) : null}
                                    {renderEditableCell(row, 'code', row.code)}
                                    {renderEditableCell(row, 'name', row.name)}
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
                                    <FaqCategoriesEmptyCell colSpan={activeTab === 'minor' ? 10 : 9}>조회 결과가 없습니다.</FaqCategoriesEmptyCell>
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
