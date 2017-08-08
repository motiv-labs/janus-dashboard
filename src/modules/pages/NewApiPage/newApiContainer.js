import { connect } from 'react-redux';

import {
    fetchEndpointSchema,
    resetEndpoint,
    saveEndpoint,
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
    { fetchEndpointSchema, resetEndpoint, saveEndpoint, selectPlugin, willClone },
)(NewApiItem);
