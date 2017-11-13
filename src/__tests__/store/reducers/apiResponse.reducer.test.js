import apiResponseReducer, { initialState } from '../../../store/reducers/apiResponse.reducer';
import {
    OPEN_RESPONSE_MODAL,
    CLOSE_RESPONSE_MODAL,
    OPEN_CONFIRMATION_MODAL,
    CLOSE_CONFIRMATION_MODAL,
    CLEAR_CONFIRMATION_MODAL,
    OPEN_TOASTER,
    CLOSE_TOASTER,
} from '../../../store/constants/apiResponse.constants';
import touchedReducerProps from '../../../helpers/touchedReducerProperties';
import setToasterMessage from '../../../helpers/setToasterMessage';
import getRandomString from '../../../helpers/getRandomString';
import getRandomBoolean from '../../../helpers/getRandomBoolean';

describe('apiResponseReducer', () => {
    const confirmationModalState = {
        actionType: '',
        api: {},
        apiName: null,
        message: '',
        needConfirm: false,
        shouldRedirect: null,
        status: null,
        title: '',
    };

    describe('Default', () => {
        it('returns the initial state by default', () => {
            const result = apiResponseReducer(initialState, {});

            expect(result).toEqual(initialState);
        });
    });

    describe('Response Modal manipulations', () => {
        describe('OPEN_RESPONSE_MODAL', () => {
            const message = getRandomString();
            const redirectOnClose = getRandomString();
            const status = getRandomString();
            const statusText = getRandomString();
            const payload = {
                message,
                redirectOnClose,
                status,
                statusText,
            };
            const result = apiResponseReducer({}, {
                type: OPEN_RESPONSE_MODAL,
                payload,
            });

            it('returns a open modal state after user tried to delete or save endpoint', () => {
                expect(result.message).toEqual(message);
                expect(result.redirectOnClose).toEqual(redirectOnClose);
                expect(result.status).toEqual(status);
                expect(result.statusText).toEqual(statusText);
                expect(result.isOpen).toEqual(true);
            });

            it('should handle only change exact amount of reducer properties', () => {
                expect(touchedReducerProps(result)).toBe(5);
            });
        });

        describe('CLOSE_RESPONSE_MODAL', () => {
            const result = apiResponseReducer(Math.random(), { type: CLOSE_RESPONSE_MODAL });

            it('returns the initial state when user closes the modal', () => {
                expect(result).toEqual(initialState);
            });
        });
    });

    describe('Confirmation Modal manipulations', () => {
        const api = getRandomString();
        const apiName = getRandomString();
        const message = getRandomString();
        const shouldRedirect = getRandomBoolean();
        const status = getRandomString();
        const title = getRandomString();
        const payload = {
            api,
            apiName,
            message,
            shouldRedirect,
            status,
            title,
        };
        const modalState = {
            confirmationModal: payload,
        };

        describe('OPEN_CONFIRMATION_MODAL', () => {
            const result = apiResponseReducer({}, {
                type: OPEN_CONFIRMATION_MODAL,
                payload,
            });

            it('returns an open modal with necesserity of confirmation deleting/saving of endpoint', () => {
                expect(result.confirmationModal.api).toEqual(api);
                expect(result.confirmationModal.apiName).toEqual(apiName);
                expect(result.confirmationModal.message).toEqual(message);
                expect(result.confirmationModal.shouldRedirect).toEqual(shouldRedirect);
                expect(result.confirmationModal.status).toEqual(status);
                expect(result.confirmationModal.title).toEqual(title);
                expect(result.confirmationModal.needConfirm).toEqual(true);
            });

            it('should handle only change exact amount of reducer properties', () => {
                expect(touchedReducerProps(result)).toBe(1);
            });
        });

        describe('CLOSE_CONFIRMATION_MODAL', () => {
            const result = apiResponseReducer(modalState, {
                type: CLOSE_CONFIRMATION_MODAL,
            });

            it('returns the whole state of confirmation modal and changes only `needConfirm` flag', () => {
                expect(result.confirmationModal.apiName).toEqual(modalState.confirmationModal.apiName);
                expect(result.confirmationModal.message).toEqual(modalState.confirmationModal.message);
                expect(result.confirmationModal.status).toEqual(modalState.confirmationModal.status);
                expect(result.confirmationModal.title).toEqual(modalState.confirmationModal.title);
                expect(result.confirmationModal.needConfirm).toEqual(confirmationModalState.needConfirm);
            });

            it('should handle only change exact amount of reducer properties', () => {
                expect(touchedReducerProps(result)).toBe(1);
            });

            it('should handle only change exact amount of nested object of reducer property', () => {
                expect(touchedReducerProps(result.confirmationModal)).
                    toBe(touchedReducerProps(modalState.confirmationModal) + 1);
            });
        });

        describe('CLEAR_CONFIRMATION_MODAL', () => {
            const result = apiResponseReducer({}, {
                type: CLEAR_CONFIRMATION_MODAL,
            });

            it('return the initial state of confirmation modal', () => {
                expect(result.confirmationModal).toEqual(confirmationModalState);
            });

            it('should handle only change exact amount of reducer properties', () => {
                expect(touchedReducerProps(result)).toBe(1);
            });
        });
    });

    describe('Toaster manipulations', () => {
        const toasterState = {
            isOpen: false,
            message: '',
        };
        const modalState = {
            confirmationModal: confirmationModalState,
        };

        describe('OPEN_TOASTER', () => {
            const toaster = {
                isOpen: true,
                message: 'message',
            };
            const result = apiResponseReducer(modalState, {
                type: OPEN_TOASTER,
            });

            it('returns opened toaster with message computed out of `setToasterMessage` function', () => {
                expect(result.toaster.isOpen).toBe(true);
                expect(result.toaster.message).toEqual(setToasterMessage(modalState.confirmationModal));
            });

            it('should handle only change exact amount of reducer properties: state and toaster', () => {
                expect(touchedReducerProps(result)).toBe(2);
            });

            it('should handle setting only exact amount of properties in toaster', () => {
                expect(touchedReducerProps(result.toaster)).toBe(2);
            });
        });

        describe('CLOSE_TOASTER', () => {
            const result = apiResponseReducer({}, {
                type: CLOSE_TOASTER,
            });

            it('return initial state of the toaster', () => {
                expect(result.toaster.isOpen).toBe(toasterState.isOpen);
                expect(result.toaster.message).toBe(toasterState.message);
            });

            it('should handle only change exact amount of reducer properties', () => {
                expect(touchedReducerProps(result.toaster)).toBe(2);
            });
        });
    });
});
