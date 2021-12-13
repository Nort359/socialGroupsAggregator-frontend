import { useSelector } from 'react-redux';

import { getTelegramData } from '../selectors/telegram';

import { IState } from '../reducers/telegram';

export function useTelegramData(): IState {
    return useSelector(getTelegramData);
}
