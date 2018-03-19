import React from 'react'
import PropTypes from 'prop-types'

import './Title.css'

const propTypes = {
  children: PropTypes.node.isRequired
}

const Title = ({ children }) => (
  <h1 className='j-title'>{ children }</h1>
)

Title.propTypes = propTypes

export default Title
