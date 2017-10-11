import requestReducer, { initialState } from '../../../store/reducers/request.reducer';
import {
    REQUEST_START,
    REQUEST_COMPLETE,
} from '../../../store/constants';
import getRandomString from '../../../helpers/getRandomString';
import touchedReducerProps from '../../../helpers/touchedReducerProperties';

describe('request reducer', () => {
    describe('Default', () => {
        const result = requestReducer(initialState, {});

        it('returns the initial state by default', () => {
            expect(result).toEqual(initialState);
        });

        it('has only change all properties which are in initialState', () => {
            expect(touchedReducerProps(result)).toBe(1);
        });
    });

    describe('REQUEST_START', () => {
        const result = requestReducer({}, {
            type: REQUEST_START,
        });

        it('returns request starts state', () => {
            expect(result.isFetching).toBe(true);
        });

        it('has only change exact amount of reducer properties', () => {
            expect(touchedReducerProps(result)).toBe(1);
        });
    });

    describe('REQUEST_COMPLETE', () => {
        const result = requestReducer({}, {
            type: REQUEST_COMPLETE,
        });

        it('returns request completion state', () => {
            expect(result.isFetching).toBe(false);
        });

        it('has only change exact amount of reducer properties', () => {
            expect(touchedReducerProps(result)).toBe(1);
        });
    });
});
