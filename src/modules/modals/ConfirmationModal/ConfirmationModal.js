import React from 'react'
import {
  func,
  object,
  string
} from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import {
  saveEndpoint,
  deleteEndpoint,
  saveOAuthServer,
  deleteOAuthServer,
  closeConfirmation
} from '../../../store/actions'

import Modal from '../../../components/Modal/Modal'
import Button from '../../../components/Button/Button'

const propTypes = {
  closeModal: func.isRequired,
  objectType: string,
  objectEntity: object
}

const defaultProps = {
  isOpen: false,
  objectEntity: {}
}

const ActionsMap = {
  save: {
    'endpoint': {
      title: 'Save endpoint',
      message: 'Are you sure you want to save endpoint?',
      onConfirm: saveEndpoint({
        isEditing: false
      })
    },
    'OAuthServer': {
      title: 'Save OAuthServer',
      message: 'Are you sure you want to save OAuth server?',
      onConfirm: saveOAuthServer({
        isEditing: false
      })
    }
  },
  update: {
    'endpoint': {
      title: 'Update endpoint',
      message: 'Are you sure you want to update endpoint?',
      onConfirm: saveEndpoint({
        isEditing: true
      })
    },
    'OAuthServer': {
      title: 'Update OAuthServer title',
      message: 'Are you sure you want to update OAuth server?',
      onConfirm: saveOAuthServer({
        isEditing: true
      })
    }
  },
  delete: {
    'endpoint': {
      title: 'Delete endpoint',
      message: 'Are you sure you want to delete the endpoint?',
      onConfirm: deleteEndpoint
    },
    'OAuthServer': {
      title: 'Delete endpoint title',
      message: 'Are you sure you want to delete the OAuth server?',
      onConfirm: deleteOAuthServer
    }
  }
}

const ConfirmationModal = ({
  dispatch,
  isOpen,
  actionType,
  closeModal,
  objectEntity,
  objectType,
  configurationMetadata,
  backup
}) => {
  // eslint-disable-next-line no-mixed-operators
  const getValue = target => isOpen && ActionsMap[actionType][objectType][target] || ''
  const onConfirm = getValue('onConfirm')
  const handleCloseModal = () => closeModal()

  return (
    <Modal
      show={isOpen}
      closeModal={handleCloseModal}
      message={
        React.isValidElement(getValue('message'))
          ? React.cloneElement(getValue('message'), { objectEntity })
          : getValue('message')
      }
      title={getValue('title')}
      buttons={[
        <Button key='cancel' mod='default' onClick={handleCloseModal}>
          Cancel
        </Button>,
        <Button
          key='ok'
          mod='primary'
          onClick={
            () => dispatch(onConfirm(objectEntity))
          }
        >
          OK
        </Button>
      ]}
    />
  )
}

ConfirmationModal.propTypes = propTypes
ConfirmationModal.defaultProps = defaultProps

const mapStateToProps = state => {
  const {
    actionType,
    isOpen,
    objectEntity,
    objectType
  } = state.confirmationReducer

  return {
    actionType,
    objectEntity,
    objectType,
    isOpen
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    closeModal: bindActionCreators(closeConfirmation, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmationModal)
