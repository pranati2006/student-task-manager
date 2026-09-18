import type {
    TaskPriority,
    TaskSort,
    TaskStatus
} from '../types/task';

interface TaskFilterProps {
    statusFilter: TaskStatus | '';
    setStatusFilter: (value: TaskStatus | '') => void;
    priorityFilter: TaskPriority | '';
    setPriorityFilter: (value: TaskPriority | '') => void;
    sort: TaskSort;
    setSort: (value: TaskSort) => void;
}

export const TaskFilter = ({
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
    sort,
    setSort
}: TaskFilterProps) => (
    <div className="filters-bar">
        <label className="filter-control">
            <span>Status</span>
            <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value as TaskStatus | '')}>
                <option value="">All status</option>
                <option value="PENDING">Pending</option>
                <option value="COMPLETED">Completed</option>
            </select>
        </label>

        <label className="filter-control">
            <span>Priority</span>
            <select
                value={priorityFilter}
                onChange={(event) => setPriorityFilter(event.target.value as TaskPriority | '')}>
                <option value="">All priorities</option>
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
            </select>
        </label>

        <label className="filter-control filter-control-sort">
            <span>Sort by</span>
            <select
                value={sort}
                onChange={(event) => setSort(event.target.value as TaskSort)}>
                <option value="created_at">Created date</option>
                <option value="due_date">Due date</option>
            </select>
        </label>
    </div>
);
