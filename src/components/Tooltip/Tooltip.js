import React from 'react'

import block from '../../helpers/bem-cn'

import './Tooltip.css'

const cn = block('j-tooltip')

const defaultProps = {
  position: 'bottom'
}

const Tooltip = ({
  position,
  label,
  children,
  className
}) => {
  return (
    <div className={cn({ position }).mix(className)()}>
      <div className={cn('label')()}>
        { label }
      </div>
      <div className={cn('content')()}>
        { children }
      </div>
    </div>
  )
}

Tooltip.defaultProps = defaultProps

export default Tooltip
