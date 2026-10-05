import type { LoaderFunctionArgs } from "react-router";
import { getMovieGenres, searchMoviesByText } from "../api/movieApi";
import { AxiosError, } from "axios";

export async function searchLoader({ request }: LoaderFunctionArgs) {
    const params = new URL(request.url).searchParams
    const query: string | null = params.get('query');
    const pageNumber: number = Number(params.get('page') ?? 1)
    if (query === '' || query === null) {
        return undefined;
    }

    try {
        const [response, genres] = await Promise.all([
            searchMoviesByText(query, false, undefined, undefined, pageNumber),
            getMovieGenres()
        ]);
        return {movies: response, genres};
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            console.error(error.message);
        } else if (error instanceof Error) {
            console.error(error.message);
        }
        throw error;
    }
}