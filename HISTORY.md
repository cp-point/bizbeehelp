# 변경 이력

## 2026-06-18

- `/pub/faq` 헤더가 로그인 상태에 따라 로그인/관리자 버튼을 표시하도록 수정하고, store 구독을 `useSyncExternalStore`로 처리해 hydration mismatch를 방지
- `/admin/login`에서 `useSyncExternalStore`의 서버 스냅샷을 `null`로 고정해 로그인 상태 화면의 hydration mismatch를 방지
- 로그인 성공 시 `userStore` 전체 상태 구독 대신 `setUserData` action만 selector로 구독하도록 수정
- 로그인 응답 `result`가 사용자 정보 형태인지 확인한 뒤 store에 저장하도록 타입 가드 추가
- 로그인 페이지에서 store 저장을 위해 Zustand hook을 구독하지 않고 `userStore.getState().setUserData()`를 직접 호출하도록 수정
- 로그인 상태에서 `/admin/login` 접근 시 이미 로그인된 사용자 안내와 FontAwesome 로그아웃 버튼을 표시하도록 수정
- 로그인 페이지에서 전용 패널 대신 공통 `Card`, 전용 로그아웃 버튼 대신 공통 `Button`을 사용하도록 수정
- 관리자 NavBar 로그아웃 버튼도 공통 `Button`을 사용하도록 수정

## 2026-06-17 16:00

- `/pub/faq/page.tsx`에서 조회한 FAQ 데이터를 `Faq` 컴포넌트 props로 전달하도록 수정
- `components/pages/pub/faq/Faq.tsx`가 `FaqData` 배열을 받아 accordion 섹션으로 변환해 렌더링하도록 수정
- FAQ 데이터가 없을 때는 기존 정적 FAQ 데이터가 표시되도록 fallback 유지
- FAQ API 응답 구조에 맞춰 `types/Faq.ts`를 대분류/소분류/FAQ 계층 타입으로 수정
- `/pub/faq` 화면에서 대분류는 메뉴 그룹, 소분류는 FAQ 섹션, FAQ 목록은 accordion 항목으로 렌더링되도록 수정
- `/pub/faq` 왼쪽 메뉴는 전체 소분류를 표시하고, 본문 FAQ 섹션은 FAQ 항목이 있는 소분류만 표시되도록 조정

## 2026-06-12 17:04

- `/pub/faq` 공개 페이지가 로그인 proxy 검사에 걸리지 않도록 `src/proxy.ts` matcher를 관리자 경로로 제한
- FAQ 히어로 배경 이미지를 `faq-intro-bg.png`에서 경량 `faq-intro-bg.webp`로 변경

## 2026-06-11 11:02

- `/api/backend/route.tsx`의 `JSESSIONID` Path 목록 하드코딩 제거
- `JSESSIONID` 만료 쿠키 문자열 직접 조립을 `response.cookies.delete()` 방식으로 변경
- 백엔드 세션 쿠키 전달 로직을 `normalizeSessionCookie`, `appendBackendCookies`, `deleteSessionCookie` 함수로 정리

## 2026-06-11 09:25

- 공통 `Input` 컴포넌트에 `onKeyDown` 이벤트 전달 속성 추가
- 로그인 페이지 아이디/비밀번호 입력창에서 Enter 입력 시 로그인 submit이 실행되도록 수정

## 2026-06-11 09:10

- `src/proxy.ts` 접근 제어 대상을 `/admin` 하위에서 전체 화면 경로로 확장
- `JSESSIONID`가 없으면 기본 메인 페이지 접근도 `/admin/login?loginRequired=true`로 리다이렉트되도록 수정
- proxy matcher에서 `/api`, `_next/static`, `_next/image`, `favicon.ico`는 제외하도록 수정

## 2026-06-10 17:10

- `/api/backend/route.tsx` 프록시 요청/응답/쿠키 처리 로직을 역할별 함수로 정리
- 로그인/로그아웃 쿠키 처리 정책을 `createProxyResponse` 흐름으로 단순화

## 2026-06-10 16:39

- 로그아웃 시 `JSESSIONID` 만료 쿠키가 Path별로 여러 `Set-Cookie` 헤더로 내려가도록 수정
- 로그아웃 응답에서는 백엔드 `Set-Cookie`를 다시 브라우저에 전달하지 않도록 수정

## 2026-06-10 16:35

- 로그아웃 시 `JSESSIONID` 쿠키 만료 대상 경로를 `/admin`, `/admin/login`, `/admin/faq-categories`, `/api/backend`까지 확장
- `JSESSIONID` 만료 쿠키에 `expires` 값을 함께 설정하도록 수정

## 2026-06-10 16:22

- 로그인 실패 응답에서는 백엔드 `Set-Cookie`를 브라우저에 전달하지 않도록 수정
- 로그인 성공 시 전달되는 `JSESSIONID` 쿠키의 `Path`를 `/`로 보정하도록 수정
- 로그인 실패/로그아웃 시 `JSESSIONID` 쿠키를 `/`, `/api` 경로에서 모두 만료하도록 수정

## 2026-06-10 14:33

- 관리자 경로 접근 제어용 `proxy.ts` 추가
- 로그인하지 않은 사용자가 `/admin/login` 외 관리자 경로에 접근하면 `/admin/login?loginRequired=true`로 리다이렉트되도록 수정
- 로그인 페이지에서 `loginRequired=true` query를 감지해 로그인 필요 alert를 표시하도록 수정
- 로그인 성공 시 `/admin/faq-categories`로 이동하도록 수정

## 2026-06-10 14:00

- 세션 로그인 유지를 위해 `/api/backend` 프록시가 백엔드 `Set-Cookie` 헤더를 브라우저 응답에 전달하도록 수정
- 백엔드 응답에 `type`이 없더라도 `errorCode`가 `0000`이 아니면 `FAIL`로 처리되도록 응답 변환 로직 수정
- 로그인 페이지에서 응답 메시지가 없을 때 기본 성공/실패 문구를 표시하도록 수정

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
