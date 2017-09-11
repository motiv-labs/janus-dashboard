import React from 'react';

import LoginForm from './LoginForm';

const FormWrapper = ({ errorMsg, loginUser }) => {
    const submitLogin = (values) => {
        loginUser(values);
    };
    return (
        <LoginForm
            onSubmit={submitLogin}
            errorMsg={errorMsg}
        />
    );
};

export default FormWrapper;
