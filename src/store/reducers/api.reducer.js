import R from 'ramda';

import {
    DELETE_ENDPOINT_START,
    DELETE_ENDPOINT_SUCCESS,
    //   DELETE_ENDPOINT_FAILURE, // @TODO: implement
    FETCH_ENDPOINT_START,
    FETCH_ENDPOINT_SUCCESS,
    FETCH_ENDPOINT_SCHEMA_START,
    FETCH_ENDPOINT_SCHEMA_SUCCESS,
    SAVE_ENDPOINT_START,
    SAVE_ENDPOINT_SUCCESS,
    EXCLUDE_PLUGIN,
    SELECT_PLUGIN,
    RESET_ENDPOINT,
    WILL_CLONE,
} from '../constants';

const initialState = {
    api: {},
    apiSchema: {},
    selectedPlugins: [],
    isFetching: false,
};

export const adjust = api => api;
export const fillSelectedPlugins = api => api.plugins.map(item => item.name);

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case DELETE_ENDPOINT_START:
        case FETCH_ENDPOINT_START:
        case FETCH_ENDPOINT_SCHEMA_START:
        case SAVE_ENDPOINT_START: {
            return {
                ...state,
                isFetching: true,
            };
        }
        case DELETE_ENDPOINT_SUCCESS: {
            return {
                ...state,
                isFetching: false,
            };
        }
        case FETCH_ENDPOINT_SCHEMA_SUCCESS: {
            return {
                ...state,
                apiSchema: action.payload,
                isFetching: false,
            };
        }
        case FETCH_ENDPOINT_SUCCESS: {
            return {
                ...state,
                api: adjust(action.payload.api),
                response: action.payload.response,
                selectedPlugins: fillSelectedPlugins(action.payload.api),
                isFetching: false,
            };
        }
        case SAVE_ENDPOINT_SUCCESS: {
            return {
                ...state,
                isFetching: false,
            };
        }
        case EXCLUDE_PLUGIN: {
            return {
                ...state,
                selectedPlugins: R.without(action.payload, state.selectedPlugins),
            };
        }
        case SELECT_PLUGIN: {
            return {
                ...state,
                selectedPlugins: state.selectedPlugins.concat(action.payload),
            };
        }
        case WILL_CLONE: {
            return {
                ...state,
                api: action.payload.api,
                response: action.payload.response,
                selectedPlugins: fillSelectedPlugins(action.payload.api),
            };
        }
        case RESET_ENDPOINT: {
            return initialState;
        }
        default:
            return state;
    }
}
