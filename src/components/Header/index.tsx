import React from 'react';
import { Link } from 'react-router-dom';

import { useUser } from '../../hooks/user';

const Header = (): React.ReactElement => {
    const { isLoggedIn } = useUser();
    const homePage = <div><Link to={'/'}>Домашняя страница</Link></div>;

    return (
        <>
            { isLoggedIn ? (
                <>
                    {homePage}
                    <div><Link to={'/list'}>Список моих групп</Link></div>
                </>) : (
                <>
                    {homePage}
                    <div><Link to={'/login'}>Войти</Link></div>
                    <div><Link to={'/registration'}>Зарегистрироваться</Link></div>
                </>)
            }
        </>
    );
};

export default Header;
