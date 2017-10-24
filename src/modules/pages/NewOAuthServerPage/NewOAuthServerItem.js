import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';
import { deleteProperty } from 'picklock';

import transformFormValues from '../../../helpers/transformFormValues';

import Section from '../../Layout/Section/Section';
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
        const transformedValues = transformFormValues(values, true);

        this.props.saveOAuthServer(this.props.location.pathname, transformedValues);
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

        return (
            <Section outer>
                { this.renderForm() }
            </Section>
        );
    }
}

NewOAuthServerItem.propTypes = propTypes;

export default NewOAuthServerItem;
