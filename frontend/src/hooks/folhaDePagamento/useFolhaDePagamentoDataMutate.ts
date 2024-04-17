
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FolhaDePagamentoData } from "@/interfaces/FolhaDePagamentoData";
import { AxiosResponse } from "axios";
import { api } from "@/services/apiClient";


const postData = async (data: FolhaDePagamentoData): Promise<AxiosResponse<any>> => {
    const response = api.post('/FolhaDePagamento', data);
    return response;
};

const deleteData = async (idFolhaDePagamento?: Number): Promise<AxiosResponse<any>> => {
    const response = api.delete(`/FolhaDePagamento/${idFolhaDePagamento}`);
    return response;
};

const putData = async (data: FolhaDePagamentoData): Promise<AxiosResponse<any>> => {
    const response = api.put('/FolhaDePagamento', data);
    return response;
};


export function useFolhaDePagamentoDataMutatePost() {
    const queryClient = useQueryClient();
    const mutatePost = useMutation({
        mutationFn: postData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['folhaDePagamento-data'] });
        }
    });

    return mutatePost;
}

export function useFolhaDePagamentoDataMutateDelete() {
    const queryClient = useQueryClient();
    const mutateDelete = useMutation({
        mutationFn: deleteData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['folhaDePagamento-data'] });
        }
    });

    return mutateDelete;
}

export function useFolhaDePagamentoDataMutatePut() {
    const queryClient = useQueryClient();
    const mutatePut = useMutation({
        mutationFn: putData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['folhaDePagamento-data'] });
        }
    });

    return mutatePut;
}