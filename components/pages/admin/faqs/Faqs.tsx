'use client';

import { KeyboardEvent, useState } from 'react';
import Button from '../../../atom/Button';
import Input from '../../../atom/Input';
import Pagination from '../../../molecules/Pagination';
import Table, { TableColumn } from '../../../molecules/Table';
import type { FaqListData, FaqRow, FaqSearchCondition } from '../../../../types/Faq';
import {
    FaqsActionArea,
    FaqsDateDivider,
    FaqsDateRange,
    FaqsField,
    FaqsForm,
    FaqsHeader,
    FaqsLabel,
    FaqsPage,
    FaqsSection,
    FaqsTitle,
} from '../../../../styles/pages/admin/faqs/Faqs';

type FaqsProps = {
    faqData?: FaqListData[];
    total: number;
    currentPage: number;
    pageSize: number;
    onSearch: (condition: FaqSearchCondition) => void;
    onPageChange: (page: number) => void;
};

const columns: TableColumn<FaqRow>[] = [
    { key: 'createdAt', title: '등록일자', dataIndex: 'createdAt', width: '14%' },
    { key: 'majorName', title: '대분류', dataIndex: 'majorName', width: '16%' },
    { key: 'minorName', title: '소분류', dataIndex: 'minorName', width: '16%' },
    { key: 'title', title: '질문', dataIndex: 'title', width: '28%' },
    { key: 'metaTag', title: '메타TAG', dataIndex: 'metaTag', width: '16%' },
    { key: 'useYn', title: '사용여부', dataIndex: 'useYn', width: '10%' },
    { key: 'remark', title: '비고', dataIndex: 'remark', width: '10%' },
];

const formatDate = (value: string) => {
    if (!value) {
        return '';
    }

    return value.slice(0, 10);
};

const Faqs = ({ faqData = [], total, currentPage, pageSize, onSearch, onPageChange }: FaqsProps) => {
    const [createdAtFrom, setCreatedAtFrom] = useState('');
    const [createdAtTo, setCreatedAtTo] = useState('');
    const [metaTag, setMetaTag] = useState('');
    const [majorName, setMajorName] = useState('');
    const [minorName, setMinorName] = useState('');
    const [title, setTitle] = useState('');
    const dataSource: FaqRow[] = faqData.map((faq) => ({
        faqId: faq.faqId,
        createdAt: formatDate(faq.createdAt),
        majorName: faq.majorName,
        minorName: faq.minorName,
        title: faq.title,
        metaTag: faq.metaTag ?? '',
        useYn: faq.useYn,
        remark: faq.remark ?? '',
    }));

    const handleSearch = () => {
        onSearch({
            createdAtFrom,
            createdAtTo,
            metaTag,
            majorName,
            minorName,
            title,
        });
    };

    const handleEnterKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key !== 'Enter') {
            return;
        }

        event.preventDefault();
        handleSearch();
    };

    return (
        <FaqsPage>
            <FaqsHeader>
                <FaqsTitle>FAQ 목록</FaqsTitle>
                <FaqsActionArea>
                    <Button
                        type="button"
                        width="72px"
                        height="36px"
                        color="#ffffff"
                        backgroundColor="#1677ff"
                        border="0"
                        borderRadius="6px"
                        shadow="none"
                        fontSize="14px"
                        onClick={handleSearch}
                    >
                        조회
                    </Button>
                </FaqsActionArea>
            </FaqsHeader>

            <FaqsSection>
                <FaqsForm>
                    <FaqsField>
                        <FaqsLabel htmlFor="createdAtFrom">등록일자</FaqsLabel>
                        <FaqsDateRange>
                            <Input
                                id="createdAtFrom"
                                name="createdAtFrom"
                                type="date"
                                value={createdAtFrom}
                                height="36px"
                                onChange={(event) => setCreatedAtFrom(event.target.value)}
                                onKeyDown={handleEnterKeyDown}
                            />
                            <FaqsDateDivider>~</FaqsDateDivider>
                            <Input
                                id="createdAtTo"
                                name="createdAtTo"
                                type="date"
                                value={createdAtTo}
                                height="36px"
                                onChange={(event) => setCreatedAtTo(event.target.value)}
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
                            placeholder="메타TAG 입력"
                            height="36px"
                            onChange={(event) => setMetaTag(event.target.value)}
                            onKeyDown={handleEnterKeyDown}
                        />
                    </FaqsField>
                    <FaqsField>
                        <FaqsLabel htmlFor="majorName">대분류</FaqsLabel>
                        <Input
                            id="majorName"
                            name="majorName"
                            value={majorName}
                            placeholder="대분류 입력"
                            height="36px"
                            onChange={(event) => setMajorName(event.target.value)}
                            onKeyDown={handleEnterKeyDown}
                        />
                    </FaqsField>
                    <FaqsField>
                        <FaqsLabel htmlFor="minorName">소분류</FaqsLabel>
                        <Input
                            id="minorName"
                            name="minorName"
                            value={minorName}
                            placeholder="소분류 입력"
                            height="36px"
                            onChange={(event) => setMinorName(event.target.value)}
                            onKeyDown={handleEnterKeyDown}
                        />
                    </FaqsField>
                    <FaqsField>
                        <FaqsLabel htmlFor="title">질문</FaqsLabel>
                        <Input
                            id="title"
                            name="title"
                            value={title}
                            placeholder="질문 입력"
                            height="36px"
                            onChange={(event) => setTitle(event.target.value)}
                            onKeyDown={handleEnterKeyDown}
                        />
                    </FaqsField>
                </FaqsForm>
            </FaqsSection>

            <FaqsSection>
                <Table rowKey="faqId" columns={columns} dataSource={dataSource} minWidth="980px"
                       checkedList={['useYn']} />
                <Pagination
                    current={currentPage}
                    total={total}
                    pageSize={pageSize}
                    margin="12px 0 0"
                    onChange={onPageChange}
                />
            </FaqsSection>
        </FaqsPage>
    );
};

export default Faqs;
