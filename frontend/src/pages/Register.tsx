import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ErrorMessage } from '../components/ErrorMessage';
import { getApiErrorMessage } from '../utils/apiError';
import '../styles/auth.css';

export const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const { register, login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSubmitting(true);
        setError('');
        try {
            await register({ name: name.trim(), email: email.trim(), password });
            await login(email.trim(), password);
            navigate('/dashboard');
        } catch (errorValue: unknown) {
            setError(getApiErrorMessage(errorValue, 'Registration failed.'));
        } finally {
            setSubmitting(false);
        }
    };

    return <div className="auth-wrapper"><form onSubmit={handleSubmit} className="auth-card">
        <h2>Create account</h2><ErrorMessage message={error} />
        <div className="form-group"><label htmlFor="register-name">Name</label><input id="register-name" value={name} onChange={(event) => setName(event.target.value)} required /></div>
        <div className="form-group"><label htmlFor="register-email">Email</label><input id="register-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></div>
        <div className="form-group"><label htmlFor="register-password">Password</label><input id="register-password" type="password" minLength={8} maxLength={72} value={password} onChange={(event) => setPassword(event.target.value)} required /></div>
        <button type="submit" disabled={submitting}>{submitting ? 'Creating account...' : 'Create account'}</button>
        <div className="auth-footer">Already have an account? <Link to="/login">Login</Link></div>
    </form></div>;
};
