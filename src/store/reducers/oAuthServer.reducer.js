import {
    FETCH_OAUTH_SERVER_START,
    FETCH_OAUTH_SERVER_SUCCESS,
} from '../constants';

export const initialState = {
    oAuthServer: {},
    isFetching: false,
};


export default function reducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_OAUTH_SERVER_START: {
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
        default:
            return state;
    }
}
