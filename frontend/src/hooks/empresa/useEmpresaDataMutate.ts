
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EmpresaData } from "@/interfaces/EmpresaData";
import { AxiosResponse } from "axios";
import { api } from "@/services/apiClient";


const postData = async (data: EmpresaData): Promise<AxiosResponse<any>> => {
    const response = api.post('/Empresa', data);
    return response;
};

const deleteData = async (idEmpresa?: Number): Promise<AxiosResponse<any>> => {
    const response = api.delete(`/Empresa/${idEmpresa}`);
    return response;
};

const putData = async (data: EmpresaData): Promise<AxiosResponse<any>> => {
    const response = api.put('/Empresa', data);
    return response;
};


export function useEmpresaDataMutatePost() {
    const queryClient = useQueryClient();
    const mutatePost = useMutation({
        mutationFn: postData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['empresa-data'] });
        }
    });

    return mutatePost;
}

export function useEmpresaDataMutateDelete() {
    const queryClient = useQueryClient();
    const mutateDelete = useMutation({
        mutationFn: deleteData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['empresa-data'] });
        }
    });

    return mutateDelete;
}

export function useEmpresaDataMutatePut() {
    const queryClient = useQueryClient();
    const mutatePut = useMutation({
        mutationFn: putData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['empresa-data'] });
        }
    });

    return mutatePut;
}