import { NextRequest, NextResponse } from 'next/server';

const LOGIN_PATH = '/admin/login';
const DEFAULT_ADMIN_PATH = '/admin/faq-categories';
const SESSION_COOKIE_NAME = 'JSESSIONID';

export function proxy(req: NextRequest) {
    return NextResponse.next(); // 임시로 로그인 기능 차단
    
    const { pathname } = req.nextUrl;
    const hasSession = Boolean(req.cookies.get(SESSION_COOKIE_NAME)?.value);

    if (pathname === LOGIN_PATH) {
        return NextResponse.next();
    }

    if (!hasSession) {
        const loginUrl = req.nextUrl.clone();
        loginUrl.pathname = LOGIN_PATH;
        loginUrl.searchParams.set('loginRequired', 'true');
        loginUrl.searchParams.set('redirect', pathname || DEFAULT_ADMIN_PATH);

        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
