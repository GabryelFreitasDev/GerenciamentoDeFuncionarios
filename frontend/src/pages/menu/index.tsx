import styles from "./menu.module.scss";
import { canSSRAuth } from '@/utils/canSSRAuth';
import { FiEdit, FiFolder, FiTrash } from 'react-icons/fi'
import { DataGrid, GridActionsCellItem, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import Head from "next/head";
import { Header } from "@/components/Header";
import Router, { useRouter } from "next/router";
import { useFuncionarioData } from "@/hooks/funcionario/useFuncionarioData";
import { Button } from "@/components/ui/Button/button";
import { setupAPIClient } from "@/services/api";
import { CargoData } from "@/interfaces/CargoData";
import { FaEye } from "react-icons/fa";
import { useFuncionarioDataMutateDelete, useFuncionarioDataMutatePut } from "@/hooks/funcionario/useFuncionarioDataMutate";
import { categoriaEnum } from "@/enums/categoriaEnum";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { FuncionarioData } from "@/interfaces/FuncionarioData";

interface MenuProps {
  cargoList: CargoData[]
  funcionarioList: FuncionarioData[]
}

export default function Menu({ cargoList, funcionarioList }: MenuProps) {
  const router = useRouter();

  const columns: GridColDef[] = [
    { field: 'nome', headerName: 'Nome', minWidth: 400, type: 'string' },
    { field: 'idcargo', headerName: 'Cargo', width: 200, type: 'string' },
    { field: 'categoria', headerName: 'Categoria', width: 200, type: 'string' },
    { field: 'dataadmissao', headerName: 'Data de Admissão', width: 150 },
    {
      field: 'editar', type: 'actions', headerName: 'Editar', width: 100, getActions: ({ id }) => {
        return [<GridActionsCellItem
          icon={<FiEdit color="green" />}
          size="medium"
          label="Editar"
          sx={{ width: 100, zoom: 1.5 }}
          onClick={() => { router.push({ pathname: '/funcionario', query: { funcionario: JSON.stringify(funcionarioList.find(x => x.idfuncionario == id)) } }); }}
        />
        ]
      }
    },
    {
      field: 'excluir', type: 'actions', headerName: 'Excluir', width: 100, getActions: ({ id }) => {
        return [<GridActionsCellItem
          icon={<FiTrash color="red" />}
          label="Excluir"
          sx={{ width: 100, zoom: 1.5 }}
          onClick={() => { excluir(id.toString()) }}
        />
        ]
      }
    },
    {
      field: 'visualizar', type: 'actions', headerName: 'Visualizar', width: 100, getActions: ({ id }) => {
        return [<GridActionsCellItem
          icon={<FaEye color="blue" />}
          label="Excluir"
          sx={{ width: 100, zoom: 1.5 }}
        //onClick={}
        />
        ]
      }
    }
  ];

  const cargosOptions = cargoList?.map(cargo => ({
    id: cargo.idcargo,
    name: cargo.nome
  })) || [];

  const initialRows: GridRowsProp = funcionarioList?.map(funcionario => ({
    id: funcionario.idfuncionario,
    nome: funcionario.nome,
    idcargo: cargosOptions.find(x => x.id == funcionario.idcargo)?.name,
    categoria: categoriaEnum.find(x => x.id == funcionario.categoria)?.name,
    dataadmissao: funcionario.dataadmissao?.toString().split('T')[0].split('-').reverse().join('/')
  })) || [];

  const [rows, setRows] = useState(initialRows)
  const { mutate, isSuccess } = useFuncionarioDataMutateDelete();

  const excluir = (idfuncionario: String) => {
    const funcionarioSelecionado = funcionarioList?.find(x => x.idfuncionario === idfuncionario)
    mutate(idfuncionario);

    toast.success(`Funcionário ${funcionarioSelecionado?.nome} excluído com sucesso!`);
    setRows(rows.filter((row) => row.id !== idfuncionario));
  }

  useEffect(() => {
    if (!isSuccess) return
    Router.push("/menu");
  }, [isSuccess])

  return (
    <>
      <Head>
        <title>Menu</title>
      </Head>
      <div className={styles.containerCenter}>
        <Header />
        <Button onClick={() => { router.push('/funcionario') }}>Adicionar</Button>
        <DataGrid columns={columns} rows={rows} sx={{ width: '100%', padding: 2 }} />;
      </div>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async () => {
  const apiClient = setupAPIClient();

  const responseCargo = await apiClient.get('/Cargos')
  const responseFuncionario = await apiClient.get('/Funcionarios')
  return {
    props: {
      cargoList: responseCargo.data,
      funcionarioList: responseFuncionario.data,
    }
  }
})
