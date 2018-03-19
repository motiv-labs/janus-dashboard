import React from 'react'
import PropTypes from 'prop-types'

import './Label.css'

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string
  ]).isRequired,
  htmlFor: PropTypes.string
}

const Label = ({ children, htmlFor }) => (
  <label className='j-label' htmlFor={htmlFor}>
    { children }
  </label>
)

Label.propTypes = propTypes

export default Label
