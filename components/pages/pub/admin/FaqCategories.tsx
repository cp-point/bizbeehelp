'use client';

import { useEffect, useState } from 'react';

import { CategoryRow, majorCategoryOptions, majorCategoryRows, subCategoryOptions, subCategoryRows } from './Admin.data';
import { AdminFrame, AdminSelectBox, AdminTableColGroup } from './Admin';
import * as S from '../../../../styles/components/pages/pub/admin/Admin';

type CategoryTab = 'major' | 'sub';
type CategoryRowsByTab = Record<CategoryTab, CategoryRow[]>;
type EditableCategoryField = 'code' | 'name' | 'order' | 'note';
type EditingCell = {
  rowId: number;
  field: EditableCategoryField;
} | null;
type ActiveCell = {
  rowId: number;
  column: string;
} | null;

const categoryTableColumns = [
  { width: 40 },
  { width: 120 },
  {},
  { width: 64 },
  { width: 64 },
  { width: '35%' },
  { width: 160 },
  { width: 160 },
];

const createCategoryRowsByTab = (): CategoryRowsByTab => ({
  major: majorCategoryRows.map((row) => ({ ...row })),
  sub: subCategoryRows.map((row) => ({ ...row })),
});

const getTabConfig = (tab: CategoryTab) => {
  if (tab === 'major') {
    return {
      tabLabel: '대분류',
      codeLabel: '대분류 코드',
      nameLabel: '대분류명',
      searchOptions: majorCategoryOptions,
    };
  }

  return {
    tabLabel: '소분류',
    codeLabel: '소분류 코드',
    nameLabel: '소분류명',
    searchOptions: subCategoryOptions,
  };
};

const createCategoryRow = (rows: CategoryRow[]): CategoryRow => {
  const nextId = Math.max(0, ...rows.map((row) => row.id)) + 1;
  const nextOrder = rows.length > 0 ? Math.max(...rows.map((row) => row.order)) + 1 : 1;

  return {
    id: nextId,
    code: '',
    name: '',
    order: nextOrder,
    enabled: true,
    note: '',
    createdAt: '-',
    updatedAt: '',
  };
};

const FaqCategories = () => {
  const [activeTab, setActiveTab] = useState<CategoryTab>('major');
  const [rowsByTab, setRowsByTab] = useState<CategoryRowsByTab>(createCategoryRowsByTab);
  const [savedRowsByTab, setSavedRowsByTab] = useState<CategoryRowsByTab>(createCategoryRowsByTab);
  const [selectedRowId, setSelectedRowId] = useState(majorCategoryRows[0]?.id ?? 0);
  const [activeCell, setActiveCell] = useState<ActiveCell>(majorCategoryRows[0] ? { rowId: majorCategoryRows[0].id, column: 'index' } : null);
  const [editingCell, setEditingCell] = useState<EditingCell>(null);
  const [toastMessage, setToastMessage] = useState('');
  const [hasChanges, setHasChanges] = useState(false);
  const config = getTabConfig(activeTab);
  const rows = rowsByTab[activeTab];

  useEffect(() => {
    if (!toastMessage) {
      return;
    }

    const timer = window.setTimeout(() => setToastMessage(''), 3000);

    return () => window.clearTimeout(timer);
  }, [toastMessage]);

  const updateRow = <K extends keyof CategoryRow>(rowId: number, field: K, value: CategoryRow[K]) => {
    setRowsByTab((prevRowsByTab) => ({
      ...prevRowsByTab,
      [activeTab]: prevRowsByTab[activeTab].map((row) => (row.id === rowId ? { ...row, [field]: value } : row)),
    }));
    setHasChanges(true);
  };

  const restoreTabRows = (tab: CategoryTab) => {
    const restoredRows = savedRowsByTab[tab].map((row) => ({ ...row }));

    setRowsByTab((prevRowsByTab) => ({
      ...prevRowsByTab,
      [tab]: restoredRows,
    }));

    return restoredRows;
  };

  const handleSearch = () => {
    if (hasChanges && !window.confirm('변경사항이 저장되지 않습니다. 무시하고 조회하시겠습니까?')) {
      return;
    }

    if (hasChanges) {
      const restoredRows = restoreTabRows(activeTab);

      setSelectedRowId(restoredRows[0]?.id ?? 0);
      setActiveCell(restoredRows[0] ? { rowId: restoredRows[0].id, column: 'index' } : null);
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
      restoreTabRows(activeTab);
      setEditingCell(null);
    }

    const nextRows = rowsByTab[tab];

    setActiveTab(tab);
    setSelectedRowId(nextRows[0]?.id ?? 0);
    setActiveCell(nextRows[0] ? { rowId: nextRows[0].id, column: 'index' } : null);
    setEditingCell(null);
    setHasChanges(false);
  };

  const handleAdd = () => {
    const selectedIndex = rows.findIndex((row) => row.id === selectedRowId);
    const insertIndex = selectedIndex >= 0 ? selectedIndex + 1 : rows.length;
    const nextRow = createCategoryRow(rows);

    setRowsByTab((prevRowsByTab) => ({
      ...prevRowsByTab,
      [activeTab]: [
        ...prevRowsByTab[activeTab].slice(0, insertIndex),
        nextRow,
        ...prevRowsByTab[activeTab].slice(insertIndex),
      ],
    }));
    setSelectedRowId(nextRow.id);
    setActiveCell({ rowId: nextRow.id, column: 'code' });
    setEditingCell({ rowId: nextRow.id, field: 'code' });
    setHasChanges(true);
  };

  const handleDelete = () => {
    if (!selectedRowId || !window.confirm('삭제하시겠습니까?')) {
      return;
    }

    const nextRows = rows.filter((row) => row.id !== selectedRowId);

    setRowsByTab((prevRowsByTab) => ({
      ...prevRowsByTab,
      [activeTab]: nextRows,
    }));
    setSelectedRowId(nextRows[0]?.id ?? 0);
    setActiveCell(nextRows[0] ? { rowId: nextRows[0].id, column: 'index' } : null);
    setEditingCell(null);
    setHasChanges(true);
  };

  const handleSave = () => {
    setSavedRowsByTab({
      major: rowsByTab.major.map((row) => ({ ...row })),
      sub: rowsByTab.sub.map((row) => ({ ...row })),
    });
    setToastMessage(hasChanges ? '저장되었습니다.' : '변경내역이 없습니다.');
    setHasChanges(false);
  };

  const handleCellSelect = (rowId: number, column: string) => {
    setSelectedRowId(rowId);
    setActiveCell({ rowId, column });
  };

  const getCellProps = (rowId: number, column: string, align?: 'left') => ({
    'data-align': align,
    'data-active': activeCell?.rowId === rowId && activeCell.column === column,
    onClick: () => handleCellSelect(rowId, column),
  });

  const updateEditableCell = (rowId: number, field: EditableCategoryField, value: string) => {
    if (field === 'order') {
      updateRow(rowId, 'order', Number(value.replace(/\D/g, '')));
      return;
    }

    updateRow(rowId, field, value);
  };

  const renderEditableCell = (row: CategoryRow, field: EditableCategoryField, value: string | number, align?: 'left') => {
    const isEditing = editingCell?.rowId === row.id && editingCell.field === field;

    return (
      <td
        {...getCellProps(row.id, field, align)}
        data-editable="true"
        data-editing={isEditing}
        onDoubleClick={() => setEditingCell({ rowId: row.id, field })}
      >
        {isEditing ? (
          <S.TableInput
            type="text"
            inputMode={field === 'order' ? 'numeric' : undefined}
            value={value}
            aria-label={field}
            autoFocus
            onClick={(event) => event.stopPropagation()}
            onChange={(event) => updateEditableCell(row.id, field, event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.currentTarget.blur();
              }
            }}
            onBlur={() => setEditingCell(null)}
          />
        ) : (
          value || ''
        )}
      </td>
    );
  };

  const renderRow = (row: CategoryRow, index: number) => (
    <tr key={row.id} data-selected={row.id === selectedRowId} onClick={() => setSelectedRowId(row.id)}>
      <td {...getCellProps(row.id, 'index')}>{index + 1}</td>
      {renderEditableCell(row, 'code', row.code)}
      {renderEditableCell(row, 'name', row.name, 'left')}
      {renderEditableCell(row, 'order', row.order)}
      <td {...getCellProps(row.id, 'enabled')}>
        <S.TableCheckbox
          type="checkbox"
          checked={row.enabled}
          aria-label={`${row.code || config.tabLabel} 사용여부`}
          onChange={(event) => updateRow(row.id, 'enabled', event.target.checked)}
        />
      </td>
      {renderEditableCell(row, 'note', row.note, 'left')}
      <td {...getCellProps(row.id, 'createdAt')}>{row.createdAt}</td>
      <td {...getCellProps(row.id, 'updatedAt')}>{row.updatedAt}</td>
    </tr>
  );

  return (
    <AdminFrame
      title="FAQ 분류관리"
      tabs={
        <S.TabList aria-label="분류관리 탭">
          <button type="button" data-active={activeTab === 'major'} onClick={() => handleTabChange('major')}>
            대분류
          </button>
          <button type="button" data-active={activeTab === 'sub'} onClick={() => handleTabChange('sub')}>
            소분류
          </button>
        </S.TabList>
      }
    >
      <S.Section>
        <S.SectionHeader>
          <h2>조회조건</h2>
          <S.Button type="button" $size="small" $variant="sub" onClick={handleSearch}>
            조회
          </S.Button>
        </S.SectionHeader>

        <S.SearchGrid $compact>
          <S.SearchCell>
            <S.SearchLabel>{config.tabLabel}</S.SearchLabel>
            <AdminSelectBox options={config.searchOptions} defaultValue="전체" ariaLabel={config.tabLabel} />
          </S.SearchCell>
          <S.SearchCell>
            <S.SearchLabel>사용여부</S.SearchLabel>
            <AdminSelectBox options={['전체', '사용', '미사용']} defaultValue="전체" ariaLabel="사용여부" />
          </S.SearchCell>
          <S.SearchCell>
            <S.SearchLabel>비고</S.SearchLabel>
            <S.Input placeholder="비고 입력" />
          </S.SearchCell>
        </S.SearchGrid>
      </S.Section>

      <S.Section>
        <S.SectionHeader>
          <h2>
            {config.tabLabel} 조회결과 ({rows.length}건)
          </h2>
          <S.ButtonGroup>
            <S.Button type="button" $size="small" $variant="del" onClick={handleDelete}>
              삭제
            </S.Button>
            <S.Button type="button" $size="small" $variant="sub" onClick={handleAdd}>
              추가
            </S.Button>
            <S.Button type="button" $size="small" $variant="sub" onClick={handleSave}>
              저장
            </S.Button>
          </S.ButtonGroup>
        </S.SectionHeader>

        <S.TableScroll $filled>
          <S.DataTable $minWidth={1376}>
            <AdminTableColGroup columns={categoryTableColumns} />
            <thead>
              <tr>
                <th aria-label="번호" />
                <th>{config.codeLabel}</th>
                <th>{config.nameLabel}</th>
                <th>순번</th>
                <th>사용여부</th>
                <th>비고</th>
                <th>등록일시</th>
                <th>수정일시</th>
              </tr>
            </thead>
            <tbody>{rows.map(renderRow)}</tbody>
          </S.DataTable>
        </S.TableScroll>
      </S.Section>
      {toastMessage ? <S.Toast role="status">{toastMessage}</S.Toast> : null}
    </AdminFrame>
  );
};

export default FaqCategories;
