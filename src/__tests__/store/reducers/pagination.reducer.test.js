import reducer, { initialState } from '../../../store/reducers/pagination.reducer';
import {
    DISCARD_PAGINATION,
    SET_PAGINATION_PAGE,
} from '../../../store/constants';

import touchedReducerProps from '../../../helpers/touchedReducerProperties';

describe('paginationReducer', () => {
    describe('Default', () => {
        it('returns the initial state by default', () => {
            const result = reducer(initialState, {});

            expect(result).toEqual(initialState);
        });
    });

    describe('DISCARD_PAGINATION', () => {
        const result = reducer({}, { type: DISCARD_PAGINATION });

        it('returns the discarding pagination', () => {
            expect(result.currentPageIndex).toEqual(0);
        });

        it('has only change exact amount of reducer properties', () => {
            expect(touchedReducerProps(result)).toBe(1);
        });
    });

    describe('SET_PAGINATION_PAGE', () => {
        const currentPageIndex = Math.random();
        const result = reducer({}, {
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
});
