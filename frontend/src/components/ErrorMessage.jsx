import React from 'react';

export const ErrorMessage = ({ message, onRetry }) => {
    if (!message) return null;

    return (
        <div style={{
            background: '#fee2e2',
            color: '#991b1b',
            padding: '0.85rem 1rem',
            borderRadius: '6px',
            border: '1px solid #f87171',
            marginBottom: '1rem',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            fontSize: '0.9rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem'
        }}>
            <span style={{ fontWeight: 500 }}>{message}</span>
            {onRetry && (
                <button
                    onClick={onRetry}
                    style={{
                        background: '#991b1b',
                        color: 'white',
                        border: 'none',
                        padding: '0.35rem 0.75rem',
                        borderRadius: '4px',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        whiteSpace: 'nowrap'
                    }}
                >
                    Try Again
                </button>
            )}
        </div>
    );
};