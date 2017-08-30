import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

import block from '../../../helpers/bem-cn';

import Section from '../../Layout/Section/Section';
import Row from '../../Layout/Row/Row';
import Label from '../../labels/Label';
import Button from '../../buttons/Button';
import Logo from '../../Logo/Logo';
import Input from '../../inputs/Input';

import './LoginForm.css';

const b = block('login-form');

const propTypes = {
    handleSubmit: PropTypes.func.isRequired,
};

const LoginForm = ({ handleSubmit }) => {
    return (
        <form className={b} onSubmit={handleSubmit}>
            <Logo className={b('logo')()} />
            <p className={b('greeting')}>Enter your HelloFresh credentials to login to <strong>Janus Gateway</strong></p>
            <Section small>
                <Row className={b('input')()} col>
                    <Label>E-mail</Label>
                    {/*
                        @TODO:  change type 'text' => 'email' (later).
                                We need type 'text' because of username='admin' for local testing
                    */}
                    <Field type="text" name="username" component={Input} />
                </Row>
                <Row className={b('input')()} col>
                    <Label>Password</Label>
                    <Field type="password" name="password" component={Input} />
                </Row>
            </Section>
            <Row className={b('button-section')()} alignCenter>
                <Button className={b('button')()} mod="primary" type="submit">Login</Button>
            </Row>
        </form>
    );
};

LoginForm.propTypes = propTypes;

export default reduxForm({
    form: 'loginForm',
})(LoginForm);
