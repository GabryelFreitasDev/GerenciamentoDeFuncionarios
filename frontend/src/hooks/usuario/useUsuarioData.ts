import { UsuarioData } from "@/interfaces/UsuarioData";
import { api } from "@/services/apiClient";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

const fetchData = async (): Promise<AxiosResponse<UsuarioData[]>> => {
    const response = await api.get('/Usuario');
    return response;
};

export function useUsuarioData(){
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ['usuario-data'],
        retry: 2
    });

    return{
        ...query,
        data: query.data?.data
    }
}