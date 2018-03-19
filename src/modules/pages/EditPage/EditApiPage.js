import React from 'react'
import PropTypes from 'prop-types'

import EditApiContainer from './editApiContainer'

const propTypes = {
  location: PropTypes.object.isRequired
}

const EditPage = ({ location }) => (
  <EditApiContainer location={location} />
)

EditPage.propTypes = propTypes

export default EditPage
