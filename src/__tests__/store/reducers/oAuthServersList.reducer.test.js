import oAuthServersListReducer, { initialState } from '../../../store/reducers/oAuthServersList.reducer';
import {
    FETCH_OAUTH_SERVERS_LIST_START,
    FETCH_OAUTH_SERVERS_LIST_SUCCESS,
    SET_OAUTH_SERVERS_SORTING_FILTER,
    SET_OAUTH_SERVERS_ASCEND_FILTER,
    DISCARD_OAUTH_SERVERS_PAGINATION,
    SET_OAUTH_SERVERS_PAGINATION_PAGE,
} from '../../../store/constants/oAuthServersList.constants';

import touchedReducerProps from '../../../helpers/touchedReducerProperties';

const getRandomString = () => Math.floor(Math.random() * 10000).toString(16);

describe('oAuthServersListReducer', () => {
    describe('Default', () => {
        const result = oAuthServersListReducer(initialState, {});

        it('returns the initial state by default', () => {
            expect(result).toEqual(initialState);
        });

        it('has only change exact amount of reducer properties', () => {
            expect(touchedReducerProps(result)).toBe(5);
        });
    });


    describe('FETCH_OAUTH_SERVERS_LIST_START', () => {
        const result = oAuthServersListReducer({}, { type: FETCH_OAUTH_SERVERS_LIST_START });

        it('returns fetching oauth servers starts state', () => {
            expect(result.isFetching).toEqual(true);
        });

        it('has only change exact amount of reducer properties', () => {
            expect(touchedReducerProps(result)).toBe(1);
        });
    });

    describe('FETCH_OAUTH_SERVERS_LIST_SUCCESS', () => {
        const randomString = getRandomString();
        const result = oAuthServersListReducer({}, {
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
        const result = oAuthServersListReducer({}, { type: DISCARD_OAUTH_SERVERS_PAGINATION });

        it('returns discarded pagination state', () => {
            expect(result.currentPageIndex).toEqual(0);
        });

        it('has only change exact amount of reducer properties', () => {
            expect(touchedReducerProps(result)).toBe(1);
        });
    });

    describe('SET_OAUTH_SERVERS_PAGINATION_PAGE', () => {
        const pageIndex = 1;
        const result = oAuthServersListReducer({}, { type: SET_OAUTH_SERVERS_PAGINATION_PAGE, payload: pageIndex });

        it('returns set pagination state', () => {
            expect(result.currentPageIndex).toEqual(pageIndex);
        });

        it('has only change exact amount of reducer properties', () => {
            expect(touchedReducerProps(result)).toBe(1);
        });
    });

    describe('SET_OAUTH_SERVERS_SORTING_FILTER', () => {
        const randomString = getRandomString();
        const result = oAuthServersListReducer({},{
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
        const result = oAuthServersListReducer(state, { type: SET_OAUTH_SERVERS_ASCEND_FILTER });

        it('switches ascending/descending sorting', () => {
            expect(result.sortAscend).toBe(!state.sortAscend);
        });


        it('has only change exact amount of reducer properties', () => {
            expect(touchedReducerProps(result)).toBe(1);
        });
    });
});
