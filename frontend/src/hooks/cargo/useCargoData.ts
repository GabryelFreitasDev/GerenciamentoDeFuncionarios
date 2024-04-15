import { CargoData } from "@/interfaces/CargoData";
import { api } from "@/services/apiClient";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

const fetchData = async (): Promise<AxiosResponse<CargoData[]>> => {
    const response = await api.get('/Cargos');
    return response;
};

export function useCargoData(){
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ['cargo-data'],
        retry: 2
    });

    return{
        ...query,
        data: query.data?.data
    }
}