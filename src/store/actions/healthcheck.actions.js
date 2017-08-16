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

export const getHealthcheckSuccess = (text, status) => ({
    type: FETCH_HEALTHCHECK_SUCCESS,
    payload: { text, status },
});

export const fetchHealthCheck = () => async (dispatch) => {
    dispatch(getHealthcheckRequest());

    try {
        // const response = await client.get('status');
        const mockResponse = {
            'request': {
                'method': 'GET',
                'urlPath': '/status-partial'
            },
            'response': {
                'status': 400,
                'headers': {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                'jsonBody': {
                    'status': 'Partially Available',
                    'timestamp': '2017-07-03T14:48:14.563630521Z',
                    'failures': {
                        'rabbitmq': 'Failed during RabbitMQ health check',
                        'someAnotherService': 'Failed during RabbitMQ health check'
                    },
                    'system': {
                        'version': 'go1.8.3',
                        'goroutines_count': 15,
                        'total_alloc_bytes': 46186776,
                        'heap_objects_count': 44186,
                        'alloc_bytes': 5733552
                    }
                }
            }
        };
        const { response } = mockResponse;

        if (response.status === 200) {
            dispatch(getHealthcheckSuccess('Available', true));
        } else {
            dispatch(getHealthcheckSuccess(response.jsonBody.status, false));
        }

        console.error('HEALTH_CHECK', response);

    } catch (error) {
        dispatch(openResponseModal({
            status: error.response.status,
            statusText: error.response.statusText,
            message: error.response.data.error,
        }));
    }
};
