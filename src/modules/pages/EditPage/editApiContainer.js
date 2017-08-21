import { connect } from 'react-redux';

import {
    deleteEndpoint,
    excludePlugin,
    selectPlugin,
    fetchEndpoint,
    refreshEndpoints,
    resetEndpoint,
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
        selectPlugin,
        fetchEndpoint,
        refreshEndpoints,
        resetEndpoint,
        updateEndpoint,
    },
)(ApiItem);
