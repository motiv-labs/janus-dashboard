import React, { PureComponent } from 'react'
import { bool, object } from 'prop-types'

import Modal from '../../../components/Modal/Modal'
import Button from '../../../components/Button/Button'
import JSONeditor from '../../../components/JSONeditor/JSONeditor'

import adjustToJSONeditor from '../../../helpers/adjustToJSONeditor'

const propTypes = {
  message: object.isRequired,
  show: bool.isRequired
}

const defaultProps = {
  message: {},
  show: false
}

class JSONmodal extends PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      show: false
    }
  }

  componentWillReceiveProps (nextProps) {
    console.warn('compoennt did mount', nextProps)
    this.setState({
      show: nextProps.show
    })
  }

  componentWillUnmount () {
    console.error('componentWillUnmount()')
  }

  handleClose = () => this.setState({
    show: false
  })

  render () {
    return (
      <Modal
        show={this.state.show}
        message={
          <JSONeditor
            value={adjustToJSONeditor(this.props.message)}
            readOnly
          />
        }
        closeModal={this.handleClose}
        title={'title'}
        buttons={[
          <Button
            key='cancel'
            mod='default'
            onClick={this.handleClose}
          >
            Cancel
          </Button>,
          <Button
            key='ok'
            mod='primary'
            onClick={this.handleClose}
          >
            OK
          </Button>
        ]}
      />
    )
  }
}

JSONmodal.propTypes = propTypes
JSONmodal.defaultProps = defaultProps

export default JSONmodal
