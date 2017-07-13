import client from '../api';
import {
  FETCH_APIS_REQUEST,
  FETCH_APIS_SUCCESS,
  DISCARD_PAGINATION,
  SET_PAGINATION_PAGE,
} from '../constants';

export const getAPIsRequest = () => ({
  type: FETCH_APIS_REQUEST,
});

export const getAPIsSuccess = (apiList/*: Array<Object>*/) => ({
  type: FETCH_APIS_SUCCESS,
  payload: apiList,
});

export const discardPagination = () => ({
  type: DISCARD_PAGINATION,
});

export const setCurrentPageIndex = (index/*: number*/) => ({
  type: SET_PAGINATION_PAGE,
  payload: index,
});

export const fetchAPIs = () => dispatch => {
  dispatch(getAPIsRequest());
  
  return client.get('apis')
    .then((response) => {
      dispatch(getAPIsSuccess(response.data));
    });
    // .catch(() => {
    //   context.commit('SET_ERROR', 'Infernal server error');
    // });
};
