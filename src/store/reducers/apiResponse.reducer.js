import {
    OPEN_RESPONSE_MODAL,
    CLOSE_RESPONSE_MODAL,
    OPEN_CONFIRMATION_MODAL,
    CLOSE_CONFIRMATION_MODAL,
} from '../constants';

const initialState = {
    isOpen: false,
    needConfirm: false,
    status: null,
    statusText: '',
    title: '',
    message: '',
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case OPEN_RESPONSE_MODAL: {
            return {
                ...state,
                message: action.payload.message,
                redirectOnClose: action.payload.redirectOnClose,
                status: action.payload.status,
                statusText: action.payload.statusText,
                isOpen: true,
            };
        }
        case OPEN_CONFIRMATION_MODAL: {
            return {
                ...state,
                message: action.payload.message,
                status: action.payload.status,
                title: action.payload.title,
                needConfirm: true,
                onConfirm: action.payload.onConfirm,
            };
        }
        case CLOSE_RESPONSE_MODAL:
        case CLOSE_CONFIRMATION_MODAL: {
            return initialState;
        }
        default:
            return state;
    }
}
