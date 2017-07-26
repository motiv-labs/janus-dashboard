import {
  CHECK_LOGGED_STATUS,
  LOGIN_SUCCESS,
} from '../constants';

const initialState = {};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case CHECK_LOGGED_STATUS: {
            return {
                ...state,
            };
        }

        case LOGIN_SUCCESS: {
            return {
                ...state,
                loggedUser: action.payload,
            };
        }

        default:
            return state;
    }
}
