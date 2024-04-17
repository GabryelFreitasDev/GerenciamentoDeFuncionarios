
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UsuarioData } from "@/interfaces/UsuarioData";
import { AxiosResponse } from "axios";
import { api } from "@/services/apiClient";


const postData = async (data: UsuarioData): Promise<AxiosResponse<any>> => {
    const response = api.post('/Usuario', data);
    return response;
};

const deleteData = async (idUsuario?: Number): Promise<AxiosResponse<any>> => {
    const response = api.delete(`/Usuario/${idUsuario}`);
    return response;
};

const putData = async (data: UsuarioData): Promise<AxiosResponse<any>> => {
    const response = api.put('/Usuario', data);
    return response;
};


export function useUsuarioDataMutatePost() {
    const queryClient = useQueryClient();
    const mutatePost = useMutation({
        mutationFn: postData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['usuario-data'] });
        }
    });

    return mutatePost;
}

export function useUsuarioDataMutateDelete() {
    const queryClient = useQueryClient();
    const mutateDelete = useMutation({
        mutationFn: deleteData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['usuario-data'] });
        }
    });

    return mutateDelete;
}

export function useUsuarioDataMutatePut() {
    const queryClient = useQueryClient();
    const mutatePut = useMutation({
        mutationFn: putData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['usuario-data'] });
        }
    });

    return mutatePut;
}