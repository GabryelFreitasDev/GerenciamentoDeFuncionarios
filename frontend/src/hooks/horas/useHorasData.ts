import { HorasData } from "@/interfaces/HorasData";
import { api } from "@/services/apiClient";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

const fetchData = async (): Promise<AxiosResponse<HorasData[]>> => {
    const response = await api.get('/Horas');
    return response;
};

export function useHorasData(){
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ['horas-data'],
        retry: 2
    });

    return{
        ...query,
        data: query.data?.data
    }
}