import React from 'react'
import PropTypes from 'prop-types'
import Modaliz from 'react-modaliz'

import block from '../../helpers/bem-cn'

import './Modal.css'

const propTypes = {
  closeModal: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  buttons: PropTypes.arrayOf(PropTypes.node),
  show: PropTypes.bool.isRequired,
  title: PropTypes.string
}

const defaultProps = {
  message: ''
}

const b = block('j-confirmation')

const Modal = ({
  closeModal,
  message,
  buttons,
  show,
  title
}) => (
  <Modaliz
    className={b()}
    show={show}
    speed={500}
    onClose={closeModal}
    discardDefaults
  >
    <div className={b('inner')()}>
      <div className={b('title')()}>
        {title}
      </div>
      <div className={b('body')()}>
        <div className={b('text')()}>
          {message}
        </div>
      </div>
    </div>
    <div className={b('buttons-group').mix('j-buttons__wrapper')()}>
      { buttons }
    </div>
  </Modaliz>
)

Modal.propTypes = propTypes
Modal.defaultProps = defaultProps

export default Modal
