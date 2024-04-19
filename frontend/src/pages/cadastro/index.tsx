import { Metadata } from 'next'
import { FormEvent, useState, useContext } from 'react';
import styles from "./cadastro.module.scss";
import { Input } from '@/components/ui/Input/input';
import { Button } from '@/components/ui/Button/button';
import Link from 'next/link';
import { AuthContext } from '@/contexts/AuthContext';
import { toast } from 'react-toastify';
import Head from 'next/head';
import { canSSRGuest } from '@/utils/canSSRGuest';
import { Select } from '@/components/ui/Select/select';
import { setupAPIClient } from '@/services/api';
import { EmpresaData } from '@/interfaces/EmpresaData';

export const metadata: Metadata = {
  title: "Cadastro"
};

interface CadastroProps {
  empresaList: EmpresaData[]
}


export default function Cadastro({ empresaList }: CadastroProps) {
  const { signUp } = useContext(AuthContext);

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [empresa, setEmpresa] = useState('');

  async function handleCadastrar(event: FormEvent) {
    try {
      event.preventDefault();

      if (!nome || !email || !login || !senha) {
        toast.info("Preencha todos os campos!")
        return;
      }
      const data = { nome: nome, email: email, login: login, senha: senha, idempresa: empresa }

      setLoading(true);

      await signUp(data);

      setLoading(false);

    } catch (error) {
      setLoading(false);
      console.log(error);
    }

  }

  const empresaOptions = empresaList?.map(empresa => ({
    id: empresa.idempresa,
    name: empresa.nome
  })) || [];

  return (
    <>
      <Head>
        <title>Menu</title>
      </Head>
      <div className={styles.containerCenter}>

        <h1>Cadastre-se</h1>

        <div className={styles.login}>
          <form onSubmit={handleCadastrar}>
            <Input placeholder='Nome' type='text' value={nome} onChange={(e) => setNome(e.target.value)} />
            <Input placeholder='E-mail' type='text' value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input placeholder='Login' type='text' value={login} onChange={(e) => setLogin(e.target.value)} />
            <Input placeholder='Senha' type='password' value={senha} onChange={(e) => setSenha(e.target.value)} />

            <Select label={''} options={empresaOptions} value={empresa} updateValue={setEmpresa}></Select>

            <Button color='green' type='submit' loading={loading} >Cadastar</Button>
            <Link className={styles.link} href="/"> Já possui uma conta? Faça login!</Link>
          </form>
        </div>

      </div>
    </>
  );
}

export const getServerSideProps = canSSRGuest(async (context) => {
  const apiClient = setupAPIClient();
  const responseEmpresa = await apiClient.get('/Empresas')

  return {
    props: {
      empresaList: responseEmpresa.data,
    }
  }
}) 
