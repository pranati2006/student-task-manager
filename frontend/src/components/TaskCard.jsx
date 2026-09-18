import React from 'react';
import { PriorityBadge } from './PriorityBadge';
import { Link } from 'react-router-dom';

export const TaskCard = ({ task, onToggle, onDelete }) => (
    <div className={`task-card ${task.status === 'COMPLETED' ? 'completed' : ''}`}>
        <div>
            <input
                type="checkbox"
                checked={task.status === 'COMPLETED'}
                onChange={() => onToggle(task.id)}
                style={{ marginRight: '0.8rem' }}
            />
            <Link to={`/tasks/${task.id}`} style={{ fontWeight: '600', color: 'inherit', textDecoration: 'none' }}>
                {task.title}
            </Link>
            {task.description && <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>{task.description}</p>}
            <div style={{ marginTop: '0.4rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <PriorityBadge priority={task.priority} />
                {task.due_date && <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Due: {new Date(task.due_date).toLocaleDateString()}</span>}
            </div>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Link to={`/tasks/${task.id}`} className="btn-secondary" style={{ fontSize: '0.8rem', padding: '0.3rem 0.6rem', textDecoration: 'none' }}>Edit</Link>
            <button className="btn-secondary" style={{ fontSize: '0.8rem', padding: '0.3rem 0.6rem', color: 'var(--danger)' }} onClick={() => onDelete(task.id)}>Delete</button>
        </div>
    </div>
);