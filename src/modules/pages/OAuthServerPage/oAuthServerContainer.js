import { connect } from 'react-redux';

import {
    fetchOAuthServer,
} from '../../../store/actions';

import OAuthServerItem from './OAuthServerItem';

const mapStateToProps = state => ({
    oAuthServer: state.oAuthServerReducer.oAuthServer,
    // schema: state.oAuthServerReducer.oAuthServerSchema,
    // response: state.apiReducer.response,
    // selectedPlugins: state.apiReducer.selectedPlugins,
});

export default connect(
    mapStateToProps,
    {
        fetchOAuthServer,
    },
)(OAuthServerItem);
