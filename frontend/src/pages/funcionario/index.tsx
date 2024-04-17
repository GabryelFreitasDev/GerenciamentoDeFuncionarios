import styles from "./funcionario.module.scss";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import { FiUser } from 'react-icons/fi'
import { Header } from "@/components/Header";
import { Select } from "@/components/ui/Select/select";
import { Button } from "@/components/ui/Button/button";
import { Input } from "@/components/ui/Input/input";
import { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import Head from "next/head";
import { canSSRAuth } from "@/utils/canSSRAuth";
import { CargoData } from "@/interfaces/CargoData";
import { FuncionarioData } from "@/interfaces/FuncionarioData";
import { useFuncionarioDataMutatePost, useFuncionarioDataMutatePut } from "@/hooks/funcionario/useFuncionarioDataMutate";
import { AuthContext, AuthProvider } from "@/contexts/AuthContext";
import { setupAPIClient } from "@/services/api";
import { useFuncionarioData } from "@/hooks/funcionario/useFuncionarioData";
import { toast } from "react-toastify";
import { categoriaEnum } from "@/enums/categoriaEnum";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface FuncionarioDependencies {
  cargos: CargoData[],
  beneficios: CargoData,
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
export default function Funcionario() {
  const router = useRouter();
  const { funcionarioJSON } = router.query;

  const funcionario :FuncionarioData | null = funcionarioJSON ? JSON.parse(funcionarioJSON as string) : null;

  let dependencies :FuncionarioDependencies | null = null;

 

  async function CarregaDependencias(){
    const apiClient = setupAPIClient();

    const responseCargo = await apiClient.get('/Cargos')
    const responseFuncionario = await apiClient.get('/Funcionarios')
    const responseBeneficios = await apiClient.get('/Beneficios');
    const responseAdicionais = await apiClient.get('/Adicionais'); 
    const responseHoras = await apiClient.get('/Horas');
    const responseDescontos = await apiClient.get('/Descontos');
    const responseFolhaPagamentos = await apiClient.get('/FolhasPagamentos');
    
    dependencies?.cargos = responseCargo.data
    
  }

  

  const [nome, setNome] = useState(funcionario?.nome ? funcionario.nome : '');
  const [cargo, setCargo] = useState(funcionario?.idcargo ? cargosOptions.find(x => x.id == funcionario.idcargo)?.name : '');
  const [categoria, setCategoria] = useState(funcionario?.categoria ? categoriaEnum.find(x => x.id == funcionario.categoria)?.name : '');
  const [dataadmissao, setDataAdimissao] = useState(funcionario?.dataadmissao ? funcionario.dataadmissao.toString().split('T')[0] : new Date().toISOString().split('T')[0]);

  const [salarioBase, setSalarioBase] = useState('');
  const [salario, setSalario] = useState('');
  const [salarioBruto, setSalarioBruto] = useState('');
  const [salarioLiquido, setSalarioLiquido] = useState('');

  const [totalHorasTrabalhadas, setTotalHorasTrabalhadas] = useState('');
  const [totalHorasAusentes, setTotalHorasAusentes] = useState('');
  const [totalHorasExtras, setTotalHorasExtras] = useState('');

  const [valeTransporte, setValeTransporte] = useState('');
  const [valeAlimentacao, setValeAlimentacao] = useState('');
  const [salarioFamilia, setSalarioFamilia] = useState('');
  const [auxilioCreche, setAuxilioCreche] = useState('');
  const [diariaParaViagens, setDiariaParaViagens] = useState('');
  const [descancoRemunerado, setDescancoRemunerado] = useState('');

  const [periculosidade, setPericulosidade] = useState('');
  const [noturno, setNoturno] = useState('');
  const [insalubridade, setInsalubridade] = useState('');
  const [tempoDeServico, setTempoDeServico] = useState('');
  const [valorHorasExtras, setValorHorasExtras] = useState('');
  const [adiantamento, setAdiantamento] = useState('');
  const [percentualComissao, setPercentualComissao] = useState('');
  const [comissao, setComissao] = useState('');

  const [inss, setINSS] = useState('');
  const [fgts, setFGTS] = useState('');
  const [irrf, setIRRF] = useState('');
  const [valorHorasAusentes, setValorHorasAusentes] = useState('');


  const { mutate, isSuccess } = funcionario ? useFuncionarioDataMutatePut() : useFuncionarioDataMutatePost();

  const submit = () => {
    const funcionarioData: FuncionarioData = {
      idfuncionario: funcionario?.idfuncionario ? funcionario.idfuncionario : '',
      nome,
      idcargo: cargosOptions.find(x => x.name == cargo)?.id,
      categoria: categoriaEnum.find(x => x.name == categoria)?.id,
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
        <Button onClick={submit}>Salvar</Button>

        <FuncionarioTabs value={value} handleChange={handleChange} />

        <TabPanel value={value} index={0}>
          <div className={styles.containerCenter}>
            <Input placeholder='Nome' type='text' value={nome} onChange={(e) => setNome(e.target.value)} />
            <Select label='Cargo' options={cargosOptions} value={cargo} updateValue={setCargo}></Select>
            <Select label='Categoria' options={categoriaEnum} value={categoria} updateValue={setCategoria}></Select>
            <Input placeholder='Data de admissão' type='date' value={dataadmissao} onChange={(e) => setDataAdimissao(e.target.value)} />
          </div>

          <div>
            <h1>Salario</h1>
            <Input placeholder='Salario Base' disabled type='number' value={salarioBase} onChange={(e) => setSalarioBase(e.target.value)} />
            <Input placeholder='Salario' type='number' value={salario} onChange={(e) => setSalario(e.target.value)} />
            <Input placeholder='Salario Bruto' disabled type='number' value={salarioBruto}  onChange={(e) => setSalarioBruto(e.target.value)} />
            <Input placeholder='Salario Liquido' disabled type='number' value={salarioLiquido} onChange={(e) => setSalarioLiquido(e.target.value)} />
          </div>

          <div>
            <h1>Horas</h1>
            <Input placeholder='Total Horas Trabalhadas' disabled type='text' value={totalHorasTrabalhadas} onChange={(e) => setTotalHorasTrabalhadas(e.target.value)} />
            <Input placeholder='Horas Ausentes' disabled type='text' value={totalHorasAusentes} onChange={(e) => setTotalHorasAusentes(e.target.value)} />
            <Input placeholder='Horas Extras' disabled type='text' value={totalHorasExtras} onChange={(e) => setTotalHorasExtras(e.target.value)} />
          </div>

          <div>
            <h1>Beneficios</h1>
            <Input placeholder='Vale Transporte' disabled type='text' value={valeTransporte} onChange={(e) => setValeTransporte(e.target.value)} />
            <Input placeholder='Vale Alimentação' disabled type='text' value={valeAlimentacao} onChange={(e) => setValeAlimentacao(e.target.value)} />
            <Input placeholder='Salário Família' disabled type='text' value={salarioFamilia} onChange={(e) => setSalarioFamilia(e.target.value)} />
            <Input placeholder='Auxilio Creche' disabled type='text' value={auxilioCreche} onChange={(e) => setAuxilioCreche(e.target.value)} />
            <Input placeholder='Diarias para viagens' disabled type='text' value={diariaParaViagens} onChange={(e) => setDiariaParaViagens(e.target.value)} />
            <Input placeholder='Descanso Remunerado' disabled type='text' value={descancoRemunerado} onChange={(e) => setDescancoRemunerado(e.target.value)} />
          </div>

          <div>
            <h1>Adicionais</h1>
            <Input placeholder='Periculosidade' disabled type='text' value={periculosidade} onChange={(e) => setPericulosidade(e.target.value)} />
            <Input placeholder='Noturno' disabled type='text' value={noturno} onChange={(e) => setNoturno(e.target.value)} />
            <Input placeholder='Insalubridade' disabled type='text' value={insalubridade} onChange={(e) => setInsalubridade(e.target.value)} />
            <Input placeholder='Tempo de Servico' disabled type='text' value={tempoDeServico} onChange={(e) => setTempoDeServico(e.target.value)} />
            <Input placeholder='Valor Horas Extras' disabled type='text' value={valorHorasExtras} onChange={(e) => setValorHorasExtras(e.target.value)} />
            <Input placeholder='Adiantamento' disabled type='text' value={adiantamento} onChange={(e) => setAdiantamento(e.target.value)} />
            <Input placeholder='Percentual Comissão' disabled type='text' value={percentualComissao} onChange={(e) => setPercentualComissao(e.target.value)} />
            <Input placeholder='Comissão' disabled type='text' value={comissao} onChange={(e) => setComissao(e.target.value)} />
          </div>

          <div>
            <h1>Descontos</h1>
            <Input placeholder='INSS' disabled type='text' value={inss} onChange={(e) => setINSS(e.target.value)} />
            <Input placeholder='FGTS' disabled type='text' value={fgts} onChange={(e) => setFGTS(e.target.value)} />
            <Input placeholder='IRRF' disabled type='text' value={irrf} onChange={(e) => setIRRF(e.target.value)} />
            <Input placeholder='Valor horas ausentes' disabled type='text' value={valorHorasAusentes} onChange={(e) => setValorHorasAusentes(e.target.value)} />
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

export const getServerSideProps = canSSRAuth(async (context) => {
  

 
  
  return {
    props: {
      cargoList: responseCargo.data,
      funcionarioList: responseFuncionario.data,
      beneficiosList: responseBeneficios.data,
      adicionaisList: responseAdicionais.data,
      horasList: responseHoras.data,
      descontosList: responseDescontos.data,
      folhaPagamentoList: responseFolhaPagamentos.data
    }
  }
})



