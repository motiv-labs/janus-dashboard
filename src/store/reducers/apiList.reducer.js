import {
  FETCH_APIS_REQUEST,
  FETCH_APIS_SUCCESS,
  REFRESH_APIS,
  DISCARD_PAGINATION,
  SET_PAGINATION_PAGE,
} from '../constants';

const initialState = {
  apiList: [],
  currentPageIndex: 0,
  isFetching: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_APIS_REQUEST: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case FETCH_APIS_SUCCESS: {
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
    case REFRESH_APIS: {
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
