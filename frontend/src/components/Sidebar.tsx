import { NavLink } from 'react-router-dom';

const navClassName = ({
    isActive
}: {
    isActive: boolean;
}): string => isActive ? 'nav-link active' : 'nav-link';

export const Sidebar = () => (
    <aside className="sidebar" aria-label="Primary navigation">
        <div className="sidebar-section-label">Workspace</div>

        <nav className="sidebar-nav">
            <NavLink to="/dashboard" className={navClassName}>
                <span className="nav-icon" aria-hidden="true">▦</span>
                <span>Dashboard</span>
            </NavLink>

            <NavLink to="/tasks" className={navClassName}>
                <span className="nav-icon" aria-hidden="true">✓</span>
                <span>Tasks</span>
            </NavLink>

            <NavLink to="/profile" className={navClassName}>
                <span className="nav-icon" aria-hidden="true">○</span>
                <span>Profile</span>
            </NavLink>
        </nav>

        <div className="sidebar-tip">
            <span className="sidebar-tip-title">Stay focused</span>
            <span className="sidebar-tip-copy">Keep priorities clear and finish one task at a time.</span>
        </div>
    </aside>
);
