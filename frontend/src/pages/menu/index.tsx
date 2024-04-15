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

interface MenuProps {
  cargoList: CargoData[]
}

const categoriaOptions = [
  { id: 1, name: "Segurado Empregado" },
  { id: 2, name: "Trabalhador Avulso" },
  { id: 3, name: "Contribuinte Individual" },
  { id: 4, name: "Empregado contratado" }
]

export default function Menu({ cargoList }: MenuProps) {

  const { data } = useFuncionarioData();

  const router = useRouter();

  const columns: GridColDef[] = [
    //{ field: 'codigo', headerName: 'Código', width: 100 },
    { field: 'nome', headerName: 'Nome', minWidth: 400, type: 'string' },
    { field: 'idcargo', headerName: 'Cargo', width: 200, type: 'string'},
    { field: 'categoria', headerName: 'Categoria', width: 200, type: 'string' },
    { field: 'dataadmissao', headerName: 'Data de Admissão', width: 150 },
    {
      field: 'editar', type: 'actions', headerName: 'Editar', width: 100, getActions: ({ id }) => {
        return [<GridActionsCellItem
          icon={<FiEdit color="green" />}
          size="medium"
          label="Editar"
          sx={{ width: 100, zoom: 1.5 }}
          onClick={() => { router.push({ pathname: '/funcionario', query: { id } }); }}
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
        //onClick={}
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
  })) || []

  let rows: GridRowsProp = data?.map(funcionario => ({
    id: funcionario.idfuncionario,
    //codigo: funcionario.codigo,
    nome: funcionario.nome,
    idcargo: cargosOptions.find(x => x.id == funcionario.idcargo)?.name,
    categoria: categoriaOptions.find(x => x.id == funcionario.categoria)?.name,
    dataadmissao: funcionario.dataadmissao?.toString().split('T')[0].split('-').reverse().join('/')
  })) || [];

  return (
    <>
      <Head>
        <title>Menu</title>
      </Head>
      <div className={styles.containerCenter}>
        <Header />
        <Button onClick={ () => {router.push('/funcionario') }}>Adicionar</Button>
        <DataGrid columns={columns} rows={rows} sx={{ width: '100%', padding: 2 }}/>;
      </div>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async () => {
  const apiClient = setupAPIClient();

  const responseCargo = await apiClient.get('/Cargos')
 

  return {
    props: {
      cargoList: responseCargo.data,
    }
  }
})
