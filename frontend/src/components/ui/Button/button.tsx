import styles from './button.module.scss'
import { ButtonHTMLAttributes, ReactNode } from 'react'
import { FaSpinner} from 'react-icons/fa'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean;
    children: ReactNode
}

export function Button({ loading, children, ...rest }: ButtonProps) {
    return (
        <button
        type={rest.type ? rest.type : 'submit'}
        className={styles.button} 
        disabled={loading} 
        {...rest}>
            {loading 
            ? (<FaSpinner color='#FFF' size={16}/>) 
            : (<a className={styles.buttonText}>{children}</a>)}
        </button>
    )
}