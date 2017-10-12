import healthCheckRducer, { initialState } from '../../../store/reducers/healthcheck.reducer';
import {
    CLEAR_HEALTHCHECK_DETAILS,
    FETCH_HEALTHCHECK_LIST_START,
    FETCH_HEALTHCHECK_LIST_SUCCESS,
    FETCH_HEALTHCHECK_START,
    FETCH_HEALTHCHECK_SUCCESS,
    DISCARD_PAGINATION,
    SET_PAGINATION_PAGE,
    SET_SORTING_FILTER,
    SET_ASCEND_FILTER,
} from '../../../store/constants';

import { checkStatus } from '../../../store/reducers/healthcheck.reducer';
import touchedReducerProps from '../../../helpers/touchedReducerProperties';
import getRandomString from '../../../helpers/getRandomString';

describe('healthCheckRducer', () => {
    describe('Default', () => {
        it('returns the initial state by default', () => {
            const result = healthCheckRducer(initialState, {});

            expect(result).toEqual(initialState);
        });
    });

    describe('FETCH_HEALTHCHECK_LIST_START', () => {
        it('returns isFetching', () => {
            const result = healthCheckRducer({}, { type: FETCH_HEALTHCHECK_LIST_START });

            expect(result.isFetching).toBe(true);
            expect(touchedReducerProps(result)).toBe(1);
        });
    });

    describe('FETCH_HEALTHCHECK_START', () => {
        const result = healthCheckRducer({}, { type: FETCH_HEALTHCHECK_START });

        it('returns isFetching', () => {
            expect(result.isFetching).toBe(true);
        });

        it('has only change exact amount of reducer properties', () => {
            expect(touchedReducerProps(result)).toBe(1);
        });
    });

    describe('FETCH_HEALTHCHECK_LIST_SUCCESS', () => {
        const status = getRandomString();
        const failures = [];
        const isFetching = false;
        const payload = {
            failures,
            status,
        };
        const result = healthCheckRducer(
            {},
            {
                type: FETCH_HEALTHCHECK_LIST_SUCCESS,
                payload,
            }
        );

        it('returns the health check list info', () => {
            expect(result.status).toEqual(checkStatus(status));
            expect(result.statusName).toEqual(status);
            expect(result.healthcheckList).toEqual(failures);
            expect(result.isFetching).toBe(isFetching);
        });

        it('has only change exact amount of reducer properties', () => {
            expect(touchedReducerProps(result)).toBe(4);
        });
    });

    describe('FETCH_HEALTHCHECK_SUCCESS', () => {
        const problemEndpoint = getRandomString();
        const result = healthCheckRducer({}, {
            type: FETCH_HEALTHCHECK_SUCCESS,
            payload: problemEndpoint
        });

        it('returns the single health check item info', () => {
            expect(result.problemEndpoint).toEqual(problemEndpoint);
        });

        it('has only change exact amount of reducer properties', () => {
            expect(touchedReducerProps(result)).toBe(1);
        });
    });

    describe('CLEAR_HEALTHCHECK_DETAILS', () => {
        const result = healthCheckRducer({}, {
            type: CLEAR_HEALTHCHECK_DETAILS,
            payload: {}
        });

        it('returns the cleared health check item info', () => {
            expect(result.problemEndpoint).toEqual({});
        });

        it('has only change exact amount of reducer properties', () => {
            expect(touchedReducerProps(result)).toBe(1);
        });
    });

    describe('DISCARD_PAGINATION', () => {
        const result = healthCheckRducer({}, { type: DISCARD_PAGINATION });

        it('returns the discarding pagination', () => {
            expect(result.currentPageIndex).toEqual(0);
        });

        it('has only change exact amount of reducer properties', () => {
            expect(touchedReducerProps(result)).toBe(1);
        });
    });

    describe('SET_PAGINATION_PAGE', () => {
        const currentPageIndex = Math.random();
        const result = healthCheckRducer({}, {
            type: SET_PAGINATION_PAGE,
            payload: currentPageIndex,
        });

        it('returns the new page to the pagination', () => {
            expect(result.currentPageIndex).toEqual(currentPageIndex);
        });

        it('has only change exact amount of reducer properties', () => {
            expect(touchedReducerProps(result)).toBe(1);
        });
    });

    describe('SET_SORTING_FILTER', () => {
        const payload = 'filter';
        const result = healthCheckRducer(
            {},
            {
                type: SET_SORTING_FILTER,
                payload,
            },
        );

        it('sets the sorting filter', () => {
            expect(result.sortingFilter).toEqual(payload);
        });


        it('has only change exact amount of reducer properties', () => {
            expect(touchedReducerProps(result)).toBe(1);
        });
    });

    describe('SET_ASCEND_FILTER', () => {
        const payload = 'filter';
        const state = { sortAscend: true };
        const result = healthCheckRducer(state, { type: SET_ASCEND_FILTER });

        it('switches ascending/descending sorting', () => {
            expect(result.sortAscend).toBe(!state.sortAscend);
        });


        it('has only change exact amount of reducer properties', () => {
            expect(touchedReducerProps(result)).toBe(1);
        });
    });
});
