import { FolhaDePagamentoData } from "@/interfaces/FolhaDePagamentoData";
import { api } from "@/services/apiClient";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

const fetchData = async (): Promise<AxiosResponse<FolhaDePagamentoData[]>> => {
    const response = await api.get('/FolhaPagamento');
    return response;
};


const fetchDataByID = async (IDFuncionario: string): Promise<AxiosResponse<any>> => {
    const response = await api.get('/FolhaPagamento/GetByIDFuncionario', { params: { idfuncionario: IDFuncionario } });
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

export function useFolhaDePagamentoDataByID(IDFuncionario: string) {
    const query = useQuery({
        queryFn: () => fetchDataByID(IDFuncionario),
        queryKey: ['folhaDePagamento-data'],
        retry: 2
    });

    return {
        ...query,
        data: query.data?.data
    }
}