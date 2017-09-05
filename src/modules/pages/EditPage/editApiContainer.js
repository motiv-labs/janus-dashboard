import { connect } from 'react-redux';

import {
    deleteEndpoint,
    excludePlugin,
    fillSelected,
    selectPlugin,
    fetchEndpointSchema,
    fetchEndpoint,
    refreshEndpoints,
    resetEndpoint,
    saveEndpoint,
    updateEndpoint,
} from '../../../store/actions';

import ApiItem from './ApiItem';

const mapStateToProps = state => ({
    api: state.apiReducer.api,
    selectedPlugins: state.apiReducer.selectedPlugins,
});

export default connect(
    mapStateToProps,
    {
        deleteEndpoint,
        excludePlugin,
        fetchEndpointSchema,
        fillSelected,
        selectPlugin,
        saveEndpoint,
        fetchEndpoint,
        refreshEndpoints,
        resetEndpoint,
        updateEndpoint,
    },
)(ApiItem);
