import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { useGroup } from '../hooks/group';
import { fetchAllUserGroups } from '../reducers/group';
import { useUser } from '../hooks/user';

import Telegram from '../components/Telegram';

const Group = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const group = useGroup(id || '');
    const { user } = useUser();

    useEffect(() => {
        if (!group) {
            dispatch(fetchAllUserGroups(user?.id || ''));
        }
    }, [dispatch, group, user?.id]);

    if (!group) {
        return <>Загрузка...</>;
    }

    const { name } = group;

    return (
        <>
            <h1>Группа {name}</h1>
            <Telegram />
        </>
    );
};

export default Group;
