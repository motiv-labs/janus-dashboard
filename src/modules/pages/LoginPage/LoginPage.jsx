import React from 'react';

import Section from '../../Layout/Section/Section';
import Container from '../../Layout/Container/Container';
import Title from '../../Layout/Title/Title';
import LoginForm from './LoginForm';

// import './LoginPage.css';

const LoginPage = () => {
  return (
    <Container>
      <Section>
        <Title>Login page</Title>
      </Section>
      <LoginForm />
    </Container>
  );
};

export default LoginPage;
