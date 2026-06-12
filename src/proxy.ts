import { NextRequest, NextResponse } from 'next/server';

const LOGIN_PATH = '/admin/login';
const DEFAULT_ADMIN_PATH = '/admin/faq-categories';
const SESSION_COOKIE_NAME = 'JSESSIONID';

export function proxy(req: NextRequest) {
    const hasSession = Boolean(req.cookies.get(SESSION_COOKIE_NAME)?.value);

    const { pathname } = req.nextUrl;
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
