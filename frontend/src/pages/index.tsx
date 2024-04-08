import styles from "../styles/page.module.scss";
import { Input } from '@/components/ui/Input/input';
import { Button } from '@/components/ui/Button/button';
import Link from 'next/link';

import { useContext, FormEvent, useState } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { toast } from 'react-toastify';
import { canSSRGuest } from '@/utils/canSSRGuest';
import Head from "next/head";

export default function Login() {
  const { signIn } = useContext(AuthContext);

  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');

  const [loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent) {
    try {
      event.preventDefault();

      if (!login || !senha) {
        toast.info("Preencha todos os campos!");
        return;
      }

      setLoading(true);

      let data = { login, senha };
      await signIn(data);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Erro ao tentar realizar o login!");
      console.log(error);
    }
  }

  return (
    <>
      <Head>
        <title>Menu</title>
      </Head>
      <div className={styles.containerCenter}>

        <h1>Gerenciamento de Funcionários</h1>

        <div className={styles.login}>
          <form onSubmit={handleLogin}>
            <Input placeholder='Login' type='text' value={login} onChange={(e) => setLogin(e.target.value)} />
            <Input placeholder='Senha' type='password' value={senha} onChange={(e) => setSenha(e.target.value)} />
            <Button type="submit" loading={loading}>Acessar</Button>
          </form>
        </div>
        <Link className={styles.link} href="/cadastro">Não possui uma conta? Cadastre-se</Link>
      </div>
    </>
  );
}

export const getServerSideProps = canSSRGuest(async (context) => {
  return {
    props: {}
  }
}) 
