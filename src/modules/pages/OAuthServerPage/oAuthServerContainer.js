import { connect } from 'react-redux';

import {
    fetchOAuthServer,
} from '../../../store/actions';

import OAuthServerItem from './OAuthServerItem';

const mapStateToProps = state => ({
    oAuthServer: state.oAuthServerReducer.oAuthServer,
});

export default connect(
    mapStateToProps,
    {
        fetchOAuthServer,
    },
)(OAuthServerItem);
