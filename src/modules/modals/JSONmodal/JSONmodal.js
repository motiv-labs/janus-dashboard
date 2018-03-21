import React, { PureComponent } from 'react'
import { bool, object } from 'prop-types'
import R from 'ramda'

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
    this.setState({
      show: nextProps.show
    })
  }

  handleClose = () => {
    this.props.closeModal()
  }

  handleCopyToClipBoard = () => {
    const textarea = R.compose(
      setValue(this.props.message),
      createElement
    )('textarea')

    executeCopy(textarea)
  }

  handleDownloadJSONfile = () => downloadObjectAsJson(this.props.message, this.props.message.name)

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

function executeCopy (textarea) {
  document.body.appendChild(textarea)
  textarea.select()
  document.execCommand('Copy')
  document.body.removeChild(textarea)
}

function setValue (value) {
  return (element) => {
    element.value = JSON.stringify(value)

    return element
  }
}

function createElement (name) {
  return document.createElement(name)
}

function downloadObjectAsJson (exportObj, exportName) {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportObj))
  let downloadAnchorNode = document.createElement('a')

  downloadAnchorNode.setAttribute('href', dataStr)
  downloadAnchorNode.setAttribute('download', exportName + '.json')
  downloadAnchorNode.click()
  downloadAnchorNode.remove()
}
