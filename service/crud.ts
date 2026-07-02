import axiosInstance from '../libs/axios';
import { ResponseType } from '../enum/Common';
import { Response } from '../types/Common';

type ProxyMethod = 'POST' | 'PATCH' | 'DELETE';

const isUnauthorizedError = (error: unknown) => {
    if (!error || typeof error !== 'object') {
        return false;
    }

    const axiosError = error as { response?: { status?: number } };

    return axiosError.response?.status === 401;
};

const createResponse = (): Response => ({
    type: ResponseType.SUCCESS,
    errorCode: '0000',
});

const applyProxyResponse = (response: Response, data: Response) => {
    response.type = data.type;
    response.result = data.result;
    response.message = data.message;
    response.errorCode = data.errorCode;
};

const requestByProxy = (
    method: ProxyMethod,
    url: string,
    payload: object,
    failMessage: string,
    callback?: (response: Response) => void,
    isAlert: boolean = true,
) => {
    const response = createResponse();

    axiosInstance
        .post('/api/backend', {
            url,
            method,
            param: payload,
        })
        .then((res) => {
            applyProxyResponse(response, res.data);

            if (typeof callback === 'function') callback(response);
        })
        .catch((error) => {
            console.error(error);
            response.type = ResponseType.FAIL;
            if (!isUnauthorizedError(error)) {
                response.message = failMessage;
            }
        })
        .finally(() => {
            if (isAlert && response.message) alert(response.message);
        });
};

export const Post = (url: string, payload: object, callback?: (response: Response) => void, isAlert: boolean = true) => {
    requestByProxy('POST', url, payload, '요청에 실패하였습니다.', callback, isAlert);
};

export const Get = (url: string, callback?: (response: Response) => void) => {
    const response: Response = {
        type: ResponseType.SUCCESS,
        errorCode: '0000',
    };

    axiosInstance
        .post('/api/backend', {
            url,
            method: 'GET',
        })
        .then((res) => {
            response.result = res.data.result;
            if (typeof callback === 'function') callback(response);
        })
        .catch((error) => {
            console.error(error);
        });
};
export const Upload = (url: string, formData: FormData, callback?: (response: Response) => void) => {
    const response = createResponse();
    formData.append('url', url);

    axiosInstance
        .post('/api/backend', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then((res) => {
            response.result = res.data.result;
            response.message = res.data.message;
            response.errorCode = res.data.errorCode;

            if (typeof callback === 'function') callback(response);
        })
        .catch((error) => {
            console.error('Upload Error:', error);
            response.type = ResponseType.FAIL;
            if (!isUnauthorizedError(error)) {
                response.message = '파일 업로드에 실패하였습니다.';
                alert(response.message);
            }
        });
};

export const Patch = (url: string, payload: object, callback?: (response: Response) => void, isAlert: boolean = true) => {
    requestByProxy('PATCH', url, payload, '수정 요청에 실패하였습니다.', callback, isAlert);
};

export const Delete = (url: string, payload: object = {}, callback?: (response: Response) => void, isAlert: boolean = true) => {
    requestByProxy('DELETE', url, payload, '삭제 요청에 실패하였습니다.', callback, isAlert);
};
