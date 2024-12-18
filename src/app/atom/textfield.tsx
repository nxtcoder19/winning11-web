import React from 'react';

type TextfieldProps = {
    type?: string;
    name?: string;
    placeholder?: string;
    value?: string;
    disabled?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Textfield = ({ type, name, placeholder, value, disabled, onChange }: TextfieldProps) => {
    return <input
        className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
        type={type}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        disabled={disabled}
        value={value}
    />
}