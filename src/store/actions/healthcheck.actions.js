import client from '../api';
import {
    FETCH_HEALTHCHECK_START,
    FETCH_HEALTHCHECK_SUCCESS,
} from '../constants';
import {
    openResponseModal,
} from './index';

export const getHealthcheckRequest = () => ({
    type: FETCH_HEALTHCHECK_START,
});

export const getHealthcheckSuccess = hch => ({
    type: FETCH_HEALTHCHECK_SUCCESS,
    payload: hch,
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
