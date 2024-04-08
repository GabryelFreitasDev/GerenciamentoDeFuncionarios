import { Metadata } from 'next'
import styles from "../../styles/page.module.scss";
import { Input } from '@/components/Input/input';
import { Button } from '@/components/Button/button';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Menu"
};

export default function Menu() {
  return (
    <>
      <div className={styles.containerCenter}>
        <h1>Menu</h1>
      </div>
    </>
  );
}
