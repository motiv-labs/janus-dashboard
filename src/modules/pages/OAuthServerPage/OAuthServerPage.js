import React from 'react'
import PropTypes from 'prop-types'

import OAuthServerContainer from './oAuthServerContainer'

const propTypes = {
  location: PropTypes.object.isRequired
}

const OAuthServerPage = props => <OAuthServerContainer location={props.location} />

OAuthServerPage.propTypes = propTypes

export default OAuthServerPage
