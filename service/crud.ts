import axiosInstance from '../libs/axios';
import { ResponseType } from '../enum/Common';
import { Response } from '../types/Common';

export const Post = (url: string, payload: object, callback?: (response: Response) => void, isAlert: boolean = true) => {
    const response: Response = {
        type: ResponseType.SUCCESS,
        errorCode: '0000',
    };

    axiosInstance
        .post('/api/backend', {
            url,
            method: 'POST',
            param: payload,
        })
        .then((res) => {
            response.result = res.data.result;
            response.message = res.data.message;
            response.errorCode = res.data.errorCode;

            if (typeof callback === 'function') callback(response);
        })
        .catch((error) => {
            console.error(error);
            response.type = ResponseType.FAIL;
            response.message = '요청에 실패하였습니다.';
        })
        .finally(() => {
            if (isAlert) alert(response.message);
        });
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
    const response: Response = {
        type: ResponseType.SUCCESS,
        errorCode: '0000',
    };
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
            response.message = '파일 업로드에 실패하였습니다.';
            alert(response.message);
        });
};

export const Patch = (url: string, payload: object, callback?: (response: Response) => void, isAlert: boolean = true) => {
    const response: Response = {
        type: ResponseType.SUCCESS,
        errorCode: '0000',
    };

    axiosInstance
        .post('/api/backend', {
            url,
            method: 'PATCH',
            param: payload,
        })
        .then((res) => {
            response.result = res.data.result;
            response.message = res.data.message;
            response.errorCode = res.data.errorCode;

            if (typeof callback === 'function') callback(response);
        })
        .catch((error) => {
            console.error(error);
            response.type = ResponseType.FAIL;
            response.message = '수정 요청에 실패하였습니다.';
        })
        .finally(() => {
            if (isAlert && response.message) alert(response.message);
        });
};

export const Delete = (url: string, payload: object = {}, callback?: (response: Response) => void, isAlert: boolean = true) => {
    const response: Response = {
        type: ResponseType.SUCCESS,
        errorCode: '0000',
    };

    axiosInstance
        .post('/api/backend', {
            url,
            method: 'DELETE', // 백엔드 프록시가 인식할 메서드
            param: payload,
        })
        .then((res) => {
            response.result = res.data.result;
            response.message = res.data.message;
            response.errorCode = res.data.errorCode;

            if (typeof callback === 'function') callback(response);
        })
        .catch((error) => {
            console.error(error);
            response.type = ResponseType.FAIL;
            response.message = '삭제 요청에 실패하였습니다.';
        })
        .finally(() => {
            if (isAlert && response.message) alert(response.message);
        });
};