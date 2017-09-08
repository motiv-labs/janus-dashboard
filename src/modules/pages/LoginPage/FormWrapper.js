import React from 'react';

import LoginForm from './LoginForm';

const FormWrapper = ({ errorMsg, loginUser, GET_JOHNNY }) => {
    const submitLogin = (values) => {
        loginUser(values);
    };
    return (
        <LoginForm
            onSubmit={submitLogin}
            errorMsg={errorMsg}
            getJohnny={GET_JOHNNY}
        />
    );
};

export default FormWrapper;
