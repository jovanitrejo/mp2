import { AxiosError } from 'axios';
import api from '../configurations/axios';

const MOVIESEARCHENDPOINT: string = "/search/movie";

export async function searchMoviesByText(
    query: string, 
    include_adult: boolean = false, 
    language: string = 'en-US', 
    primary_release_year?: number, 
    page: number = 1, 
    region?: string, 
    year?: number
) {
    try {
        if (query === '') {
            throw new Error('The search term must not be empty!');
        }
        await api.get(
            MOVIESEARCHENDPOINT,
            {
                params: {
                    query,
                    include_adult,
                    language,
                    primary_release_year,
                    page,
                    region,
                    year
                }
            }
        ).then(p => console.log(p.data));
    } catch(error: unknown) {
        if (error instanceof AxiosError) {
            console.error(error.message);
        } else if (error instanceof Error) {
            console.error(error.message);
        }
    }
}