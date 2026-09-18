import type { ChangeEvent } from 'react';

interface SearchBarProps {
    search: string;
    setSearch: (value: string) => void;
}

export const SearchBar = ({
    search,
    setSearch
}: SearchBarProps) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    return (
        <label className="search-box">
            <span className="search-icon" aria-hidden="true">⌕</span>
            <span className="sr-only">Search tasks</span>
            <input
                type="search"
                placeholder="Search by title or description..."
                value={search}
                onChange={handleChange}
                autoComplete="off"
            />

            {search && (
                <button
                    type="button"
                    className="search-clear"
                    aria-label="Clear search"
                    onClick={() => setSearch('')}>
                    ×
                </button>
            )}
        </label>
    );
};
