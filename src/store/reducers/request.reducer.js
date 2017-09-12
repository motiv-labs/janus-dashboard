import {
    REQUEST_START,
    REQUEST_COMPLETE,
} from '../constants';

const initialState = {
    isFetching: false,
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case REQUEST_START: {
            return {
                ...state,
                isFetching: true,
            };
        }

        case REQUEST_COMPLETE: {
            return {
                ...state,
                isFetching: false,
            };
        }

        default:
            return state;
    }
}
