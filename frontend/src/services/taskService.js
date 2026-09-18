import api from './api';

export const taskService = {
    async getTasks(params = {}) {
        const res = await api.get('/tasks', { params });
        return res.data;
    },
    async createTask(data) {
        const res = await api.post('/tasks', data);
        return res.data;
    },
    async updateTask(id, data) {
        const res = await api.put(`/tasks/${id}`, data);
        return res.data;
    },
    async toggleComplete(id) {
        const res = await api.patch(`/tasks/${id}/complete`);
        return res.data;
    },
    async deleteTask(id) {
        await api.delete(`/tasks/${id}`);
    },
    async getStats() {
        const res = await api.get('/dashboard/stats');
        return res.data;
    }
};

export default taskService;