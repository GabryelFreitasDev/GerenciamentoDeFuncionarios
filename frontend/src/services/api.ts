import axios, { AxiosError } from 'axios'
import { signOut } from '@/contexts/AuthContext';
import { AuthTokenError } from './errors/AuthTokenError';

export function setupAPIClient(context = undefined) {
    const api = axios.create({
        baseURL: 'http://localhost:3333'
    })

    api.interceptors.response.use(response => {
        return response;
    }, (error: AxiosError) => {
        if (error.response?.status === 401) {
            if (typeof window !== undefined)
                signOut();
            else
                return Promise.reject(new AuthTokenError())
        }
        return Promise.reject(error);
    })

    return api;
}

