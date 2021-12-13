import { useSelector } from 'react-redux';

import { getGroups } from '../selectors/group';

import { IState } from '../reducers/group';
import { IGroup } from '../interfaces/IGroup';

export function useGroups(): IState {
    return useSelector(getGroups);
}

export function useGroup(id: string): IGroup | undefined {
    const { groups } = useSelector(getGroups);
    return groups?.find((item) => item.id === id);
}
