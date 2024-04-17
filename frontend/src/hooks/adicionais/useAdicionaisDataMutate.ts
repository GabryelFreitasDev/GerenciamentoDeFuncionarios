import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AdicionaisData } from "@/interfaces/AdicionaisData";
import { AxiosResponse } from "axios";
import { api } from "@/services/apiClient";


const postData = async (data: AdicionaisData): Promise<AxiosResponse<any>> => {
    const response = api.post('/Adicionais', data);
    return response;
};

const deleteData = async (idAdicional?: Number): Promise<AxiosResponse<any>> => {
    const response = api.delete(`/Adicionais/${idAdicional}`);
    return response;
};

const putData = async (data: AdicionaisData): Promise<AxiosResponse<any>> => {
    const response = api.put('/Adicionais', data);
    return response;
};


export function useAdicionaisDataMutatePost() {
    const queryClient = useQueryClient();
    const mutatePost = useMutation({
        mutationFn: postData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['adicionais-data'] });
        }
    });

    return mutatePost;
}

export function useAdicionaisDataMutateDelete() {
    const queryClient = useQueryClient();
    const mutateDelete = useMutation({
        mutationFn: deleteData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['adicionais-data'] });
        }
    });

    return mutateDelete;
}

export function useAdicionaisDataMutatePut() {
    const queryClient = useQueryClient();
    const mutatePut = useMutation({
        mutationFn: putData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['adicionais-data'] });
        }
    });

    return mutatePut;
}