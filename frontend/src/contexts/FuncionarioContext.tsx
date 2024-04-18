import { AdicionaisData } from '@/interfaces/AdicionaisData';
import { BeneficiosData } from '@/interfaces/BeneficiosData';
import { DescontosData } from '@/interfaces/DescontosData';
import { FolhaDePagamentoData } from '@/interfaces/FolhaDePagamentoData';
import { api } from "@/services/apiClient";
import { FuncionarioData } from '@/interfaces/FuncionarioData';
import { HorasData } from '@/interfaces/HorasData';
import React, { createContext, ReactNode, useState } from 'react';
import { CargoData } from '@/interfaces/CargoData';

type funcionarioProps = {
    funcionario: FuncionarioData | undefined,
    beneficios: BeneficiosData | undefined,
    adicionais: AdicionaisData | undefined,
    horas: HorasData | undefined,
    descontos: DescontosData | undefined,
    folhaPagamento: FolhaDePagamentoData | undefined,
}

type FuncionarioContextData = {
    funcionarioData: funcionarioProps | undefined
    cargosList : CargoData[];
    setFuncionarioData: (idfuncionario: string | undefined ) => Promise<void>;
    clearFuncionarioData: () => Promise<void>;
    loadCargosList: () => Promise<void>;
}

type FuncionarioProviderProps = {
    children: ReactNode;
}

export const FuncionarioContext = createContext({} as FuncionarioContextData);

export const FuncionarioProvider = ({ children }: FuncionarioProviderProps) => {
  const [funcionarioData, setFuncionarioDataProps] = useState<funcionarioProps>(); 
  const [cargosList, setCargosList] = useState<CargoData[]>([]);

  async function setFuncionarioData (idfuncionario: string | undefined) {
    
    const responseFuncionario = await api.get('/Funcionario', { params: { idfuncionario: idfuncionario } });
    const responseFolhaPagamento = await api.get('/FolhaPagamento/GetByIDFuncionario', { params: { idfuncionario: idfuncionario } });

    const folhaPagamento = responseFolhaPagamento.data;

    const responseCargos = await api.get('/Cargos')
    const responseBeneficios = await api.get('/Beneficios', { params: { idbeneficios: folhaPagamento?.idadicionais } });
    const responseAdicionais = await api.get('/Adicionais', { params: { idadicionais: folhaPagamento?.idadicionais } });
    const responseHoras = await api.get('/HorasTrabalhadas', { params: { idhorastrabalhadas: folhaPagamento?.idhorastrabalhadas } });
    const responseDescontos = await api.get('/Descontos', { params: { iddescontos: folhaPagamento?.iddescontos } });

    const data: funcionarioProps = { 
        funcionario: responseFuncionario.data,
        beneficios: responseBeneficios.data,
        adicionais: responseAdicionais.data,
        horas: responseHoras.data,
        descontos: responseDescontos.data,
        folhaPagamento: folhaPagamento,
    }
    
    setFuncionarioDataProps(data);
    setCargosList(responseCargos.data)
  };

  async function clearFuncionarioData () {
    setFuncionarioDataProps(undefined);
  };

  async function loadCargosList () {
    const responseCargos = await api.get('/Cargos');
    setCargosList(responseCargos.data);
  };

  return (
    <FuncionarioContext.Provider value={{ funcionarioData, cargosList, setFuncionarioData, clearFuncionarioData, loadCargosList }}>
      {children}
    </FuncionarioContext.Provider>
  );
};
