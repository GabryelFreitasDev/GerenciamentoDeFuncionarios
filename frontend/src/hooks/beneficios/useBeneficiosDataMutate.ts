import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BeneficiosData } from "@/interfaces/BeneficiosData";
import { AxiosResponse } from "axios";
import { api } from "@/services/apiClient";


const postData = async (data: BeneficiosData): Promise<AxiosResponse<any>> => {
    const response = api.post('/Beneficios', data);
    return response;
};

const deleteData = async (idBeneficio?: Number): Promise<AxiosResponse<any>> => {
    const response = api.delete(`/Beneficios/${idBeneficio}`);
    return response;
};

const putData = async (data: BeneficiosData): Promise<AxiosResponse<any>> => {
    const response = api.put('/Beneficios', data);
    return response;
};


export function useBeneficiosDataMutatePost() {
    const queryClient = useQueryClient();
    const mutatePost = useMutation({
        mutationFn: postData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['beneficio-data'] });
        }
    });

    return mutatePost;
}

export function useBeneficiosDataMutateDelete() {
    const queryClient = useQueryClient();
    const mutateDelete = useMutation({
        mutationFn: deleteData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['beneficio-data'] });
        }
    });

    return mutateDelete;
}

export function useBeneficiosDataMutatePut() {
    const queryClient = useQueryClient();
    const mutatePut = useMutation({
        mutationFn: putData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['beneficio-data'] });
        }
    });

    return mutatePut;
}