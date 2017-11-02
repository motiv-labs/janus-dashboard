import {
    REQUEST_START,
    REQUEST_COMPLETE,
    REQUEST_FAILURE,
} from '../constants';

export const requestStart = () => ({
    type: REQUEST_START,
});

export const requestComplete = () => ({
    type: REQUEST_COMPLETE,
});

export const requestFailure = () => ({
    type: REQUEST_FAILURE,
});
