import { connect } from 'react-redux';

import {
    deleteEndpoint,
    fetchEndpointSchema,
    resetEndpoint,
    refreshEndpoints,
    saveEndpoint,
    excludePlugin,
    selectPlugin,
    willClone,
} from '../../../store/actions';

import NewApiItem from './NewApiItem';

const mapStateToProps = state => ({
    api: state.apiReducer.api,
    selectedPlugins: state.apiReducer.selectedPlugins,
});

export default connect(
    mapStateToProps,
    {
        deleteEndpoint,
        fetchEndpointSchema,
        resetEndpoint,
        saveEndpoint,
        excludePlugin,
        refreshEndpoints,
        selectPlugin,
        willClone,
    },
)(NewApiItem);
