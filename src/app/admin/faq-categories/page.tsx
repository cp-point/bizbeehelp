'use client';

import React, { useState } from 'react';
import Table, { TableColumn } from '../../../../components/molecules/Table';
import Pagination from '../../../../components/molecules/Pagination';

type FaqCategory = {
    id: number;
    name: string;
    order: number;
    useYn: boolean;
};

const columns: TableColumn<FaqCategory>[] = [
    { key: 'name', title: '분류명', dataIndex: 'name', width: '50%' },
    { key: 'order', title: '순번', dataIndex: 'order', width: '40%' },
    { key: 'useYn', title: '사용여부', dataIndex: 'useYn', width: '10%' },
];

const initialDataSource: FaqCategory[] = [
    { id: 1, name: '요금/계약', order: 10, useYn: true },
    { id: 2, name: '도입/전환', order: 20, useYn: true },
    { id: 3, name: '데이터/보안', order: 30, useYn: true },
    { id: 4, name: '기능/커스텀', order: 40, useYn: true },
    { id: 5, name: '기술지원', order: 50, useYn: true },
    { id: 6, name: '계정관리', order: 60, useYn: true },
    { id: 7, name: '권한설정', order: 70, useYn: true },
    { id: 8, name: '장애문의', order: 80, useYn: false },
    { id: 9, name: '결제문의', order: 90, useYn: true },
    { id: 10, name: '환불문의', order: 100, useYn: true },
    { id: 11, name: '서비스신청', order: 110, useYn: true },
    { id: 12, name: '서비스해지', order: 120, useYn: false },
    { id: 13, name: '설치가이드', order: 130, useYn: true },
    { id: 14, name: '초기설정', order: 140, useYn: true },
    { id: 15, name: '사용자관리', order: 150, useYn: true },
    { id: 16, name: '조직관리', order: 160, useYn: true },
    { id: 17, name: '알림설정', order: 170, useYn: false },
    { id: 18, name: '메일연동', order: 180, useYn: true },
    { id: 19, name: '전자결재', order: 190, useYn: true },
    { id: 20, name: '근태관리', order: 200, useYn: true },
    { id: 21, name: '급여관리', order: 210, useYn: true },
    { id: 22, name: '회계관리', order: 220, useYn: true },
    { id: 23, name: '재고관리', order: 230, useYn: false },
    { id: 24, name: '영업관리', order: 240, useYn: true },
    { id: 25, name: '고객관리', order: 250, useYn: true },
    { id: 26, name: '계약관리', order: 260, useYn: true },
    { id: 27, name: '프로젝트관리', order: 270, useYn: true },
    { id: 28, name: '자료실', order: 280, useYn: true },
    { id: 29, name: '공지사항', order: 290, useYn: true },
    { id: 30, name: '기타문의', order: 300, useYn: false },
];

const PAGE_SIZE = 10;

const FaqCategoryPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [dataSource, setDataSource] = useState<FaqCategory[]>(initialDataSource);

    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const pagedDataSource = dataSource.slice(startIndex, startIndex + PAGE_SIZE);

    const handleCheckedChange = (record: FaqCategory, field: keyof FaqCategory | string, checked: boolean) => {
        setDataSource((prevDataSource) =>
            prevDataSource.map((item) => (item.id === record.id ? { ...item, [field]: checked } : item)),
        );
    };

    return (
        <div>
            <main>
                <h1>FAQ 분류관리</h1>
            </main>
            <Table
                rowKey="id"
                columns={columns}
                dataSource={pagedDataSource}
                checkedList={['useYn']}
                onCheckedChange={handleCheckedChange}
            />
            <Pagination
                current={currentPage}
                total={dataSource.length}
                pageSize={PAGE_SIZE}
                margin="16px 0 0"
                onChange={(nextPage) => setCurrentPage(nextPage)}
            />
        </div>
    );
};

export default FaqCategoryPage;
