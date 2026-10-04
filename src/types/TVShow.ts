import type Media from './Media';

export default interface TVShow extends Media {
    name: string;
    original_name: string;
    first_air_date: string; // "YYYY-MM-DD"
    origin_country: string[];
    softcore: boolean;
}