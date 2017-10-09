import userSessionReducer from '../../../store/reducers/userSession.reducer';
import {
    LOGIN_FAILURE,
    LOGIN_SUCCESS,
} from '../../../store/constants/userSession.constants';

describe('userSessionReducer', () => {
    it('returns the initialState by default', () => {
        const initialState = Math.random();

        const result = userSessionReducer(initialState, {});

        expect(result).toEqual(initialState);
    });

    it('sets the user info and errorMsg to null when user getes logged in', () => {
        const initialState = { user: '', errorMsg: 'an-error' };

        const result = userSessionReducer(
            initialState,
            {
                type: LOGIN_SUCCESS,
                payload: true,
            }
        );

        expect(result.user).toEqual(true);
        expect(result.errorMsg).toEqual(null);
    });

    it('sets the logged state to false and the error message to the given payload when user failed to log in', () => {
        const initialState = { user: {name: 'User'}, errorMsg: null };
        const payload = 'an-error-message';

        const result = userSessionReducer(
            initialState,
            {
                type: LOGIN_FAILURE,
                payload,
            }
        );

        expect(result.user).toEqual('');
        expect(result.errorMsg).toEqual(payload);
    });
});
