import React from 'react';
import PropTypes from 'prop-types';

import EditApiContainer from './editApiContainer';

import Section from '../../Layout/Section/Section';
import Container from '../../Layout/Container/Container';
import Title from '../../Layout/Title/Title';

const propTypes = {
  location: PropTypes.object.isRequired,
};

const EditPage = (props) => {
  return (
    <Container>
      <Section>
        <Title>Edit</Title>
      </Section>
      <EditApiContainer location={props.location} />
    </Container>
  );
};

EditPage.propTypes = propTypes;

export default EditPage;
