import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DepartamentoData } from "@/interfaces/DepartamentoData";
import { AxiosResponse } from "axios";
import { api } from "@/services/apiClient";


const postData = async (data: DepartamentoData): Promise<AxiosResponse<any>> => {
    const response = api.post('/Departamento', data);
    return response;
};

const deleteData = async (idDepartamento?: Number): Promise<AxiosResponse<any>> => {
    const response = api.delete(`/Departamento/${idDepartamento}`);
    return response;
};

const putData = async (data: DepartamentoData): Promise<AxiosResponse<any>> => {
    const response = api.put('/Departamento', data);
    return response;
};


export function useDepartamentoDataMutatePost() {
    const queryClient = useQueryClient();
    const mutatePost = useMutation({
        mutationFn: postData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['departamento-data'] });
        }
    });

    return mutatePost;
}

export function useDepartamentoDataMutateDelete() {
    const queryClient = useQueryClient();
    const mutateDelete = useMutation({
        mutationFn: deleteData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['departamento-data'] });
        }
    });

    return mutateDelete;
}

export function useDepartamentoDataMutatePut() {
    const queryClient = useQueryClient();
    const mutatePut = useMutation({
        mutationFn: putData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['departamento-data'] });
        }
    });

    return mutatePut;
}