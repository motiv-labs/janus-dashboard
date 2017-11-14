import client from '../api';
import {
    FETCH_ENDPOINTS_START,
    FETCH_ENDPOINTS_SUCCESS,
    REFRESH_ENDPOINTS,
    SET_SORTING_FILTER,
    SET_ASCEND_FILTER,
} from '../constants';
import {
    fetchHealthCheckList,
} from './index';
import errorHandler from '../../helpers/errorHandler';

export const getEndpointsRequest = () => ({
    type: FETCH_ENDPOINTS_START,
});

export const getEndpointsSuccess = apiList => ({
    type: FETCH_ENDPOINTS_SUCCESS,
    payload: apiList,
});

export const setSortingFilter = filter => ({
    type: SET_SORTING_FILTER,
    payload: filter,
});

export const setAscendingFilter = () => ({
    type: SET_ASCEND_FILTER,
});

export const fetchEndpoints = () => async dispatch => {
    dispatch(getEndpointsRequest());
    dispatch(fetchHealthCheckList());

    try {
        const response = await client.get('apis');

        response && dispatch(getEndpointsSuccess(response.data));
    } catch (error) {
        errorHandler(dispatch)(error);
    }
};

export const refreshEndpoints = api => ({
    type: REFRESH_ENDPOINTS,
    payload: api,
});
