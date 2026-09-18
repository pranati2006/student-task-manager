import { Link } from 'react-router-dom';
import { PriorityBadge } from './PriorityBadge';
import type { Task } from '../types/task';

interface TaskCardProps {
    task: Task;
    onToggle: (id: number) => void | Promise<void>;
    onDelete: (id: number) => void | Promise<void>;
}

const formatDueDate = (value: string): string => {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return 'Invalid date';
    }

    return new Intl.DateTimeFormat(undefined, {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    }).format(date);
};

export const TaskCard = ({
    task,
    onToggle,
    onDelete
}: TaskCardProps) => {
    const isCompleted = task.status === 'COMPLETED';

    return (
        <article className={`task-card task-priority-${task.priority.toLowerCase()} ${isCompleted ? 'completed' : ''}`}>
            <button
                type="button"
                className={`task-check ${isCompleted ? 'checked' : ''}`}
                aria-label={isCompleted ? 'Mark task as pending' : 'Mark task as completed'}
                aria-pressed={isCompleted}
                onClick={() => onToggle(task.id)}>
                <span aria-hidden="true">✓</span>
            </button>

            <div className="task-card-content">
                <div className="task-card-topline">
                    <Link to={`/tasks/${task.id}`} className="task-title-link">
                        {task.title}
                    </Link>
                    <PriorityBadge priority={task.priority} />
                </div>

                {task.description && (
                    <p className="task-description">{task.description}</p>
                )}

                <div className="task-meta">
                    <span className={`status-chip ${isCompleted ? 'status-completed' : 'status-pending'}`}>
                        {isCompleted ? 'Completed' : 'Pending'}
                    </span>

                    {task.due_date && (
                        <span className="task-due-date">
                            Due {formatDueDate(task.due_date)}
                        </span>
                    )}
                </div>
            </div>

            <div className="task-actions">
                <Link
                    to={`/tasks/${task.id}`}
                    className="btn btn-ghost btn-sm">
                    Edit
                </Link>

                <button
                    type="button"
                    className="btn btn-danger-ghost btn-sm"
                    onClick={() => onDelete(task.id)}>
                    Delete
                </button>
            </div>
        </article>
    );
};
