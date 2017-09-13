import {
    CHECK_LOGGED_STATUS,
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
} from '../constants';

const initialState = {
    logged: false,
    errorMsg: null,
    user: null,
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
                logged: true,
                errorMsg: null,
            };
        }

        case LOGIN_FAILURE: {
            return {
                ...state,
                logged: false,
                errorMsg: action.payload,
            };
        }

        default:
            return state;
    }
}
