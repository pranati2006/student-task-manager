import React, { useEffect, useState } from 'react';
import { taskService } from '../services/taskService';
import { Loading } from '../components/Loading';
import '../styles/dashboard.css';

export const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        taskService.getStats()
            .then(setStats)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <Loading text="Loading dashboard metrics..." />;

    return (
        <div>
            <h1>Dashboard</h1>
            <div className="stats-grid" style={{ marginTop: '1.5rem' }}>
                <div className="stat-card"><h3>Total Tasks</h3><p>{stats?.total_tasks || 0}</p></div>
                <div className="stat-card"><h3>Pending</h3><p>{stats?.pending_tasks || 0}</p></div>
                <div className="stat-card"><h3>Completed</h3><p>{stats?.completed_tasks || 0}</p></div>
                <div className="stat-card"><h3>Overdue</h3><p>{stats?.overdue_tasks || 0}</p></div>
            </div>
        </div>
    );
};