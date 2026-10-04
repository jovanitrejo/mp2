import type Media from './Media';

export default interface Movie extends Media {
    title: string;
    original_title: string;
    release_date: string;
    video: boolean;
}