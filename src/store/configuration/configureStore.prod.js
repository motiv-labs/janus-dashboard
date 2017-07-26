import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import rootReducer from '../reducers';

const vanillaPromise = store => next => (action) => {
    if (typeof action.then !== 'function') {
        return next(action);
    }

    return Promise.resolve(action).then(store.dispatch);
};

const createStoreWithMiddleware = applyMiddleware(
  vanillaPromise,
  reduxThunk,
)(createStore);

const configureStore = initialState => createStoreWithMiddleware(rootReducer, initialState);

export default configureStore;
