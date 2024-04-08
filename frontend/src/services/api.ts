import axios, { AxiosError } from 'axios'
import { parseCookies } from 'nookies'
import { signOut } from '@/contexts/AuthContext';

export function setupAPIClient(context = undefined){
    let cookies = parseCookies(context);
    
    const api = axios.create({
        baseURL: 'http://localhost:3333'
    })

    api.interceptors.response.use(response => {
        return response;
    }, (error: AxiosError) => {
        if(error.response?.status === 401)
            signOut();

        return Promise.reject(error);
    })

    return api;
}

