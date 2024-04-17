
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { HorasData } from "@/interfaces/HorasData";
import { AxiosResponse } from "axios";
import { api } from "@/services/apiClient";


const postData = async (data: HorasData): Promise<AxiosResponse<any>> => {
    const response = api.post('/Horas', data);
    return response;
};

const deleteData = async (idHora?: Number): Promise<AxiosResponse<any>> => {
    const response = api.delete(`/Horas/${idHora}`);
    return response;
};

const putData = async (data: HorasData): Promise<AxiosResponse<any>> => {
    const response = api.put('/Horas', data);
    return response;
};


export function useHorasDataMutatePost() {
    const queryClient = useQueryClient();
    const mutatePost = useMutation({
        mutationFn: postData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['horas-data'] });
        }
    });

    return mutatePost;
}

export function useHorasDataMutateDelete() {
    const queryClient = useQueryClient();
    const mutateDelete = useMutation({
        mutationFn: deleteData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['horas-data'] });
        }
    });

    return mutateDelete;
}

export function useHorasDataMutatePut() {
    const queryClient = useQueryClient();
    const mutatePut = useMutation({
        mutationFn: putData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['horas-data'] });
        }
    });

    return mutatePut;
}