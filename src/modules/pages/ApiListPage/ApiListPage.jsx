import React from 'react';

import SearchingContainer from '../../SearchBar/searchContainer';
import ApiListContainer from './apiListContainer';

import Section from '../../Layout/Section/Section';
import Title from '../../Layout/Title/Title';
import Subtitle from '../../Layout/Title/Subtitle';

const ApiListPage = () => {
  return (
    <div>
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
    </div>
  );
};

export default ApiListPage;
