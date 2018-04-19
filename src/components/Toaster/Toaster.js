import React from 'react'
import {
  object
} from 'prop-types'

import block from '../../helpers/bem-cn'

import Icon from '../Icon/Icon'

import './Toaster.css'

const b = block('j-toaster')

const propTypes = {
  toaster: object.isRequired
}

const Toaster = props => {
  const handleCloseToaster = () => props.closeToaster()
  const closeLater = () => setTimeout(handleCloseToaster, 2000)

  if (!props.toaster.isOpen) return null

  closeLater()

  return (
    <div className={b()}>
      <div className={b('left-part')()}>
        <Icon
          className={b('icon')()}
          type='successful-white'
        />
      </div>
      <div className={b('right-part')()}>
        {props.toaster.name} has been successfully {props.toaster.actionType}d
      </div>
      <div
        className={b('close')()}
        onClick={handleCloseToaster}
      >
        <Icon
          type='close'
        />
      </div>
    </div>
  )
}

Toaster.propTypes = propTypes

export default Toaster
