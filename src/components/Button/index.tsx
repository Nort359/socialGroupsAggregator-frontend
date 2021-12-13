import React, { memo } from 'react';

interface IProps {
    text: string;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = memo(({ text, onClick }: IProps): React.ReactElement => {
    return <button onClick={onClick}>{text}</button>;
});

export default Button;
