import React from 'react';
export const SearchBar = ({ search, setSearch }) => (
    <input
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ width: '100%', padding: '0.6rem', marginBottom: '1rem', border: '1px solid var(--border-color)', borderRadius: '4px' }}
    />
);