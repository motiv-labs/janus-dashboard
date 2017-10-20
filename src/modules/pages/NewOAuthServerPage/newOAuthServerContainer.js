import { connect } from 'react-redux';

import {
    fetchOAuthServerSchema,
    saveOAuthServer,
} from '../../../store/actions';

import NewOAuthServerItem from './NewOAuthServerItem';

const mapStateToProps = state => ({
    schema: state.oAuthServerReducer.oAuthServerSchema,
});

export default connect(
    mapStateToProps,
    {
        fetchOAuthServerSchema,
        saveOAuthServer,
    },
)(NewOAuthServerItem);
