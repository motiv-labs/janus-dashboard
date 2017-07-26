import React from 'react';
import PropTypes from 'prop-types';

import NewApiContainer from './newApiContainer';

import Section from '../../Layout/Section/Section';
import Title from '../../Layout/Title/Title';

const propTypes = {
  location: PropTypes.object.isRequired,
};

const EditPage = ({ location }) => (
  <div>
    <Section>
      <Title>New API</Title>
    </Section>
    <Section>
      <NewApiContainer location={location} />
    </Section>
  </div>
);

EditPage.propTypes = propTypes;

export default EditPage;
