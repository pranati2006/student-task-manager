import '../styles/theme.css';

interface LoadingProps {
    text?: string;
}

export const Loading = ({
    text = 'Loading...'
}: LoadingProps) => (
    <div className="loading-state" role="status" aria-live="polite">
        <span className="loading-spinner" aria-hidden="true" />
        <span className="loading-text">{text}</span>
    </div>
);
