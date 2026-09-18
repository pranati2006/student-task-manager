import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';
import { ErrorMessage } from '../components/ErrorMessage';
import '../styles/auth.css';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/dashboard');
        } catch {
            setError('Invalid email or password.');
        }
    };

    return (
        <div className="auth-wrapper">
            <form onSubmit={handleSubmit} className="auth-card">
                <h2>Welcome back!</h2>
                <ErrorMessage message={error} />
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                </div>
                <button type="submit" style={{ width: '100%' }}>Login</button>
                <div className="auth-footer">Don't have an account? <Link to="/register">Register</Link></div>
            </form>
        </div>
    );
};