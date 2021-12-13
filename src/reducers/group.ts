import axios, { AxiosError } from 'axios';
import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { createAction, createReducer } from 'redux-act';

import { IGlobalState } from './index';

import GroupService from '../services/GroupService';
import { IGroup } from '../interfaces/IGroup';

export type IState = {
    groups: IGroup[];
    error: string;
};

const initialState: IState = {
    groups: [],
    error: '',
};

export const addGroupAction = createAction<IGroup>('group/add');
export const deleteGroupAction = createAction<string>('group/delete');
export const updateGroupAction = createAction<IGroup>('group/update');
export const getAllUserGroupsAction = createAction<IGroup[]>('group/getAllUser');
export const setErrorGroupAction = createAction<string>('group/setErrorGroup');

export default createReducer<IState>({}, initialState)
    .on(addGroupAction, (state, payload) => ({
        ...state,
        groups: [
            ...state.groups,
            payload,
        ],
    }))
    .on(getAllUserGroupsAction, (state, payload) => ({
        ...state,
        groups: payload,
    }))
    .on(deleteGroupAction, (state, payload) => ({
        ...state,
        groups: state.groups.filter((item) => item.id !== payload),
    }))
    .on(updateGroupAction, (state, payload) => ({
        ...state,
        groups: state.groups.map((item) => item.id === payload.id ? payload : item),
    }))
    .on(setErrorGroupAction, (state, payload) => ({
        ...state,
        error: payload,
    }));

export const postGroup = (
    name: string,
    user: string,
): ThunkAction<void, IGlobalState, unknown, AnyAction> => {
    return async (dispatch): Promise<void> => {
        try {
            setErrorGroupAction('');

            const response = await GroupService.add(name, user);
            const { data } = response || {};

            console.log('response', response);

            dispatch(addGroupAction(data));
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const { response } = error as AxiosError;
                dispatch(setErrorGroupAction(response?.data.message));
            }

            console.error(error);
        }
    };
};

export const updateGroup = (
    id: string,
    name: string,
): ThunkAction<void, IGlobalState, unknown, AnyAction> => {
    return async (dispatch): Promise<void> => {
        try {
            setErrorGroupAction('');

            const response = await GroupService.update(id, name);
            const { data } = response || {};

            console.log('response', response);

            dispatch(updateGroupAction(data));
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const { response } = error as AxiosError;
                dispatch(setErrorGroupAction(response?.data.message));
            }

            console.error(error);
        }
    };
};

export const deleteGroup = (
    group: string,
): ThunkAction<void, IGlobalState, unknown, AnyAction> => {
    return async (dispatch): Promise<void> => {
        try {
            setErrorGroupAction('');

            await GroupService.delete(group);

            dispatch(deleteGroupAction(group));
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const { response } = error as AxiosError;
                dispatch(setErrorGroupAction(response?.data.message));
            }

            console.error(error);
        }
    };
};

export const fetchAllUserGroups = (
    user: string,
): ThunkAction<void, IGlobalState, unknown, AnyAction> => {
    return async (dispatch): Promise<void> => {
        try {
            setErrorGroupAction('');

            const response = await GroupService.getAllUser(user);
            const data = response.data || {};

            dispatch(getAllUserGroupsAction(data));
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const { response } = error as AxiosError;
                dispatch(setErrorGroupAction(response?.data.message));
            }

            console.error(error);
        }
    };
};
