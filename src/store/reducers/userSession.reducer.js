import {
    CHECK_LOGGED_STATUS,
    LOGIN_START,
    LOGIN_SUCCESS,
} from '../constants';

const initialState = {
    logged: false,
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
            };
        }

        default:
            return state;
    }
}
