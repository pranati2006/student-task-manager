import {
    createContext,
    useCallback,
    useEffect,
    useMemo,
    useState,
    type ReactNode
} from 'react';
import { authService } from '../services/authService';
import type {
    AuthContextValue,
    RegisterPayload,
    User
} from '../types/auth';

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

const clearStoredTokens = (): void => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
};

export const AuthProvider = ({
    children
}: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const refreshUser = useCallback(async (): Promise<void> => {
        const currentUser = await authService.getMe();
        setUser(currentUser);
    }, []);

    useEffect(() => {
        const initAuth = async (): Promise<void> => {
            const token = localStorage.getItem('access_token');

            if (!token) {
                setLoading(false);
                return;
            }

            try {
                await refreshUser();
            } catch {
                clearStoredTokens();
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        void initAuth();
    }, [refreshUser]);

    const login = useCallback(async (
        email: string,
        password: string
    ): Promise<void> => {
        const data = await authService.login(email, password);

        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token);

        try {
            await refreshUser();
        } catch (error) {
            clearStoredTokens();
            setUser(null);
            throw error;
        }
    }, [refreshUser]);

    const register = useCallback(async (
        userData: RegisterPayload
    ): Promise<void> => {
        await authService.register(userData);
    }, []);

    const logout = useCallback((): void => {
        clearStoredTokens();
        setUser(null);
    }, []);

    const value = useMemo<AuthContextValue>(() => ({
        user,
        loading,
        login,
        register,
        logout,
        refreshUser
    }), [
        user,
        loading,
        login,
        register,
        logout,
        refreshUser
    ]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
