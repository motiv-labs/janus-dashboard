import {
    FETCH_OAUTH_SERVERS_LIST_START,
    FETCH_OAUTH_SERVERS_LIST_SUCCESS,
    SET_SORTING_FILTER,
    SET_ASCEND_FILTER,
} from '../constants';

export const initialState = {
    oAuthServers: [],
    currentPageIndex: 0,
    isFetching: false,
    sortingFilter: '',
    sortAscend: true,
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_OAUTH_SERVERS_LIST_START: {
            return {
                ...state,
                isFetching: true,
            };
        }
        case FETCH_OAUTH_SERVERS_LIST_SUCCESS: {
            return {
                ...state,
                isFetching: false,
                oAuthServers: action.payload,
            };
        }
        case SET_SORTING_FILTER: {
            return {
                ...state,
                sortingFilter: action.payload,
            };
        }
        case SET_ASCEND_FILTER: {
            return {
                ...state,
                sortAscend: !state.sortAscend,
            };
        }
        default:
            return state;
    }
}
