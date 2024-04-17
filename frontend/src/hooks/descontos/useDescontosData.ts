import { DescontosData } from "@/interfaces/DescontosData";
import { api } from "@/services/apiClient";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

const fetchData = async (): Promise<AxiosResponse<DescontosData[]>> => {
    const response = await api.get('/Descontos');
    return response;
};

export function useDescontosData(){
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ['descontos-data'],
        retry: 2
    });

    return{
        ...query,
        data: query.data?.data
    }
}