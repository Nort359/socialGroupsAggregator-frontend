import { IGlobalState } from '../reducers';
import { IState } from '../reducers/group';

export const getGroups = (state: IGlobalState): IState => state.group;
