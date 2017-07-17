import {
  FETCH_API_REQUEST,
  FETCH_API_SUCCESS,
  FETCH_API_SCHEMA_REQUEST,
  FETCH_API_SCHEMA_SUCCESS,
  SAVE_API_REQUEST,
  SAVE_API_SUCCESS,
  RESET_API,
} from '../constants';

const initialState = {
  api: {},
  isFetching: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_API_REQUEST:
    case FETCH_API_SCHEMA_REQUEST:
    case SAVE_API_REQUEST: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case FETCH_API_SUCCESS:
    case FETCH_API_SCHEMA_SUCCESS:
    case SAVE_API_SUCCESS: {
      return {
        ...state,
        api: action.payload,
        isFetching: false,
      };
    }
    case RESET_API: {
      return initialState;
    }
    default:
      return state;
  }
}
