import React from 'react'
import { Link } from 'react-router-dom'

import SearchingContainer from '../../../components/SearchBar/searchContainer'
import OAuthServersContainer from './oAuthServersContainer'

import Section from '../../Layout/Section/Section'
import Row from '../../Layout/Row/Row'
import Title from '../../Layout/Title/Title'
import Button from '../../../components/Button/Button'

const OAuthServersPage = () => {
  return (
    <Section outer>
      <Section>
        <Row>
          <Title>OAuth Servers</Title>
          <Row>
            <SearchingContainer />
            <Link to='/oauth/servers/new'>
              <Button mod='primary'>+ Create New OAuth Server</Button>
            </Link>
          </Row>
        </Row>
      </Section>
      <Section>
        <OAuthServersContainer />
      </Section>
    </Section>
  )
}

export default OAuthServersPage
