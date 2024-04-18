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
import { canSSRAuth } from "@/utils/canSSRAuth";
import { CargoData } from "@/interfaces/CargoData";
import { FuncionarioData } from "@/interfaces/FuncionarioData";
import { useFuncionarioDataMutatePost, useFuncionarioDataMutatePut } from "@/hooks/funcionario/useFuncionarioDataMutate";
import { toast } from "react-toastify";
import { categoriaEnum } from "@/enums/categoriaEnum";
import { AdicionaisData } from "@/interfaces/AdicionaisData";
import { BeneficiosData } from "@/interfaces/BeneficiosData";
import { HorasData } from "@/interfaces/HorasData";
import { DescontosData } from "@/interfaces/DescontosData";
import { FolhaDePagamentoData } from "@/interfaces/FolhaDePagamentoData";
import { FuncionarioContext } from "@/contexts/FuncionarioContext";
import { Calculos } from "@/a/CalculosFolhaPagamento";
import { AuthContext } from "@/contexts/AuthContext";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface FolhaPagamentoDependencias {
  beneficios: BeneficiosData | null,
  adicionais: AdicionaisData | null,
  horas: HorasData | null,
  descontos: DescontosData | null,
  folhaPagamento: FolhaDePagamentoData | null
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
  const { funcionarioData, cargosList } = useContext(FuncionarioContext);
  const { user } = useContext(AuthContext);

  const funcionario = funcionarioData?.funcionario;

  const [cargos, setCargos] = useState<CargoData[]>(cargosList);
  const [beneficios, setBeneficios] = useState<BeneficiosData | undefined>(funcionarioData?.beneficios ? funcionarioData.beneficios : undefined);
  const [adicionais, setAdicionais] = useState<AdicionaisData | undefined>(funcionarioData?.adicionais ? funcionarioData.adicionais : undefined);
  const [horas, setHoras] = useState<HorasData | undefined>(funcionarioData?.horas ? funcionarioData.horas : undefined);
  const [descontos, setDescontos] = useState<DescontosData | undefined>(funcionarioData?.descontos ? funcionarioData.descontos : undefined);
  const [folhaPagamento, setFolhaPagamento] = useState<FolhaDePagamentoData | undefined>(funcionarioData?.folhaPagamento ? funcionarioData.folhaPagamento : undefined);

  const cargosOptions = cargos?.map(cargo => ({
    id: cargo.idcargo,
    name: cargo.nome
  })) || [];

  const [nome, setNome] = useState(funcionario?.nome ? funcionario.nome : '');
  const [cargo, setCargo] = useState(funcionario?.idcargo ? cargosOptions.find(x => x.id == funcionario.idcargo)?.name : '');
  const [categoria, setCategoria] = useState(funcionario?.categoria ? categoriaEnum.find(x => x.id == funcionario.categoria)?.name : '');
  const [dataadmissao, setDataAdimissao] = useState(funcionario?.dataadmissao ? funcionario.dataadmissao.toString().split('T')[0] : new Date().toISOString().split('T')[0]);

  const [salarioBase, setSalarioBase] = useState(cargos.find(x => x.idcargo == funcionario?.idcargo)?.salariobase ?? '');
  const [salarioBruto, setSalarioBruto] = useState('');
  const [salarioLiquido, setSalarioLiquido] = useState('');

  const [totalHorasTrabalhadas, setTotalHorasTrabalhadas] = useState(funcionarioData?.horas?.horastrabalhadas ?? '');
  const [totalHorasAusentes, setTotalHorasAusentes] = useState(funcionarioData?.horas?.horasausentes ?? '')
  const [totalHorasExtras, setTotalHorasExtras] = useState(funcionarioData?.adicionais?.valorhorasextras ?? '');

  const [valeTransporte, setValeTransporte] = useState(funcionarioData?.beneficios?.valetransporte ?? '');
  const [valeAlimentacao, setValeAlimentacao] = useState(funcionarioData?.beneficios?.valealimentacao ?? 400);
  const [salarioFamilia, setSalarioFamilia] = useState(funcionarioData?.beneficios?.salariofamilia ?? '');
  const [auxilioCreche, setAuxilioCreche] = useState(funcionarioData?.beneficios?.auxiliocreche ?? '');
  const [diariaParaViagens, setDiariaParaViagens] = useState(funcionarioData?.beneficios?.diariasparaviagens ?? '');
  const [descancoRemunerado, setDescancoRemunerado] = useState(funcionarioData?.beneficios?.descansoremunerado ?? '');

  const [periculosidade, setPericulosidade] = useState(funcionarioData?.adicionais?.periculosidade ?? '');
  const [noturno, setNoturno] = useState(funcionarioData?.adicionais?.noturno ?? '');
  const [insalubridade, setInsalubridade] = useState(funcionarioData?.adicionais?.insalubridade ?? '');
  const [tempoDeServico, setTempoDeServico] = useState(funcionarioData?.adicionais?.tempodeservico ?? '');
  const [valorHorasExtras, setValorHorasExtras] = useState(funcionarioData?.adicionais?.valorhorasextras ?? '');
  const [adiantamento, setAdiantamento] = useState(funcionarioData?.adicionais?.adiantamento ?? '');
  const [percentualComissao, setPercentualComissao] = useState(funcionarioData?.adicionais?.percentualcomissao ?? '');
  const [comissao, setComissao] = useState(funcionarioData?.adicionais?.comissao ?? '');

  const [inss, setINSS] = useState(funcionarioData?.descontos?.inss ?? '');
  const [fgts, setFGTS] = useState(funcionarioData?.descontos?.fgts ?? '');
  const [irrf, setIRRF] = useState(funcionarioData?.descontos?.irrf ?? '');
  const [valorHorasAusentes, setValorHorasAusentes] = useState(funcionarioData?.descontos?.valorhorasausentes ?? '');

  const [valorTotalDescontos, setValorTotalDescontos] = useState('');
  const [valorTotalAdicionais, setValorTotalAdicionais] = useState('');

  function CalculaFolha(salario: number, totalHorasTrabalhadas: number, totalHorasAusentes: number, totalHorasExtras: number) {
    setINSS(Calculos.CalculaINSS(salario));
    setFGTS(Calculos.CalculaFGTS(salario));
    setIRRF(Calculos.CalculaIRRF(salario));
    setValorHorasAusentes(Calculos.CalculaValorDescontoHorasAusentes(salario, totalHorasTrabalhadas, totalHorasAusentes));
    setValorHorasExtras(Calculos.CalculaValorAdicionalHorasExtra(salario, totalHorasTrabalhadas, totalHorasExtras))
  }

  useEffect(() => {
    setValorTotalDescontos(Calculos.CalculaValorTotalDescontos(
      parseFloat(inss.toString()),
      parseFloat(irrf.toString()),
      parseFloat(valorHorasAusentes.toString()))
    );
  }, [inss, fgts, irrf, valorHorasAusentes])

  useEffect(() => {
    const valorTotalAdicionais = parseFloat(Calculos.CalculaValorTotalAdicionais(
      parseFloat(periculosidade.toString()),
      parseFloat(noturno.toString()),
      parseFloat(insalubridade.toString()),
      parseFloat(valorHorasExtras.toString())
    ));

    const salarioBrutoCalculado =
      parseFloat(salarioBase.toString()) +
      parseFloat(valeAlimentacao.toString())

    const salarioLiquidoCalculado =
      parseFloat(salarioBrutoCalculado.toString()) -
      parseFloat(valorTotalDescontos.toString())

    setValorTotalAdicionais(valorTotalAdicionais.toString());
    setSalarioLiquido(salarioLiquidoCalculado.toString());
    setSalarioBruto(salarioBrutoCalculado.toString());
  }, [valorTotalDescontos, valorHorasExtras])

  useEffect(() => {
    const salarioBrutoCalculado =
      parseFloat(salarioBase.toString()) +
      parseFloat(valeAlimentacao.toString()) +
      parseFloat(valorTotalAdicionais)

    const salarioLiquidoCalculado =
      parseFloat(salarioBrutoCalculado.toString()) -
      parseFloat(valorTotalDescontos.toString())

    setSalarioLiquido(salarioLiquidoCalculado.toString());
    setSalarioBruto(salarioBrutoCalculado.toString());
  }, [valorTotalAdicionais])

  useEffect(() => {
    const salarioBrutoCalculado =
      parseFloat(salarioBase.toString()) +
      parseFloat(valeAlimentacao.toString()) +
      parseFloat(valorTotalAdicionais)

    const salarioLiquidoCalculado =
      parseFloat(salarioBrutoCalculado.toString()) -
      parseFloat(valorTotalDescontos.toString())

    setSalarioLiquido(salarioLiquidoCalculado.toString());
    setSalarioBruto(salarioBrutoCalculado.toString());
  }, [periculosidade, noturno, insalubridade])

  const { mutate, isSuccess } = funcionario ? useFuncionarioDataMutatePut() : useFuncionarioDataMutatePost();

  const submit = () => {
    const funcionarioData: FuncionarioData = {
      idfuncionario: funcionario?.idfuncionario ? funcionario.idfuncionario : '',
      nome,
      idcargo: cargos.find(x => x.nome == cargo)?.idcargo,
      categoria: categoriaEnum.find(x => x.name == categoria)?.id,
      dataadmissao: new Date(dataadmissao),
      idusuariocadastro: 'a1d4603e-16b5-4850-a27d-fd89382e0157'
    }

    const funcionarioNovo = funcionarioData.idfuncionario == '';

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
        <Button color='red' onClick={() => { Router.push("/menu") }}>Cancelar</Button>
        <Button color='green' onClick={async () => await CalculaFolha(
          parseFloat(salarioBase.toString()),
          parseFloat(totalHorasTrabalhadas.toString()),
          parseFloat(totalHorasAusentes.toString()),
          parseFloat(totalHorasExtras.toString())
        )}>Calcular</Button>
        <Button color='green' positionedRight onClick={submit}>Salvar</Button>
        <FuncionarioTabs value={value} handleChange={handleChange} />

        <TabPanel value={value} index={0}>
          <div className={styles.div}>
            <Input label='Nome:' placeholder='Nome' type='text' value={nome} onChange={(e) => setNome(e.target.value)} />
            <Select label='Cargo:' options={cargosOptions} value={cargo} updateValue={setCargo}></Select>
            <Select label='Categoria:' options={categoriaEnum} value={categoria} updateValue={setCategoria}></Select>
            <Input label='Data de admissão:' placeholder='Data de admissão' type='date' value={dataadmissao} onChange={(e) => setDataAdimissao(e.target.value)} />
          </div>

          <h1>Salario</h1>
          <div className={styles.div}>
            <Input label='Salário Base:' placeholder='Salario Base' type='number' value={salarioBase} onChange={(e) => setSalarioBase(parseFloat(e.target.value))} />
            <Input label='Salário Bruto:' placeholder='Salario Bruto' disabled type='number' value={salarioBruto} onChange={(e) => setSalarioBruto(e.target.value)} />
            <Input label='Salário Líquido:' placeholder='Salario Liquido' disabled type='number' value={salarioLiquido} onChange={(e) => setSalarioLiquido(e.target.value)} />
          </div>

          <h1>Horas</h1>
          <div className={styles.div}>
            <Input label='Total Horas Trabalhadas:' placeholder='Total Horas Trabalhadas' type='text' value={totalHorasTrabalhadas} onChange={(e) => setTotalHorasTrabalhadas(e.target.value)} />
            <Input label='Horas Ausentes:' placeholder='Horas Ausentes' type='text' value={totalHorasAusentes} onChange={(e) => setTotalHorasAusentes(e.target.value)} />
            <Input label='Horas Extras:' placeholder='Horas Extras' type='text' value={totalHorasExtras} onChange={(e) => setTotalHorasExtras(e.target.value)} />
          </div>

          <h1>Descontos</h1>
          <div className={styles.div}>
            <Input label='INSS:' placeholder='INSS' disabled type='text' value={inss} onChange={(e) => setINSS(e.target.value)} />
            <Input label='FGTS:' placeholder='FGTS' disabled type='text' value={fgts} onChange={(e) => setFGTS(e.target.value)} />
            <Input label='IRRF:' placeholder='IRRF' disabled type='text' value={irrf} onChange={(e) => setIRRF(e.target.value)} />
            <Input label='Valor Horas Ausentes:' placeholder='Valor horas ausentes' disabled type='text' value={valorHorasAusentes} onChange={(e) => setValorHorasAusentes(e.target.value)} />
            <Input label='Valor Total Descontos:' placeholder='Valor Total Descontos' disabled type='text' value={valorTotalDescontos} onChange={(e) => setValorTotalDescontos(e.target.value)} />
          </div>

          <h1>Beneficios</h1>
          <div className={styles.div}>
            <Input placeholder='Vale Transporte' disabled type='text' value={valeTransporte} onChange={(e) => setValeTransporte(e.target.value)} />
            <Input placeholder='Vale Alimentação' disabled type='text' value={valeAlimentacao} onChange={(e) => setValeAlimentacao(parseFloat(e.target.value))} />
            <Input placeholder='Salário Família' disabled type='text' value={salarioFamilia} onChange={(e) => setSalarioFamilia(e.target.value)} />
            <Input placeholder='Auxilio Creche' disabled type='text' value={auxilioCreche} onChange={(e) => setAuxilioCreche(e.target.value)} />
            <Input placeholder='Diarias para viagens' disabled type='text' value={diariaParaViagens} onChange={(e) => setDiariaParaViagens(e.target.value)} />
            <Input placeholder='Descanso Remunerado' disabled type='text' value={descancoRemunerado} onChange={(e) => setDescancoRemunerado(e.target.value)} />
          </div>

          <h1>Adicionais</h1>
          <div className={styles.div}>
            <Input placeholder='Periculosidade' type='text' value={periculosidade} onChange={(e) => setPericulosidade(e.target.value)} />
            <Input placeholder='Noturno' type='text' value={noturno} onChange={(e) => setNoturno(e.target.value)} />
            <Input placeholder='Insalubridade' type='text' value={insalubridade} onChange={(e) => setInsalubridade(e.target.value)} />
            {/* <Input placeholder='Tempo de Servico' disabled type='text' value={tempoDeServico} onChange={(e) => setTempoDeServico(e.target.value)} /> */}
            <Input placeholder='Valor Horas Extras' disabled type='text' value={valorHorasExtras} onChange={(e) => setValorHorasExtras(e.target.value)} />
            {/* <Input placeholder='Adiantamento' type='text' value={adiantamento} onChange={(e) => setAdiantamento(e.target.value)} /> */}
            {/* <Input placeholder='Percentual Comissão' disabled type='text' value={percentualComissao} onChange={(e) => setPercentualComissao(e.target.value)} />
            <Input placeholder='Comissão' disabled type='text' value={comissao} onChange={(e) => setComissao(e.target.value)} /> */}
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
    props: {}
  }
})
