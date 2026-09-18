import React from 'react';

export const PriorityBadge = ({ priority }) => {
    const normalized = (priority || 'MEDIUM').toUpperCase();

    const getColors = () => {
        switch (normalized) {
            case 'HIGH':
                return { background: '#fee2e2', color: '#991b1b' };
            case 'LOW':
                return { background: '#e0f2fe', color: '#075985' };
            case 'MEDIUM':
            default:
                return { background: '#fef3c7', color: '#92400e' };
        }
    };

    const badgeStyle = {
        fontSize: '0.75rem',
        padding: '0.2rem 0.6rem',
        borderRadius: '12px',
        fontWeight: 'bold',
        display: 'inline-block',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        textTransform: 'uppercase',
        ...getColors(),
    };

    return <span style={badgeStyle}>{normalized}</span>;
};