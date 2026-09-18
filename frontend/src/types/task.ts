export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH';
export type TaskStatus = 'PENDING' | 'COMPLETED';
export type TaskSort = 'created_at' | 'due_date';

export interface Task {
    id: number;
    user_id: number;
    title: string;
    description: string | null;
    priority: TaskPriority;
    status: TaskStatus;
    due_date: string | null;
    completed_at: string | null;
    created_at: string;
    updated_at: string;
}

export type TaskPayload = {
    title: string;
    description?: string | null;
    priority?: TaskPriority;
    status?: TaskStatus;
    due_date?: string | null;
};

export interface TaskQueryParams {
    status?: TaskStatus;
    priority?: TaskPriority;
    search?: string;
    sort?: TaskSort;
}

export interface DashboardStats {
    total_tasks: number;
    pending_tasks: number;
    completed_tasks: number;
    high_priority_tasks?: number;
    overdue_tasks: number;
}
