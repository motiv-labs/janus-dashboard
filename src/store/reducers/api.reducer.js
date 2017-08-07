import {
    DELETE_ENDPOINT_START,
    DELETE_ENDPOINT_SUCCESS,
    //   DELETE_ENDPOINT_FAILURE, // @TODO: implement
    FETCH_ENDPOINT_START,
    FETCH_ENDPOINT_SUCCESS,
    FETCH_ENDPOINT_SCHEMA_START,
    FETCH_ENDPOINT_SCHEMA_SUCCESS,
    SAVE_ENDPOINT_START,
    SAVE_ENDPOINT_SUCCESS,
    SELECT_PLUGIN,
    RESET_ENDPOINT,
    WILL_CLONE,
} from '../constants';

const initialState = {
    api: {},
    selectedPlugins: [],
    isFetching: false,
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case DELETE_ENDPOINT_START:
        case FETCH_ENDPOINT_START:
        case FETCH_ENDPOINT_SCHEMA_START:
        case SAVE_ENDPOINT_START: {
            return {
                ...state,
                isFetching: true,
            };
        }
        case DELETE_ENDPOINT_SUCCESS: {
            return {
                ...state,
                isFetching: false,
            };
        }
        case FETCH_ENDPOINT_SUCCESS:
        case FETCH_ENDPOINT_SCHEMA_SUCCESS:
        case SAVE_ENDPOINT_SUCCESS: {
            return {
                ...state,
                api: action.payload,
                isFetching: false,
            };
        }
        case SELECT_PLUGIN: {
            return {
                ...state,
                selectedPlugins: state.selectedPlugins.concat(action.payload),
            };
        }
        case WILL_CLONE: {
            return {
                ...state,
                api: action.payload,
            };
        }
        case RESET_ENDPOINT: {
            return initialState;
        }
        default:
            return state;
    }
}
