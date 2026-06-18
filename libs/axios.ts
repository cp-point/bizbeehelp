import axios from 'axios';
import { userStore } from '../store/userStore';

const axiosInstance = axios.create({
    baseURL: process.env.BASE_URL,
    withCredentials: true,
});

const LOGIN_PATH = '/admin/login';

const handleUnauthorized = () => {
    userStore.getState().reset();

    if (typeof window === 'undefined') {
        return;
    }

    if (window.location.pathname === LOGIN_PATH) {
        alert('정보가 일치하는 회원이 없습니다.');
        return;
    }

    window.location.href = `${LOGIN_PATH}?loginRequired=true`;
};

axiosInstance.interceptors.request.use((config) => {
    return config;
});

axiosInstance.interceptors.response.use(
    async (response) => {
        return response;
    },
    async (error) => {
        const status = error.response?.status;
        if (status === 401) {
            handleUnauthorized();
        } else if (status === 403) {
            alert('권한이 없습니다.');
        }
        return Promise.reject(error);
    },
);

export default axiosInstance;
