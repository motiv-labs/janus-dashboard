import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';
import { deleteProperty } from 'picklock';

import transformFormValues from '../../../helpers/transformFormValues';

import Subtitle from '../../Layout/Title/Subtitle';
import OAuthServerForm from './OAuthServerForm';
import Preloader from '../../Preloader/Preloader';

const propTypes = {
    schema: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
};

class NewOAuthServerItem extends PureComponent {
    componentDidMount() {
        this.props.fetchOAuthServerSchema();
    }

    submit = values => {
        this.props.saveOAuthServer(this.props.location.pathname, values);
    }

    renderForm = () => {
        return (
            <OAuthServerForm
                schema={this.props.schema}
                onSubmit={this.submit}
                initialValues={transformFormValues(this.props.schema)}
             />
        );
    }

    render() {
        if (R.isEmpty(this.props.schema)) return <Preloader />;

        return this.renderForm();
    }
}

NewOAuthServerItem.propTypes = propTypes;

export default NewOAuthServerItem;
