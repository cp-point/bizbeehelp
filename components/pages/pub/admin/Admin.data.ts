export type AdminMenuItem = {
  label: string;
  href: string;
  match: string[];
};

export type FaqRow = {
  id: number;
  faqNo: string;
  majorCategory: string;
  subCategory: string;
  question: string;
  metaTag: string;
  order: number;
  enabled: boolean;
  note: string;
  createdAt: string;
  updatedAt: string;
};

export type CategoryRow = {
  id: number;
  code: string;
  name: string;
  order: number;
  enabled: boolean;
  note: string;
  createdAt: string;
  updatedAt: string;
};

export const adminMenuItems: AdminMenuItem[] = [
  { label: 'FAQ 목록', href: '/pub/admin/faqs', match: ['/pub/admin', '/pub/admin/faqs'] },
  { label: 'FAQ 등록', href: '/pub/admin/faqs/register', match: ['/pub/admin/faqs/register'] },
  { label: 'FAQ 분류관리', href: '/pub/admin/faqs/categories', match: ['/pub/admin/faqs/categories'] },
];

export const majorCategoryOptions = ['전체', '도입전 궁금한 점', 'ERP 사용 가이드', '그룹웨어 사용 가이드', 'CFO 사용 가이드'];

export const subCategoryOptions = ['전체', '요금 ∙ 계약', '도입 ∙ 전환', '데이터 ∙ 보안', '기능 ∙ 커스텀', '기술지원', 'ERP 공통', '회계관리'];

export const faqRows: FaqRow[] = [
  {
    id: 1,
    faqNo: 'FN-20260611-0024',
    majorCategory: '도입전 궁금한 점',
    subCategory: '요금 ∙ 계약',
    question: '요금은 어떻게 구성되나요?',
    metaTag: '요금',
    order: 1,
    enabled: true,
    note: '플랜별 과금 기준 안내',
    createdAt: '2026-06-11 09:30:00',
    updatedAt: '2026-06-12 10:12:00',
  },
  {
    id: 2,
    faqNo: 'FN-20260611-0023',
    majorCategory: '도입전 궁금한 점',
    subCategory: '요금 ∙ 계약',
    question: '최소 계약기간이 있나요? 중도 해지는 가능한가요?',
    metaTag: '계약',
    order: 2,
    enabled: true,
    note: '계약 조건 확인 필요',
    createdAt: '2026-06-11 09:22:00',
    updatedAt: '2026-06-11 18:05:00',
  },
  {
    id: 3,
    faqNo: 'FN-20260611-0022',
    majorCategory: '도입전 궁금한 점',
    subCategory: '데이터 ∙ 보안',
    question: '데이터 백업과 보안 정책은 어떻게 운영되나요?',
    metaTag: '보안',
    order: 3,
    enabled: true,
    note: '보안 문구 검토',
    createdAt: '2026-06-10 14:40:00',
    updatedAt: '2026-06-11 11:05:00',
  },
  {
    id: 4,
    faqNo: 'FN-20260611-0021',
    majorCategory: '도입전 궁금한 점',
    subCategory: '기능 ∙ 커스텀',
    question: '회사 업무 방식에 맞춰 기능을 커스텀할 수 있나요?',
    metaTag: 'AAA',
    order: 1,
    enabled: true,
    note: '영업 문의 연결',
    createdAt: '2026-06-10 10:20:00',
    updatedAt: '2026-06-10 15:36:00',
  },
  {
    id: 5,
    faqNo: 'FN-20260611-0020',
    majorCategory: '도입전 궁금한 점',
    subCategory: '기술지원',
    question: '초기 설정 과정에서 기술지원을 받을 수 있나요?',
    metaTag: 'BBB',
    order: 1,
    enabled: true,
    note: '지원 범위 명시',
    createdAt: '2026-06-09 13:00:00',
    updatedAt: '2026-06-10 09:00:00',
  },
  {
    id: 6,
    faqNo: 'FN-20260611-0009',
    majorCategory: 'ERP 사용 가이드',
    subCategory: 'ERP 공통',
    question: 'ERP 공통 메뉴는 어디에서 확인하나요?',
    metaTag: 'CCC',
    order: 1,
    enabled: true,
    note: '',
    createdAt: '2026-06-08 16:30:00',
    updatedAt: '2026-06-09 09:40:00',
  },
  {
    id: 7,
    faqNo: 'FN-20260611-0005',
    majorCategory: 'ERP 사용 가이드',
    subCategory: 'ERP 공통',
    question: '사용자 권한별로 보이는 메뉴가 다른가요?',
    metaTag: 'DDD',
    order: 2,
    enabled: false,
    note: '권한 정책 확정 후 노출',
    createdAt: '2026-06-07 11:10:00',
    updatedAt: '2026-06-08 14:00:00',
  },
  {
    id: 8,
    faqNo: 'FN-20260611-0002',
    majorCategory: 'ERP 사용 가이드',
    subCategory: '회계관리',
    question: '회계관리 메뉴에서 전표를 수정할 수 있나요?',
    metaTag: 'EEE',
    order: 1,
    enabled: true,
    note: '',
    createdAt: '2026-06-06 10:00:00',
    updatedAt: '2026-06-07 12:45:00',
  },
];

export const majorCategoryRows: CategoryRow[] = [
  {
    id: 1,
    code: 'D1',
    name: '도입전 궁금한 점',
    order: 10,
    enabled: true,
    note: '',
    createdAt: '2026-06-11 09:30:00',
    updatedAt: '2026-06-12 10:12:00',
  },
  {
    id: 2,
    code: 'D2',
    name: 'ERP 사용 가이드',
    order: 20,
    enabled: true,
    note: '',
    createdAt: '2026-06-11 09:30:00',
    updatedAt: '2026-06-12 10:12:00',
  },
  {
    id: 3,
    code: 'D3',
    name: '그룹웨어 사용 가이드',
    order: 30,
    enabled: true,
    note: '',
    createdAt: '2026-06-11 09:30:00',
    updatedAt: '2026-06-12 10:12:00',
  },
  {
    id: 4,
    code: 'D4',
    name: 'CFO 사용 가이드',
    order: 35,
    enabled: false,
    note: '일시 미사용',
    createdAt: '2026-06-11 09:30:00',
    updatedAt: '2026-06-12 10:12:00',
  },
];

export const subCategoryRows: CategoryRow[] = [
  {
    id: 1,
    code: 'S01',
    name: '요금 ∙ 계약',
    order: 10,
    enabled: true,
    note: '',
    createdAt: '2026-06-11 09:30:00',
    updatedAt: '2026-06-12 10:12:00',
  },
  {
    id: 2,
    code: 'S02',
    name: '도입 ∙ 전환',
    order: 20,
    enabled: true,
    note: '',
    createdAt: '2026-06-11 09:30:00',
    updatedAt: '2026-06-12 10:12:00',
  },
  {
    id: 3,
    code: 'S03',
    name: '데이터 ∙ 보안',
    order: 30,
    enabled: true,
    note: '',
    createdAt: '2026-06-11 09:30:00',
    updatedAt: '2026-06-12 10:12:00',
  },
  {
    id: 4,
    code: 'S04',
    name: '기능 ∙ 커스텀',
    order: 40,
    enabled: false,
    note: '미사용',
    createdAt: '2026-06-11 09:30:00',
    updatedAt: '2026-06-12 10:12:00',
  },
  {
    id: 5,
    code: 'S05',
    name: '기술지원',
    order: 50,
    enabled: true,
    note: '',
    createdAt: '2026-06-11 09:30:00',
    updatedAt: '2026-06-12 10:12:00',
  },
];
