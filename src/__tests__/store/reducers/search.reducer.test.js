import search, { initialState } from '../../../store/reducers/search.reducer';
import { SEARCH_QUERY } from '../../../store/constants/search.constants';

const getRandomString = () => Math.floor(Math.random() * 10000).toString(16);

describe('search', () => {
    it('returns the initial state by default', () => {
        const result = search(initialState, {});

        expect(result).toEqual(initialState);
    });

    it('returns search query state when user type for a search', () => {
        const searchQuery = getRandomString();
        const payload = searchQuery;

        const result = search(initialState, { type: SEARCH_QUERY, payload });

        expect(result.searchQuery).toEqual(searchQuery);
    });
});
