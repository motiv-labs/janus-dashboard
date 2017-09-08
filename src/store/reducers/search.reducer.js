import {
    SEARCH_QUERY,
} from '../constants';

export const initialState = {
    searchQuery: '',
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SEARCH_QUERY:
            return {
                ...state,
                searchQuery: action.payload,
            };
        default:
            return state;
    }
}
