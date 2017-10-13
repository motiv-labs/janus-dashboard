import oAuthServerReducer, { initialState } from '../../../store/reducers/oAuthServer.reducer';
import {
    FETCH_OAUTH_SERVER_START,
    FETCH_OAUTH_SERVER_SUCCESS,
} from '../../../store/constants';

import touchedReducerProps from '../../../helpers/touchedReducerProperties';

describe('oAuthServerReducer', () => {
    describe('Default', () => {
        const result = oAuthServerReducer(initialState, {});

        it('returns the initial state by default', () => {
            expect(result).toEqual(initialState);
        });

        it('has only change exact amount of reducer properties', () => {
            expect(touchedReducerProps(result)).toBe(2);
        });
    });
});
