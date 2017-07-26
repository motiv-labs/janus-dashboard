import React from 'react';

import Section from '../../Layout/Section/Section';
import Title from '../../Layout/Title/Title';
import LoginContainer from './loginContainer';

const LoginPage = () => {
  return (
    <div>
      <Section>
        <Title>Login page</Title>
      </Section>
      <LoginContainer />
    </div>
  );
};

export default LoginPage;
