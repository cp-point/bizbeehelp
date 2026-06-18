'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { CSSProperties, FocusEvent, MouseEvent, ReactNode } from 'react';

import { adminMenuItems, faqRows, majorCategoryOptions, subCategoryOptions } from './Admin.data';
import * as S from '../../../../styles/components/pages/pub/admin/Admin';

type AdminFrameProps = {
  title: string;
  actions?: ReactNode;
  tabs?: ReactNode;
  children: ReactNode;
  onBeforeNavigate?: () => boolean;
};

type ActiveCell = {
  rowId: number;
  column: string;
} | null;

type AdminSelectBoxProps = {
  options: string[];
  defaultValue?: string;
  ariaLabel: string;
  disabled?: boolean;
  table?: boolean;
  onChange?: (option: string) => void;
};

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  pageRange?: number;
  onPageChange: (page: number) => void;
};

type AdminTableColumn = {
  width?: CSSProperties['width'];
};

const AdminTableColGroup = ({ columns }: { columns: AdminTableColumn[] }) => (
  <colgroup>
    {columns.map((column, index) => (
      <col key={`${column.width ?? 'auto'}-${index}`} style={column.width === undefined ? undefined : { width: column.width }} />
    ))}
  </colgroup>
);

const AdminFrame = ({ title, actions, tabs, onBeforeNavigate, children }: AdminFrameProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleNavigate = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (onBeforeNavigate && !onBeforeNavigate()) {
      event.preventDefault();
      return;
    }

    event.preventDefault();
    router.push(href);
  };

  return (
    <S.Page>
      <S.Header>
        <S.HeaderLogo
          href="/pub/admin/faqs"
          aria-label="bizbee Help 관리자"
          onClick={(event: MouseEvent<HTMLAnchorElement>) => handleNavigate(event, '/pub/admin/faqs')}
        >
          <Image src="/assets/images/header-logo.svg" alt="bizbee Help" width={146} height={32} priority />
        </S.HeaderLogo>
        <S.HeaderActions>
          <S.HeaderButtonLink href="/pub/admin/faqs" $variant="line" onClick={(event: MouseEvent<HTMLAnchorElement>) => handleNavigate(event, '/pub/admin/faqs')}>
            비즈비헬프
          </S.HeaderButtonLink>
          <S.HeaderButtonLink href="/pub/admin/login" $variant="sub" onClick={(event: MouseEvent<HTMLAnchorElement>) => handleNavigate(event, '/pub/admin/login')}>
            로그아웃
          </S.HeaderButtonLink>
        </S.HeaderActions>
      </S.Header>

      <S.Body>
        <S.SideMenu>
          <S.SideMenuList>
            {adminMenuItems.map((item) => {
              const isActive = item.match.includes(pathname);

              return (
                <li key={item.href}>
                  <Link href={item.href} data-active={isActive} onClick={(event: MouseEvent<HTMLAnchorElement>) => handleNavigate(event, item.href)}>
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </S.SideMenuList>
        </S.SideMenu>

        <S.Main>
          <S.Headline>
            <S.HeadlineInner>
              <h1>{title}</h1>
              {actions ? <S.HeadlineActions>{actions}</S.HeadlineActions> : null}
            </S.HeadlineInner>
            {tabs}
          </S.Headline>
          <S.Content>{children}</S.Content>
        </S.Main>
      </S.Body>
    </S.Page>
  );
};

const AdminSelectBox = ({ options, defaultValue, ariaLabel, disabled = false, table = false, onChange }: AdminSelectBoxProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(defaultValue ?? options[0] ?? '');

  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsOpen(false);
    }
  };

  const handleSelect = (option: string) => {
    setSelectedValue(option);
    setIsOpen(false);
    onChange?.(option);
  };

  return (
    <S.SelectBox onBlur={handleBlur} $table={table} $disabled={disabled}>
      <S.SelectButton
        type="button"
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        disabled={disabled}
        onClick={() => setIsOpen((prevOpen) => !prevOpen)}
        $isOpen={isOpen}
        $table={table}
      >
        <span>{selectedValue}</span>
        <S.SelectChevron $isOpen={isOpen} />
      </S.SelectButton>
      {isOpen ? (
        <S.Dropdown role="listbox" tabIndex={-1} $table={table}>
          {options.map((option) => (
            <S.DropdownItem
              key={option}
              type="button"
              role="option"
              aria-selected={option === selectedValue}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => handleSelect(option)}
            >
              {option}
            </S.DropdownItem>
          ))}
        </S.Dropdown>
      ) : null}
    </S.SelectBox>
  );
};

const FAQ_PAGE_SIZE = 30;
const FAQ_MOCK_TOTAL_PAGES = 5;
const faqTableColumns: AdminTableColumn[] = [
  { width: 40 },
  { width: 160 },
  { width: 160 },
  { width: 160 },
  {},
  { width: 64 },
  { width: 64 },
  { width: 120 },
  { width: '12%' },
  { width: 180 },
  { width: 180 },
];

const getPaginationPages = (currentPage: number, totalPages: number, pageRange: number) => {
  const visibleCount = Math.min(totalPages, pageRange);
  const halfRange = Math.floor(visibleCount / 2);
  const startPage = Math.min(Math.max(currentPage - halfRange, 1), Math.max(totalPages - visibleCount + 1, 1));

  return Array.from({ length: visibleCount }, (_, index) => startPage + index);
};

const Pagination = ({ currentPage, totalPages, onPageChange, pageRange = 5 }: PaginationProps) => {
  const safeTotalPages = Math.max(totalPages, 1);
  const safeCurrentPage = Math.min(Math.max(currentPage, 1), safeTotalPages);
  const pages = getPaginationPages(safeCurrentPage, safeTotalPages, pageRange);
  const isFirstPage = safeCurrentPage === 1;
  const isLastPage = safeCurrentPage === safeTotalPages;

  return (
    <S.Pagination aria-label="페이지네이션">
      <button type="button" aria-label="첫 페이지" disabled={isFirstPage} onClick={() => onPageChange(1)}>
        <S.PaginationIcon $icon="first" />
      </button>
      <button type="button" aria-label="이전 페이지" disabled={isFirstPage} onClick={() => onPageChange(safeCurrentPage - 1)}>
        <S.PaginationIcon $icon="prev" />
      </button>
      {pages.map((page) => (
        <button key={page} type="button" data-active={page === safeCurrentPage} onClick={() => onPageChange(page)}>
          {page}
        </button>
      ))}
      <button type="button" aria-label="다음 페이지" data-group="next" disabled={isLastPage} onClick={() => onPageChange(safeCurrentPage + 1)}>
        <S.PaginationIcon $icon="next" />
      </button>
      <button type="button" aria-label="마지막 페이지" disabled={isLastPage} onClick={() => onPageChange(safeTotalPages)}>
        <S.PaginationIcon $icon="last" />
      </button>
    </S.Pagination>
  );
};

const FaqList = () => {
  const router = useRouter();
  const [faqListRows, setFaqListRows] = useState(() => faqRows.slice(0, FAQ_PAGE_SIZE));
  const [savedFaqListRows, setSavedFaqListRows] = useState(() => faqRows.slice(0, FAQ_PAGE_SIZE));
  const [selectedRowId, setSelectedRowId] = useState(faqRows[0]?.id);
  const [activeCell, setActiveCell] = useState<ActiveCell>(faqRows[0] ? { rowId: faqRows[0].id, column: 'index' } : null);
  const [editingOrderRowId, setEditingOrderRowId] = useState<number | null>(null);
  const [toastMessage, setToastMessage] = useState('');
  const [hasChanges, setHasChanges] = useState(false);
  const [usageState, setUsageState] = useState<Record<number, boolean>>({});
  const [savedUsageState, setSavedUsageState] = useState<Record<number, boolean>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const rows = faqListRows;

  useEffect(() => {
    if (!toastMessage) {
      return;
    }

    const timer = window.setTimeout(() => setToastMessage(''), 3000);

    return () => window.clearTimeout(timer);
  }, [toastMessage]);

  const handleSearch = () => {
    if (hasChanges && !window.confirm('변경사항이 저장되지 않습니다. 무시하고 조회하시겠습니까?')) {
      return;
    }

    if (hasChanges) {
      setFaqListRows(savedFaqListRows.map((row) => ({ ...row })));
      setUsageState({ ...savedUsageState });
      setSelectedRowId(savedFaqListRows[0]?.id);
      setActiveCell(savedFaqListRows[0] ? { rowId: savedFaqListRows[0].id, column: 'index' } : null);
      setEditingOrderRowId(null);
    }

    setHasChanges(false);
    setCurrentPage(1);
  };

  const handleDelete = () => {
    if (selectedRowId && window.confirm('삭제하시겠습니까?')) {
      const nextRows = faqListRows.filter((row) => row.id !== selectedRowId);

      setFaqListRows(nextRows);
      setSelectedRowId(nextRows[0]?.id);
      setActiveCell(nextRows[0] ? { rowId: nextRows[0].id, column: 'index' } : null);
      setUsageState((prevState) => {
        const nextState = { ...prevState };

        delete nextState[selectedRowId];

        return nextState;
      });
      setHasChanges(true);
      setCurrentPage(1);
    }
  };

  const handleSave = () => {
    setSavedFaqListRows(faqListRows.map((row) => ({ ...row })));
    setSavedUsageState({ ...usageState });
    setToastMessage(hasChanges ? '저장되었습니다.' : '변경내역이 없습니다.');
    setHasChanges(false);
  };

  const handleUsageChange = (rowId: number, checked: boolean) => {
    setUsageState((prevState) => ({ ...prevState, [rowId]: checked }));
    setHasChanges(true);
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

  const handleOrderChange = (rowId: number, nextValue: string) => {
    const onlyNumber = nextValue.replace(/\D/g, '');

    setFaqListRows((prevRows) =>
      prevRows.map((row) => (row.id === rowId ? { ...row, order: onlyNumber ? Number(onlyNumber) : 0 } : row)),
    );
    setHasChanges(true);
  };

  return (
    <AdminFrame
      title="FAQ 목록"
      actions={
        <S.ButtonLink href="/pub/admin/faqs/register" $size="large" $variant="solid">
          FAQ 추가
        </S.ButtonLink>
      }
    >
      <S.Section>
        <S.SectionHeader>
          <h2>조회조건</h2>
          <S.Button type="button" $size="small" $variant="sub" onClick={handleSearch}>
            조회
          </S.Button>
        </S.SectionHeader>

        <S.SearchGrid>
          <S.SearchCell $wide="medium">
            <S.SearchLabel>등록일자</S.SearchLabel>
            <S.SearchControlGroup>
              <S.DateInput type="date" defaultValue="2025-06-15" aria-label="등록 시작일" />
              <span>~</span>
              <S.DateInput type="date" defaultValue="2026-06-15" aria-label="등록 종료일" />
            </S.SearchControlGroup>
          </S.SearchCell>
          <S.SearchCell $wide="medium">
            <S.SearchLabel>메타 태그</S.SearchLabel>
            <S.Input placeholder="메타 태그 입력" />
          </S.SearchCell>
          <S.SearchCell>
            <S.SearchLabel>대분류</S.SearchLabel>
            <AdminSelectBox options={majorCategoryOptions} defaultValue="전체" ariaLabel="대분류" />
          </S.SearchCell>
          <S.SearchCell $wide="large">
            <S.SearchLabel>질문</S.SearchLabel>
            <S.Input placeholder="질문 입력" />
          </S.SearchCell>
          <S.SearchCell>
            <S.SearchLabel>소분류</S.SearchLabel>
            <AdminSelectBox options={subCategoryOptions} defaultValue="전체" ariaLabel="소분류" />
          </S.SearchCell>
        </S.SearchGrid>
      </S.Section>

      <S.Section>
        <S.SectionHeader>
          <h2>검색결과 ({rows.length}건)</h2>
          <S.ButtonGroup>
            <S.Button type="button" $size="small" $variant="del" onClick={handleDelete}>
              삭제
            </S.Button>
            <S.Button type="button" $size="small" $variant="sub" onClick={handleSave}>
              저장
            </S.Button>
          </S.ButtonGroup>
        </S.SectionHeader>

        <S.TableScroll>
          <S.DataTable $minWidth={1760}>
            <AdminTableColGroup columns={faqTableColumns} />
            <thead>
              <tr>
                <th aria-label="번호" />
                <th>FAQ 번호</th>
                <th>대분류</th>
                <th>소분류</th>
                <th>질문</th>
                <th>메타태그</th>
                <th>순번</th>
                <th>사용여부</th>
                <th>비고</th>
                <th>등록일시</th>
                <th>수정일시</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={row.id} data-selected={selectedRowId === row.id} onClick={() => setSelectedRowId(row.id)}>
                  <td {...getCellProps(row.id, 'index')}>{index + 1}</td>
                  <td {...getCellProps(row.id, 'faqNo')}>{row.faqNo}</td>
                  <td {...getCellProps(row.id, 'majorCategory')}>{row.majorCategory}</td>
                  <td {...getCellProps(row.id, 'subCategory')}>{row.subCategory}</td>
                  <td {...getCellProps(row.id, 'question', 'left')}>
                    <S.TableLink
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        router.push('/pub/admin/faqs/register');
                      }}
                    >
                      {row.question}
                    </S.TableLink>
                  </td>
                  <td {...getCellProps(row.id, 'metaTag')}>{row.metaTag}</td>
                  <td
                    {...getCellProps(row.id, 'order')}
                    data-editable="true"
                    data-editing={editingOrderRowId === row.id}
                    onDoubleClick={() => setEditingOrderRowId(row.id)}
                  >
                    {editingOrderRowId === row.id ? (
                      <S.TableInput
                        type="text"
                        inputMode="numeric"
                        value={row.order ? String(row.order) : ''}
                        aria-label="순번"
                        autoFocus
                        onClick={(event) => event.stopPropagation()}
                        onChange={(event) => handleOrderChange(row.id, event.target.value)}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter') {
                            event.currentTarget.blur();
                          }
                        }}
                        onBlur={() => setEditingOrderRowId(null)}
                      />
                    ) : (
                      <S.OrderValue>{row.order}</S.OrderValue>
                    )}
                  </td>
                  <td {...getCellProps(row.id, 'enabled')}>
                    <S.TableCheckbox
                      type="checkbox"
                      checked={usageState[row.id] ?? row.enabled}
                      aria-label={`${row.faqNo} 사용여부`}
                      onChange={(event) => handleUsageChange(row.id, event.target.checked)}
                    />
                  </td>
                  <td {...getCellProps(row.id, 'note', 'left')}>{row.note || '-'}</td>
                  <td {...getCellProps(row.id, 'createdAt')}>{row.createdAt}</td>
                  <td {...getCellProps(row.id, 'updatedAt')}>{row.updatedAt}</td>
                </tr>
              ))}
              {rows.length === 0 ? (
                <tr>
                  <S.EmptyCell colSpan={11}>검색 결과 없음</S.EmptyCell>
                </tr>
              ) : null}
            </tbody>
          </S.DataTable>
        </S.TableScroll>
        {rows.length > 0 ? <Pagination currentPage={currentPage} totalPages={FAQ_MOCK_TOTAL_PAGES} onPageChange={setCurrentPage} /> : null}
      </S.Section>
      {toastMessage ? <S.Toast role="status">{toastMessage}</S.Toast> : null}
    </AdminFrame>
  );
};

export { AdminFrame, AdminSelectBox, AdminTableColGroup, Pagination };
export default FaqList;
