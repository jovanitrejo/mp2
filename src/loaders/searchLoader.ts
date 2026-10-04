import type { LoaderFunctionArgs } from "react-router";
import { searchMoviesByText } from "../api/movieApi";
import { AxiosError, } from "axios";

export async function searchLoader({ request }: LoaderFunctionArgs) {
    const params = new URL(request.url).searchParams
    const query: string | null = params.get('query');
    const pageNumber: number = Number(params.get('page') ?? 1)
    if (query === '' || query === null) {
        return undefined;
    }

    try {
        const response = await searchMoviesByText(
            query,
            false,
            undefined,
            undefined,
            pageNumber,
            undefined,
            undefined
        )
        return response;
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            console.error(error.message);
        } else if (error instanceof Error) {
            console.error(error.message);
        }
    }
}