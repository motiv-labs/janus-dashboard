import {
    OPEN_RESPONSE_MODAL,
    CLOSE_RESPONSE_MODAL,
    OPEN_CONFIRMATION_MODAL,
    CLOSE_CONFIRMATION_MODAL,
    CLEAR_CONFIRMATION_MODAL,
    OPEN_TOASTER,
    CLOSE_TOASTER,
} from '../constants';

import setToasterMessage from '../../helpers/setToasterMessage';

export const confirmationModalState = {
    apiName: null,
    message: '',
    needConfirm: false,
    status: null,
    title: '',
    onConfirm: () => {},
};

export const toasterState = {
    isOpen: false,
    message: '',
};

export const initialState = {
    isOpen: false,
    needConfirm: false,
    status: null,
    statusText: '',
    title: '',
    message: '',
    confirmationModal: confirmationModalState,
    toaster: toasterState,
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case OPEN_RESPONSE_MODAL: {
            const { message, redirectOnClose, status, statusText } = action.payload;

            return {
                ...state,
                message,
                redirectOnClose,
                status,
                statusText,
                isOpen: true,
            };
        }
        case OPEN_CONFIRMATION_MODAL: {
            const { api, apiName, message, status, title, onConfirm, redirectUrl } = action.payload;

            return {
                ...state,
                confirmationModal: {
                    api,
                    apiName,
                    message,
                    status,
                    title,
                    onConfirm,
                    needConfirm: true,
                    redirectUrl,
                },
            };
        }
        case OPEN_TOASTER: {
            return {
                ...state,
                toaster: {
                    isOpen: true,
                    message: setToasterMessage(state.confirmationModal),
                },
            };
        }
        case CLOSE_CONFIRMATION_MODAL: {
            return {
                ...state,
                confirmationModal: {
                    ...state.confirmationModal,
                    needConfirm: false,
                },
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
