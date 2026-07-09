export type FaqMenuGroup = {
  id: string;
  title: string;
  items: {
    id: string;
    label: string;
  }[];
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  bullets?: string[];
  contentHtml?: string;
  searchText?: string;
};

export type FaqSection = {
  id: string;
  title: string;
  items: FaqItem[];
};

export type FooterLink = {
  label: string;
  href: string;
  isExternal?: boolean;
  isCurrent?: boolean;
};

export const footerLinks: FooterLink[] = [
  { label: '회사소개', href: 'https://bizbee.co.kr', isExternal: true },
  { label: '이용약관', href: '#terms' },
  { label: '개인정보처리방침', href: 'https://www.bizbee.co.kr/pages/policy.html', isExternal: true },
];

export const companyAddress = {
  name: '주식회사 비즈비',
  address: '06657 서울특별시 서초구 반포대로 45 (서초동, 명정빌딩) 2층',
};

export const searchKeywords = ['요금', '로그인', '급여', '전표', '회의실'];

export const faqMenuGroups: FaqMenuGroup[] = [
  {
    id: 'pre-introduction',
    title: '도입 전 문의사항',
    items: [
      { id: 'pricing', label: '요금 • 계약' },
      { id: 'migration', label: '도입 • 전환' },
      { id: 'security', label: '데이터 • 보안' },
      { id: 'custom', label: '기능 • 커스텀' },
      { id: 'support', label: '기술지원' },
    ],
  },
  {
    id: 'erp-guide',
    title: 'ERP 사용 가이드',
    items: [
      { id: 'erp-basic', label: 'ERP 사용법' },
      { id: 'hr-payroll', label: '인사 급여' },
      { id: 'accounting', label: '회계 관리' },
      { id: 'sales-logistics', label: '영업 물류' },
      { id: 'purchase', label: '구매 관리' },
      { id: 'inventory', label: '재고 관리' },
      { id: 'trade', label: '수출입 관리' },
    ],
  },
  {
    id: 'groupware-guide',
    title: '그룹웨어 가이드',
    items: [
      { id: 'groupware-basic', label: '그룹웨어 사용법' },
      { id: 'mail', label: '메일' },
      { id: 'approval', label: '전자결재' },
    ],
  },
];

export const faqSections: FaqSection[] = [
  {
    id: 'pricing',
    title: '요금 • 계약',
    items: [
      {
        id: 'pricing-cost',
        question: '요금은 어떻게 구성되나요? 숨겨진 비용은 없나요?',
        answer:
          '비즈비는 월정액 구독형(SaaS) 방식으로 운영됩니다. 사용자 수와 사용 모듈에 따라 요금이 산정되며, 별도의 서버 구매 및 유지보수 비용이 없습니다.',
        bullets: [
          '기본 라이선스 요금 (사용자 수 기준)',
          '선택 모듈 추가 요금 (ERP, 그룹웨어, ESS 등 필요한 모듈만 선택)',
          '초기 도입 컨설팅 및 세팅 비용 (규모 및 커스터마이징 수준에 따라 별도 협의)',
        ],
      },
      {
        id: 'pricing-period',
        question: '최소 계약 기간이 있나요? 중도 해지 시 위약금이 발생하나요?',
        answer: '계약 조건은 도입 규모와 이용 방식에 따라 협의되며, 계약 전 상세 조건을 안내해 드립니다.',
      },
      {
        id: 'pricing-demo',
        question: '무료 체험이나 데모 버전을 사용해볼 수 있나요?',
        answer: '도입 상담을 통해 업무 환경에 맞는 데모를 확인하실 수 있습니다.',
      },
    ],
  },
  {
    id: 'migration',
    title: '도입 • 전환',
    items: [
      {
        id: 'migration-period',
        question: '도입까지 얼마나 걸리나요? 기존 업무가 중단되지는 않나요?',
        answer: '업무 범위와 데이터 규모에 따라 일정이 달라지며, 기존 업무 흐름에 영향이 적도록 단계적으로 전환합니다.',
      },
      {
        id: 'migration-data',
        question: '기존에 사용하던 ERP(더존, 이카운트, 영림원 등)의 데이터를 이관할 수 있나요?',
        answer:
          '기존 시스템의 데이터 구조를 확인한 뒤 이관 가능 범위와 전환 방식을 안내합니다. 고객사 환경에 따라 품목, 거래처, 회계, 인사 데이터 등을 검토해 이관 계획을 수립합니다.',
        bullets: [
          '기초정보 및 주요 마스터 데이터 점검',
          '이관 대상 데이터 정리 및 샘플 검증',
          '운영 전 테스트와 담당자 확인 절차 진행',
        ],
      },
      {
        id: 'migration-operation',
        question: 'IT 전담 직원이 없어도 도입·운영이 가능한가요?',
        answer: '초기 세팅과 운영 가이드를 지원하므로 전담 IT 인력이 없어도 도입과 운영이 가능합니다.',
      },
    ],
  },
  {
    id: 'security',
    title: '데이터 • 보안',
    items: [
      {
        id: 'security-storage',
        question: '회사 데이터가 외부에 유출되거나 사라질 우려가 없나요?',
        answer: '권한 관리와 백업 정책을 기반으로 데이터를 안정적으로 관리합니다.',
      },
      {
        id: 'security-backup',
        question: '서비스 종료 시 데이터가 손실되지 않도록 백업은 어떻게 하나요?',
        answer: '운영 정책에 따라 데이터 백업 및 이전 방안을 안내합니다.',
      },
    ],
  },
  {
    id: 'custom',
    title: '기능 • 커스텀',
    items: [
      {
        id: 'custom-screen',
        question: '우리 회사 상황에 맞게 기능을 커스터마이징할 수 있나요?',
        answer: '표준 기능을 기준으로 업무 적합성을 검토하고 필요한 범위의 설정 및 커스텀을 협의합니다.',
      },
      {
        id: 'custom-module',
        question: '모바일에서도 사용할 수 있나요? 앱이 따로 있나요?',
        answer: '업무 영역에 따라 모바일 사용 가능 범위를 안내합니다.',
      },
    ],
  },
  {
    id: 'support',
    title: '기술지원',
    items: [
      {
        id: 'support-error',
        question: '문제가 생겼을 때 어떻게 지원받을 수 있나요?',
        answer: '문의 접수 후 담당자가 문제 내용을 확인하고 해결 방법을 안내합니다.',
      },
    ],
  },
  {
    id: 'erp-basic',
    title: 'ERP 사용법',
    items: [
      {
        id: 'erp-password',
        question: '비밀번호는 어떤 규칙으로 설정해야 하나요?',
        answer: '보안 정책에 맞춰 영문, 숫자, 특수문자 조합을 권장합니다.',
      },
      {
        id: 'erp-login-block',
        question: '로그인이 차단되었습니다. 어떻게 해야 하나요?',
        answer: '관리자에게 계정 상태 확인을 요청하거나 비밀번호 재설정을 진행해 주세요.',
      },
      {
        id: 'erp-save-button',
        question: '사용자에게 특정 화면의 저장 버튼만 막고 싶습니다. 어떻게 하나요?',
        answer: '권한 설정에서 사용자 또는 역할별 기능 권한을 조정할 수 있습니다.',
      },
      {
        id: 'erp-excel',
        question: '그리드에서 데이터를 엑셀로 저장하려면 어떻게 하나요?',
        answer: '화면 상단 또는 그리드 메뉴의 엑셀 저장 기능을 사용합니다.',
      },
    ],
  },
];
