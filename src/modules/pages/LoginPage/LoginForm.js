import React from 'react';
// import { connect } from 'react-redux'; // @TODO: implement
import { reduxForm } from 'redux-form';

import block from '../../../helpers/bem-cn';

import Section from '../../Layout/Section/Section';
import FormRow from '../../forms/FormRow';
import FormInput from '../../forms/FormInput/FormInput';
// import FormLabel from '../../forms/FormLabel'; // @TODO: implement
import Button from '../../buttons/Button';
import CompanyLogo from '../../CompanyLogo/CompanyLogo';

import './LoginForm.css';

const b = block('login-form');

const LoginForm = () => {
    const handleSubmit = (e) => {
        e.preventDefault();

        // eslint-disable-next-line
        console.log('SAVE');
    };

    return (
        <form className={b} onSubmit={handleSubmit}>
            <CompanyLogo className={b('logo')} />
            <Section>
                <FormRow>
                    <FormInput component="input" attachTo="login" label="E-mail" type="email" />
                </FormRow>
                <FormRow>
                    <FormInput component="input" attachTo="password" label="Password" type="password" />
                </FormRow>
            </Section>
            <FormRow alignX>
                <Button mod="primary" type="submit">Submit</Button>
            </FormRow>
        </form>
    );
};

export default reduxForm({
    form: 'loginForm',
})(LoginForm);
