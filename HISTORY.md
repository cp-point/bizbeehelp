# 변경 이력

## 2026-06-29 11:45

- `/faq` 페이지를 서버 컴포넌트 기반 데이터 조회 구조로 변경
- 백엔드 FAQ 데이터를 초기 렌더링 시점에 받아 `Faq` 클라이언트 컴포넌트로 전달하도록 수정
- FAQ 대분류/소분류 데이터를 기반으로 동적 metadata keywords를 생성하도록 추가
- 공개 FAQ 데이터에 `FAQPage` JSON-LD 구조화 데이터를 추가

## 2026-06-29 10:05

- 관리자 공통 레이아웃 반응형 스타일 적용
- 1024px 이하에서 관리자 NavBar가 상단 가로 메뉴로 전환되도록 수정
- FAQ 목록, FAQ 등록, FAQ 분류관리 화면의 고정 최소 너비 제거
- 검색조건, 버튼 그룹, 등록 폼이 태블릿/모바일 화면에서 단계적으로 줄바꿈되도록 수정
- 공통 Table/Pagination 컴포넌트의 모바일 가로 스크롤 및 줄바꿈 대응 보완


## 2026-06-23

- 11:18 - FAQ목록/FAQ분류관리/Table 리팩토링: 날짜 포맷과 선택 토글 공통 유틸 분리, 분류관리 행 병합/필터/저장 대상 계산 함수화, Table 다중 선택 판별을 Set 기반으로 최적화
- 09:33 - FAQ목록과 FAQ분류관리 표에서 Ctrl/Command 클릭으로 여러 행을 선택할 수 있도록 다중 선택 기능 추가
- 09:18 - `/admin/faqs` FAQ목록 삭제 시 즉시 백엔드 요청하지 않고 화면에서만 숨긴 뒤 저장 버튼 클릭 시 `/faq/delete` 요청을 보내도록 수정
- 09:07 - `/admin/faqs/categories` FAQ 분류관리 조회조건의 대분류/소분류/사용여부/비고 값을 state로 관리하고 조회 버튼 클릭 시 목록 필터에 반영되도록 수정

## 2026-06-22

- 15:31 - `/admin/faqs/categories` 분류관리 저장 시 삭제 row는 `/major/delete`, `/minor/delete`로, 추가/수정 row는 `/major/upsert`, `/minor/upsert`로 분리해 POST 요청하도록 연결

- 13:23 - `/admin/faqs/register` 저장 시 대분류, 소분류, 사용여부, 질문, 순번 필수값 누락 항목을 alert로 안내하도록 수정
- 13:23 - `/pub/admin/faqs/categories` 퍼블리싱 디자인을 기반으로 `/admin/faqs/categories` 분류관리 화면을 추가
- 13:23 - 기존 `/admin/faq-categories` 경로는 `/admin/faqs/categories`로 redirect되도록 페이지 추가
- 11:45 - `/admin/faqs/register`에서 `faqId` 기준 `/faq/detail` POST 상세 조회 결과로 수정 화면 데이터를 표시하도록 변경
- 11:45 - `/admin/faqs` 질문 클릭 시 목록 데이터를 저장하지 않고 `faqId` query만 전달하도록 정리
- 11:45 - 공개 FAQ 정렬이 문자열 `faqId`와 `sortOrder`를 모두 처리하도록 수정
- 10:44 - `/admin/faqs/register` 삭제/저장 버튼을 `/admin/faqs`와 동일한 `/faq/delete`, `/faq/save` POST 요청 흐름으로 연결
- 10:44 - `/admin/faqs/register` 수정 화면의 메타태그, 질문, 사용여부, 비고, 순번, 본문 영역을 수정 가능하도록 변경
- 10:34 - `/admin/faqs/register` 화면 스타일을 `/pub/admin/faqs/register` 퍼블리싱 구조와 동일한 폼/버튼/에디터 레이아웃으로 수정
- 10:34 - `/admin/faqs/register`에서 `/major`, `/minor` 데이터를 조회해 대분류/소분류 셀렉트박스에 표시하고, FAQ목록에서 선택한 값이 기본 선택되도록 수정
- 10:14 - `/admin/faqs` 질문 클릭 시 선택한 FAQ 데이터를 보관하고 `/admin/faqs/register?faqId=...`로 이동하도록 수정
- 10:14 - `/admin/faqs/register`에서 선택한 FAQ 목록 데이터를 읽어 수정 화면 형태로 표시하는 컴포넌트와 스타일 추가
- 10:14 - FAQ 사용여부 저장 요청 payload 타입을 백엔드 요청 형태인 배열 기준으로 정리
- 09:34 - `/admin/faqs` 사용여부 체크박스 변경분만 모아 `/faq/use-yn` POST 요청으로 저장하는 기능 추가
- 09:34 - FAQ 사용여부 저장 요청 payload 타입을 `types/Faq.ts`에 추가

## 2026-06-19

- 17:20 - `/pub/faq`에 반영된 푸터/관련 사이트/상단 이동 버튼/플로팅 버튼 위치 보정 변경사항을 `/faq` 화면에도 적용
- 14:57 - `/admin/faqs` 삭제 요청 전 확인 confirm을 추가
- 14:54 - `/admin/faqs`에서 선택한 FAQ의 `faqId`를 payload로 `/faq/delete` POST 요청하는 삭제 버튼 동작 추가
- 14:32 - `/admin/faqs` 조회조건 등록일자 파라미터명을 `createdAtFrom/createdAtTo`에서 `startDate/endDate`로 통일
- 14:25 - `/admin/faqs` 조회조건의 등록일자 시작일/종료일 기본값을 오늘 날짜로 설정
- 13:59 - FAQ 목록 백엔드 응답에 `updatedAt` 필드를 추가해 수정일시 표시가 가능하도록 수정
- 11:17 - `/admin/faqs`에서 대분류 미선택 시 `/minor` 요청을 막고, 선택된 `majorCode` 기준으로 소분류 목록을 조회하도록 수정
- 11:11 - `/admin/faqs` 조회조건의 대분류/소분류를 `/major`, `/minor` 조회 데이터 기반 셀렉트박스로 변경
- 11:11 - `/admin/faqs` 등록일자 입력을 퍼블리싱과 동일한 캘린더 아이콘 스타일로 수정
- 10:58 - `/admin/layout`에 공통 관리자 헤더를 추가하고 로그아웃 버튼을 헤더로 이동
- 10:58 - 관리자 `NavBar` 스타일을 `/pub/admin` 퍼블리싱과 동일한 어두운 사이드 메뉴 톤으로 수정
- 10:29 - `/admin/login` 기능은 유지하고 `/pub/admin/login`과 동일한 로그인 카드 디자인을 적용
- 10:31 - `/admin/login` 입력창과 버튼을 기존 atom `Input`, `Button` 컴포넌트를 활용하도록 정리
- 10:41 - `/admin/faqs` 목록 화면을 `/pub/admin/faqs` 퍼블리싱 디자인에 맞춰 검색조건/결과 테이블 레이아웃으로 수정

## 2026-06-18

- 15:18 - FAQ 목록 타입을 `types/Faq.ts`로 이동하고 `/admin/faqs` 조회를 백엔드 `Page` 응답 기준으로 수정
- 15:18 - `/faq/list` 조회 시 `page`, `size` 파라미터를 함께 전달하고 Pagination을 서버 페이징 기준으로 동작하도록 수정
- 15:13 - `/admin/faqs` 목록에 Pagination을 추가하고 한 페이지당 10개씩 표시하도록 수정
- 15:09 - `/admin/faqs` 조회조건을 각 필드별 `useState`로 관리하고 조회 버튼/Enter 입력 시 `/faq/list` 조회 조건으로 반영
- 15:09 - `/api/backend` 프록시가 GET 요청의 `param`을 query string으로 변환해 백엔드에 전달하도록 수정
- 15:01 - `/admin/faqs` 조회조건의 등록일자를 시작일/종료일 범위 입력으로 수정
- 14:45 - `/admin/faqs` 페이지에서 SWR로 FAQ 데이터를 조회하고 별도 client 컴포넌트에 전달하도록 수정
- 14:45 - FAQ 목록 화면에 조회조건 영역과 조회 버튼, 빈 목록 테이블 렌더링 컴포넌트 및 스타일 추가
- 14:19 - 401 응답 발생 시 `userStore` 사용자 정보를 초기화하고 `/admin/login`으로 이동하도록 axios 공통 응답 인터셉터 수정
- 14:19 - CRUD 요청에서 401은 공통 인터셉터가 처리하도록 분리하고 일반 실패 alert가 중복 표시되지 않도록 수정
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

## 2026-06-22 15:07

- `/major`, `/minor` 응답의 `createdAt`, `updatedAt`, `deletedAt` 필드를 FAQ 분류관리 화면에 반영
- FAQ 분류관리 조회결과 표에 삭제일시 컬럼을 추가하고 날짜 표시 형식을 보정

## 2026-06-22 14:33

- `/admin/faqs/categories`에서 `/major`, `/minor` 데이터를 `useSWR`로 조회해 대분류/소분류 조회조건과 조회결과에 표시하도록 수정
- FAQ 분류관리 화면의 로컬 수정 상태를 백엔드 조회 데이터와 분리해 관리하도록 정리

## 2026-06-22 14:20

- `/admin/faqs/categories/page.tsx`가 빈 화면을 반환하던 문제를 수정하고 FAQ 분류관리 컴포넌트를 연결

## 2026-06-22 14:09

- `/admin/faqs/categories` FAQ 분류관리 화면을 pub/admin 디자인 기준으로 전면 재작성
- 버튼, 입력창, 체크박스는 `components/atom` 컴포넌트를 사용하고 탭/검색영역/테이블 레이아웃은 전용 styled-components로 분리

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

- 로그아웃 시 `JSESSIONID` 쿠키 만료 대상 경로를 `/admin`, `/admin/login`, `/admin/faqs/categories`, `/api/backend`까지 확장
- `JSESSIONID` 만료 쿠키에 `expires` 값을 함께 설정하도록 수정

## 2026-06-10 16:22

- 로그인 실패 응답에서는 백엔드 `Set-Cookie`를 브라우저에 전달하지 않도록 수정
- 로그인 성공 시 전달되는 `JSESSIONID` 쿠키의 `Path`를 `/`로 보정하도록 수정
- 로그인 실패/로그아웃 시 `JSESSIONID` 쿠키를 `/`, `/api` 경로에서 모두 만료하도록 수정

## 2026-06-10 14:33

- 관리자 경로 접근 제어용 `proxy.ts` 추가
- 로그인하지 않은 사용자가 `/admin/login` 외 관리자 경로에 접근하면 `/admin/login?loginRequired=true`로 리다이렉트되도록 수정
- 로그인 페이지에서 `loginRequired=true` query를 감지해 로그인 필요 alert를 표시하도록 수정
- 로그인 성공 시 `/admin/faqs/categories`로 이동하도록 수정

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
