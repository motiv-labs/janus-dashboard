import { connect } from 'react-redux';

import {
    fetchOAuthServer,
} from '../../../store/actions';

import OAuthServerItem from './OAuthServerItem';

const mapStateToProps = state => ({
    oAuthServer: state.oAuthServerReducer.oAuthServer,
    // apiSchema: state.apiReducer.apiSchema,
    // response: state.apiReducer.response,
    // selectedPlugins: state.apiReducer.selectedPlugins,
});

export default connect(
    mapStateToProps,
    {
        fetchOAuthServer,
    },
)(OAuthServerItem);
