import React from 'react';

import SearchingContainer from '../../SearchBar/searchContainer';
import ApiListContainer from './apiListContainer';

import Section from '../../Layout/Section/Section';
import Row from '../../Layout/Row/Row';
import Container from '../../Layout/Container/Container';
import Title from '../../Layout/Title/Title';
import Subtitle from '../../Layout/Title/Subtitle';

const ApiListPage = () => {
  return (
    <Container>
      <Section>
        <Row>
          <Title>APIs</Title>
          <SearchingContainer />
        </Row>
      </Section>
      <Section>
        <ApiListContainer />
      </Section>
    </Container>
  );
};

export default ApiListPage;
