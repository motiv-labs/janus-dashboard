import { connect } from 'react-redux';

import {
    fetchOAuthServer,
    fetchOAuthServerSchema,
    saveOAuthServer,
    updateOAuthServer,
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
        saveOAuthServer,
        updateOAuthServer,
    },
)(OAuthServerItem);
