import { IGlobalState } from '../reducers';
import { IState } from '../reducers/telegram';

export const getTelegramData = (state: IGlobalState): IState => state.telegram;
