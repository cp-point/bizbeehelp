import { NextRequest, NextResponse } from 'next/server';
import { Request, Response } from '../../../../types/Common';
import { ResponseType } from '../../../../enum/Common';

const DOMAIN = process.env.BACK_URL || process.env.NEXT_PUBLIC_BACK_URL || process.env.BASE_URL;

const createFailResponse = (message: string, errorCode: string = '9999'): Response => ({
    type: ResponseType.FAIL,
    errorCode,
    message,
});

const getErrorMessage = (error: unknown) => {
    return error instanceof Error ? error.message : '요청 처리 중 오류가 발생했습니다.';
};

const getBackendUrl = (url: string) => {
    if (!DOMAIN) {
        throw new Error('Backend domain is not configured.');
    }

    return `${DOMAIN}${url}`;
};

const getForwardHeaders = (req: NextRequest) => {
    const headers = new Headers();
    const cookie = req.headers.get('cookie');
    const authorization = req.headers.get('authorization');

    if (cookie) headers.set('cookie', cookie);
    if (authorization) headers.set('authorization', authorization);

    return headers;
};

const parseBackendResponse = async (res: globalThis.Response): Promise<Response> => {
    const contentType = res.headers.get('content-type');
    const data = contentType?.includes('application/json') ? await res.json() : { result: await res.text() };

    if (!res.ok) {
        return {
            type: ResponseType.FAIL,
            errorCode: data?.errorCode || String(res.status),
            message: data?.message || '요청에 실패했습니다.',
            result: data?.result,
        };
    }

    return {
        type: data?.type || ResponseType.SUCCESS,
        errorCode: data?.errorCode || '0000',
        message: data?.message,
        result: data?.result ?? data,
    };
};

const fetchJson = async (param: Request, headers: Headers): Promise<Response> => {
    headers.set('Content-Type', 'application/json');

    const res = await fetch(getBackendUrl(param.url), {
        method: param.method,
        headers,
        body: param.method === 'GET' ? undefined : JSON.stringify(param.param || {}),
        cache: 'no-store',
    });

    return parseBackendResponse(res);
};

const fetchFormData = async (formData: FormData, headers: Headers): Promise<Response> => {
    const url = formData.get('url');

    if (typeof url !== 'string') {
        return createFailResponse('업로드 요청 URL이 없습니다.');
    }

    formData.delete('url');

    const res = await fetch(getBackendUrl(url), {
        method: 'POST',
        headers,
        body: formData,
        cache: 'no-store',
    });

    return parseBackendResponse(res);
};

export async function POST(req: NextRequest) {
    try {
        const contentType = req.headers.get('content-type') || '';
        const headers = getForwardHeaders(req);

        if (contentType.includes('multipart/form-data')) {
            const formData = await req.formData();
            const result = await fetchFormData(formData, headers);

            return NextResponse.json(result);
        }

        const body = await req.json();
        const result = await fetchJson(body, headers);

        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json(createFailResponse(getErrorMessage(error)));
    }
}
