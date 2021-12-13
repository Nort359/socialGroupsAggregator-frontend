import React, {useState} from 'react';
import { useDispatch } from 'react-redux';

import Form from '../components/Form';
import Input from '../components/Input';
import Button from '../components/Button';

import { registerUser } from '../reducers/user';

const Registration = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const registerHandler = (): void => {
        dispatch(registerUser(email, password));
    };

    return (
        <>
            <h1>Регистрация</h1>
            <Form>
                <Input
                    value={email}
                    type={'text'}
                    placeholder={'Email'}
                    onChange={(event) => setEmail(event.target.value)}
                />
                <Input
                    value={password}
                    type={'password'}
                    placeholder={'Пароль'}
                    onChange={(event) => setPassword(event.target.value)}
                />
                <Button
                    text={'Зарегистрироваться'}
                    onClick={registerHandler}
                />
            </Form>
        </>
    );
};

export default Registration;
