import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ErrorMessage } from '../components/ErrorMessage';
import '../styles/auth.css';

export const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const { register, login } = useAuth();
    const navigate = useNavigate();

    const parseApiError = (err) => {
        const detail = err.response?.data?.detail;
        if (typeof detail === 'string') return detail;
        if (Array.isArray(detail)) return detail.map((item) => `${item.loc?.[item.loc.length - 1] ?? 'field'}: ${item.msg}`).join(' | ');
        return 'Registration failed. Please check your connection and inputs.';
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setSubmitting(true);
        try {
            await register({ name, email, password });
            await login(email, password);
            navigate('/dashboard');
        } catch (err) {
            setError(parseApiError(err));
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="auth-wrapper">
            <form onSubmit={handleSubmit} className="auth-card">
                <h2>Create Account</h2>
                <ErrorMessage message={error} />
                <div className="form-group"><label htmlFor="name">Name</label><input id="name" value={name} onChange={(event) => setName(event.target.value)} required /></div>
                <div className="form-group"><label htmlFor="email">Email</label><input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></div>
                <div className="form-group"><label htmlFor="password">Password</label><input id="password" type="password" minLength="8" value={password} onChange={(event) => setPassword(event.target.value)} required /></div>
                <button type="submit" disabled={submitting}>{submitting ? 'Creating account...' : 'Create Account'}</button>
                <div className="auth-footer">Already have an account? <Link to="/login">Login</Link></div>
            </form>
        </div>
    );
};