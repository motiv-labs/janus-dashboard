import apiResponseReducer, { initialState } from '../../../store/reducers/apiResponse.reducer';
import { CLOSE_RESPONSE_MODAL, OPEN_RESPONSE_MODAL } from '../../../store/constants/apiResponse.constants';

const getRandomString = () => Math.floor(Math.random() * 10000).toString(16);

describe('apiResponseReducer', () => {
    it('returns the initial state by default', () => {
        const result = apiResponseReducer(initialState, {});

        expect(result).toEqual(initialState);
    });

    it('returns the initial state when user closes the modal', () => {
        const result = apiResponseReducer(Math.random(), { type: CLOSE_RESPONSE_MODAL });

        expect(result).toEqual(initialState);
    });

    it('returns a open modal state when user clicks on delete button', () => {
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

        const result = apiResponseReducer(initialState, { type: OPEN_RESPONSE_MODAL, payload });

        expect(result.message).toEqual(message);
        expect(result.redirectOnClose).toEqual(redirectOnClose);
        expect(result.status).toEqual(status);
        expect(result.statusText).toEqual(statusText);
        expect(result.isOpen).toEqual(true);
    });
});
