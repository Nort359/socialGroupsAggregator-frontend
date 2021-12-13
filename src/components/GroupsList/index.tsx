import React from 'react';
import { Link } from 'react-router-dom';

import { useGroups } from '../../hooks/group';

import { IGroup } from '../../interfaces/IGroup';

interface IProps {
    onDelete: (group: IGroup) => void;
}

const GroupList = ({ onDelete }: IProps): React.ReactElement => {
    const { groups } = useGroups();

    return (
        <>
            <h2>Мои группы</h2>
            {groups.map((item, index) => (
                <div key={item.id}>
                    <Link to={`/list/${item.id}`}>{index + 1}. {item.name}</Link>
                    {/*<span style={{ border: '1px solid black', marginLeft: '10px' }} onClick={() => onUpdateHandler(item)}>Изменить</span>*/}
                    <span
                        style={{ border: '1px solid black', marginLeft: '10px' }}
                        onClick={() => onDelete(item)}
                    >
                        Удалить
                    </span>
                </div>
            ))}
        </>
    );
};

export default GroupList;
