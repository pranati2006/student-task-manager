import { useAuth } from '../hooks/useAuth';

export const Navbar = () => {
    const { user, logout } = useAuth();
    const displayName = user?.name?.trim() || user?.email || 'Account';
    const initial = displayName.charAt(0).toUpperCase();

    return (
        <header className="navbar">
            <div className="navbar-brand-wrap">
                <span className="brand-mark" aria-hidden="true">ST</span>
                <div>
                    <div className="navbar-brand">Student Tasks</div>
                    <div className="navbar-brand-subtitle">Plan. Focus. Finish.</div>
                </div>
            </div>

            {user && (
                <div className="navbar-actions">
                    <div className="navbar-user">
                        <span className="user-avatar" aria-hidden="true">{initial}</span>
                        <div className="user-copy">
                            <span className="user-name">{user.name || 'Student'}</span>
                            <span className="user-email">{user.email}</span>
                        </div>
                    </div>

                    <button
                        type="button"
                        className="btn btn-secondary btn-sm"
                        onClick={logout}>
                        Sign out
                    </button>
                </div>
            )}
        </header>
    );
};
