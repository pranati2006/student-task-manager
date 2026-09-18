import { Link } from 'react-router-dom';
import '../styles/not-found.css';

export const NotFound = () => (
    <main className="not-found-page">
        <div className="not-found-card">
            <span className="not-found-code">404</span>
            <h1>Page not found</h1>
            <p>The page you requested does not exist or may have been moved.</p>
            <Link to="/dashboard" className="btn btn-primary">
                Back to dashboard
            </Link>
        </div>
    </main>
);
