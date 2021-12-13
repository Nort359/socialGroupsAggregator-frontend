import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import Form from '../components/Form';
import Input from '../components/Input';
import Button from '../components/Button';

import { loginUser } from '../reducers/user';

const Login = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const loginHandler = (): void => {
        dispatch(loginUser(email, password));
    };

    return (
        <>
            <h1>Авторизация</h1>
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
                    text={'Авторизоваться'}
                    onClick={loginHandler}
                />
            </Form>
        </>
    );
};

export default Login;
