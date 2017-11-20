import {
    FETCH_OAUTH_SERVER_START,
    FETCH_OAUTH_SERVER_SUCCESS,
    FETCH_OAUTH_SERVER_SCHEMA_START,
    FETCH_OAUTH_SERVER_SCHEMA_SUCCESS,
    SAVE_OAUTH_SERVER_START,
    SAVE_OAUTH_SERVER_SUCCESS,
    UPDATE_OAUTH_SERVER_START,
    UPDATE_OAUTH_SERVER_SUCCESS,
    DELETE_OAUTH_SERVER_START,
    DELETE_OAUTH_SERVER_SUCCESS,
} from '../constants';

export const initialState = {
    oAuthServer: {},
    oAuthServerSchema: {},
    isFetching: false,
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SAVE_OAUTH_SERVER_START:
        case UPDATE_OAUTH_SERVER_START:
        case DELETE_OAUTH_SERVER_START:
        case FETCH_OAUTH_SERVER_START:
        case FETCH_OAUTH_SERVER_SCHEMA_START: {
            return {
                ...state,
                isFetching: true,
            };
        }
        case SAVE_OAUTH_SERVER_SUCCESS:
        case UPDATE_OAUTH_SERVER_SUCCESS:
        case DELETE_OAUTH_SERVER_SUCCESS: {
            return {
                ...state,
                isFetching: false,
            };
        }
        case FETCH_OAUTH_SERVER_SUCCESS: {
            return {
                ...state,
                isFetching: false,
                oAuthServer: action.payload,
            };
        }
        case FETCH_OAUTH_SERVER_SCHEMA_SUCCESS: {
            return {
                ...state,
                oAuthServerSchema: action.payload,
                isFetching: false,
            };
        }
        default:
            return state;
    }
}
