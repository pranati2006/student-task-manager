import React from 'react';
export const ErrorMessage = ({ message }) => (
    message ? <div className="error-msg" style={{ padding: '0.75rem', marginBottom: '1rem', background: '#fee2e2', borderRadius: '4px' }}>{message}</div> : null
);