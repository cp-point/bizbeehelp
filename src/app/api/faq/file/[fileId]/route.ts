import { NextRequest, NextResponse } from 'next/server';

const DOMAIN = process.env.BACK_URL || process.env.NEXT_PUBLIC_BACK_URL || process.env.BASE_URL || 'https://help-api.bizbee.co.kr';

type FaqFileRouteContext = {
    params: Promise<{
        fileId: string;
    }>;
};

const readResultValue = (result: Record<string, unknown>, keys: string[]) => {
    return keys.map((key) => result[key]).find((value) => value !== undefined && value !== null);
};

const createForwardHeaders = (req: NextRequest) => {
    const headers = new Headers();
    const cookie = req.headers.get('cookie');

    if (cookie) {
        headers.set('cookie', cookie);
    }

    return headers;
};

const createImageResponseFromJson = async (res: globalThis.Response) => {
    const data = await res.json();
    const result = data?.result ?? data;

    if (!result || typeof result !== 'object') {
        return new NextResponse(null, { status: 404 });
    }

    const fileResult = result as Record<string, unknown>;
    const fileData = readResultValue(fileResult, ['fileData', 'data', 'base64']);
    const mimeType = readResultValue(fileResult, ['mimeType', 'contentType', 'type']) || 'application/octet-stream';

    if (typeof fileData !== 'string' || !fileData.trim()) {
        return new NextResponse(null, { status: 404 });
    }

    const base64Data = fileData.includes(',') ? fileData.split(',').pop() || '' : fileData;
    const body = Buffer.from(base64Data, 'base64');

    return new NextResponse(body, {
        headers: {
            'Content-Type': String(mimeType),
            'Cache-Control': 'public, max-age=31536000, immutable',
        },
    });
};

export async function GET(req: NextRequest, context: FaqFileRouteContext) {
    const { fileId } = await context.params;
    const backendUrl = `${DOMAIN}/faq/file/${encodeURIComponent(fileId)}`;
    const res = await fetch(backendUrl, {
        method: 'GET',
        headers: createForwardHeaders(req),
        cache: 'no-store',
    });

    if (!res.ok) {
        return new NextResponse(null, { status: res.status });
    }

    const contentType = res.headers.get('content-type') || '';

    if (contentType.includes('application/json')) {
        return createImageResponseFromJson(res);
    }

    return new NextResponse(res.body, {
        headers: {
            'Content-Type': contentType || 'application/octet-stream',
            'Cache-Control': 'public, max-age=31536000, immutable',
        },
    });
}
