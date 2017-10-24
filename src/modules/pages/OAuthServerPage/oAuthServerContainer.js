import { connect } from 'react-redux';

import {
    fetchOAuthServer,
    fetchOAuthServerSchema,
} from '../../../store/actions';

import OAuthServerItem from './OAuthServerItem';

const mapStateToProps = state => ({
    oAuthServer: state.oAuthServerReducer.oAuthServer,
    schema: state.oAuthServerReducer.oAuthServerSchema,
});

export default connect(
    mapStateToProps,
    {
        fetchOAuthServer,
        fetchOAuthServerSchema,
    },
)(OAuthServerItem);
