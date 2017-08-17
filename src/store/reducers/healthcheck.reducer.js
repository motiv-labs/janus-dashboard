import {
    CLEAR_HEALTHCHECK_DETAILS,
    FETCH_HEALTHCHECK_LIST_START,
    FETCH_HEALTHCHECK_LIST_SUCCESS,
    FETCH_HEALTHCHECK_START,
    FETCH_HEALTHCHECK_SUCCESS,
    DISCARD_PAGINATION,
    SET_PAGINATION_PAGE,
} from '../constants';

const initialState = {
    status: null,
    statusText: '',
    healthcheckList: [],
    currentPageIndex: 0,
    isFetching: false,
    problemEndpoint: {},
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
                status: action.payload.status,
                statusText: action.payload.text,
                healthcheckList: action.payload.list,
                isFetching: false,
            };
        }
        case FETCH_HEALTHCHECK_SUCCESS: {
            console.error('PAYLOAD', action.payload);
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
        default:
            return state;
    }
}
