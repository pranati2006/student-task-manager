import React from 'react';
import { Link } from 'react-router-dom';

export const NotFound = () => (
    <div style={{ padding: '4rem', textAlign: 'center' }}>
        <h2>404 - Page Not Found</h2>
        <p style={{ margin: '1rem 0', color: 'var(--text-muted)' }}>The page you are looking for doesn't exist.</p>
        <Link to="/dashboard" style={{ color: 'var(--primary)', fontWeight: 'bold' }}>Go back home</Link>
    </div>
);