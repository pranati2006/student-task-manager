import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';
import { ErrorMessage } from '../components/ErrorMessage';

export const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { register, login } = useAuth();
    const navigate = useNavigate();

    const parseApiError = (err) => {
        const detail = err.response?.data?.detail;
        if (typeof detail === 'string') return detail;
        if (Array.isArray(detail)) {
            return detail.map(d => `${d.loc?.[d.loc.length - 1] ?? 'field'}: ${d.msg}`).join(' | ');
        }
        return 'Registration failed. Please check connection or inputs.';
    };
    return 'Registration failed. Please check connection or inputs.';
};

const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
        await register({ name, email, password });
        await login(email, password);
        navigate('/dashboard');
    } catch (err) {
        console.error('Registration/Login error:', err.response || err);
        setError(parseApiError(err));
    }
};

return (
    <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#f8fafc',
        fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
        <form onSubmit={handleSubmit} style={{
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '8px',
            border: '1px solid #e2e8f0',
            width: '100%',
            maxWidth: '380px',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
        }}>
            <h2 style={{ marginBottom: '1.5rem', textAlign: 'center', color: '#0f172a' }}>Create Account</h2>
            <ErrorMessage message={error} />
            <div style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                <label style={{ fontSize: '0.9rem', color: '#64748b' }}>Name</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} required style={{ padding: '0.6rem', border: '1px solid #e2e8f0', borderRadius: '4px' }} />
            </div>
            <div style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                <label style={{ fontSize: '0.9rem', color: '#64748b' }}>Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required style={{ padding: '0.6rem', border: '1px solid #e2e8f0', borderRadius: '4px' }} />
            </div>
            <div style={{ marginBottom: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                <label style={{ fontSize: '0.9rem', color: '#64748b' }}>Password</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} required style={{ padding: '0.6rem', border: '1px solid #e2e8f0', borderRadius: '4px' }} />
            </div>
            <button type="submit" style={{
                width: '100%',
                padding: '0.6rem',
                backgroundColor: '#2563eb',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontWeight: 600,
                cursor: 'pointer'
            }}>
                Create Account
            </button>
            <div style={{ marginTop: '1rem', textAlign: 'center', fontSize: '0.9rem', color: '#64748b' }}>
                Already have an account? <Link to="/login" style={{ color: '#2563eb' }}>Login</Link>
            </div>
        </form>
    </div>
);