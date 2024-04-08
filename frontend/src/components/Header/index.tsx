import Link from 'next/link'
import styles from './header.module.scss'
import { FiLogOut } from 'react-icons/fi'
import { AuthContext } from '@/contexts/AuthContext'
import { useContext } from 'react'

export function Header() {
    const { signOut } = useContext(AuthContext);

    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <h1>Gerenciamento de Funcionarios</h1>

                <nav>
                    <Link href={'/menu'} className={styles.link}>
                        Talvez 1
                    </Link>

                    <Link href={'/menu'} className={styles.link}>
                        Talvez 2
                    </Link>

                    <button onClick={signOut}><FiLogOut color="FFF" size='30'/></button>
                </nav>
            </div>
        </header>
    )
}