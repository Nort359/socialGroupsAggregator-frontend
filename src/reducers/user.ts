import axios, { AxiosError } from 'axios';
import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { createAction, createReducer } from 'redux-act';

import { IGlobalState } from './index';

import { API_URL } from '../utils';
import AuthService from '../services/AuthService';

import { IUser } from '../interfaces/IUser';
import { IAuthResponse } from '../interfaces/response/IAuthResponse';

export type IState = {
    user: IUser;
    isLoggedIn: boolean;
    isLoading: boolean;
    error?: string;
};

const initialState: IState = {
    user: {} as IUser,
    isLoggedIn: false,
    isLoading: false,
};

export const login = createAction<IUser>('users/login');
export const logout = createAction('users/logout');
export const setLoadingUser = createAction<boolean>('users/loading');
export const setErrorUser = createAction<string>('users/error');

export default createReducer<IState>({}, initialState)
    .on(login, (state, payload) => ({
        ...state,
        isLoggedIn: true,
        isLoading: false,
        user: payload,
    }))
    .on(logout, () => ({
        user: {} as IUser,
        isLoggedIn: false,
        isLoading: false,
    }))
    .on(setLoadingUser, (state, payload) => ({
        ...state,
        isLoading: payload,
    }))
    .on(setErrorUser, (state, payload) => ({
        ...state,
        error: payload,
    }));

export const loginUser = (
    email: string,
    password: string,
): ThunkAction<void, IGlobalState, unknown, AnyAction> => {
    return async (dispatch): Promise<void> => {
        try {
            const response = await AuthService.login(email, password);
            const { user, accessToken } = response.data || {};

            localStorage.setItem('token', accessToken);
            dispatch(login(user));
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const { response } = error as AxiosError;
                dispatch(setErrorUser(response?.data.message));
            }

            console.error(error);
        }
    };
};

export const checkAuth = (): ThunkAction<void, IGlobalState, unknown, AnyAction> => {
    return async (dispatch): Promise<void> => {
        try {
            dispatch(setLoadingUser(true));

            const response = await axios.get<IAuthResponse>(`${API_URL}/refresh`, {
                withCredentials: true,
            });

            const { user, accessToken } = response.data || {};

            localStorage.setItem('token', accessToken);
            dispatch(login(user));
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const { response } = error as AxiosError;
                dispatch(setErrorUser(response?.data.message));
            }

            console.error(error);
        } finally {
            dispatch(setLoadingUser(false));
        }
    };
};

export const registerUser = (
    email: string,
    password: string,
): ThunkAction<void, IGlobalState, unknown, AnyAction> => {
    return async (dispatch): Promise<void> => {
        try {
            const response = await AuthService.registration(email, password);
            const { user, accessToken } = response.data || {};

            localStorage.setItem('token', accessToken);
            dispatch(login(user));
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const { response } = error as AxiosError;
                dispatch(setErrorUser(response?.data.message));
            }

            console.error(error);
        }
    };
};

export const logoutUser = (): ThunkAction<void, IGlobalState, unknown, AnyAction> => {
    return async (dispatch): Promise<void> => {
        try {
            await AuthService.logout();

            localStorage.removeItem('token');
            dispatch(logout());
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const { response } = error as AxiosError;
                dispatch(setErrorUser(response?.data.message));
            }

            console.error(error);
        }
    };
};
