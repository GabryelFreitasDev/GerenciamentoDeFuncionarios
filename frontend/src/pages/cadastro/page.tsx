import { Metadata } from 'next'
import styles from "../../styles/page.module.scss";
import { Input } from '@/components/Input/input';
import { Button } from '@/components/Button/button';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Cadastro"
};

export default function Cadastro() {
  return (
    <>
      <div className={styles.containerCenter}>

        <h1>Cadastre-se</h1>

        <div className={styles.login}>
          <form>
            <Input placeholder='Nome' type='text' />
            <Input placeholder='E-mail' type='text' />
            <Input placeholder='Login' type='text' />
            <Input placeholder='Senha' type='password' />
            <Button>Cadastar</Button>
            <Link className={styles.link} href="/"> Já possui uma conta? Faça login!</Link>
          </form>
        </div>
        
      </div>
    </>
  );
}
