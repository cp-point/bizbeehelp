# 변경 이력

## 2026-06-10 10:38

- AGENTS.md 규칙에 맞춰 변경 이력을 날짜/시간 포함 형식으로 정리
- 관리자 NavBar 메뉴를 `FAQ관리` 하위에 `FAQ분류관리`, `FAQ목록`, `FAQ등록` 구조로 변경
- 새로고침 시 현재 URL에 맞는 NavBar 메뉴 그룹이 자동으로 펼쳐지도록 수정
- Pagination에 처음/마지막 이동 버튼을 추가하고 이전/다음 표시를 `<<`, `<`, `>`, `>>` 기호로 변경
- `/admin/login/page.tsx`에 간단한 관리자 로그인 화면 추가
- 로그인 페이지 styled-components 정의를 `styles/pages/admin/Login.ts`로 분리
- `Button` 컴포넌트에 `type` 속성 지원 추가
- `Input` 컴포넌트에 `id` 속성 지원 추가

## 2026-06-09 기존 작업 정리

- AGENTS.md 규칙에 맞춰 `components/molecules/NavBar.tsx` 관리자 메뉴 구현
- 관리자 화면 왼쪽 메뉴 구성을 `components/molecules/AdminLayout.tsx`로 분리
- 관리자 메뉴 그룹/라벨/경로를 `enum/NavBar.ts` enum으로 분리
- NavBar 메뉴 그룹을 클릭 시 하나만 펼쳐지는 아코디언 방식으로 변경
- 공통 `Tooltip` 컴포넌트 추가
- 공통 `Table`, `Pagination` 컴포넌트 추가
- `Table` 컴포넌트에 `checkedList` 기반 체크박스 컬럼 렌더링 추가
- `Table` 체크박스 컬럼 변경 이벤트용 `onCheckedChange` 속성 추가
- FAQ 분류관리 페이지에서 체크박스 변경 시 `dataSource.useYn` 값이 갱신되도록 연결
- Checkbox 미체크 상태가 검게 보이지 않도록 커스텀 체크박스 스타일 적용
