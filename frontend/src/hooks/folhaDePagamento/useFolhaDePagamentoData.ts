import { FolhaDePagamentoData } from "@/interfaces/FolhaDePagamentoData";
import { api } from "@/services/apiClient";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

const fetchData = async (): Promise<AxiosResponse<FolhaDePagamentoData[]>> => {
    const response = await api.get('/FolhaDePagamento');
    return response;
};

export function useFolhaDePagamentoData(){
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ['folhaDePagamento-data'],
        retry: 2
    });

    return{
        ...query,
        data: query.data?.data
    }
}