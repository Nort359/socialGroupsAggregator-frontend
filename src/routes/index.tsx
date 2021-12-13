import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from '../pages/Home';
import Login from '../pages/Login';
import Registration from '../pages/Registration';
import List from '../pages/List';
import Group from '../pages/Group';

const AppRoutes = (): React.ReactElement => {
    return (
        <Routes>
            <Route path={'/'} element={ <Home /> } />
            <Route path={'/login'} element={ <Login /> } />
            <Route path={'/registration'} element={ <Registration /> } />
            <Route path={'/list'} element={ <List /> } />
            <Route path={'/list/:id'} element={ <Group /> } />
            <Route path={'*'} element={ <h1>По указанному адресу ничего не найдено</h1> } />
        </Routes>
    );
};

export default AppRoutes;
