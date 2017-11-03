import { LOCATION_CHANGE } from 'react-router-redux';

import {
    SEARCH_QUERY,
} from '../constants';

export const initialState = {
    searchQuery: '',
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOCATION_CHANGE:
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
