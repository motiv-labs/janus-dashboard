import React from 'react';
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

const LoginForm = () => {
    const handleSubmit = (e) => {
        e.preventDefault();

        // eslint-disable-next-line
        console.log('SAVE');
    };

    return (
        <form className={b} onSubmit={handleSubmit}>
            <Logo className={b('logo')()} />
            <p className={b('greeting')}>Enter your HelloFresh credentials to login to <strong>Janus Gateway</strong></p>
            <Section>
                <Row className={b('input')()} col>
                    <Label>E-mail</Label>
                    <Field type="email" name="email" component={Input} />
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

export default reduxForm({
    form: 'loginForm',
})(LoginForm);
