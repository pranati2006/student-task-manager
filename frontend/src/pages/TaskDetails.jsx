import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { taskService } from '../services/taskService';
import { TaskForm } from '../components/TaskForm';
import { Loading } from '../components/Loading';

export const TaskDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        taskService.getTasks().then(tasks => {
            const found = tasks.find(t => t.id === Number(id));
            setTask(found);
            setLoading(false);
        }).catch(() => setLoading(false));
    }, [id]);

    const handleUpdate = async (data) => {
        await taskService.updateTask(id, data);
        navigate('/tasks');
    };

    if (loading) return <Loading text="Loading task details..." />;
    if (!task) return <div>Task not found</div>;

    return (
        <div>
            <h2>Edit Task #{task.id}</h2>
            <TaskForm initialData={task} onSubmit={handleUpdate} />
        </div>
    );
};