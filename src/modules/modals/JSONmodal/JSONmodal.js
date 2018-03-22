import React, { PureComponent } from 'react'
import { bool, object } from 'prop-types'

import Modal from '../../../components/Modal/Modal'
import Button from '../../../components/Button/Button'
import JSONeditor from '../../../components/JSONeditor/JSONeditor'

import adjustToJSONeditor from '../../../helpers/adjustToJSONeditor'
import copyToClipboard from '../../../helpers/copyToClipboard'
import downloadObjectAsJson from '../../../helpers/downloadObjectAsJson'

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
    this.setState({
      show: nextProps.show
    })
  }

  handleClose = () => {
    this.props.closeModal()
  }

  handleCopyToClipBoard = () => {
    copyToClipboard(this.props.message)
  }

  handleDownloadJSONfile = () => downloadObjectAsJson(this.props.message, this.props.message.name)

  render () {
    return (
      <Modal
        show={this.state.show}
        message={
          <JSONeditor
            isShown
            value={adjustToJSONeditor(this.props.message)}
            readOnly
          />
        }
        closeModal={this.handleClose}
        title={'Preview'}
        buttons={[
          <Button
            key='cancel'
            mod='default'
            onClick={this.handleClose}
          >
            Close
          </Button>,
          <Button
            key='copy'
            mod='primary'
            onClick={() => {
              this.handleCopyToClipBoard()
              this.handleClose()
            }}
          >
            Copy to clipboard
          </Button>,
          <Button
            key='download'
            mod='github'
            onClick={() => {
              this.handleDownloadJSONfile()
              this.handleClose()
            }}
          >
            Download
          </Button>
        ]}
      />
    )
  }
}

JSONmodal.propTypes = propTypes
JSONmodal.defaultProps = defaultProps

export default JSONmodal
