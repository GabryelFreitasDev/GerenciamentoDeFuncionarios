import { BeneficiosData } from "@/interfaces/BeneficiosData";
import { api } from "@/services/apiClient";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

const fetchData = async (): Promise<AxiosResponse<BeneficiosData[]>> => {
    const response = await api.get('/Beneficios');
    return response;
};

const fetchDataByID = async (idbeneficio: string): Promise<AxiosResponse<any>> => {
    const response = await api.get('/Beneficio', { params: { idbeneficio: idbeneficio } });
    return response;
};

export function useBeneficiosData() {
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ['beneficios-data'],
        retry: 2
    });

    return {
        ...query,
        data: query.data?.data
    }
}

export function useBeneficiosDataByID(idbeneficio: string) {
    const query = useQuery({
        queryFn: () => fetchDataByID(idbeneficio),
        queryKey: ['beneficios-data'],
        retry: 2
    });

    return {
        ...query,
        data: query.data?.data
    }
}