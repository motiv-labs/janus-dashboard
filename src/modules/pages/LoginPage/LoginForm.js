import React from 'react';
// import { connect } from 'react-redux'; // @TODO: implement
import { reduxForm } from 'redux-form';

import Section from '../../Layout/Section/Section';
import FormRow from '../../forms/FormRow';
import FormInput from '../../forms/FormInput/FormInput';
// import FormLabel from '../../forms/FormLabel'; // @TODO: implement
import Button from '../../buttons/Button';
import CompanyLogo from '../../CompanyLogo/CompanyLogo';

const LoginForm = () => {
    const handleSubmit = (e) => {
        e.preventDefault();

        // eslint-disable-next-line
        console.log('SAVE');
    };

    return (
        <form onSubmit={handleSubmit}>
            <CompanyLogo className="JOHNNY" />
            <Section>
                <FormRow>
                    <FormInput component="input" attachTo="login" label="E-mail" type="email" />
                </FormRow>
                <FormRow>
                    <FormInput component="input" attachTo="password" label="Password" type="password" />
                </FormRow>
            </Section>
            <FormRow centered>
                <Button label="Submit" type="submit" />
            </FormRow>
        </form>
    );
};

export default reduxForm({
    form: 'loginForm',
})(LoginForm);
