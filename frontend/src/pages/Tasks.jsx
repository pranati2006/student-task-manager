import React, { useEffect, useState, useCallback } from 'react';
import { taskService } from '../services/taskService';
import { TaskCard } from '../components/TaskCard';
import { TaskForm } from '../components/TaskForm';
import { TaskFilter } from '../components/TaskFilter';
import { SearchBar } from '../components/SearchBar';
import { Loading } from '../components/Loading';
import '../styles/tasks.css';

export const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState('');
    const [priorityFilter, setPriorityFilter] = useState('');
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('created_at');

    const fetchTasks = useCallback(async () => {
        setLoading(true);
        try {
            const params = {};
            if (statusFilter) params.status = statusFilter;
            if (priorityFilter) params.priority = priorityFilter;
            if (search) params.search = search;
            if (sort) params.sort = sort;
            const data = await taskService.getTasks(params);
            setTasks(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [statusFilter, priorityFilter, search, sort]);

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    const handleCreate = async (data) => {
        await taskService.createTask(data);
        fetchTasks();
    };

    const handleToggle = async (id) => {
        await taskService.toggleComplete(id);
        fetchTasks();
    };

    const handleDelete = async (id) => {
        await taskService.deleteTask(id);
        fetchTasks();
    };

    return (
        <div>
            <h1>Tasks</h1>
            <TaskForm onSubmit={handleCreate} />
            <SearchBar search={search} setSearch={setSearch} />
            <TaskFilter
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                priorityFilter={priorityFilter}
                setPriorityFilter={setPriorityFilter}
                sort={sort}
                setSort={setSort}
            />
            {loading ? (
                <Loading text="Loading tasks..." />
            ) : (
                <div className="task-list">
                    {tasks.length === 0 ? <p style={{ color: 'var(--text-muted)' }}>No tasks found.</p> : tasks.map(t => (
                        <TaskCard key={t.id} task={t} onToggle={handleToggle} onDelete={handleDelete} />
                    ))}
                </div>
            )}
        </div>
    );
};