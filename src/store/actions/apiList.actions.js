import client from '../api';
import {
    FETCH_ENDPOINTS_START,
    FETCH_ENDPOINTS_SUCCESS,
    FETCH_HEALTHCHECK_START,
    FETCH_HEALTHCHECK_SUCCESS,
    DISCARD_PAGINATION,
    REFRESH_ENDPOINTS,
    SET_PAGINATION_PAGE,
} from '../constants';
import {
    openResponseModal,
} from './index';

export const getEndpointsRequest = () => ({
    type: FETCH_ENDPOINTS_START,
});

export const getEndpointsSuccess = apiList => ({
    type: FETCH_ENDPOINTS_SUCCESS,
    payload: apiList,
});

export const getHealthcheckRequest = () => ({
    type: FETCH_HEALTHCHECK_START,
});

export const getHealthcheckSuccess = hch => ({
    type: FETCH_HEALTHCHECK_SUCCESS,
    payload: hch,
});

export const discardPagination = () => ({
    type: DISCARD_PAGINATION,
});

export const setCurrentPageIndex = index => ({
    type: SET_PAGINATION_PAGE,
    payload: index,
});

export const fetchHealthCheck = () => async (dispatch) => {
    dispatch(getHealthcheckRequest());

    try {
        const response = await client.get('status');
        console.error('HEALTH_CHECK', response);

        dispatch(getHealthcheckSuccess());
    } catch (error) {
        dispatch(openResponseModal({
            status: error.response.status,
            statusText: error.response.statusText,
            message: error.response.data.error,
        }));
    }
};

export const fetchEndpoints = () => dispatch => {
    dispatch(fetchHealthCheck()); // @TODO: place in the right place
    dispatch(getEndpointsRequest());

    return client.get('apis')
        .then((response) => {
            dispatch(getEndpointsSuccess(response.data));
        })
        .catch((e) => {
            // context.commit('SET_ERROR', 'Infernal server error');
            console.log('ERRROR', e);
        });
};

export const refreshEndpoints = api => ({
    type: REFRESH_ENDPOINTS,
    payload: api,
});
