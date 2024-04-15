
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CargoData } from "@/interfaces/CargoData";
import { AxiosResponse } from "axios";
import { api } from "@/services/apiClient";


const postData = async (data: CargoData): Promise<AxiosResponse<any>> => {
    const response = api.post('/Cargos', data);
    return response;
};

const deleteData = async (idCargo?: Number): Promise<AxiosResponse<any>> => {
    const response = api.delete(`/Cargos/${idCargo}`);
    return response;
};

const putData = async (data: CargoData): Promise<AxiosResponse<any>> => {
    const response = api.put('/Cargos', data);
    return response;
};


export function useCargoDataMutatePost() {
    const queryClient = useQueryClient();
    const mutatePost = useMutation({
        mutationFn: postData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cargo-data'] });
        }
    });

    return mutatePost;
}

export function useCargoDataMutateDelete() {
    const queryClient = useQueryClient();
    const mutateDelete = useMutation({
        mutationFn: deleteData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cargo-data'] });
        }
    });

    return mutateDelete;
}

export function useCargoDataMutatePut() {
    const queryClient = useQueryClient();
    const mutatePut = useMutation({
        mutationFn: putData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cargo-data'] });
        }
    });

    return mutatePut;
}