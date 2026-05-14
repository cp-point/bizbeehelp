// import axios from 'axios';
//
// const axiosInstance = axios.create({
//     baseURL: '/',
// });
// axiosInstance.interceptors.request.use((config) => {
//     const token = localStorage.getItem('Authorization');
//     const refreshToken = localStorage.getItem('Refresh-Token');
//     if (token) {
//         config.headers.Authorization = token;
//     }
//     if (refreshToken) {
//         config.headers['Refresh-Token'] = refreshToken;
//     }
//     return config;
// });
//
// axiosInstance.interceptors.response.use(
//     async (response) => {
//         return response;
//     },
//     async (error) => {
//         const errorCode = error.response.status;
//         if (errorCode === 403) {
//             alert('토큰이 만료되었습니다.\n다시 로그인 해주세요.');
//             localStorage.clear();
//             window.location.href = '/member/login';
//             return;
//         }
//         if (errorCode === 401) {
//             alert('아이디 혹은 비밀번호가 잘못되었습니다.');
//             return;
//         }
//     },
// );
//
// export default axiosInstance;

import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.BASE_URL,
    withCredentials: true,
});

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
            alert('정보가 일치하는 회원이 없습니다.');
            // window.location.href = '/member/login';
        } else if (status === 403) {
            alert('권한이 없습니다.');
        }
        return Promise.reject(error);
    },
);

export default axiosInstance;
