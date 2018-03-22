import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import SearchingContainer from '../../../components/SearchBar/searchContainer'
import ApiListContainer from './apiListContainer'

import Section from '../../Layout/Section/Section'
import Row from '../../Layout/Row/Row'
import Title from '../../Layout/Title/Title'
import ButtonsGroup from '../../../components/ButtonsGroup/ButtonsGroup'
import Button from '../../../components/Button/Button'
import UnhealthyReport from '../HealthCheckPage/UnhealthyReport'
import UploadingModal from '../../modals/UploadingModal/UploadingModal'

const ApiListPage = ({ healthcheckStatus }) => {
  const renderHealthcheckInfo = () => {
    if (!healthcheckStatus && healthcheckStatus !== null) {
      return (
        <UnhealthyReport />
      )
    }

    return null
  }

  return (
    <Section outer>
      <Section>
        <Row>
          <Title>APIs</Title>
          <Row>
            <SearchingContainer />
            <ButtonsGroup>
              <Link to='/new'>
                <Button mod='primary' label='Create New Api'>+ Create New API</Button>
              </Link>
              <UploadingModal />
            </ButtonsGroup>
          </Row>
        </Row>
      </Section>
      { renderHealthcheckInfo() }
      <Section>
        <ApiListContainer />
      </Section>
    </Section>
  )
}

const mapStateToProps = state => ({
  healthcheckStatus: state.healthcheckReducer.status
})

export default connect(
  mapStateToProps,
  null
)(ApiListPage)
