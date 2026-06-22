'use client';

import { KeyboardEvent, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Button from '../../../atom/Button';
import Input from '../../../atom/Input';
import Pagination from '../../../molecules/Pagination';
import Table, { TableColumn } from '../../../molecules/Table';
import { Post } from '../../../../service/crud';
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

const formatDateTime = (value?: string | null) => {
    if (!value) {
        return '';
    }

    const normalizedValue = value.replace('T', ' ');

    return normalizedValue.length >= 19 ? normalizedValue.slice(0, 19) : normalizedValue;
};

const getToday = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const date = String(today.getDate()).padStart(2, '0');

    return `${year}-${month}-${date}`;
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
    const [startDate, setStartDate] = useState(getToday);
    const [endDate, setEndDate] = useState(getToday);
    const [metaTag, setMetaTag] = useState('');
    const [majorName, setMajorName] = useState('');
    const [minorName, setMinorName] = useState('');
    const [title, setTitle] = useState('');
    const [selectedFaqId, setSelectedFaqId] = useState<string | null>(null);
    const [selectedMajorCode, setSelectedMajorCode] = useState('');
    const [changedUseYnMap, setChangedUseYnMap] = useState<Record<string, 'Y' | 'N'>>({});
    const displayedFaqData = useMemo(
        () =>
            faqData.map((faq) => ({
                ...faq,
                useYn: changedUseYnMap[faq.faqId] ?? faq.useYn,
            })),
        [changedUseYnMap, faqData],
    );
    const changedUseYnCount = Object.keys(changedUseYnMap).length;

    const handleFaqTitleClick = (faq: FaqListData) => {
        router.push(`/admin/faqs/register?faqId=${encodeURIComponent(faq.faqId)}`);
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
        if (!selectedFaqId) {
            alert('삭제할 FAQ를 선택해주세요.');
            return;
        }

        if (!window.confirm('정말 삭제하시겠습니까?')) {
            return;
        }

        Post(
            '/faq/delete',
            {
                faqId: selectedFaqId,
            },
            (response) => {
                if (response.type === 'SUCCESS') {
                    alert(response.message || '삭제되었습니다.');
                    setSelectedFaqId(null);
                    onRefresh();
                    return;
                }

                alert(response.message || '삭제에 실패했습니다.');
            },
            false,
        );
    };

    const handleUseYnChange = (faq: FaqListData, checked: boolean) => {
        const nextUseYn = checked ? 'Y' : 'N';
        const originalUseYn = faqData.find((item) => item.faqId === faq.faqId)?.useYn ?? faq.useYn;

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

    const handleSave = () => {
        const updates: FaqUseYnUpdatePayload = Object.entries(changedUseYnMap).map(([faqId, useYn]) => ({
            faqId,
            useYn,
        }));

        if (updates.length === 0) {
            alert('변경된 사용여부가 없습니다.');
            return;
        }

        Post(
            '/faq/save',
            updates,
            (response) => {
                if (response.type === 'SUCCESS') {
                    alert('저장이 완료되었습니다.');
                    setChangedUseYnMap({});
                    onRefresh();
                    return;
                }

                alert(response.message || '저장에 실패했습니다.');
            },
            false,
        );
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
                    <h2>검색결과 ({total}건)</h2>
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
                            저장{changedUseYnCount > 0 ? ` (${changedUseYnCount})` : ''}
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
                    selectedRowKey={selectedFaqId}
                    onRowClick={(faq) => setSelectedFaqId(faq.faqId)}
                    onCheckedChange={(faq, field, checked) => {
                        if (field !== 'useYn') {
                            return;
                        }

                        handleUseYnChange(faq, checked);
                    }}
                />
                <Pagination
                    current={currentPage}
                    total={total}
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
