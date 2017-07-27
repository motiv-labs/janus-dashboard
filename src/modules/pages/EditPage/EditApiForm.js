import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import Section from '../../Layout/Section/Section';
import FormRow from '../../forms/FormRow';
import FormInput from '../../forms/FormInput/FormInput';
import FormLabel from '../../forms/FormLabel';
import Button from '../../buttons/Button';

import RenderPlugins from '../../forms/RenderPlugins';

const propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    initialValues: PropTypes.object,
};

const ApiForm = (props) => {
    const { handleSubmit } = props;
    const parse = value => (value === undefined ? undefined : parseInt(value));

    return (
        <form onSubmit={handleSubmit}>
            <Section>
                <FormRow>
                    <FormInput component="input" label="Listen Path" attachTo="proxy.listen_path" type="text" tooltip="some another tooltip about something usefull" />
                    <FormInput component="input" label="Upstream URL" attachTo="proxy.upstream_url" type="text" />
                    <FormInput component="input" label="Preserve HOST" attachTo="proxy.preserve_host" type="checkbox" tooltip="some another tooltip about something usefull" />
                    <FormInput component="input" label="Strip Path" attachTo="proxy.strip_path" type="checkbox" />
                    <FormInput component="input" label="Append Path" attachTo="proxy.append_path" type="checkbox" />
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
            </Section>

            {
                !!props.initialValues.plugins &&
                    <RenderPlugins plugins={props.initialValues.plugins} />
            }

            <FormRow centered>
                <Button
                    type="submit"
                    mod="primary"
                >
                    Submit
                </Button>
            </FormRow>
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
