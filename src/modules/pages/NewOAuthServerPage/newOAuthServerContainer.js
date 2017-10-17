import { connect } from 'react-redux';

import {
    fetchOAuthServerSchema,
    saveOAuthServer,
} from '../../../store/actions';

import NewOAuthServerItem from './NewOAuthServerItem';

const mapStateToProps = state => {
    // if (state.form.oAuthServerForm) console.error('STATE >>> ', state.form.oAuthServerForm.values.name);
    // const formValues = state.form.oAuthServerForm ? state.form.oAuthServerForm.values : {};

    return {
        schema: state.oAuthServerReducer.oAuthServerSchema,
        // formValues,
    };
};

export default connect(
    mapStateToProps,
    {
        fetchOAuthServerSchema,
        saveOAuthServer,
    },
)(NewOAuthServerItem);
