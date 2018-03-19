import React from 'react'
import PropTypes from 'prop-types'

import block from '../../helpers/bem-cn'
import './Logo.css'

const b = block('j-logo')

const propTypes = {
  className: PropTypes.string
}

const Logo = ({ className }) => (
  <span className={b.mix(className)()} />
)

Logo.propTypes = propTypes

export default Logo
