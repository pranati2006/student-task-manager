import api from './api';
import type { DashboardStats, Task, TaskPayload, TaskQueryParams } from '../types/task';

export const taskService = {
    async getTasks(params: TaskQueryParams = {}): Promise<Task[]> {
        const response = await api.get<Task[]>('/tasks/', { params });
        return response.data;
    },
    async createTask(data: TaskPayload): Promise<Task> {
        const response = await api.post<Task>('/tasks/', data);
        return response.data;
    },
    async updateTask(id: number, data: TaskPayload): Promise<Task> {
        const response = await api.put<Task>(`/tasks/${id}`, data);
        return response.data;
    },
    async toggleComplete(id: number): Promise<Task> {
        const response = await api.patch<Task>(`/tasks/${id}/complete`);
        return response.data;
    },
    async deleteTask(id: number): Promise<void> {
        await api.delete(`/tasks/${id}`);
    },
    async getStats(): Promise<DashboardStats> {
        const response = await api.get<DashboardStats>('/dashboard/stats');
        return response.data;
    }
};

export default taskService;
