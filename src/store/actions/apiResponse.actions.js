import {
    OPEN_RESPONSE_MODAL,
    CLOSE_RESPONSE_MODAL,
    OPEN_CONFIRMATION_MODAL,
    CLOSE_CONFIRMATION_MODAL,
} from '../constants';

export const openResponseModal = data => ({
    type: OPEN_RESPONSE_MODAL,
    payload: data,
});

export const closeResponseModal = () => ({
    type: CLOSE_RESPONSE_MODAL,
});

export const openConfirmationModal = (action, callback) => {
    const createConfirmationContent = action => {
        switch (action) {
            case 'save': {
                return {
                    message: 'Are you sure you want to save?',
                    status: 'status',
                    statusText: 'statusText',
                    onConfirm: callback,
                };
            }
            case 'update': {
                return {
                    message: 'Are you sure you want to update?',
                    status: 'status',
                    statusText: 'statusText',
                    onConfirm: callback,
                };
            }
            case 'delete': {
                return {
                    message: 'Are you sure you want to delete? This can\'t be undone',
                    status: 'status',
                    statusText: 'statusText',
                    onConfirm: callback,
                };
            }
        }
    };

    return {
        type: OPEN_CONFIRMATION_MODAL,
        payload: createConfirmationContent(action),
    };
};

export const closeConfirmationModal = () => ({
    type: CLOSE_CONFIRMATION_MODAL,
});
