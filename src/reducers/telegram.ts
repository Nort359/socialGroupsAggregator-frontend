import axios, { AxiosError } from 'axios';
import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { createAction, createReducer } from 'redux-act';

import { IGlobalState } from './index';

import TelegramService from '../services/TelegramService';
import { ITelegramData } from '../interfaces/telegram';

export type IState = ITelegramData & {
    error: string;
};

const initialState: IState = {
    id: '',
    telegramUserId: '',
    isBot: false,
    firstName: '',
    lastName: '',
    userName: '',
    user: '',
    error: '',
    chats: [],
};

export const getTelegramDataAction = createAction<ITelegramData>('telegram/getData');
export const setTelegramErrorAction = createAction<string>('telegram/setError');

export default createReducer<IState>({}, initialState)
    .on(getTelegramDataAction, (state, payload) => ({
        ...state,
        ...payload,
    }))
    .on(setTelegramErrorAction, (state, payload) => ({
        ...state,
        error: payload,
    }));

export const fetchUserTelegramData = (
    user: string,
): ThunkAction<void, IGlobalState, unknown, AnyAction> => {
    return async (dispatch): Promise<void> => {
        try {
            setTelegramErrorAction('');

            const response = await TelegramService.get(user);
            const data = response.data || {};

            dispatch(getTelegramDataAction(data));
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const { response } = error as AxiosError;
                dispatch(setTelegramErrorAction(response?.data.message));
            }

            console.error(error);
        }
    };
};
