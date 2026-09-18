interface ErrorMessageProps {
    message?: string | null;
    onRetry?: () => void;
}

export const ErrorMessage = ({
    message,
    onRetry
}: ErrorMessageProps) => {
    if (!message) {
        return null;
    }

    return (
        <div className="alert alert-danger" role="alert">
            <div className="alert-content">
                <span className="alert-icon" aria-hidden="true">!</span>
                <span>{message}</span>
            </div>

            {onRetry && (
                <button
                    type="button"
                    className="alert-action"
                    onClick={onRetry}>
                    Try again
                </button>
            )}
        </div>
    );
};
