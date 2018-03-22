import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  className: PropTypes.string
}

const ButtonsGroup = ({ children, className }) => {
  const cn = className ? `j-buttons__wrapper ${className}` : 'j-buttons__wrapper'

  return (
    <div className={cn}>
      {children}
    </div>
  )
}

ButtonsGroup.propTypes = propTypes

export default ButtonsGroup
