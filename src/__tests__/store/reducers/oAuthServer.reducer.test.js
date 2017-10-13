import oAuthServerReducer, { initialState } from '../../../store/reducers/oAuthServer.reducer';
import {
    FETCH_OAUTH_SERVER_START,
    FETCH_OAUTH_SERVER_SUCCESS,
    FETCH_OAUTH_SERVER_SCHEMA_START,
    FETCH_OAUTH_SERVER_SCHEMA_SUCCESS,
} from '../../../store/constants';

import touchedReducerProps from '../../../helpers/touchedReducerProperties';

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
/*
    describe('FETCH_OAUTH_SERVERS_LIST_SUCCESS', () => {
        const randomString = getRandomString();
        const result = oAuthServerReducer({}, {
            type: FETCH_OAUTH_SERVERS_LIST_SUCCESS,
            payload: randomString,
        });

        it('returns fetched endpoint success state and switches `isFetching` flag', () => {
            expect(result.oAuthServers).toEqual(randomString);
            expect(result.isFetching).toEqual(false);
        });

        it('has only change exact amount of reducer properties', () => {
            expect(touchedReducerProps(result)).toBe(2);
        });
    });

    describe('DISCARD_OAUTH_SERVERS_PAGINATION', () => {
        const result = oAuthServerReducer({}, { type: DISCARD_OAUTH_SERVERS_PAGINATION });

        it('returns discarded pagination state', () => {
            expect(result.currentPageIndex).toEqual(0);
        });

        it('has only change exact amount of reducer properties', () => {
            expect(touchedReducerProps(result)).toBe(1);
        });
    });

    describe('SET_OAUTH_SERVERS_PAGINATION_PAGE', () => {
        const pageIndex = 1;
        const result = oAuthServerReducer({}, { type: SET_OAUTH_SERVERS_PAGINATION_PAGE, payload: pageIndex });

        it('returns set pagination state', () => {
            expect(result.currentPageIndex).toEqual(pageIndex);
        });

        it('has only change exact amount of reducer properties', () => {
            expect(touchedReducerProps(result)).toBe(1);
        });
    });

    describe('SET_OAUTH_SERVERS_SORTING_FILTER', () => {
        const randomString = getRandomString();
        const result = oAuthServerReducer({},{
            type: SET_OAUTH_SERVERS_SORTING_FILTER,
            payload: randomString,
        });

        it('sets the sorting filter', () => {
            expect(result.sortingFilter).toEqual(randomString);
        });

        it('has only change exact amount of reducer properties', () => {
            expect(touchedReducerProps(result)).toBe(1);
        });
    });

    describe('SET_OAUTH_SERVERS_ASCEND_FILTER', () => {
        const state = { sortAscend: true };
        const result = oAuthServerReducer(state, { type: SET_OAUTH_SERVERS_ASCEND_FILTER });

        it('switches ascending/descending sorting', () => {
            expect(result.sortAscend).toBe(!state.sortAscend);
        });


        it('has only change exact amount of reducer properties', () => {
            expect(touchedReducerProps(result)).toBe(1);
        });
    });
    */
});
