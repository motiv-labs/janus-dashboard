import {
    OPEN_RESPONSE_MODAL,
    CLOSE_RESPONSE_MODAL,
    OPEN_CONFIRMATION_MODAL,
    CLOSE_CONFIRMATION_MODAL,
    CLEAR_CONFIRMATION_MODAL,
    OPEN_TOASTER,
    CLOSE_TOASTER,
} from '../constants';

import {
    confirmedSaveEndpoint,
    confirmedUpdateEndpoint,
    confirmedDeleteEndpoint,
} from './api.actions';
import {
    confirmedSaveOAuthServer,
    confirmedDeleteOAuthServer,
} from './oAuthServer.actions';

export const openResponseModal = data => ({
    type: OPEN_RESPONSE_MODAL,
    payload: data,
});

export const closeResponseModal = () => ({
    type: CLOSE_RESPONSE_MODAL,
});

export const openConfirmationModal = (action, api, apiName) => {
    const createConfirmationContent = action => {
        switch (action) {
            case 'save':
            case 'saveOAuthServer': {
                return {
                    api,
                    apiName,
                    message: 'Are you sure you want to save?',
                    status: action,
                    actionType: 'save',
                    title: 'Save',
                };
            }
            case 'update': {
                return {
                    api,
                    apiName,
                    message: 'Are you sure you want to update?',
                    status: action,
                    actionType: 'update',
                    title: 'Update',
                };
            }
            case 'delete':
            case 'deleteOAuthServer': {
                return {
                    api,
                    message: 'Are you sure you want to delete? This can\'t be undone',
                    status: action,
                    actionType: 'delete',
                    title: `Delete ${apiName ? apiName + '?' : ''}`,
                    apiName,
                };
            }
            default:
                return false;
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

export const clearConfirmationModal = () => ({
    type: CLEAR_CONFIRMATION_MODAL,
});

export const showToaster = () => ({
    type: OPEN_TOASTER,
});

export const closeToaster = () => ({
    type: CLOSE_TOASTER,
});

export const afterCloseConfirmationModal = (actionType, item, itemName) => (dispatch, getState) => {
    switch (actionType) {
        case 'save': {
            return confirmedSaveEndpoint(dispatch, item);
        }
        case 'saveOAuthServer': {
            return confirmedSaveOAuthServer(dispatch, item);
        }
        case 'update': {
            return confirmedUpdateEndpoint(dispatch, item);
        }
        case 'delete': {
            return confirmedDeleteEndpoint(dispatch, itemName, !!item);
        }
        case 'deleteOAuthServer': {
            return confirmedDeleteOAuthServer(dispatch, itemName, !!item);
        }
        default:
            return false;
    }
};
