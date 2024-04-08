import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import styles from "./input.module.scss";

//AuxProps={{ mostraLabel: true, label: 'Nome' }}
interface AuxProps {
    mostraLabel?: boolean;
    label?: string;
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    AuxProps?: AuxProps;
}
interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    AuxProps?: AuxProps;
}

export function Input({ ...rest }: InputProps) {
    return (
        <input className={styles.input} {...rest} />
    );
}   

export function TextArea({ ...rest }: TextAreaProps) {
    return (
        <textarea className={styles.textarea} {...rest} />
    );
}