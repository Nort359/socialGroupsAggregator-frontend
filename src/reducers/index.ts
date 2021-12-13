import { combineReducers, Reducer } from 'redux';

import user from './user';
import group from './group';
import telegram from './telegram';

export interface IGlobalState {
    user: ReturnType<typeof user>;
    group: ReturnType<typeof group>;
    telegram: ReturnType<typeof telegram>;
}

const reducer: Reducer<IGlobalState> = combineReducers<IGlobalState>({
    user,
    group,
    telegram,
});

export default reducer;
