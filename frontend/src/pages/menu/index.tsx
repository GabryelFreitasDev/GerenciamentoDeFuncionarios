import styles from "./menu.module.scss";
import { Button } from '@/components/ui/Button/button';
import { canSSRAuth } from '@/utils/canSSRAuth';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import Head from "next/head";
import { Header } from "@/components/Header";

export default function Menu() {
  

  return (
    <>
    <Head>
      <title>Menu</title>
    </Head>
      <div className={styles.containerCenter}>
        <Header/>
        <h1>Menu</h1>
      </div>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async () => {
  return {
    props: {}
  }
})
