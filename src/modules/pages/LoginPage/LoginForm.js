import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
// import { OAuthSignInButton } from 'redux-auth/default-theme';

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
    errorMsg: PropTypes.string,
    handleSubmit: PropTypes.func.isRequired,
};

const LoginForm = ({ errorMsg, handleSubmit }) => {
    return (
        <form className={b({error: !!errorMsg})} onSubmit={handleSubmit}>
            <Logo className={b('logo')()} />
            <p className={b('greeting')}>Enter your HelloFresh credentials to login to <strong>Janus Gateway</strong></p>
            <Section small>
                <Row className={b('input')()} col>
                    <Label>Login</Label>
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
                {
                    errorMsg &&
                        <div className="error-message">{errorMsg}</div>
                }
            </Section>
            <Row className={b('button-section')()} alignCenter>
                <Button className={b('button')()} mod="primary" type="submit">Login</Button>
            </Row>
            {/*<a href="https://github.com/login/oauth/authorize?response_type=code&client_id=07d212d657ed8f988287&state=TY2OTZhZGFk">Connect Your Account</a>*/}
            <a href="https://gw-staging.hellofresh.com/auth/github/authorize?response_type=code&state=JOHNNY&client_id=fab6013f6101e65a811c&scope=read:org">Connect Your Account</a>
            {/*<button type="button" onClick={getJohnny}>Connect</button>*/}
        </form>
    );
};

// const LoginForm = ({ errorMsg, handleSubmit }) => {
//     console.log(OAuthSignInButton)
//     return (
//         <form className={b({error: !!errorMsg})} onSubmit={handleSubmit}>
//             <Logo className={b('logo')()} />
//             <p className={b('greeting')}>Enter your HelloFresh credentials to login to <strong>Janus Gateway</strong></p>
//             <OAuthSignInButton
//             >Custom Label</OAuthSignInButton>
//         </form>
//     );
// };
// const LoginForm = () => <OAuthSignInButton>Custom Label</OAuthSignInButton>;
// export default connect(({auth}) => ({auth}))(LoginForm);

LoginForm.propTypes = propTypes;

export default reduxForm({
    form: 'loginForm',
})(LoginForm);
