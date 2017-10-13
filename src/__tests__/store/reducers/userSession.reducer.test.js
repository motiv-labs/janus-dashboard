import userSessionReducer from '../../../store/reducers/userSession.reducer';
import {
    CHECK_LOGGED_STATUS,
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT,
} from '../../../store/constants/userSession.constants';
import touchedReducerProps from '../../../helpers/touchedReducerProperties';
import getRandomString from '../../../helpers/getRandomString';

describe('user session reducer', () => {
    describe('Default', () => {
        const initialState = { initial: 'state' };
        const result = userSessionReducer(initialState, {});

        it('returns the initial state by default', () => {
            expect(result).toEqual(initialState);
        });

        it('has change exact amount of properties which are in initialState', () => {
            expect(touchedReducerProps(result)).toBe(1);
        });
    });

    describe('CHECK_LOGGED_STATUS', () => {
        const state = Math.random();
        const result = userSessionReducer({}, {
            type: CHECK_LOGGED_STATUS,
        });

        it('returns no changes to the state', () => {
            expect(result).toEqual({});
        });

        it('has NOT change any properties of the state', () => {
            expect(touchedReducerProps(result)).toBe(0);
        });
    });

    describe('LOGIN_START', () => {
        const state = Math.random();
        const result = userSessionReducer({}, {
            type: LOGIN_START,
        });

        it('returns no changes to the state', () => {
            expect(result).toEqual({});
        });

        it('has NOT change any properties of the state', () => {
            expect(touchedReducerProps(result)).toBe(0);
        });
    });

    describe('LOGIN_SUCCESS', () => {
        const result = userSessionReducer(
            {},
            {
                type: LOGIN_SUCCESS,
                payload: true,
            }
        );

        it('sets the user info and errorMsg to null when user getes logged in', () => {
            expect(result.user).toEqual(true);
            expect(result.errorMsg).toEqual(null);
        });

        it('has only change exact amount of reducer properties', () => {
            expect(touchedReducerProps(result)).toBe(2);
        });
    });

    describe('LOGIN_FAILURE', () => {
        const initialState = { user: {name: 'User'}, errorMsg: null };
        const payload = 'an-error-message';

        const result = userSessionReducer(
            initialState,
            {
                type: LOGIN_FAILURE,
                payload,
            }
        );

        it('sets the logged state to false and the error message to the given payload when user failed to log in', () => {
            expect(result.user).toEqual('');
            expect(result.errorMsg).toEqual(payload);
        });

        it('has only change exact amount of reducer properties', () => {
            expect(touchedReducerProps(result)).toBe(2);
        });
    });

    describe('LOGOUT', () => {
        const result = userSessionReducer({}, {
            type: LOGOUT,
        });

        it('discards user info', () => {
            expect(result.user).toBe('');
        });

        it('has only change exact amount of reducer properties', () => {
            expect(touchedReducerProps(result)).toBe(1);
        });
    });
});
