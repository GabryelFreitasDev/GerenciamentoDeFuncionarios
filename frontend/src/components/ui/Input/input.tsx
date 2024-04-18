import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import styles from "./input.module.scss";

//AuxProps={{ mostraLabel: true, label: 'Nome' }}
interface AuxProps {
    mostraLabel?: boolean;
    label?: string;
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string | undefined;
}
interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    AuxProps?: AuxProps;
}

export function Input({ label, ...rest }: InputProps) {
    return (
        <>
            <label>{label}</label>
            <input className={styles.input} {...rest} />
        </>
    );
}   

export function TextArea({ ...rest }: TextAreaProps) {
    return (
        <textarea className={styles.textarea} {...rest} />
    );
}