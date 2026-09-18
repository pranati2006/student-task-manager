import { useEffect, useState } from 'react';
import { taskService } from '../services/taskService';
import { Loading } from '../components/Loading';
import { ErrorMessage } from '../components/ErrorMessage';
import type { DashboardStats } from '../types/task';
import '../styles/dashboard.css';

const emptyStats: DashboardStats = { total_tasks: 0, pending_tasks: 0, completed_tasks: 0, overdue_tasks: 0 };

export const Dashboard = () => {
    const [stats, setStats] = useState<DashboardStats>(emptyStats);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    useEffect(() => { taskService.getStats().then(setStats).catch(() => setError('Dashboard metrics could not be loaded.')).finally(() => setLoading(false)); }, []);
    if (loading) return <Loading text="Loading dashboard metrics..." />;
    return <div className="page-shell dashboard-page"><div className="page-header"><div><span className="eyebrow">Overview</span><h1>Dashboard</h1><p>Keep your coursework moving forward.</p></div></div><ErrorMessage message={error} /><div className="stats-grid"><div className="stat-card"><h3>Total tasks</h3><p>{stats.total_tasks}</p></div><div className="stat-card"><h3>Pending</h3><p>{stats.pending_tasks}</p></div><div className="stat-card"><h3>Completed</h3><p>{stats.completed_tasks}</p></div><div className="stat-card"><h3>Overdue</h3><p>{stats.overdue_tasks}</p></div></div></div>;
};
