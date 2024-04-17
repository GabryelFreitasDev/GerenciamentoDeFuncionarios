import styles from "./funcionario.module.scss";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import { FiUser } from 'react-icons/fi'
import { Header } from "@/components/Header";
import { Select } from "@/components/ui/Select/select";
import { Button } from "@/components/ui/Button/button";
import { Input } from "@/components/ui/Input/input";
import { useContext, useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import Head from "next/head";
import { useCargoData } from "@/hooks/cargo/useCargoData";
import { canSSRAuth } from "@/utils/canSSRAuth";
import { CargoData } from "@/interfaces/CargoData";
import { FuncionarioData } from "@/interfaces/FuncionarioData";
import { useFuncionarioDataMutatePost, useFuncionarioDataMutatePut } from "@/hooks/funcionario/useFuncionarioDataMutate";
import { AuthContext, AuthProvider } from "@/contexts/AuthContext";
import { setupAPIClient } from "@/services/api";
import { useFuncionarioData } from "@/hooks/funcionario/useFuncionarioData";
import { toast } from "react-toastify";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface FuncionarioProps {
  cargoList: CargoData[],
  data?: FuncionarioData
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function FuncionarioTabs({ value, handleChange }: { value: number; handleChange: (event: React.SyntheticEvent, newValue: number) => void; }) {
  return (
    <Tabs centered variant="fullWidth" value={value} onChange={handleChange}>
      <Tab icon={<FiUser />} label="Funcionario" />
      <Tab icon={<FiUser />} label="Descontos" />
      <Tab icon={<FiUser />} label="Adicionais" />
      <Tab icon={<FiUser />} label="Salario" />
    </Tabs>
  );
}

const categoriaOptions = [
  { id: 1, name: "Segurado Empregado" },
  { id: 2, name: "Trabalhador Avulso" },
  { id: 3, name: "Contribuinte Individual" },
  { id: 4, name: "Empregado contratado" }
]

export default function Funcionario({ cargoList }: FuncionarioProps) {
  const { user } = useContext(AuthContext);
  const { data } = useFuncionarioData();
  const router = useRouter();
  const { id } = router.query;

  const funcionario = data?.find(x => x.idfuncionario == id);
  const cargosOptions = cargoList?.map(cargo => ({
    id: cargo.idcargo,
    name: cargo.nome
  })) || []

  const [nome, setNome] = useState(funcionario?.nome ? funcionario.nome : '');
  const [cargo, setCargo] = useState(funcionario?.idcargo ? cargosOptions.find(x => x.id == funcionario.idcargo)?.name : cargosOptions[0]?.name);
  const [categoria, setCategoria] = useState(funcionario?.categoria ? categoriaOptions.find(x => x.id == funcionario.categoria)?.name : categoriaOptions[0]?.name);
  const [dataadmissao, setDataAdimissao] = useState(funcionario?.dataadmissao ? funcionario.dataadmissao.toString().split('T')[0] : new Date().toISOString().split('T')[0]);

  const { mutate, isSuccess } = funcionario ? useFuncionarioDataMutatePut() : useFuncionarioDataMutatePost();

  const submit = () => {
    const funcionarioData: FuncionarioData = {
      idfuncionario: funcionario?.idfuncionario ? funcionario.idfuncionario : '',
      nome, 
      idcargo: cargosOptions.find(x => x.name == cargo)?.id,
      categoria: categoriaOptions.find(x => x.name == categoria)?.id,
      dataadmissao: new Date(dataadmissao),
      idusuariocadastro: 'a1d4603e-16b5-4850-a27d-fd89382e0157'
    }

    const funcionarioNovo = funcionarioData.idfuncionario == '';
    console.log(funcionarioData);

    mutate(funcionarioData);

    toast.success(`Funcionário ${funcionarioData.nome} ${funcionarioNovo ? 'cadastrado' : 'editado'} com sucesso!`);
  }

  useEffect(() => {
    if (!isSuccess) return
    Router.push("/menu");
  }, [isSuccess])

  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Head>
        <title>Menu</title>
      </Head>
      <div>
        <Header />
        <Button onClick={() => { Router.push("/menu") }}>Cancelar</Button>
        <Button onClick={ submit }>Salvar</Button>


        <FuncionarioTabs value={value} handleChange={handleChange} />

        <TabPanel value={value} index={0}>
          <div className={styles.containerCenter}>
            <Input placeholder='Nome' type='text' value={nome} onChange={(e) => setNome(e.target.value)} />
            <Select options={cargosOptions} value={cargo} updateValue={setCargo}></Select>
            <Select options={categoriaOptions} value={categoria} updateValue={setCategoria}></Select>
            <Input placeholder='Data de admissão' type='date' value={dataadmissao} onChange={(e) => setDataAdimissao(e.target.value)} />
          </div>
         
         <div>
            <h1>Salario</h1>
            <Input placeholder='Salario Base' disabled type='text'  onChange={(e) => setNome(e.target.value)} />
            <Input placeholder='Salario' type='number'/>
            <Input placeholder='Salario Bruto' disabled type='text'  onChange={(e) => setNome(e.target.value)} />
            <Input placeholder='Salario Liquido' disabled type='text'  onChange={(e) => setNome(e.target.value)} />
          </div>

          <div>
            <h1>Horas</h1>
            <Input placeholder='Total Horas Trabalhadas' disabled type='text'  onChange={(e) => setNome(e.target.value)} />
            <Input placeholder='Horas Ausentes' disabled type='text'  onChange={(e) => setNome(e.target.value)} />
            <Input placeholder='Horas Extras' disabled type='text'  onChange={(e) => setNome(e.target.value)} />
          </div>

          <div>
            <h1>Beneficios</h1>
            <Input placeholder='Vale Transporte' disabled type='text'  onChange={(e) => setNome(e.target.value)} />
            <Input placeholder='Vale Alimentação' disabled type='text'  onChange={(e) => setNome(e.target.value)} />
            <Input placeholder='Salário Família' disabled type='text'  onChange={(e) => setNome(e.target.value)} />
            <Input placeholder='Auxilio Creche' disabled type='text'  onChange={(e) => setNome(e.target.value)} />
            <Input placeholder='Diarias para viagens' disabled type='text'  onChange={(e) => setNome(e.target.value)} />
            <Input placeholder='Descanso Remunerado' disabled type='text'  onChange={(e) => setNome(e.target.value)} />
          </div>
          
          <div>
            <h1>Adicionais</h1>
            <Input placeholder='Periculosidade' disabled type='text'  onChange={(e) => setNome(e.target.value)} />
            <Input placeholder='Noturno' disabled type='text'  onChange={(e) => setNome(e.target.value)} />
            <Input placeholder='Insalubridade' disabled type='text'  onChange={(e) => setNome(e.target.value)} />
            <Input placeholder='Tempo de Servico' disabled type='text'  onChange={(e) => setNome(e.target.value)} />
            <Input placeholder='Valor Horas Extras' disabled type='text'  onChange={(e) => setNome(e.target.value)} />
            <Input placeholder='Adiantamento' disabled type='text'  onChange={(e) => setNome(e.target.value)} />
            <Input placeholder='Percentual Comissão' disabled type='text'  onChange={(e) => setNome(e.target.value)} />
            <Input placeholder='Comissão' disabled type='text'  onChange={(e) => setNome(e.target.value)} />
          </div>

          <div>
            <h1>Descontos</h1>
            <Input placeholder='INSS' disabled type='text'  onChange={(e) => setNome(e.target.value)} />
            <Input placeholder='FGTS' disabled type='text'  onChange={(e) => setNome(e.target.value)} />
            <Input placeholder='IRRF' disabled type='text'  onChange={(e) => setNome(e.target.value)} />
            <Input placeholder='Valor horas ausentes' disabled type='text'  onChange={(e) => setNome(e.target.value)} />
          </div>
         
        </TabPanel>
        <TabPanel value={value} index={1}>
        
        </TabPanel>
        <TabPanel value={value} index={2}>

        </TabPanel>
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



