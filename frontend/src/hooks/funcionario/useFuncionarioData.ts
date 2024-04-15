import { FuncionarioData } from "@/interfaces/FuncionarioData";
import { api } from "@/services/apiClient";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

const fetchData = async (): Promise<AxiosResponse<FuncionarioData[]>> => {
    const response = await api.get('/Funcionarios');
    return response;
};

export function useFuncionarioData(){
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ['funcionarios-data'],
        retry: 2
    });

    return{
        ...query,
        data: query.data?.data
    }
}