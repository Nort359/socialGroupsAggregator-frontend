import { createStore, applyMiddleware, compose, Store } from 'redux';
import thunkMiddleware from 'redux-thunk';

import reducers, { IGlobalState } from './reducers';

const composeEnhancers: typeof compose =
    (process.env.NODE_ENV !== 'production' &&
        typeof window !== 'undefined' &&
        (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

export function initializeStore(initialState?: IGlobalState): Store<IGlobalState> {
    return createStore(
        reducers,
        initialState,
        composeEnhancers(applyMiddleware(thunkMiddleware))
    );
}

