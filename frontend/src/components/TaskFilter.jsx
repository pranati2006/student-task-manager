export default function TaskFilter({ value, onChange }) { return <select className="filter" value={value} onChange={e => onChange(e.target.value)}><option value="all">All tasks</option><option value="active">Active</option><option value="completed">Completed</option></select> } import React from 'react';

export const TaskFilter = ({ statusFilter, setStatusFilter, priorityFilter, setPriorityFilter, sort, setSort }) => (
    <div className="filters-bar" style={{ display: 'flex', gap: '0.8rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
            <option value="">All Status</option>
            <option value="PENDING">Pending</option>
            <option value="COMPLETED">Completed</option>
        </select>
        <select value={priorityFilter} onChange={e => setPriorityFilter(e.target.value)} style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
            <option value="">All Priorities</option>
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
        </select>
        <select value={sort} onChange={e => setSort(e.target.value)} style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
            <option value="created_at">Sort: Created Date</option>
            <option value="due_date">Sort: Due Date</option>
        </select>
    </div>
);