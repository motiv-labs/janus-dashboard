import React from 'react'
import PropTypes from 'prop-types'

import block from '../../helpers/bem-cn'
import './Button.css'

const propTypes = {
  className: PropTypes.string,
  mod: PropTypes.oneOf([
    'primary',
    'danger',
    'default',
    'github',
    'small',
    'white'
  ]).isRequired,
  type: PropTypes.string,
  onClick: PropTypes.func,
  size: PropTypes.oneOf([
    'small'
  ]),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

const addMod = mod => (mod ? { [mod]: !!mod } : {})

const Button = ({ mod, type, onClick, children, className, size, ...props }) => {
  const b = size ? block('j-button')({ [size]: true }) : block('j-button')

  return (
    <button
      {...props}
      className={b(addMod(mod)).mix(className)()}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

Button.propTypes = propTypes

export default Button
