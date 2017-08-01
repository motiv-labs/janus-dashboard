import React, { Component } from 'react';

import LoginForm from './LoginForm';

class FormWrapper extends Component {
    submitLogin = (values) => {
        this.props.loginUser(values);
    };

    render() {
        return (
            <LoginForm onSubmit={this.submitLogin} />
        );
    }
};

export default FormWrapper;
