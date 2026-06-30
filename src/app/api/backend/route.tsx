import { NextRequest, NextResponse } from 'next/server';
import { ResponseType } from '../../../../enum/Common';
import { Request, Response } from '../../../../types/Common';

const BACKEND_ENV_SOURCE = process.env.BACK_URL
    ? 'BACK_URL'
    : process.env.NEXT_PUBLIC_BACK_URL
        ? 'NEXT_PUBLIC_BACK_URL'
        : process.env.BASE_URL
            ? 'BASE_URL'
            : 'NOT_CONFIGURED';
const DOMAIN = process.env.BACK_URL || process.env.NEXT_PUBLIC_BACK_URL || process.env.BASE_URL || 'https://help-api.bizbee.co.kr/api';

const API_PATH = {
    LOGIN: '/admin/login',
    LOGOUT: '/admin/logout',
} as const;

const SESSION_COOKIE_NAME = 'JSESSIONID';

type BackendResult = {
    data: Response;
    cookies: string[];
};

type ResponseContext = {
    isLogin?: boolean;
    isLogout?: boolean;
};

const createFailResponse = (message: string, errorCode: string = '9999'): Response => ({
    type: ResponseType.FAIL,
    errorCode,
    message,
});

const getBackendUrl = (url: string) => {
    if (!DOMAIN) {
        throw new Error('Backend domain is not configured.');
    }

    return `${DOMAIN}${url}`;
};

const getBackendUrlWithQuery = (url: string, param?: object) => {
    const backendUrl = getBackendUrl(url);

    if (!param) {
        return backendUrl;
    }

    const searchParams = new URLSearchParams();
    Object.entries(param as Record<string, unknown>).forEach(([key, value]) => {
        if (value === undefined || value === null || value === '') {
            return;
        }

        searchParams.append(key, String(value));
    });

    const queryString = searchParams.toString();

    return queryString ? `${backendUrl}?${queryString}` : backendUrl;
};

const logBackendRequest = (method: string, requestUrl: string, backendUrl: string) => {
    console.info('[Backend Proxy Request]', {
        envSource: BACKEND_ENV_SOURCE,
        domain: DOMAIN || null,
        method,
        requestUrl,
        backendUrl,
    });
};

const getErrorMessage = (error: unknown) => {
    return error instanceof Error ? error.message : '요청 처리 중 오류가 발생했습니다.';
};

const createForwardHeaders = (req: NextRequest) => {
    const headers = new Headers();
    const cookie = req.headers.get('cookie');
    const authorization = req.headers.get('authorization');

    if (cookie) headers.set('cookie', cookie);
    if (authorization) headers.set('authorization', authorization);

    return headers;
};

const readSetCookies = (headers: Headers) => {
    const headersWithCookies = headers as Headers & {
        getSetCookie?: () => string[];
    };
    const setCookies = headersWithCookies.getSetCookie?.();

    if (setCookies && setCookies.length > 0) {
        return setCookies;
    }

    const setCookie = headers.get('set-cookie');

    return setCookie ? [setCookie] : [];
};

const resolveResponseType = (data: Response) => {
    if (data.type) {
        return data.type;
    }

    return data.errorCode && data.errorCode !== '0000' ? ResponseType.FAIL : ResponseType.SUCCESS;
};

const isSuccess = (data: Response) => {
    return data.type === ResponseType.SUCCESS && data.errorCode === '0000';
};

const normalizeSessionCookie = (cookie: string) => {
    if (!cookie.toLowerCase().startsWith(`${SESSION_COOKIE_NAME.toLowerCase()}=`)) {
        return cookie;
    }

    const cookieWithoutDomain = cookie.replace(/;\s*domain=[^;]*/i, '');

    if (/;\s*path=/i.test(cookieWithoutDomain)) {
        return cookieWithoutDomain.replace(/;\s*path=[^;]*/i, '; Path=/');
    }

    return `${cookieWithoutDomain}; Path=/`;
};

const deleteSessionCookie = (response: NextResponse) => {
    response.cookies.delete(SESSION_COOKIE_NAME);
};

const appendBackendCookies = (response: NextResponse, cookies: string[]) => {
    cookies.map(normalizeSessionCookie).forEach((cookie) => {
        response.headers.append('Set-Cookie', cookie);
    });
};

const parseBackendResponse = async (res: globalThis.Response): Promise<BackendResult> => {
    const contentType = res.headers.get('content-type');
    const rawData = contentType?.includes('application/json') ? await res.json() : { result: await res.text() };
    const cookies = readSetCookies(res.headers);

    if (!res.ok) {
        return {
            data: {
                type: ResponseType.FAIL,
                errorCode: rawData?.errorCode || String(res.status),
                message: rawData?.message || '요청에 실패했습니다.',
                result: rawData?.result,
            },
            cookies,
        };
    }

    return {
        data: {
            type: resolveResponseType(rawData),
            errorCode: rawData?.errorCode || '0000',
            message: rawData?.message,
            result: rawData?.result ?? rawData,
        },
        cookies,
    };
};

const createProxyResponse = ({ data, cookies }: BackendResult, context: ResponseContext = {}) => {
    const response = NextResponse.json(data);
    const shouldForwardCookies = !context.isLogout && (!context.isLogin || isSuccess(data));

    if (shouldForwardCookies) {
        appendBackendCookies(response, cookies);
    }

    if (context.isLogout || (context.isLogin && !isSuccess(data))) {
        deleteSessionCookie(response);
    }

    return response;
};

const requestBackendJson = async (param: Request, headers: Headers) => {
    headers.set('Content-Type', 'application/json');

    const backendUrl = param.method === 'GET' ? getBackendUrlWithQuery(param.url, param.param) : getBackendUrl(param.url);

    logBackendRequest(param.method, param.url, backendUrl);

    const res = await fetch(backendUrl, {
        method: param.method,
        headers,
        body: param.method === 'GET' ? undefined : JSON.stringify(param.param || {}),
        cache: 'no-store',
        credentials: 'include',
    });

    return parseBackendResponse(res);
};

const requestBackendFormData = async (formData: FormData, headers: Headers) => {
    const url = formData.get('url');

    if (typeof url !== 'string') {
        return {
            data: createFailResponse('업로드 요청 URL이 없습니다.'),
            cookies: [],
        };
    }

    formData.delete('url');

    const backendUrl = getBackendUrl(url);

    logBackendRequest('POST', url, backendUrl);

    const res = await fetch(backendUrl, {
        method: 'POST',
        headers,
        body: formData,
        cache: 'no-store',
    });

    return parseBackendResponse(res);
};

export async function POST(req: NextRequest) {
    try {
        const headers = createForwardHeaders(req);
        const contentType = req.headers.get('content-type') || '';

        if (contentType.includes('multipart/form-data')) {
            const result = await requestBackendFormData(await req.formData(), headers);

            return createProxyResponse(result);
        }

        const body: Request = await req.json();
        const result = await requestBackendJson(body, headers);

        return createProxyResponse(result, {
            isLogin: body.url === API_PATH.LOGIN,
            isLogout: body.url === API_PATH.LOGOUT,
        });
    } catch (error) {
        return NextResponse.json(createFailResponse(getErrorMessage(error)));
    }
}
