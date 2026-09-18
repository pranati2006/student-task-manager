import api from './api';
import type { LoginResponse, RefreshResponse, RegisterPayload, User } from '../types/auth';

export const authService = {
    async login(email: string, password: string): Promise<LoginResponse> {
        const response = await api.post<LoginResponse>('/auth/login', { email, password });
        return response.data;
    },
    async register(userData: RegisterPayload): Promise<void> {
        await api.post('/auth/register', userData);
    },
    async getMe(): Promise<User> {
        const response = await api.get<User>('/auth/me');
        return response.data;
    },
    async refresh(refreshToken: string): Promise<RefreshResponse> {
        const response = await api.post<RefreshResponse>('/auth/refresh', { refresh_token: refreshToken });
        return response.data;
    }
};

export default authService;
