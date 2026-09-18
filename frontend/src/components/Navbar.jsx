import React from 'react';
import { useAuth } from '../hooks/useAuth';

export const Navbar = () => {
    const { user, logout } = useAuth();
    return (
        <header className="navbar">
            <div className="navbar-brand">Student Tasks</div>
            {user && (
                <div className="navbar-actions">
                    <span className="user-email">{user.email}</span>
                    <button className="btn-secondary" onClick={logout}>Logout</button>
                </div>
            )}
        </header>
    );
};