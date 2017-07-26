import React from 'react';
import { Link } from 'react-router-dom';

import SearchingContainer from '../../SearchBar/searchContainer';
import ApiListContainer from './apiListContainer';

import Section from '../../Layout/Section/Section';
import Row from '../../Layout/Row/Row';
import Title from '../../Layout/Title/Title';
import Button from '../../buttons/Button';

const ApiListPage = () => {
  return (
    <div>
      <Section>
        <Section>
          <Row>
            <Title>APIs</Title>
            <Row>
              <SearchingContainer />
              <Link to="/new">
                <Button label="Create New Api"/>
              </Link>
            </Row>
          </Row>
        </Section>
        <Section>
          <ApiListContainer />
        </Section>
      </Section>
    </div>
  );
};

export default ApiListPage;
