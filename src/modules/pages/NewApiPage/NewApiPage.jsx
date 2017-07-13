import React from 'react';
import PropTypes from 'prop-types';

import NewApiContainer from './newApiContainer';

import Section from '../../Layout/Section/Section';
import Container from '../../Layout/Container/Container';
import Title from '../../Layout/Title/Title';

const propTypes = {
  location: PropTypes.object.isRequired,
};

const EditPage = ({ location }) => {
  return (
    <Container>
      <Section>
        <Title>New API</Title>
      </Section>
      <Section>
        <NewApiContainer location={location} />
      </Section>
    </Container>
  );
};

EditPage.propTypes = propTypes;

export default EditPage;
