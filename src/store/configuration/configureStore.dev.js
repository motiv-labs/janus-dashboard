import { createStore, applyMiddleware } from 'redux';
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

const createStoreWithMiddleware = applyMiddleware(
    vanillaPromise,
    reduxThunk,
    routingMiddleware,
    logger,
)(createStore);

const configureStore = initialState => createStoreWithMiddleware(rootReducer, initialState);

export default configureStore;
