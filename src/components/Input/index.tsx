import React, { memo } from 'react';

interface IProps {
    value: string;
    type?: string;
    placeholder?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = memo(({ value, type = 'text', placeholder, onChange }: IProps): React.ReactElement => {
    return (
        <input
            value={ value }
            type={ type }
            placeholder={ placeholder }
            onChange={ onChange }
        />
    );
});

export default Input;
