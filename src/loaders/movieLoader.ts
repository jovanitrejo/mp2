import type { LoaderFunctionArgs } from "react-router";
import { getMovieDetails } from "../api/movieApi";
import { AxiosError } from "axios";
import type { MovieDetails } from "../types/Details";

export async function movieLoader({params}: LoaderFunctionArgs) {
    const movieId: string | undefined = params.movieId;
    if (movieId === '' || movieId === undefined) {
        throw new Error('The movie ID provided wasn\'t valid');
    }

    try {
        const movie: MovieDetails = await getMovieDetails(Number(movieId));
        return movie;
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            console.error(error.message);
        } else if (error instanceof Error) {
            console.error(error.message);
        }
    }
}