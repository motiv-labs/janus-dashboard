import oAuthServerReducer, { initialState } from '../../../store/reducers/oAuthServer.reducer';
import {
    FETCH_OAUTH_SERVER_START,
    FETCH_OAUTH_SERVER_SUCCESS,
    FETCH_OAUTH_SERVER_SCHEMA_START,
    FETCH_OAUTH_SERVER_SCHEMA_SUCCESS,
} from '../../../store/constants';

import touchedReducerProps from '../../../helpers/touchedReducerProperties';
import getRandomString from '../../../helpers/getRandomString';

describe('oAuthServerReducer', () => {
    describe('Default', () => {
        const result = oAuthServerReducer(initialState, {});

        it('returns the initial state by default', () => {
            expect(result).toEqual(initialState);
        });

        it('has only change exact amount of reducer properties', () => {
            expect(touchedReducerProps(result)).toBe(3);
        });
    });

    describe('FETCH_OAUTH_SERVER_SCHEMA_START', () => {
        const result = oAuthServerReducer({}, { type: FETCH_OAUTH_SERVER_SCHEMA_START });

        it('returns fetching oauth servers starts state', () => {
            expect(result.isFetching).toEqual(true);
        });

        it('has only change exact amount of reducer properties', () => {
            expect(touchedReducerProps(result)).toBe(1);
        });
    });

    describe('FETCH_OAUTH_SERVER_SCHEMA_SUCCESS', () => {
        const payload = getRandomString();
        const result = oAuthServerReducer({}, { type: FETCH_OAUTH_SERVER_SCHEMA_SUCCESS, payload });

        it('returns fetching oauth server final state with received info', () => {
            expect(result.isFetching).toEqual(false);
            expect(result.oAuthServerSchema).toEqual(payload);
        });

        it('has only change exact amount of reducer properties', () => {
            expect(touchedReducerProps(result)).toBe(2);
        });
    });
});
