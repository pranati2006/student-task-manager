interface ValidationIssue {
    loc?: Array<string | number>;
    msg?: string;
}

interface ApiErrorShape {
    response?: {
        data?: {
            detail?: string | ValidationIssue[];
        };
    };
}

export const getApiErrorMessage = (
    error: unknown,
    fallback: string
): string => {
    if (!error || typeof error !== 'object') {
        return fallback;
    }

    const apiError = error as ApiErrorShape;
    const detail = apiError.response?.data?.detail;

    if (typeof detail === 'string' && detail.trim()) {
        return detail;
    }

    if (Array.isArray(detail)) {
        const message = detail
            .map((item) => {
                const field = item.loc?.length ? item.loc[item.loc.length - 1] : 'field';
                return `${String(field)}: ${item.msg ?? 'Invalid value'}`;
            })
            .join(' · ');

        return message || fallback;
    }

    return fallback;
};
