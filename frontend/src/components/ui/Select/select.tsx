interface SelectProps {
    label: string;
    value: string | number | undefined;
    options: Array<{ id?: number | string ; name: string }>;
    updateValue(value: any): void;
    className?: string
}

export const Select = ({ label, value, options, updateValue }: SelectProps) => {
    return (
        <>
            <label>{label}</label>
            <select value={value} onChange={e => updateValue(e.target.value)}>
                {options.map(option => (
                    <option key={option.id} value={option.name}>
                        {option.name}
                    </option>
                ))}
            </select>
        </>
    );
};