import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';

import block from '../../../helpers/bem-cn';

import Row from '../../Layout/Row/Row';
import Button from '../../buttons/Button';
import Logo from '../../Logo/Logo';
import Icon from '../../Icon/Icon';
import Preloader from '../../Preloader/Preloader';

import './LoginForm.css';

const b = block('login-form');

const propTypes = {
    authorizeThroughGithub: PropTypes.func.isRequired,
    errorMsg: PropTypes.string,
    isFetching: PropTypes.bool.isRequired,
};

const LoginForm = ({ authorizeThroughGithub, errorMsg, isFetching }) => {
    if (isFetching) {
        return <Preloader />;
    }

    return (
        <form className={b({error: !!errorMsg})} onSubmit={authorizeThroughGithub}>
            <Logo className={b('logo')()} />
            <Row className={b('button-section')()} alignCenter>
                <Button className={b('button')()} mod="primary" type="button" onClick={authorizeThroughGithub}>
                    <Icon type="github"/>
                    Login with Github
                </Button>
            </Row>
        </form>
    );
};

LoginForm.propTypes = propTypes;

export default reduxForm({
    form: 'loginForm',
})(LoginForm);
