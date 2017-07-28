import configureStore from './configureStore';

const initialState = window.globalState || {};

export const store = configureStore(initialState);
