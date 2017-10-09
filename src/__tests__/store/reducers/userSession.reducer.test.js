import userSessionReducer from '../../../store/reducers/userSession.reducer';
import { LOGIN_FAILURE, LOGIN_SUCCESS } from '../../../store/constants/userSession.constants';

describe('userSessionReducer', () => {
    it('returns the initialState by default', () => {
        const initialState = Math.random();

        const result = userSessionReducer(initialState, {});

        expect(result).toEqual(initialState);
    });

    it('sets the logged state to true and errorMsg to null when user getes logged in', () => {
        const initialState = { logged: false, errorMsg: 'an-error' };

        const result = userSessionReducer(initialState, { type: LOGIN_SUCCESS });

        expect(result.logged).toEqual(true);
        expect(result.errorMsg).toEqual(null);
    });

    it('sets the logged state to false and the error message to the given payload when user failed to log in', () => {
        const initialState = { logged: true, errorMsg: null };
        const payload = 'an-error-message';

        const result = userSessionReducer(initialState, { type: LOGIN_FAILURE, payload });

        expect(result.logged).toEqual(false);
        expect(result.errorMsg).toEqual(payload);
    });
});
