import R from 'ramda';
import {
    CLEAR_HEALTHCHECK_DETAILS,
    FETCH_HEALTHCHECK_LIST_START,
    FETCH_HEALTHCHECK_LIST_SUCCESS,
    FETCH_HEALTHCHECK_START,
    FETCH_HEALTHCHECK_SUCCESS,
    SET_SORTING_FILTER,
    SET_ASCEND_FILTER,
} from '../constants';

export const initialState = {
    status: null,
    healthcheckList: [],
    isFetching: false,
    problemEndpoint: {},
    sortingFilter: '',
    sortAscend: true,
};

export const checkStatus = list => !list;

const convertToList = obj => {
    const convert = item => ({
        name: item[0],
        description: item[1],
    });

    return R.compose(
        R.map(convert),
        R.toPairs
    )(obj);
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_HEALTHCHECK_LIST_START:
        case FETCH_HEALTHCHECK_START: {
            return {
                ...state,
                isFetching: true,
            };
        }
        case FETCH_HEALTHCHECK_LIST_SUCCESS: {
            return {
                ...state,
                status: checkStatus(action.payload.failures),
                statusName: action.payload.status,
                healthcheckList: convertToList(action.payload.failures),
                isFetching: false,
            };
        }
        case FETCH_HEALTHCHECK_SUCCESS: {
            return {
                ...state,
                problemEndpoint: action.payload,
            };
        }
        case CLEAR_HEALTHCHECK_DETAILS: {
            return {
                ...state,
                problemEndpoint: {},
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
