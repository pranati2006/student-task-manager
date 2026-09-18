import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { taskService } from '../services/taskService';
import { TaskForm } from '../components/TaskForm';
import { Loading } from '../components/Loading';
import { ErrorMessage } from '../components/ErrorMessage';
import type { Task, TaskPayload } from '../types/task';
import '../styles/tasks.css';

export const TaskDetails = () => {
    const { id } = useParams<{ id: string }>(); const navigate = useNavigate(); const [task, setTask] = useState<Task | null>(null); const [loading, setLoading] = useState(true); const [error, setError] = useState('');
    useEffect(() => { const taskId = Number(id); if (!Number.isInteger(taskId) || taskId <= 0) { setError('Invalid task ID.'); setLoading(false); return; } taskService.getTasks().then((items) => setTask(items.find((item) => item.id === taskId) ?? null)).catch(() => setError('Unable to load this task.')).finally(() => setLoading(false)); }, [id]);
    const updateTask = async (data: TaskPayload) => { if (task) { await taskService.updateTask(task.id, data); navigate('/tasks'); } };
    if (loading) return <Loading text="Loading task details..." />;
    return <div className="page-shell task-details-page"><div className="page-header"><div><span className="eyebrow">Task #{id}</span><h1>Edit task</h1></div><Link to="/tasks" className="btn btn-secondary">Back to tasks</Link></div><ErrorMessage message={error} />{task && <TaskForm initialData={task} onSubmit={updateTask} submitLabel="Update task" />}</div>;
};
