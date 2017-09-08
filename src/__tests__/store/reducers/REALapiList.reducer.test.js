import apiList, { initialState } from '../../../store/reducers/apiList.reducer';
import {
    FETCH_ENDPOINTS_START,
    FETCH_ENDPOINTS_SUCCESS,
    REFRESH_ENDPOINTS,
    DISCARD_PAGINATION,
    SET_PAGINATION_PAGE,
} from '../../../store/constants/apiList.constants';

const getRandomString = () => Math.floor(Math.random() * 10000).toString(16);

describe('search', () => {
    it('returns the initial state by default', () => {
        const result = apiList(initialState, {});

        expect(result).toEqual(initialState);
    });

    it('returns fetching endpoint starts state', () => {
        const result = apiList(initialState, { type: FETCH_ENDPOINTS_START });

        expect(result.isFetching).toEqual(true);
    });

    it('returns fetched endpoint success state', () => {
        const randomString = getRandomString();
        const result = apiList(initialState, { type: FETCH_ENDPOINTS_SUCCESS, payload: randomString });

        expect(result.apiList).toEqual(randomString);
        expect(result.isFetching).toEqual(false);
    });

    it('returns discarded pagination state', () => {
        const result = apiList(initialState, { type: DISCARD_PAGINATION });

        expect(result.currentPageIndex).toEqual(0);
    });

    it('returns set pagination state', () => {
        const pageIndex = 1;
        const result = apiList(initialState, { type: SET_PAGINATION_PAGE, payload: pageIndex });

        expect(result.currentPageIndex).toEqual(pageIndex);
    });

    it('returns resfresh endpoints state', () => {
        const result = apiList(initialState, { type: REFRESH_ENDPOINTS });

        expect(result.apiList).toEqual([]);
    });

    it('returns resfresh endpoints state when having already elements on apiList', () => {
        const newInitialState = { ...initialState, apiList: [
            {name: 1},
            {name: 2},
            {name: 3},
        ]};
        const payload = 3;
        const result = apiList(newInitialState, { type: REFRESH_ENDPOINTS, payload });

        expect(result.apiList).toEqual([
            {name: 1},
            {name: 2},
        ]);
    });
});
