import React from 'react'
import PropTypes from 'prop-types'

import block from '../../helpers/bem-cn'

import './Icon.css'

const b = block('j-icon')

const propTypes = {
  ariaLabel: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.oneOf([
    'add', // green plus
    'checked',
    'close',
    'copy', // green files
    'copy-white', // white files
    'correct',
    'delete', // red bucket
    'delete-white', // white bucket
    'edit', // green pencil
    'view', // green eye
    'github',
    'remove', // red minus
    'successful-white' // white success symbol
  ]).isRequired
}

const Icon = ({ ariaLabel, className, type }) => (
  <span
    aria-label={ariaLabel}
    className={b({ type }).mix(className).mix(ariaLabel && 'j-tooltiped')()}
  />
)

Icon.propTypes = propTypes

export default Icon
