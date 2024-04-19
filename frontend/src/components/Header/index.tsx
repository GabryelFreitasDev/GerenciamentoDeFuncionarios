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
                <h1>Folha de Pagamento</h1>
                <nav>
                    <button onClick={signOut}><FiLogOut color="FFF" size='30'/></button>
                </nav>
            </div>
        </header>
    )
}