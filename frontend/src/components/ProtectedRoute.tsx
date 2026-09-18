import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Loading } from './Loading';

export const ProtectedRoute = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return <Loading text="Verifying your session..." />;
    }

    return user
        ? <Outlet />
        : <Navigate to="/login" replace />;
};
