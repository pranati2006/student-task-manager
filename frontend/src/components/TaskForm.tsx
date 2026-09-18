import {
    useEffect,
    useState,
    type FormEvent
} from 'react';
import type {
    Task,
    TaskPayload,
    TaskPriority
} from '../types/task';

interface TaskFormProps {
    onSubmit: (data: TaskPayload) => void | Promise<void>;
    initialData?: Partial<Task>;
    submitLabel?: string;
}

const toLocalDateTimeValue = (value?: string | null): string => {
    if (!value) {
        return '';
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return value.slice(0, 16);
    }

    const offset = date.getTimezoneOffset() * 60_000;
    return new Date(date.getTime() - offset).toISOString().slice(0, 16);
};

export const TaskForm = ({
    onSubmit,
    initialData,
    submitLabel = 'Save task'
}: TaskFormProps) => {
    const [title, setTitle] = useState(initialData?.title ?? '');
    const [description, setDescription] = useState(initialData?.description ?? '');
    const [priority, setPriority] = useState<TaskPriority>(initialData?.priority ?? 'MEDIUM');
    const [dueDate, setDueDate] = useState(toLocalDateTimeValue(initialData?.due_date));
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        setTitle(initialData?.title ?? '');
        setDescription(initialData?.description ?? '');
        setPriority(initialData?.priority ?? 'MEDIUM');
        setDueDate(toLocalDateTimeValue(initialData?.due_date));
    }, [initialData]);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const cleanTitle = title.trim();
        if (!cleanTitle || submitting) {
            return;
        }

        setSubmitting(true);

        try {
            await onSubmit({
                title: cleanTitle,
                description: description.trim() || null,
                priority,
                due_date: dueDate ? new Date(dueDate).toISOString() : null
            });

            if (!initialData?.id) {
                setTitle('');
                setDescription('');
                setPriority('MEDIUM');
                setDueDate('');
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form className="task-form card" onSubmit={handleSubmit}>
            <div className="task-form-heading">
                <div>
                    <span className="eyebrow">Task details</span>
                    <h2>{initialData?.id ? 'Update task' : 'Create a new task'}</h2>
                </div>
                <span className="task-form-hint">Fields marked * are required</span>
            </div>

            <div className="form-group">
                <label htmlFor="task-title">Title *</label>
                <input
                    id="task-title"
                    type="text"
                    placeholder="e.g. Finish database assignment"
                    value={title}
                    maxLength={150}
                    onChange={(event) => setTitle(event.target.value)}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="task-description">Description</label>
                <textarea
                    id="task-description"
                    placeholder="Add notes, requirements, or useful context..."
                    value={description}
                    rows={4}
                    onChange={(event) => setDescription(event.target.value)}
                />
            </div>

            <div className="task-form-grid">
                <div className="form-group">
                    <label htmlFor="task-priority">Priority</label>
                    <select
                        id="task-priority"
                        value={priority}
                        onChange={(event) => setPriority(event.target.value as TaskPriority)}>
                        <option value="LOW">Low</option>
                        <option value="MEDIUM">Medium</option>
                        <option value="HIGH">High</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="task-due-date">Due date</label>
                    <input
                        id="task-due-date"
                        type="datetime-local"
                        value={dueDate}
                        onChange={(event) => setDueDate(event.target.value)}
                    />
                </div>
            </div>

            <div className="form-actions">
                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={submitting || !title.trim()}>
                    {submitting ? 'Saving...' : submitLabel}
                </button>
            </div>
        </form>
    );
};
