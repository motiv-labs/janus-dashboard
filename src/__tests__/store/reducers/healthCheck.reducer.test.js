import healthCheckRducer, { initialState } from '../../../store/reducers/healthcheck.reducer';
import {
    CLEAR_HEALTHCHECK_DETAILS,
    FETCH_HEALTHCHECK_LIST_START,
    FETCH_HEALTHCHECK_LIST_SUCCESS,
    FETCH_HEALTHCHECK_START,
    FETCH_HEALTHCHECK_SUCCESS,
    DISCARD_PAGINATION,
    SET_PAGINATION_PAGE,
} from '../../../store/constants';

import { checkStatus } from '../../../store/reducers/healthcheck.reducer';

const getRandomString = () => Math.floor(Math.random() * 10000).toString(16);

describe('healthCheckRducer', () => {
    it('returns the initial state by default', () => {
        const result = healthCheckRducer(initialState, {});

        expect(result).toEqual(initialState);
    });

    it('returns isFetching', () => {
        const result = healthCheckRducer(initialState, { type: FETCH_HEALTHCHECK_LIST_START });

        expect(result.isFetching).toBe(true);
    });

    it('returns isFetching', () => {
        const result = healthCheckRducer(initialState, { type: FETCH_HEALTHCHECK_START });

        expect(result.isFetching).toBe(true);
    });

    it('returns the health check list info', () => {
        const status = getRandomString();
        const failures = [];
        const isFetching = false;
        const payload = {
            failures,
            isFetching,
            status,
        };
        const result = healthCheckRducer(
            initialState,
            {
                type: FETCH_HEALTHCHECK_LIST_SUCCESS,
                payload,
            }
        );

        expect(result.status).toEqual(checkStatus(status));
        expect(result.statusName).toEqual(status);
        expect(result.healthcheckList).toEqual(failures);
        expect(result.isFetching).toBe(isFetching);
    });

    it('returns the single health check item info', () => {
        const problemEndpoint = getRandomString();
        const result = healthCheckRducer(initialState, { type: FETCH_HEALTHCHECK_SUCCESS, payload: problemEndpoint });

        expect(result.problemEndpoint).toEqual(problemEndpoint);
    });

    it('returns the cleared health check item info', () => {
        const result = healthCheckRducer({}, { type: CLEAR_HEALTHCHECK_DETAILS, payload: {} });

        expect(result.problemEndpoint).toEqual({});
    });

    it('returns the discarding pagination', () => {
        const result = healthCheckRducer({}, { type: DISCARD_PAGINATION });

        expect(result.currentPageIndex).toEqual(0);
    });

    it('returns the discarding pagination', () => {
        const currentPageIndex = Math.random();
        const result = healthCheckRducer({}, { type: SET_PAGINATION_PAGE, payload: currentPageIndex });

        expect(result.currentPageIndex).toEqual(currentPageIndex);
    });
});
