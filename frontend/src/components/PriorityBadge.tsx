import type { TaskPriority } from '../types/task';

interface PriorityBadgeProps {
    priority?: TaskPriority | null;
}

export const PriorityBadge = ({
    priority = 'MEDIUM'
}: PriorityBadgeProps) => {
    const normalized = (priority ?? 'MEDIUM').toUpperCase() as TaskPriority;
    const label = normalized === 'HIGH' ? 'Hard' : normalized === 'LOW' ? 'Easy' : 'Medium';

    return (
        <span className={`priority-badge priority-${normalized.toLowerCase()}`}>
            <span className="priority-dot" aria-hidden="true" />
            {label}
        </span>
    );
};
