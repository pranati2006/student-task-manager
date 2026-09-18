import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ErrorMessage } from '../components/ErrorMessage';
import { getApiErrorMessage } from '../utils/apiError';
import '../styles/auth.css';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSubmitting(true);
        setError('');
        try {
            await login(email.trim(), password);
            navigate('/dashboard');
        } catch (errorValue: unknown) {
            setError(getApiErrorMessage(errorValue, 'Invalid email or password.'));
        } finally {
            setSubmitting(false);
        }
    };

    return <div className="auth-wrapper"><form onSubmit={handleSubmit} className="auth-card">
        <h2>Welcome back</h2><ErrorMessage message={error} />
        <div className="form-group"><label htmlFor="login-email">Email</label><input id="login-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></div>
        <div className="form-group"><label htmlFor="login-password">Password</label><input id="login-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required /></div>
        <button type="submit" disabled={submitting}>{submitting ? 'Signing in...' : 'Login'}</button>
        <div className="auth-footer">Don't have an account? <Link to="/register">Register</Link></div>
    </form></div>;
};
