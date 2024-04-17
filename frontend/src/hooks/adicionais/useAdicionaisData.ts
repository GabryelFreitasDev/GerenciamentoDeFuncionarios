import { AdicionaisData } from "@/interfaces/AdicionaisData";
import { api } from "@/services/apiClient";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

const fetchData = async (): Promise<AxiosResponse<AdicionaisData[]>> => {
    const response = await api.get('/Adicionais');
    return response;
};

export function useAdicionaisData(){
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ['adicionais-data'],
        retry: 2
    });

    return{
        ...query,
        data: query.data?.data
    }
}