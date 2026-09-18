import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import api from '../services/api';
import { ErrorMessage } from '../components/ErrorMessage';

export const Profile = () => {
    const { user } = useAuth();
    const [name, setName] = useState(user?.name || '');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [msg, setMsg] = useState('');
    const [error, setError] = useState('');

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        try {
            await api.put('/users/me', { name });
            setMsg('Profile updated!');
            setError('');
        } catch (err) {
            setError(err.response?.data?.detail || 'Update failed');
        }
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        try {
            await api.put('/users/me/password', { current_password: currentPassword, new_password: newPassword });
            setMsg('Password updated!');
            setError('');
            setCurrentPassword('');
            setNewPassword('');
        } catch (err) {
            setError(err.response?.data?.detail || 'Password change failed');
        }
    };

    return (
        <div style={{ maxWidth: '500px' }}>
            <h2>User Profile</h2>
            {msg && <div style={{ color: 'var(--success)', marginBottom: '1rem' }}>{msg}</div>}
            <ErrorMessage message={error} />

            <form onSubmit={handleProfileUpdate} style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border-color)', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <h3>Details</h3>
                <div className="form-group"><label>Email (read-only)</label><input type="email" value={user?.email || ''} disabled /></div>
                <div className="form-group"><label>Name</label><input type="text" value={name} onChange={e => setName(e.target.value)} required /></div>
                <button type="submit">Update Profile</button>
            </form>

            <form onSubmit={handlePasswordChange} style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <h3>Change Password</h3>
                <div className="form-group"><label>Current Password</label><input type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} required /></div>
                <div className="form-group"><label>New Password</label><input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} required /></div>
                <button type="submit">Change Password</button>
            </form>
        </div>
    );
};