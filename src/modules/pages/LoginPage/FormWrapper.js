import React from 'react';

import LoginForm from './LoginForm';

const FormWrapper = ({ errorMsg, loginUser, authorizeThroughGithub }) => {
    const submitLogin = (values) => {
        loginUser(values);
    };

    return (
        <LoginForm
            onSubmit={submitLogin}
            errorMsg={errorMsg}
            authorizeThroughGithub={authorizeThroughGithub}
        />
    );
};

export default FormWrapper;
