'use client';

import { KeyboardEvent, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Button from '../../../atom/Button';
import Input from '../../../atom/Input';
import Pagination from '../../../molecules/Pagination';
import Table, { TableColumn } from '../../../molecules/Table';
import { Post } from '../../../../service/crud';
import { ResponseType } from '../../../../enum/Common';
import { formatDateTime, getFirstDateOfCurrentMonth, getTodayDate } from '../../../../libs/date';
import { getLastSelectedId, getUniqueIds, toggleSelectedId } from '../../../../libs/selection';
import type {
    FaqListData,
    FaqSearchCondition,
    FaqUseYnUpdatePayload,
    MajorList,
    MinorList,
} from '../../../../types/Faq';
import {
    FaqsAddLink,
    FaqsButtonGroup,
    FaqsDateDivider,
    FaqsDateInput,
    FaqsDateRange,
    FaqsField,
    FaqsForm,
    FaqsHeader,
    FaqsLabel,
    FaqsPage,
    FaqsSection,
    FaqsSectionHeader,
    FaqsSelect,
    FaqsSelectBox,
    FaqsTableLink,
    FaqsTitle,
} from '../../../../styles/pages/admin/faqs/Faqs';

type FaqsProps = {
    faqData?: FaqListData[];
    majorData?: MajorList;
    minorData?: MinorList;
    total: number;
    currentPage: number;
    pageSize: number;
    onSearch: (condition: FaqSearchCondition) => void;
    onMajorCodeChange: (majorCode: string) => void;
    onPageChange: (page: number) => void;
    onRefresh: () => void;
};

const Faqs = ({
                  faqData = [],
                  majorData = [],
                  minorData = [],
                  total,
                  currentPage,
                  pageSize,
                  onSearch,
                  onMajorCodeChange,
                  onPageChange,
                  onRefresh,
              }: FaqsProps) => {
    const router = useRouter();
    const [startDate, setStartDate] = useState(getFirstDateOfCurrentMonth);
    const [endDate, setEndDate] = useState(getTodayDate);
    const [metaTag, setMetaTag] = useState('');
    const [majorName, setMajorName] = useState('');
    const [minorName, setMinorName] = useState('');
    const [title, setTitle] = useState('');
    const [selectedFaqId, setSelectedFaqId] = useState<string | null>(null);
    const [selectedFaqIds, setSelectedFaqIds] = useState<string[]>([]);
    const [selectedMajorCode, setSelectedMajorCode] = useState('');
    const [changedUseYnMap, setChangedUseYnMap] = useState<Record<string, 'Y' | 'N'>>({});
    const [deletedFaqIds, setDeletedFaqIds] = useState<string[]>([]);
    const originalUseYnMap = useMemo(() => new Map(faqData.map((faq) => [faq.faqId, faq.useYn])), [faqData]);
    const deletedFaqIdSet = useMemo(() => new Set(deletedFaqIds), [deletedFaqIds]);
    const displayedFaqData = useMemo(
        () =>
            faqData
                .filter((faq) => !deletedFaqIdSet.has(faq.faqId))
                .map((faq) => ({
                    ...faq,
                    useYn: changedUseYnMap[faq.faqId] ?? faq.useYn,
                })),
        [changedUseYnMap, deletedFaqIdSet, faqData],
    );
    const changedUseYnCount = Object.keys(changedUseYnMap).length;
    const deletedFaqCount = deletedFaqIds.length;
    const pendingChangeCount = changedUseYnCount + deletedFaqCount;
    const displayedTotal = Math.max(total - deletedFaqCount, 0);

    const handleFaqTitleClick = (faq: FaqListData) => {
        router.push(`/admin/faqs/register?faqId=${encodeURIComponent(faq.faqId)}`);
    };

    const handleRowClick = (faq: FaqListData, isMultipleSelection: boolean) => {
        if (!isMultipleSelection) {
            setSelectedFaqId(faq.faqId);
            setSelectedFaqIds([faq.faqId]);
            return;
        }

        setSelectedFaqIds((prevSelectedFaqIds) => {
            const nextSelectedFaqIds = toggleSelectedId(prevSelectedFaqIds, faq.faqId);

            setSelectedFaqId(getLastSelectedId(nextSelectedFaqIds, null));
            return nextSelectedFaqIds;
        });
    };

    const columns: TableColumn<FaqListData>[] = [
        {
            key: 'rowNo',
            title: '',
            width: '40px',
            render: (_value, _record, index) => (currentPage - 1) * pageSize + index + 1,
        },
        { key: 'faqId', title: 'FAQ 번호', dataIndex: 'faqId', width: '140px' },
        { key: 'majorName', title: '대분류', dataIndex: 'majorName', width: '160px' },
        { key: 'minorName', title: '소분류', dataIndex: 'minorName', width: '160px' },
        {
            key: 'title',
            title: '질문',
            dataIndex: 'title',
            align: 'left',
            render: (value, record) => (
                <FaqsTableLink
                    type="button"
                    onClick={(event) => {
                        event.stopPropagation();
                        handleFaqTitleClick(record);
                    }}
                >
                    {String(value ?? '')}
                </FaqsTableLink>
            ),
        },
        { key: 'metaTag', title: '메타태그', dataIndex: 'metaTag', width: '120px' },
        {
            key: 'sortOrder',
            title: '순번',
            width: '64px',
            dataIndex: 'sortOrder',
        },
        { key: 'useYn', title: '사용여부', dataIndex: 'useYn', width: '64px' },
        {
            key: 'remark',
            title: '비고',
            dataIndex: 'remark',
            width: '12%',
            align: 'left',
            render: (value) => String(value || '-'),
        },
        {
            key: 'createdAt',
            title: '등록일시',
            dataIndex: 'createdAt',
            width: '160px',
            render: (value) => formatDateTime(value as string),
        },
        {
            key: 'updatedAt',
            title: '수정일시',
            dataIndex: 'updatedAt',
            width: '160px',
            render: (value) => formatDateTime(value as string | null),
        },
    ];

    const handleSearch = () => {
        onSearch({
            startDate,
            endDate,
            metaTag,
            majorName,
            minorName,
            title,
        });
    };

    const handleEnterKeyDown = (event: KeyboardEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (event.key !== 'Enter') {
            return;
        }

        event.preventDefault();
        handleSearch();
    };

    const handleMajorChange = (majorCode: string) => {
        const selectedMajor = majorData.find((major) => major.majorCode === majorCode);

        setSelectedMajorCode(majorCode);
        setMajorName(selectedMajor?.majorName ?? '');
        setMinorName('');
        onMajorCodeChange(majorCode);
    };

    const handleDelete = () => {
        const targetFaqIds = selectedFaqIds.length > 0 ? selectedFaqIds : selectedFaqId ? [selectedFaqId] : [];

        if (targetFaqIds.length === 0) {
            alert('삭제할 FAQ를 선택해주세요.');
            return;
        }

        if (!window.confirm('정말 삭제하시겠습니까?')) {
            return;
        }

        setDeletedFaqIds((prevDeletedFaqIds) => getUniqueIds([...prevDeletedFaqIds, ...targetFaqIds]));
        setChangedUseYnMap((prevChangedUseYnMap) => {
            const nextChangedUseYnMap = { ...prevChangedUseYnMap };

            targetFaqIds.forEach((faqId) => {
                delete nextChangedUseYnMap[faqId];
            });

            return nextChangedUseYnMap;
        });
        setSelectedFaqId(null);
        setSelectedFaqIds([]);
    };

    const handleUseYnChange = (faq: FaqListData, checked: boolean) => {
        const nextUseYn = checked ? 'Y' : 'N';
        const originalUseYn = originalUseYnMap.get(faq.faqId) ?? faq.useYn;

        setChangedUseYnMap((prevChangedUseYnMap) => {
            const nextChangedUseYnMap = { ...prevChangedUseYnMap };

            if (nextUseYn === originalUseYn) {
                delete nextChangedUseYnMap[faq.faqId];
                return nextChangedUseYnMap;
            }

            nextChangedUseYnMap[faq.faqId] = nextUseYn;
            return nextChangedUseYnMap;
        });
    };

    const postRequest = (url: string, payload: object) => {
        return new Promise<boolean>((resolve) => {
            Post(
                url,
                payload,
                (response) => {
                    if (response.type === ResponseType.SUCCESS) {
                        resolve(true);
                        return;
                    }

                    alert(response.message || '요청 처리에 실패했습니다.');
                    resolve(false);
                },
                false,
            );
        });
    };

    const handleSave = async () => {
        const updates: FaqUseYnUpdatePayload = Object.entries(changedUseYnMap).map(([faqId, useYn]) => ({
            faqId,
            useYn,
        }));

        if (updates.length === 0 && deletedFaqIds.length === 0) {
            alert('변경된 내용이 없습니다.');
            return;
        }

        for (const faqId of deletedFaqIds) {
            const isSuccess = await postRequest('/faq/delete', { faqId });

            if (!isSuccess) {
                return;
            }
        }

        if (updates.length > 0) {
            const isSuccess = await postRequest('/faq/save', updates);

            if (!isSuccess) {
                return;
            }
        }

        alert('저장이 완료되었습니다.');
        setDeletedFaqIds([]);
        setChangedUseYnMap({});
        setSelectedFaqId(null);
        setSelectedFaqIds([]);
        onRefresh();
    };

    return (
        <FaqsPage>
            <FaqsHeader>
                <FaqsTitle>FAQ 목록</FaqsTitle>
                <FaqsAddLink as={Link} href="/admin/faqs/register">
                    FAQ 추가
                </FaqsAddLink>
            </FaqsHeader>

            <FaqsSection>
                <FaqsSectionHeader>
                    <h2>조회조건</h2>
                    <Button
                        type="button"
                        color="#0f1b2a"
                        backgroundColor="#ffffff"
                        border="1px solid #cdd3dd"
                        borderRadius="4px"
                        shadow="none"
                        padding="8px 12px"
                        fontSize="13px"
                        onClick={handleSearch}
                    >
                        조회
                    </Button>
                </FaqsSectionHeader>
                <FaqsForm>
                    <FaqsField>
                        <FaqsLabel htmlFor="startDate">등록일자</FaqsLabel>
                        <FaqsDateRange>
                            <FaqsDateInput
                                id="startDate"
                                name="startDate"
                                type="date"
                                value={startDate}
                                onChange={(event) => setStartDate(event.target.value)}
                                onKeyDown={handleEnterKeyDown}
                            />
                            <FaqsDateDivider>~</FaqsDateDivider>
                            <FaqsDateInput
                                id="endDate"
                                name="endDate"
                                type="date"
                                value={endDate}
                                onChange={(event) => setEndDate(event.target.value)}
                                onKeyDown={handleEnterKeyDown}
                            />
                        </FaqsDateRange>
                    </FaqsField>
                    <FaqsField>
                        <FaqsLabel htmlFor="metaTag">메타TAG</FaqsLabel>
                        <Input
                            id="metaTag"
                            name="metaTag"
                            value={metaTag}
                            placeholder="메타 태그 입력"
                            width="calc(100% - 16px)"
                            height="28px"
                            padding="0 10px"
                            margin="8px"
                            border="1px solid #e4e8ee"
                            borderRadius="4px"
                            fontSize="13px"
                            onChange={(event) => setMetaTag(event.target.value)}
                            onKeyDown={handleEnterKeyDown}
                        />
                    </FaqsField>
                    <FaqsField>
                        <FaqsLabel htmlFor="majorName">대분류</FaqsLabel>
                        <FaqsSelectBox>
                            <FaqsSelect
                                id="majorName"
                                name="majorName"
                                value={selectedMajorCode}
                                onChange={(event) => handleMajorChange(event.target.value)}
                                onKeyDown={handleEnterKeyDown}
                            >
                                <option value="">전체</option>
                                {majorData.map((major) => (
                                    <option key={major.majorCode} value={major.majorCode}>
                                        {major.majorName}
                                    </option>
                                ))}
                            </FaqsSelect>
                        </FaqsSelectBox>
                    </FaqsField>
                    <FaqsField $wide="large">
                        <FaqsLabel htmlFor="title">질문</FaqsLabel>
                        <Input
                            id="title"
                            name="title"
                            value={title}
                            placeholder="질문 입력"
                            width="calc(100% - 16px)"
                            height="28px"
                            padding="0 10px"
                            margin="8px"
                            border="1px solid #e4e8ee"
                            borderRadius="4px"
                            fontSize="13px"
                            onChange={(event) => setTitle(event.target.value)}
                            onKeyDown={handleEnterKeyDown}
                        />
                    </FaqsField>
                    <FaqsField>
                        <FaqsLabel htmlFor="minorName">소분류</FaqsLabel>
                        <FaqsSelectBox>
                            <FaqsSelect
                                id="minorName"
                                name="minorName"
                                value={minorName}
                                disabled={!selectedMajorCode}
                                onChange={(event) => setMinorName(event.target.value)}
                                onKeyDown={handleEnterKeyDown}
                            >
                                <option value="">전체</option>
                                {minorData.map((minor) => (
                                    <option key={minor.minorCode} value={minor.minorName}>
                                        {minor.minorName}
                                    </option>
                                ))}
                            </FaqsSelect>
                        </FaqsSelectBox>
                    </FaqsField>
                </FaqsForm>
            </FaqsSection>

            <FaqsSection>
                <FaqsSectionHeader>
                    <h2>검색결과 ({displayedTotal}건)</h2>
                    <FaqsButtonGroup>
                        <Button
                            type="button"
                            color="#f04438"
                            backgroundColor="#ffffff"
                            border="1px solid #f04438"
                            borderRadius="4px"
                            shadow="none"
                            padding="8px 12px"
                            fontSize="13px"
                            onClick={handleDelete}
                        >
                            삭제
                        </Button>
                        <Button
                            type="button"
                            color="#0f1b2a"
                            backgroundColor="#ffffff"
                            border="1px solid #cdd3dd"
                            borderRadius="4px"
                            shadow="none"
                            padding="8px 12px"
                            fontSize="13px"
                            onClick={handleSave}
                        >
                            저장{pendingChangeCount > 0 ? ` (${pendingChangeCount})` : ''}
                        </Button>
                    </FaqsButtonGroup>
                </FaqsSectionHeader>
                <Table
                    rowKey="faqId"
                    variant="admin"
                    stickyHeader
                    minWidth="1644px"
                    maxHeight="930px"
                    emptyText="검색 결과 없음"
                    emptyCellHeight="320px"
                    columns={columns}
                    dataSource={displayedFaqData}
                    checkedList={['useYn']}
                    checkboxColor="#16b364"
                    checkboxBorder="1px solid #cdd3dd"
                    checkboxBorderRadius="3px"
                    selectedRowKeys={selectedFaqIds}
                    onRowClick={(faq, _index, event) => handleRowClick(faq, event.ctrlKey || event.metaKey)}
                    onCheckedChange={(faq, field, checked) => {
                        if (field !== 'useYn') {
                            return;
                        }

                        handleUseYnChange(faq, checked);
                    }}
                />
                <Pagination
                    current={currentPage}
                    total={displayedTotal}
                    pageSize={pageSize}
                    showInfo={false}
                    margin="8px 0 0"
                    onChange={onPageChange}
                />
            </FaqsSection>
        </FaqsPage>
    );
};

export default Faqs;
