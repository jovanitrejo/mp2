import type { LoaderFunctionArgs } from "react-router";
import { searchMoviesByText } from "../api/movieApi";
import { AxiosError } from "axios";

export async function searchLoader({ request }: LoaderFunctionArgs) {
    const query: string | null = new URL(request.url).searchParams.get("query");
    if (query === '' || query === null) {
        return undefined;
    }

    try {
        await searchMoviesByText(
            query,
        )
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            console.error(error.message);
        } else if (error instanceof Error) {
            console.error(error.message);
        }
    }
}