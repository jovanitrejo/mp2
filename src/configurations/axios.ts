import axios from 'axios';

const token = import.meta.env.VITE_READ_ACCESS_TOKEN;

if (!token) {
    throw new Error('The necessary environment variables to access the Movie Database API is not present in the source code');
}

const API_KEY: string = token;

export const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        Authorization: `Bearer ${API_KEY}`
    }
})

export default api;