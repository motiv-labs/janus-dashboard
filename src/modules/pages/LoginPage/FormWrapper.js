import React, { Component } from 'react';

import LoginForm from './LoginForm';

const FormWrapper = props => {
    const submitLogin = (values) => {
        props.loginUser(values);
    };

    return (
        <LoginForm onSubmit={submitLogin} />
    );
};

export default FormWrapper;
