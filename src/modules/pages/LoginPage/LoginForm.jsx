import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import Section from '../../Layout/Section/Section';
import FormRow from '../../forms/FormRow';
import FormInput from '../../forms/FormInput/FormInput';
import FormLabel from '../../forms/FormLabel';
import Button from '../../buttons/Button';

let LoginForm = () => {
  return (
    <form>
      <Section>
        <FormRow>
          <FormInput component="input" attachTo="login" label="Login" type="email" />
        </FormRow>
        <FormRow>
          <FormInput component="input" attachTo="password" label="Password" type="password" />
        </FormRow>
      </Section>

      <FormRow centered>
        <Button label="Submit" type="submit"/>
      </FormRow>
    </form>

  );
}

LoginForm = reduxForm({
  form: 'apiForm',
  enableReinitialize: true, // this is needed!!
})(LoginForm);

LoginForm = connect(
  state => {
    return ({
      initialValues: state.userSessionReducer.api,
    });
  },
  null
)(LoginForm);

export default LoginForm;
