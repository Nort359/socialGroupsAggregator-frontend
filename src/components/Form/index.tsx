import React, { memo } from 'react';

interface IProps {
    children?: React.ReactNode
}

const Form = memo(({ children }: IProps): React.ReactElement => {
    return (
        <div>
            { children }
        </div>
    );
});

export default Form;
