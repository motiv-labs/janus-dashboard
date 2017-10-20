import {
    FETCH_OAUTH_SERVER_START,
    FETCH_OAUTH_SERVER_SUCCESS,
    FETCH_OAUTH_SERVER_SCHEMA_START,
    FETCH_OAUTH_SERVER_SCHEMA_SUCCESS,
} from '../constants';

export const initialState = {
    oAuthServer: {},
    oAuthServerSchema: {},
    isFetching: false,
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_OAUTH_SERVER_START:
        case FETCH_OAUTH_SERVER_SCHEMA_START: {
            return {
                ...state,
                isFetching: true,
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
