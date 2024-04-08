import { Metadata } from 'next'
import styles from "../styles/page.module.scss";
import { Input } from '@/components/Input/input';
import { Button } from '@/components/Button/button';
import Link from 'next/link';

import { useContext, FormEvent } from 'react';
import { AuthContext } from '@/contexts/AuthContext';

export const metadata: Metadata = {
  title: "Login"
};

export default function Login() {
  const { login } = useContext(AuthContext);

  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    let data = {
      login: "teste",
      senha: "123"
    }

    await login(data);
  }

  return (
    <>
      <div className={styles.containerCenter}>

        <h1>Gerenciamento de Funcionários</h1>

        <div className={styles.login}>
          <form onSubmit={handleLogin}>
            <Input placeholder='Login' type='text' />
            <Input placeholder='Senha' type='password' />
            <Button type="submit" >Acessar</Button>
          </form>
        </div>
        <Link className={styles.link} href="/cadastro">Não possui uma conta? Cadastre-se</Link>
      </div>
    </>
  );
}
