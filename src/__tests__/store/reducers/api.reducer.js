import apiReducer, { initialState } from '../../../store/reducers/api.reducer';
import {
    DELETE_ENDPOINT_START,
    TE_ENDPOINT_SUCCESS,
    UDE_PLUGIN,
    H_ENDPOINT_SCHEMA_START,
    FETCH_ENDPOINT_SCHEMA_SUCCESS,
    FETCH_ENDPOINT_START,
    H_ENDPOINT_SUCCESS,
    RESET_ENDPOINT,
    _ENDPOINT_START,
    _ENDPOINT_SUCCESS,
    ELECT_PLUGIN,
} from '../../../store/constants/api.constants';

describe('apiReducer', () => {
    it('returns the intial state by default', () => {
        const result = apiReducer(initialState, {});

        expect(result).toEqual(initialState);
    });

    it('returns the initial state when RESET_ENDPOINT was triggered', () => {
        const result = apiReducer(Math.random(), { type: RESET_ENDPOINT });

        expect(result).toEqual(initialState);
    });

    it('sets the isFetching state to true when delete endpoint started', () => {
        const initialState = { isFetching: false };

        const result = apiReducer(initialState, { type: DELETE_ENDPOINT_START });

        expect(result.isFetching).toEqual(true);
    });

    it('sets the isFetching state to true when fetch endpoint started', () => {
        const initialState = { isFetching: false };

        const result = apiReducer(initialState, { type: FETCH_ENDPOINT_START });

        expect(result.isFetching).toEqual(true);
    });

    it('sets the isFetching state to true when fetch endpoint schema started', () => {
        const initialState = { isFetching: false };

        const result = apiReducer(initialState, { type: FETCH_ENDPOINT_SCHEMA_START });

        expect(result.isFetching).toEqual(true);
    });

    it('sets the isFetching state to true when save endpoint started', () => {
        const initialState = { isFetching: false };

        const result = apiReducer(initialState, { type: SAVE_ENDPOINT_START });

        expect(result.isFetching).toEqual(true);
    });

    it('sets the isFetching state to false when delete endpoint succeeded', () => {
        const initialState = { isFetching: true };

        const result = apiReducer(initialState, { type: DELETE_ENDPOINT_SUCCESS });

        expect(result.isFetching).toEqual(false);
    });

    it('sets the isFetching state to false when save endpoint succeeded', () => {
        const initialState = { isFetching: true };

        const result = apiReducer(initialState, { type: SAVE_ENDPOINT_SUCCESS });

        expect(result.isFetching).toEqual(false);
    });

    it('sets the api and apiSchema equal to the given payload and the isFetching state to false when fetching endpoint schema succeeded', () => {
        const payload = 'expected-value';
        const initialState = { isFetching: true, api: 'old-api-value', apiSchema: 'old-api-schema-value' };

        const result = apiReducer(initialState, { type: FETCH_ENDPOINT_SCHEMA_SUCCESS, payload });

        expect(result.isFetching).toEqual(false);
        expect(result.api).toEqual(payload);
        expect(result.apiSchema).toEqual(payload);
    });

    it('remove the payload plugins from the state', () => {
        const payload = [1, 3, 5];
        const initialState = { selectedPlugins: [1, 2, 3, 4, 5] };

        const result = apiReducer(initialState, { type: EXCLUDE_PLUGIN, payload });

        expect(result.selectedPlugins.length).toEqual(2);
        expect(result.selectedPlugins[0]).toEqual(2);
        expect(result.selectedPlugins[1]).toEqual(4);
    });

    it('add the payload plugins to the state', () => {
        const payload = [1, 3, 5];
        const initialState = { selectedPlugins: [2, 4] };

        const result = apiReducer(initialState, { type: SELECT_PLUGIN, payload });

        expect(result.selectedPlugins.length).toEqual(5);
        expect(result.selectedPlugins[2]).toEqual(1);
        expect(result.selectedPlugins[3]).toEqual(3);
        expect(result.selectedPlugins[4]).toEqual(5);
    });

    it('sets the api, response, selectedPlugins from the api values and isFetching to false', () => {
        const api = {
            plugins: [
                { name: 'name-1' },
                { name: 'name-2' },
                { name: 'name-3' },
            ],
        };
        const response = 'response-value';
        const payload = {
            api,
            response,
        };

        const result = apiReducer({}, { type: FETCH_ENDPOINT_SUCCESS, payload });

        expect(result.api).toEqual(api);
        expect(result.response).toEqual(response);
        expect(result.isFetching).toEqual(false);
        expect(result.selectedPlugins.length).toEqual(3);
        expect(result.selectedPlugins[0]).toEqual('name-1');
        expect(result.selectedPlugins[1]).toEqual('name-2');
        expect(result.selectedPlugins[2]).toEqual('name-3');
    });

    it('sets the api, response and selectedPligins satet when WILL_CLONE was triggered', () => {
        const api = {
            plugins: [
                { name: 'name-1' },
                { name: 'name-2' },
                { name: 'name-3' },
            ],
        };
        const response = 'response-value';
        const payload = {
            api,
            response,
        };

        const result = apiReducer({}, { type: FETCH_ENDPOINT_SUCCESS, payload });

        expect(result.api).toEqual(api);
        expect(result.response).toEqual(response);
        expect(result.selectedPlugins.length).toEqual(3);
        expect(result.selectedPlugins[0]).toEqual('name-1');
        expect(result.selectedPlugins[1]).toEqual('name-2');
        expect(result.selectedPlugins[2]).toEqual('name-3');
    });
});
