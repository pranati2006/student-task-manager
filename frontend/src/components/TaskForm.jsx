import React, { useState } from 'react';

export const TaskForm = ({ onSubmit, initialData = {} }) => {
    const [title, setTitle] = useState(initialData.title || '');
    const [description, setDescription] = useState(initialData.description || '');
    const [priority, setPriority] = useState(initialData.priority || 'MEDIUM');
    const [dueDate, setDueDate] = useState(initialData.due_date ? initialData.due_date.slice(0, 16) : '');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return;
        onSubmit({
            title,
            description: description || null,
            priority,
            due_date: dueDate ? new Date(dueDate).toISOString() : null,
        });
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', background: 'white', padding: '1.25rem', borderRadius: '8px', border: '1px solid var(--border-color)', marginBottom: '1.5rem' }}>
            <input placeholder="Task title..." value={title} onChange={e => setTitle(e.target.value)} required style={{ padding: '0.6rem', border: '1px solid var(--border-color)', borderRadius: '4px' }} />
            <textarea placeholder="Description (optional)..." value={description} onChange={e => setDescription(e.target.value)} style={{ padding: '0.6rem', border: '1px solid var(--border-color)', borderRadius: '4px', resize: 'vertical' }} />
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <select value={priority} onChange={e => setPriority(e.target.value)} style={{ padding: '0.6rem', border: '1px solid var(--border-color)', borderRadius: '4px' }}>
                    <option value="LOW">LOW</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="HIGH">HIGH</option>
                </select>
                <input type="datetime-local" value={dueDate} onChange={e => setDueDate(e.target.value)} style={{ padding: '0.6rem', border: '1px solid var(--border-color)', borderRadius: '4px' }} />
                <button type="submit" style={{ marginLeft: 'auto' }}>Save Task</button>
            </div>
        </form>
    );
};