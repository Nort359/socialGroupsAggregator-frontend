import React, {useCallback, useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';

import { useUser} from '../hooks/user';
import { deleteGroup, fetchAllUserGroups, postGroup } from '../reducers/group';

import Form from '../components/Form';
import Input from '../components/Input';
import Button from '../components/Button';
import GroupsList from '../components/GroupsList';

import { IGroup } from '../interfaces/IGroup';

const List = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState<string>('');
    const { user } = useUser();

    useEffect(() => {
        dispatch(fetchAllUserGroups(user?.id || ''));
    }, [dispatch, user]);

    const onAddHandler = useCallback(() => {
        setName('');

        dispatch(postGroup(name, user?.id || ''));
    }, [dispatch, name, user]);

    const onDeleteHandler = useCallback((group: IGroup) => {
        if (window.confirm(`Вы уверены, что хотите удалить группу ${group.name}`)) {
            dispatch(deleteGroup(group.id));
        }
    }, [dispatch]);

    return (
        <>
            <h1>Добавление группы</h1>
            <Form>
                <Input
                    value={name}
                    type={'text'}
                    placeholder={'Наименование'}
                    onChange={(event) => setName(event.target.value)}
                />
                <Button
                    text={'Добавить'}
                    onClick={onAddHandler}
                />
            </Form>
            <GroupsList onDelete={onDeleteHandler} />
        </>
    );
};

export default List;
