
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FuncionarioData } from "@/interfaces/FuncionarioData";
import { AxiosResponse } from "axios";
import { api } from "@/services/apiClient";


const postData = async (data: FuncionarioData): Promise<AxiosResponse<any>> => {
    const response = api.post('/Funcionario', data);
    return response;
};

const deleteData = async (idFuncionario?: String): Promise<AxiosResponse<any>> => {
    const response = api.delete(`/Funcionario`, { params: { idfuncionario: idFuncionario } });
    return response;
};

const putData = async (data: FuncionarioData): Promise<AxiosResponse<any>> => {
    const response = api.put('/Funcionario', data);
    return response;
};

const getData = async (idFuncionario?: String): Promise<AxiosResponse<FuncionarioData[]>> => {
    const response = await api.get('/Funcionario', { params: { idfuncionario: idFuncionario } });
    return response;
};


export function useFuncionarioDataMutatePost() {
    const queryClient = useQueryClient();
    const mutatePost = useMutation({
        mutationFn: postData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['funcionario-data'] });
        }
    });

    return mutatePost;
}

export function useFuncionarioDataMutateDelete() {
    const queryClient = useQueryClient();
    const mutateDelete = useMutation({
        mutationFn: deleteData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['funcionario-data'] });
        }
    });

    return mutateDelete;
}

export function useFuncionarioDataMutatePut() {
    const queryClient = useQueryClient();
    const mutatePut = useMutation({
        mutationFn: putData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['funcionario-data'] });
        }
    });

    return mutatePut;
}

export function useFuncionarioDataMutateGet() {
    const queryClient = useQueryClient();
    const mutateGet = useMutation({
        mutationFn: getData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['funcionario-data'] });
        }
    });

    return mutateGet;
}