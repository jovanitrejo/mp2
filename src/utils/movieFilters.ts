import type Movie from "../types/Movie";

export type SortKey = 'title' | 'release_date' | 'popularity' | 'vote_average';

export const SORT_OPTIONS: {key: SortKey; label: string}[] = [
    {key: 'title', label: 'Title'},
    {key: 'release_date', label: 'Release Date'},
    {key: 'popularity', label: 'Popularity'},
    {key: 'vote_average', label: 'Rating'},
];

function compareMovies(a: Movie, b: Movie, key: SortKey): number {
    switch (key) {
        case 'title':
        case 'release_date':
            return a[key].localeCompare(b[key]);
        default:
            return a[key] - b[key];
    }
}

/**
 * Returns a JS object containing the sortKey that is used for sorting movies, and filters based on URL params.
 */
export function parseFilters(params: URLSearchParams) {
    const sortParam = params.get('sort');
    return {
        sortKey: SORT_OPTIONS.find(o => o.key === sortParam)?.key ?? null,
        order: params.get('order') === 'desc' ? 'desc' : 'asc' as 'asc' | 'desc',
        genre: Number(params.get('genre')) || null
    };
}

/**
 * Takes an existing array of Movie[] and re-organizes based on sorting keys (i.e., name, popularity)
 */
export function applyFilters(results: Movie[], {sortKey, order, genre}: ReturnType<typeof parseFilters>): Movie[] {
    let out = genre === null ? results : results.filter(m => m.genre_ids.includes(genre));
    if (sortKey) {
        const dir = order === 'asc' ? 1 : -1;
        out = [...out].sort((a,b) => compareMovies(a,b,sortKey) * dir);
    }
    return out;
}