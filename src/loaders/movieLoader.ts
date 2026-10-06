import type { LoaderFunctionArgs } from "react-router";
import { getMovieDetails, searchMoviesByText } from "../api/movieApi";
import { AxiosError } from "axios";
import { applyFilters, parseFilters } from "../utils/movieFilters";

const MAX_PAGE_CHECKS = 5;

async function findOnNextPage(
    query: string,
    filters: ReturnType<typeof parseFilters>,
    startPage: number,
    direction: 1 | -1,
    total_pages: number,
): Promise<{id:number;page:number} | null> {
    for (let p = startPage, tries = 0; p >= 1 && p <= total_pages && tries < MAX_PAGE_CHECKS; p+= direction, tries++) {
        const response = await searchMoviesByText(query, false, undefined, undefined, p);
        const results = applyFilters(response.results, filters);
        if (results.length > 0) {
            const movie = direction === -1 ? results[results.length - 1] : results[0];
            return {id: movie.id, page: p};
        }
    }
    return null;
}

export async function movieLoader({params, request}: LoaderFunctionArgs) {
    const searchParams = new URL(request.url).searchParams;
    const query = searchParams.get('query');
    const page = Number(searchParams.get('page') ?? 1);
    const movieId: string | undefined = params.movieId;
    if (movieId === '' || movieId === undefined) {
        throw new Error('The movie ID provided wasn\'t valid');
    }

    try {
        if (!query) {
            const movie = await getMovieDetails(Number(movieId));
            return { movie, prev: null, next: null};
        }

        const [movie, search] = await Promise.all([
            getMovieDetails(Number(movieId)),
            searchMoviesByText(query, false, undefined, undefined, page),
        ])

        const filters = parseFilters(searchParams);
        const results = applyFilters(search.results, filters);

        const index = results.findIndex(m => m.id === Number(movieId));
        if (index === -1) {
            return { movie, prev: null, next: null };
        }

        const [prev, next] = await Promise.all([
            index > 0
                ? { id: results[index - 1].id, page }
                : findOnNextPage(query, filters, page - 1, -1, search.total_pages),
            index < results.length - 1
                ? { id: results[index + 1].id, page }
                : findOnNextPage(query, filters, page + 1, 1, search.total_pages),
        ]);
        
        return {movie, prev, next};
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            console.error(error.message);
        } else if (error instanceof Error) {
            console.error(error.message);
        }
        throw error;
    }
}