import React from 'react'
import PropTypes from 'prop-types'
import Modaliz from 'react-modaliz'

import block from '../../../helpers/bem-cn'

const propTypes = {
  className: PropTypes.string,
  closeModal: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  problems: PropTypes.arrayOf(PropTypes.object).isRequired,
  redirectOnClose: PropTypes.func,
  statusText: PropTypes.string.isRequired
}

const defaultProps = {
  message: '',
  problems: [],
  statusText: ''
}

const HealthCheckModal = ({
  className,
  closeModal,
  isOpen,
  message,
  problems,
  redirectOnClose,
  statusText
}) => {
  const b = block(className)
  const m = block('j-modal')
  const handleClose = () => {
    closeModal()

    if (redirectOnClose) {
      redirectOnClose()
    }
  }

  return (
    <Modaliz
      className={m()}
      show={isOpen}
      speed={500}
      onClose={handleClose}
    >
      <div className={b('head')()}>
        <h1 className={b('title').mix(m('title'))()}>{statusText}</h1>
        <h2 className={b('subtitle')()}>{message}</h2>
      </div>
      <table className={b('list')()}>
        <thead>
          <tr className={b('list', 'heading')()}>
            <th className={b('list', 'heading', 'name')()}>Name</th>
            <th className={b('list', 'heading', 'name')()}>Problem</th>
          </tr>
        </thead>
        <tbody>
          {
            problems.map(item => (
              <tr
                className={b('list', 'item')()}
                key={item.name}
              >
                <td className={b('list', 'item', 'name')()}>
                  {item.name}
                </td>
                <td className={b('list', 'item', 'details')()}>
                  {item.message}
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </Modaliz>
  )
}

HealthCheckModal.propTypes = propTypes
HealthCheckModal.defaultProps = defaultProps

export default HealthCheckModal
