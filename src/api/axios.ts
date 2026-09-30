import axios from 'axios';

if (!import.meta.env.API_KEY) {
    throw new Error('The necessary environment variables to access the Movie Database API is not present in the source code');
}

const API_KEY: string = import.meta.env.API_KEY

export const api = axios.create({
    baseURL: 'https://api.themoviedb.org/4',
    headers: {
        Authorization: `Bearer ${API_KEY}`
    }
})

export default api;