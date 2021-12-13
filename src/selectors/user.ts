import { IGlobalState } from '../reducers';
import { IState } from '../reducers/user';

export const getUser = (state: IGlobalState): IState => state.user;
