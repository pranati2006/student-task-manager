import { useCallback, useEffect, useState } from 'react';
import { taskService } from '../services/taskService';
import { TaskCard } from '../components/TaskCard';
import { TaskForm } from '../components/TaskForm';
import { TaskFilter } from '../components/TaskFilter';
import { SearchBar } from '../components/SearchBar';
import { Loading } from '../components/Loading';
import { ErrorMessage } from '../components/ErrorMessage';
import { getApiErrorMessage } from '../utils/apiError';
import type { Task, TaskPayload, TaskPriority, TaskQueryParams, TaskSort, TaskStatus } from '../types/task';
import '../styles/tasks.css';

export const Tasks = () => {
    const [tasks, setTasks] = useState<Task[]>([]); const [loading, setLoading] = useState(true); const [error, setError] = useState('');
    const [statusFilter, setStatusFilter] = useState<TaskStatus | ''>(''); const [priorityFilter, setPriorityFilter] = useState<TaskPriority | ''>(''); const [search, setSearch] = useState(''); const [sort, setSort] = useState<TaskSort>('created_at');
    const fetchTasks = useCallback(async () => { setLoading(true); setError(''); try { const params: TaskQueryParams = { sort }; if (statusFilter) params.status = statusFilter; if (priorityFilter) params.priority = priorityFilter; if (search.trim()) params.search = search.trim(); setTasks(await taskService.getTasks(params)); } catch (errorValue: unknown) { setError(getApiErrorMessage(errorValue, 'Tasks could not be loaded. Check that the API is running and try again.')); } finally { setLoading(false); } }, [priorityFilter, search, sort, statusFilter]);
    useEffect(() => { void fetchTasks(); }, [fetchTasks]);
    const createTask = async (data: TaskPayload) => { await taskService.createTask(data); await fetchTasks(); };
    const toggleTask = async (id: number) => { await taskService.toggleComplete(id); await fetchTasks(); };
    const deleteTask = async (id: number) => { await taskService.deleteTask(id); await fetchTasks(); };
    return <div className="page-shell tasks-page"><div className="page-header"><div><span className="eyebrow">Workspace</span><h1>Tasks</h1><p>Capture, prioritize, and finish your work.</p></div></div><TaskForm onSubmit={createTask} /><section className="task-toolbar" aria-label="Task filters"><SearchBar search={search} setSearch={setSearch} /><TaskFilter statusFilter={statusFilter} setStatusFilter={setStatusFilter} priorityFilter={priorityFilter} setPriorityFilter={setPriorityFilter} sort={sort} setSort={setSort} /></section><ErrorMessage message={error} onRetry={() => void fetchTasks()} />{loading ? <Loading text="Loading tasks..." /> : <div className="task-list">{tasks.length ? tasks.map((task) => <TaskCard key={task.id} task={task} onToggle={toggleTask} onDelete={deleteTask} />) : <p className="empty-state">No tasks match these filters.</p>}</div>}</div>;
};
