export default function PriorityBadge({ priority }) { return <span className={`priority ${priority}`}>{priority}</span> } import React from 'react';
export const PriorityBadge = ({ priority }) => {
    return <span className={`priority-badge priority-${priority?.toLowerCase()}`}>{priority}</span>;
};