import { RequestType, ResponseType } from '../enum/Common';
import { Method } from 'axios';

export type Request = {
    url: string;
    method: Method;
    param?: object;
    type?: RequestType;
};

export type Response = {
    type: ResponseType;
    result?: object;
    errorCode: string;
    message?: string;
};