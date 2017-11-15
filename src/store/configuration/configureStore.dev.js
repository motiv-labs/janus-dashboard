import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { routerMiddleware } from 'react-router-redux';

import history from './history';
// import { getAccessToken } from '../api'; // @TODO: implement
import rootReducer from '../reducers';

const logger = createLogger();

// Build the middleware for intercepting and dispatching navigation actions
const routingMiddleware = routerMiddleware(history);

const vanillaPromise = store => next => (action) => {
    if (typeof action.then !== 'function') {
        return next(action);
    }

    return Promise.resolve(action).then(store.dispatch);
};
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const configureStore = initialState => createStore(rootReducer, initialState, composeEnhancers(
    applyMiddleware(
        vanillaPromise,
        reduxThunk,
        routingMiddleware,
        logger,
    )
));

export default configureStore;
