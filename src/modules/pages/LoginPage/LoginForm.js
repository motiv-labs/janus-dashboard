import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import block from '../../../helpers/bem-cn';

import Section from '../../Layout/Section/Section';
import Row from '../../Layout/Row/Row';
import Button from '../../buttons/Button';

import './LoginForm.css';

const b = block('login-form');

const LoginForm = ({ handleSubmit }) => {
    return (
        <form className={b} onSubmit={handleSubmit}>
            <p className={b('greeting')}>Enter your HelloFresh credentials to login to <strong>Janus Gateway</strong></p>
            <Section>
                <Row className={b('input')()} col>
                    <Field type="text" name="username" component="input" />
                </Row>
                <Row className={b('input')()} col>
                    <Field type="password" name="password" component="input" />
                </Row>
            </Section>
            <Row className={b('button-section')()} alignCenter>
                <Button className={b('button')()} mod="primary" type="submit">Login</Button>
            </Row>
        </form>
    );
};

export default reduxForm({
    form: 'loginForm',
})(LoginForm);
