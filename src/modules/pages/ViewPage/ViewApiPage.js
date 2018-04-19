import React from 'react'
import PropTypes from 'prop-types'

import ViewApiContainer from './viewApiContainer'

const propTypes = {
  location: PropTypes.object.isRequired
}

const ViewPage = ({ location }) => (
  <ViewApiContainer location={location} />
)

ViewPage.propTypes = propTypes

export default ViewPage
