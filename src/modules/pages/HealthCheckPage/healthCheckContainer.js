import { connect } from 'react-redux';

import {
    deleteEndpoint,
    fetchEndpoint,
    refreshEndpoints,
    resetEndpoint,
    updateEndpoint,
} from '../../../store/actions';

import ApiItem from './Item';

const mapStateToProps = state => ({
    api: state.apiReducer.api,
});

export default connect(
    mapStateToProps,
    { deleteEndpoint, fetchEndpoint, refreshEndpoints, resetEndpoint, updateEndpoint },
)(ApiItem);
