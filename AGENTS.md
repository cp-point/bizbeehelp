## 프로젝트 개요

이 프로젝트는 Next.js 16.2.6, React 19.2.4, TypeScript 기반의 웹 애플리케이션입니다.
`src/app` 디렉터리를 사용하는 Next.js App Router 구조입니다.

## 개발 규칙

- 컴포넌트는 `./components` 아래 경로에서 만들 것
- 페이지를 만들 때는 `./components`에 만들어놓은 컴포넌트를 최대한 활용할 것
- GET 요청은 `useSWR`을 사용할 것
- CSS는 `./styles` 경로 아래에 styled-component를 활용할 것
- `./components` 아래 컴포넌트와 `./sytle` 아래 스타일 컴포넌트 경로는 동일하게 할 것 
- 등록/수정/삭제/업로드 요청은 `./service/crud.ts`의 `Post`, `Patch`, `Delete`, `Upload` 함수를 사용할 것
- API 요청은 직접 `axios`를 새로 만들기보다 기존 `./libs/axios.ts`와 `./service/crud.ts` 구조를 따를 것
- 기존 폴더 구조와 코드 스타일을 최대한 따를 것
- 별도 백엔드 프레임워크는 명시적으로 필요한 경우가 아니면 추가하지 않을 것
- 수정사항 및 추가사항은 간단히 요약해 HISTORY.md에 기록할 것(날짜 및 시간 포함)
- FAQ분류관리 - 분류관리 -> URL: `/admin/faq-categories`, 파일: `src/app/admin/faq-categories/page.tsx`
- FAQ관리 - FAQ목록 -> URL: `/admin/faqs`, 파일: `src/app/admin/faqs/page.tsx`
- FAQ관리 - FAQ등록 -> URL: `/admin/faqs/register`, 파일: `src/app/admin/faqs/register/page.tsx`
- 페이지정보관리 -> URL: `/admin/page-info`, 파일: `src/app/admin/page-info/page.tsx`