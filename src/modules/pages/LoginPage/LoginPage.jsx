import React from 'react';

import Section from '../../Layout/Section/Section';
import Container from '../../Layout/Container/Container';
import Title from '../../Layout/Title/Title';
import LoginContainer from './loginContainer';

// import './LoginPage.css';
const LoginPage = () => {
  return (
    <Container>
      <Section>
        <Title>Login page</Title>
      </Section>
      <LoginContainer />
    </Container>
  );
};

export default LoginPage;
