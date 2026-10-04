import type { LoaderFunctionArgs } from "react-router";
import { getMovieDetails, searchMoviesByText } from "../api/movieApi";
import { AxiosError } from "axios";

export async function movieLoader({params, request}: LoaderFunctionArgs) {
    const searchParams = new URL(request.url).searchParams;
    const query = searchParams.get('query');
    const page = Number(searchParams.get('page') ?? 1);
    const movieId: string | undefined = params.movieId;
    if (movieId === '' || movieId === undefined) {
        throw new Error('The movie ID provided wasn\'t valid');
    }

    if (!query) {
        const movie = await getMovieDetails(Number(movieId));
        return { movie, prev: null, next: null};
    }

    const [movie, search] = await Promise.all([
        getMovieDetails(Number(movieId)),
        searchMoviesByText(query, false, undefined, undefined, page),
    ])

    const index = search.results.findIndex(m => m.id === Number(movieId));
    let prev = null;
    let next = null;
    if (index > 0) {
        prev = { id: search.results[index - 1].id, page};
    } else if (index === 0 && page > 1) {
        const prevPage = await searchMoviesByText(query, false, undefined, undefined, page - 1);
        prev = { id: prevPage.results[prevPage.results.length - 1].id, page: page - 1 };
    }

    if (index !== -1 && index < search.results.length - 1) {
        next = { id: search.results[index + 1].id, page };
    } else if (index === search.results.length - 1 && page < search.total_pages) {
        const nextPage = await searchMoviesByText(query, false, undefined, undefined, page + 1);
        next = { id: nextPage.results[0].id, page: page + 1 };
    }

    try {
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