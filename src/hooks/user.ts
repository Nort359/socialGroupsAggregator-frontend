import { useSelector } from 'react-redux';

import { getUser } from '../selectors/user';
import { IState } from '../reducers/user';

export function useUser(): IState {
    return useSelector(getUser);
}
