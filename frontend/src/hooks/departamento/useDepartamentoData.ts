import { DepartamentoData } from "@/interfaces/DepartamentoData";
import { api } from "@/services/apiClient";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

const fetchData = async (): Promise<AxiosResponse<DepartamentoData[]>> => {
    const response = await api.get('/Departamento');
    return response;
};

export function useDepartamentoData(){
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ['departamento-data'],
        retry: 2
    });

    return{
        ...query,
        data: query.data?.data
    }
}