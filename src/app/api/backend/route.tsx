import { NextRequest, NextResponse } from 'next/server';
import { Request, Response } from '../../../../types/Common';
import { ResponseType } from '../../../../enum/Common';

const _fetch = async (param: Request) => {
    const result: Response = {
        type: ResponseType.SUCCESS,
        errorCode: '0000',
    };

};

export async function POST(req: NextRequest) {
    const body = await req.json();

    const result = await _fetch(body);

    const response = NextResponse.json(result);

    return response;
}