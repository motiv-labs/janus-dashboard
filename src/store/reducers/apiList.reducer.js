import {
    FETCH_ENDPOINTS_START,
    FETCH_ENDPOINTS_SUCCESS,
    REFRESH_ENDPOINTS,
    SET_SORTING_FILTER,
    SET_ASCEND_FILTER,
} from '../constants';

export const initialState = {
    apiList: [],
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
