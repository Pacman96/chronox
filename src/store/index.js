import { createStore, applyMiddleware, combineReducers } from 'redux'

import logger from 'redux-logger'
import thunk from 'redux-thunk';

import { AUTH_STORE } from './AUTH_STORE'
import { SHOPS_STORE } from './SHOPS_STORE';
import { TOASTS_STORE } from './TOASTS_STORE';

const reducer = combineReducers({
    auth: AUTH_STORE.reducer,
    shops: SHOPS_STORE.reducer,
    toasts: TOASTS_STORE.reducer
})

export default createStore(
    reducer,
    applyMiddleware(
        logger,
        thunk
    ),
)