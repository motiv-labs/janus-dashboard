import apiList, { initialState } from '../../../store/reducers/apiList.reducer';
import {
    FETCH_ENDPOINTS_START,
    FETCH_ENDPOINTS_SUCCESS,
    REFRESH_ENDPOINTS,
    DISCARD_PAGINATION,
    SET_PAGINATION_PAGE,
    SET_SORTING_FILTER,
    SET_ASCEND_FILTER,
} from '../../../store/constants/apiList.constants';
import touchedReducerProps from '../../../helpers/touchedReducerProperties';

const getRandomString = () => Math.floor(Math.random() * 10000).toString(16);

describe('search', () => {
    describe('Default', () => {
        const result = apiList(initialState, {});

        it('returns the initial state by default', () => {
            expect(result).toEqual(initialState);
        });

        it('has only change exact amount of reducer properties', () => {
            expect(touchedReducerProps(result)).toBe(5);
        });
    });

    describe('FETCH_ENDPOINTS_START', () => {
        const result = apiList({}, { type: FETCH_ENDPOINTS_START });

        it('returns fetching endpoint starts state', () => {
            expect(result.isFetching).toEqual(true);
        });

        it('has only change exact amount of reducer properties', () => {
            expect(touchedReducerProps(result)).toBe(1);
        });
    });

    describe('FETCH_ENDPOINTS_SUCCESS', () => {
        const randomString = getRandomString();
        const result = apiList({}, { type: FETCH_ENDPOINTS_SUCCESS, payload: randomString });

        it('returns fetched endpoint success state', () => {
            expect(result.apiList).toEqual(randomString);
            expect(result.isFetching).toEqual(false);
        });

        it('has only change exact amount of reducer properties', () => {
            expect(touchedReducerProps(result)).toBe(2);
        });
    });

    describe('DISCARD_PAGINATION', () => {
        const result = apiList({}, { type: DISCARD_PAGINATION });

        it('returns discarded pagination state', () => {
            expect(result.currentPageIndex).toEqual(0);
        });

        it('has only change exact amount of reducer properties', () => {
            expect(touchedReducerProps(result)).toBe(1);
        });
    });

    describe('SET_PAGINATION_PAGE', () => {
        const pageIndex = 1;
        const result = apiList({}, { type: SET_PAGINATION_PAGE, payload: pageIndex });

        it('returns set pagination state', () => {
            expect(result.currentPageIndex).toEqual(pageIndex);
        });

        it('has only change exact amount of reducer properties', () => {
            expect(touchedReducerProps(result)).toBe(1);
        });
    });

    // TODO: investigate for more better solution
    describe('REFRESH_ENDPOINTS', () => {
        const result = apiList(initialState, { type: REFRESH_ENDPOINTS });

        it('returns resfresh endpoints state', () => {
            expect(result.apiList).toEqual([]);
        });

        it('returns resfresh endpoints state when having already elements on apiList', () => {
            const newInitialState = { ...initialState, apiList: [
                {name: 1},
                {name: 2},
                {name: 3},
            ]};
            const payload = 3;
            const result = apiList(
                newInitialState,
                {
                    type: REFRESH_ENDPOINTS,
                    payload,
                },
            );

            expect(result.apiList).toEqual([
                {name: 1},
                {name: 2},
            ]);
        });

        it('has only change exact amount of reducer properties', () => {
            expect(touchedReducerProps(result)).toBe(5);
        });
    });

    describe('SET_SORTING_FILTER', () => {
        const payload = 'filter';
        const result = apiList(
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
        const result = apiList(state, { type: SET_ASCEND_FILTER });

        it('switches ascending/descending sorting', () => {
            expect(result.sortAscend).toBe(!state.sortAscend);
        });


        it('has only change exact amount of reducer properties', () => {
            expect(touchedReducerProps(result)).toBe(1);
        });
    });
});
