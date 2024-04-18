import styles from "./select.module.scss";

interface SelectProps {
    value: string | number | undefined;
    options: Array<{ id?: number | string; name: string }>;
    updateValue(value: any): void
}

export const Select = ({ value, options, updateValue }: SelectProps) => {
    return (
        <>
            <select className={styles.select} value={value} onChange={e => updateValue(e.target.value)}>
                {options.map(option => (
                    <option key={option.id} value={option.name}>
                        {option.name}
                    </option>
                ))}
            </select>
        </>
    );
};
