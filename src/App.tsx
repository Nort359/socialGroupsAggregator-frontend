import React, { useEffect, useCallback } from 'react';

import { useDispatch } from 'react-redux';
import { checkAuth, logoutUser } from './reducers/user';
import { fetchUserTelegramData } from './reducers/telegram';
import { useUser } from './hooks/user';

import Header from './components/Header';
import Routes from './routes';

const App = (): React.ReactElement => {
    const dispatch = useDispatch();
    const { isLoading, isLoggedIn, user } = useUser();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            dispatch(checkAuth());
        }
    }, [dispatch]);

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(fetchUserTelegramData(user.id));
        }
    }, [dispatch, isLoggedIn, user.id]);

    const onLogOutHandler = useCallback(() => {
        dispatch(logoutUser());
    }, [dispatch, logoutUser]);

    if (isLoading) {
        return <>Загрузка...</>;
    }

    return (
        <>
            <Header />
            <Routes />
            {/*TODO: Убрать из App*/}
            <button onClick={onLogOutHandler}>Выйти</button>
        </>
    );
}

export default App;
