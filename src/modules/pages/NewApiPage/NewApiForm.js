import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import block from '../../../helpers/bem-cn';

import Section from '../../Layout/Section/Section';
import Row from '../../Layout/Row/Row';
import Title from '../../Layout/Title/Title';
import FormRow from '../../forms/FormRow';
import FormInput from '../../forms/FormInput/FormInput';
import FormLabel from '../../forms/FormLabel';
import Button from '../../buttons/Button';
import RenderPlugins from '../../forms/RenderPlugins';

import './NewApiForm.css';

const b = block('j-api-form');

const propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    initialValues: PropTypes.object,
};

const ApiForm = (props) => {
    const {
        handleSubmit,
        initialValues,
    } = props;
    const parse = value => (value === undefined ? undefined : parseInt(value));

    return (
        <form onSubmit={handleSubmit}>
            <Section>
                <Row>
                    <Title>Create New API</Title>
                    <Button
                        type="submit"
                        mod="primary"
                    >
                        Create API
                    </Button>
                </Row>
            </Section>
            <div className={b('inner')}>
                <FormRow>
                    <FormInput component="input" label="Name" attachTo="name" type="text" tooltip="some another tooltip about something usefull" />
                </FormRow>
                <FormRow>
                    <FormInput component="input" label="Listen Path" attachTo="proxy.listen_path" type="text" tooltip="LOREM IPSUM" />
                    <FormInput component="input" label="Upstream URL" attachTo="proxy.upstream_url" type="text" />
                    <FormInput component="input" label="Preserve HOST" attachTo="proxy.preserve_host" type="checkbox" normalize={v => !!v} />
                    <FormInput component="input" label="Strip Path" attachTo="proxy.strip_path" type="checkbox" normalize={v => !!v} />
                    <FormInput component="input" label="Append Path" attachTo="proxy.append_path" type="checkbox" normalize={v => !!v} />
                </FormRow>
                <Section>
                    <FormRow>
                        <FormLabel text="Health check" />
                    </FormRow>
                    <FormRow>
                        <FormInput component="input" label="url" attachTo="health_check.url" type="text" />
                        <FormInput component="input" label="timeout" attachTo="health_check.timeout" type="text" parse={parse} />
                    </FormRow>
                </Section>


                {
                    !!initialValues.plugins &&
                        <RenderPlugins plugins={initialValues.plugins} />
                }

            </div>
        </form>
    );
};

ApiForm.propTypes = propTypes;

const form = reduxForm({
    form: 'apiForm',
    enableReinitialize: true, // this is needed!!
})(ApiForm);

export default connect(
    state => ({
        initialValues: state.apiReducer.api,
    }),
    null,
)(form);
