import {
    OPEN_RESPONSE_MODAL,
    CLOSE_RESPONSE_MODAL,
    OPEN_CONFIRMATION_MODAL,
    CLOSE_CONFIRMATION_MODAL,
    CLEAR_CONFIRMATION_MODAL,
    OPEN_TOASTER,
    CLOSE_TOASTER,
} from '../constants';

const confirmationModalState = {
    apiName: null,
    message: '',
    needConfirm: false,
    status: null,
    title: '',
    onConfirm: null,
};

const toasterState = {
    isOpen: false,
    message: '',
};

const initialState = {
    isOpen: false,
    needConfirm: false,
    status: null,
    statusText: '',
    title: '',
    message: '',
    confirmationModal: confirmationModalState,
    toaster: toasterState,
};

const setToasterMessage = info => `"${info.apiName}" has been successfuly ${info.status}d`;

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
                confirmationModal: {
                    apiName: action.payload.apiName,
                    message: action.payload.message,
                    status: action.payload.status,
                    title: action.payload.title,
                    needConfirm: true,
                    onConfirm: action.payload.onConfirm,
                },
            };
        }
        case OPEN_TOASTER: {
            return {
                ...state,
                toaster: {
                    isOpen: true,
                    message: setToasterMessage(state.confirmationModal),
                }
            };
        }
        case CLOSE_CONFIRMATION_MODAL: {
            return {
                ...state,
                confirmationModal: {
                    ...state.confirmationModal,
                    needConfirm: false,
                }
            };
        }
        case CLEAR_CONFIRMATION_MODAL: {
            return {
                ...state,
                confirmationModal: confirmationModalState,
            };
        }
        case CLOSE_TOASTER: {
            return {
                ...state,
                toaster: toasterState,
            };
        }
        case CLOSE_RESPONSE_MODAL: {
            return initialState;
        }
        default:
            return state;
    }
}
