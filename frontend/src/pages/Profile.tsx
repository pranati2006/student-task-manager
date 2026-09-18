import { useEffect, useState, type FormEvent } from 'react';
import { useAuth } from '../hooks/useAuth';
import api from '../services/api';
import { ErrorMessage } from '../components/ErrorMessage';
import { getApiErrorMessage } from '../utils/apiError';
import '../styles/profile.css';

export const Profile = () => {
    const { user, refreshUser } = useAuth(); const [name, setName] = useState(user?.name ?? ''); const [message, setMessage] = useState(''); const [error, setError] = useState('');
    useEffect(() => setName(user?.name ?? ''), [user?.name]);
    const updateProfile = async (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setError(''); setMessage(''); try { await api.put('/users/me', { name: name.trim() }); await refreshUser(); setMessage('Profile updated successfully.'); } catch (errorValue: unknown) { setError(getApiErrorMessage(errorValue, 'Profile update failed.')); } };
    return <div className="page-shell profile-page"><div className="page-header"><div><span className="eyebrow">Account</span><h1>Profile settings</h1></div></div>{message && <p role="status">{message}</p>}<ErrorMessage message={error} /><form onSubmit={updateProfile} className="card settings-card"><div className="form-group"><label htmlFor="profile-email">Email</label><input id="profile-email" value={user?.email ?? ''} disabled /></div><div className="form-group"><label htmlFor="profile-name">Name</label><input id="profile-name" value={name} onChange={(event) => setName(event.target.value)} required /></div><button type="submit" className="btn btn-primary" disabled={!name.trim()}>Save profile</button></form></div>;
};
