import { LOCATION_CHANGE } from 'react-router-redux';
import {
    DISCARD_PAGINATION,
    SET_PAGINATION_PAGE,
} from '../constants';

export const initialState = {
    currentPageIndex: 0,
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOCATION_CHANGE:
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
