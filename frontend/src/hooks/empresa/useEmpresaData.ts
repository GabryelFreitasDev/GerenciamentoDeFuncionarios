import { EmpresaData } from "@/interfaces/EmpresaData";
import { api } from "@/services/apiClient";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

const fetchData = async (): Promise<AxiosResponse<EmpresaData[]>> => {
    const response = await api.get('/Empresa');
    return response;
};

export function useEmpresaData(){
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ['empresa-data'],
        retry: 2
    });

    return{
        ...query,
        data: query.data?.data
    }
}