import axios from 'axios';
import type { RefreshResponse } from '../types/auth';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000'
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

api.interceptors.response.use(
    (response) => response,
    async (error: unknown) => {
        if (!axios.isAxiosError(error) || error.response?.status !== 401) {
            return Promise.reject(error);
        }

        const originalRequest = error.config as (typeof error.config & { _retry?: boolean }) | undefined;
        const requestUrl = originalRequest?.url ?? '';
        const refreshToken = localStorage.getItem('refresh_token');

        if (!originalRequest || originalRequest._retry || !refreshToken || requestUrl.includes('/auth/')) {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            return Promise.reject(error);
        }

        originalRequest._retry = true;

        try {
            const refreshResponse = await axios.post<RefreshResponse>(
                `${api.defaults.baseURL}/auth/refresh`,
                { refresh_token: refreshToken }
            );
            localStorage.setItem('access_token', refreshResponse.data.access_token);
            if (refreshResponse.data.refresh_token) {
                localStorage.setItem('refresh_token', refreshResponse.data.refresh_token);
            }
            originalRequest.headers.Authorization = `Bearer ${refreshResponse.data.access_token}`;
            return api(originalRequest);
        } catch (refreshError) {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            return Promise.reject(refreshError);
        }
    }
);

export default api;
