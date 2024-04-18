import styles from './button.module.scss'
import { ButtonHTMLAttributes, ReactNode } from 'react'
import { FaSpinner } from 'react-icons/fa'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean;
    children: ReactNode;
    color: string;
    positionedRight?: boolean;
}

export function Button({ loading, children, color, positionedRight, ...rest }: ButtonProps) {
    return (
        <button
            type={rest.type ? rest.type : 'submit'}
            className={`${styles.button} ${positionedRight ? styles.positionedRight : ''}`}
            style={{ backgroundColor: color }}
            disabled={loading} 
            {...rest}
        >
            {loading 
                ? (<FaSpinner color='#FFF' size={16}/>) 
                : (<span className={styles.buttonText}>{children}</span>)}
        </button>
    )
}
