export interface User {
    id?: number;
    name: string;
    email: string;
}

export interface LoginResponse {
    access_token: string;
    refresh_token: string;
    token_type?: string;
}

export interface RegisterPayload {
    name: string;
    email: string;
    password: string;
}

export interface RefreshResponse {
    access_token: string;
    refresh_token?: string;
    token_type?: string;
}

export interface AuthContextValue {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (userData: RegisterPayload) => Promise<void>;
    logout: () => void;
    refreshUser: () => Promise<void>;
}
