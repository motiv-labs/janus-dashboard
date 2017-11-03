import {
    SEARCH_QUERY,
    FETCH_ENDPOINTS_START,
    FETCH_OAUTH_SERVERS_LIST_START,
} from '../constants';

export const initialState = {
    searchQuery: '',
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_ENDPOINTS_START:
        case FETCH_OAUTH_SERVERS_LIST_START:
            return {
                ...state,
                searchQuery: initialState.searchQuery
            };
        case SEARCH_QUERY:
            return {
                ...state,
                searchQuery: action.payload,
            };
        default:
            return state;
    }
}
