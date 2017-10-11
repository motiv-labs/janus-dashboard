import {
    CHECK_LOGGED_STATUS,
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT,
} from '../constants';

export const initialState = {
    errorMsg: null,
    user: '',
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case CHECK_LOGGED_STATUS:
        case LOGIN_START: {
            return {
                ...state,
            };
        }

        case LOGIN_SUCCESS: {
            return {
                ...state,
                errorMsg: null,
                user: action.payload,
            };
        }

        case LOGIN_FAILURE: {
            return {
                ...state,
                errorMsg: action.payload,
                user: '',
            };
        }

        case LOGOUT: {
            return {
                ...state,
                user: '',
            };
        }

        default:
            return state;
    }
}
