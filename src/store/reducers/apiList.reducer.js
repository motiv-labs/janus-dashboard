import {
    FETCH_ENDPOINTS_START,
    FETCH_ENDPOINTS_SUCCESS,
    REFRESH_ENDPOINTS,
    DISCARD_PAGINATION,
    SET_PAGINATION_PAGE,
    SET_SORTING_FILTER,
} from '../constants';

const initialState = {
    apiList: [],
    currentPageIndex: 0,
    isFetching: false,
    sortingFilter: '',
    sortAscend: true,
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_ENDPOINTS_START: {
            return {
                ...state,
                isFetching: true,
            };
        }
        case FETCH_ENDPOINTS_SUCCESS: {
            return {
                ...state,
                apiList: action.payload,
                isFetching: false,
            };
        }
        case DISCARD_PAGINATION: {
            return {
                ...state,
                currentPageIndex: 0,
            };
        }
        case SET_PAGINATION_PAGE: {
            return {
                ...state,
                currentPageIndex: action.payload,
            };
        }
        case SET_SORTING_FILTER: {
            return {
                ...state,
                sortingFilter: action.payload,
            };
        }
        case REFRESH_ENDPOINTS: {
            return {
                ...state,
                apiList: state.apiList.reduce((memo, item) => {
                    if (item.name !== action.payload) {
                        memo.push(item);
                    }

                    return memo;
                }, []),
            };
        }
        default:
            return state;
    }
}
