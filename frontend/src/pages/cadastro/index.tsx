import { Metadata } from 'next'
import { FormEvent, useState, useContext } from 'react';
import styles from "./cadastro.module.scss";
import { Input } from '@/components/ui/Input/input';
import { Button } from '@/components/ui/Button/button';
import Link from 'next/link';
import { AuthContext } from '@/contexts/AuthContext';
import { toast } from 'react-toastify';
import Head from 'next/head';

export const metadata: Metadata = {
  title: "Cadastro"
};

export default function Cadastro() {
  const { signUp } = useContext(AuthContext);

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');

  const [loading, setLoading] = useState(false);

  async function handleCadastrar(event: FormEvent) {
    try {
      event.preventDefault();

      if (!nome || !email || !login || !senha) {
        toast.info("Preencha todos os campos!")
        return;
      }

      const data = { nome: nome, email: email, login: login, senha: senha }

      setLoading(true);

      await signUp(data);

      setLoading(false);

    } catch (error) {
      setLoading(false);
      console.log(error);
    }

  }


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
            <Button type='submit' loading={loading} >Cadastar</Button>
            <Link className={styles.link} href="/"> Já possui uma conta? Faça login!</Link>
          </form>
        </div>

      </div>
    </>
  );
}
