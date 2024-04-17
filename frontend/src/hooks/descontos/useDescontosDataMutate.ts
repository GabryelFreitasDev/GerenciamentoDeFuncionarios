
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DescontosData } from "@/interfaces/DescontosData";
import { AxiosResponse } from "axios";
import { api } from "@/services/apiClient";


const postData = async (data: DescontosData): Promise<AxiosResponse<any>> => {
    const response = api.post('/Descontos', data);
    return response;
};

const deleteData = async (idDesconto?: Number): Promise<AxiosResponse<any>> => {
    const response = api.delete(`/Descontos/${idDesconto}`);
    return response;
};

const putData = async (data: DescontosData): Promise<AxiosResponse<any>> => {
    const response = api.put('/Descontos', data);
    return response;
};


export function useDescontosDataMutatePost() {
    const queryClient = useQueryClient();
    const mutatePost = useMutation({
        mutationFn: postData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['descontos-data'] });
        }
    });

    return mutatePost;
}

export function useDescontosDataMutateDelete() {
    const queryClient = useQueryClient();
    const mutateDelete = useMutation({
        mutationFn: deleteData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['descontos-data'] });
        }
    });

    return mutateDelete;
}

export function useDescontosDataMutatePut() {
    const queryClient = useQueryClient();
    const mutatePut = useMutation({
        mutationFn: putData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['descontos-data'] });
        }
    });

    return mutatePut;
}