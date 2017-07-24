import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import Section from '../../Layout/Section/Section';
import FormRow from '../../forms/FormRow';
import FormInput from '../../forms/FormInput/FormInput';
import FormLabel from '../../forms/FormLabel';
import Button from '../../buttons/Button';
import RenderPlugins from '../../forms/RenderPlugins';

let ApiForm = props => {
  const { 
    handleSubmit,
    initialValues,
  } = props;
  const parse = value => value === undefined ? undefined : parseInt(value);

  return (
    <form onSubmit={handleSubmit}>
      <Section>
        <FormRow>
          <FormInput component="input" label="Name" attachTo="name" type="text" tooltip="some another tooltip about something usefull"/>
        </FormRow>
      </Section>
      <Section>
        <FormRow>
          <FormInput component="input" label="Listen Path" attachTo="proxy.listen_path" type="text" tooltip="LOREM IPSUM" />
          <FormInput component="input" label="Upstream URL" attachTo="proxy.upstream_url" type="text"/>
          <FormInput component="input" label="Preserve HOST" attachTo="proxy.preserve_host" type="checkbox" normalize={v => !!v}/>
          <FormInput component="input" label="Strip Path" attachTo="proxy.strip_path" type="checkbox" normalize={v => !!v}/>
          <FormInput component="input" label="Append Path" attachTo="proxy.append_path" type="checkbox" normalize={v => !!v}/>
        </FormRow>

	      <Section>
          <FormRow>
	          <FormLabel text="Health check" />
	        </FormRow>
	        <FormRow>
            <FormInput component="input" label="url" attachTo="health_check.url" type="text"/>
            <FormInput component="input" label="timeout" attachTo="health_check.timeout" type="text" parse={parse} />
	        </FormRow>
        </Section>
      </Section>

      {
        !!initialValues.plugins &&
          <RenderPlugins plugins={initialValues.plugins} />
      }

      <FormRow alignX>
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

ApiForm = reduxForm({
  form: 'apiForm',
  enableReinitialize: true, // this is needed!!
})(ApiForm);

ApiForm = connect(
  state => {
    return ({
      initialValues: state.apiReducer.api,
    });
  },
  null
)(ApiForm);

export default ApiForm;
