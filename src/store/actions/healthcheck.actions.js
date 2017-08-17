import R from 'ramda';
import client from '../api';
import {
    FETCH_HEALTHCHECK_LIST_START,
    FETCH_HEALTHCHECK_LIST_SUCCESS,
    FETCH_HEALTHCHECK_START,
    FETCH_HEALTHCHECK_SUCCESS,
    DISCARD_PAGINATION,
    SET_PAGINATION_PAGE,
} from '../constants';
import {
    openResponseModal,
} from './index';

export const getHealthcheckListRequest = () => ({
    type: FETCH_HEALTHCHECK_LIST_START,
});

export const getHealthcheckListSuccess = (text, status, list) => ({
    type: FETCH_HEALTHCHECK_LIST_SUCCESS,
    payload: { text, status, list },
});

export const getHealthcheckRequest = () => ({
    type: FETCH_HEALTHCHECK_START,
});

export const getHealthcheckSuccess = (text, status, list) => ({
    type: FETCH_HEALTHCHECK_SUCCESS,
    payload: { text, status, list },
});

export const discardPagination = () => ({
    type: DISCARD_PAGINATION,
});

export const setCurrentPageIndex = index => ({
    type: SET_PAGINATION_PAGE,
    payload: index,
});

export const fetchHealthCheckList = () => async (dispatch) => {
    dispatch(getHealthcheckListRequest());

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
                        'someAnotherEndpoint': 'Failed during someAnotherService health check',
                        'yetAnotherEndpoint-1': 'Failed during yetAnotherEndpoint health check',
                        'lastButNotLeastEndpoint': 'Failed during lastButNotLeastEndpoint health check'
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

        const objectToArray = obj => {
            const list = Object.keys(obj).reduce((acc, key) => {
                const o = {
                    name: key,
                    message: obj[key],
                };

                acc.push(o);

                return acc;
            }, []);

            return list;
        };

        if (response.status === 200) {
            dispatch(getHealthcheckListSuccess('Available', true, []));
        } else {
            dispatch(getHealthcheckListSuccess(response.jsonBody.status, false, objectToArray(response.jsonBody.failures)));
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

export const fetchHealthCheckItem = name => async (dispatch) => {
    dispatch(getHealthcheckRequest());

    try {
        const response = await client.get(`status/${name}`);
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
                        'someAnotherService': 'Failed during someAnotherService health check',
                        'yetAnotherService-1': 'Failed during yetAnotherService health check',
                        'lastButNotLeastService': 'Failed during lastButNotLeastService health check'
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
        // const { response } = mockResponse;

        const objectToArray = obj => {
            const list = Object.keys(obj).reduce((acc, key) => {
                const o = {
                    name: key,
                    message: obj[key],
                };

                acc.push(o);

                return acc;
            }, []);

            return list;
        };

        dispatch(getHealthcheckListSuccess());

        console.error('HEALTH_CHECK response.jsonBody', response.jsonBody);

    } catch (error) {
        dispatch(openResponseModal({
            status: error.response.status,
            statusText: error.response.statusText,
            message: error.response.data.error,
        }));
    }
};
