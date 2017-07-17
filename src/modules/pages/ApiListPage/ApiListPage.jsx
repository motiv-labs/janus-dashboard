import React from 'react';

import SearchingContainer from '../../SearchBar/searchContainer';
import ApiListContainer from './apiListContainer';

import Section from '../../Layout/Section/Section';
import Container from '../../Layout/Container/Container';
import Title from '../../Layout/Title/Title';
import Subtitle from '../../Layout/Title/Subtitle';

const ApiListPage = () => {
  return (
    <Container>
      <Section>
        <Title>APIs</Title>
      </Section>
      <Section>
        <Subtitle>Some thing stuff other things</Subtitle>
      </Section>
      <Section>
        <SearchingContainer />
      </Section>
      <Section>
        <ApiListContainer />
      </Section>
    </Container>
  );
};

export default ApiListPage;
