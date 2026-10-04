import {type AxiosResponse } from 'axios';
import api from '../configurations/axios';
import type TMBDResponse from '../types/TMDBResponse';
import type Movie from '../types/Movie';
import type { MovieDetails } from '../types/Details';

const MOVIEDETAILENDPOINT: string = '/movie';
const MOVIESEARCHENDPOINT: string = "/search/movie";

export async function searchMoviesByText(
    query: string,
    include_adult: boolean = false,
    language: string = 'en-US',
    primary_release_year?: number,
    page: number = 1,
    region?: string,
    year?: number
): Promise<TMBDResponse<Movie>> {
    if (query === '') {
        throw new Error('The search term must not be empty!');
    }

    const response: AxiosResponse<TMBDResponse<Movie>> = await api.get(
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
    );

    return response.data;
}

export async function getMovieDetails(movieId: number): Promise<MovieDetails> {
    return await api.get(`${MOVIEDETAILENDPOINT}/${movieId}`);
}