import React, { PureComponent } from 'react'
import { bool, object } from 'prop-types'

import Modal from '../../../components/Modal/Modal'
import Button from '../../../components/Button/Button'
import JSONeditor from '../../../components/JSONeditor/JSONeditor'

import adjustToJSONeditor from '../../../helpers/adjustToJSONeditor'

const propTypes = {
  json: object.isRequired,
  show: bool.isRequired
}

const defaultProps = {
  json: {},
  show: false
}

class UploadingModal extends PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      show: false,
      json: null
    }
  }

  handleOpen = () => this.setState({ show: true })

  handleClose = () => this.setState({ show: false })

  setJSON = json => this.setState({ json: JSON.parse(json) })

  getContent = file => e => this.setJSON(e.target.result)

  uploadFile = event => {
    const file = event.target.files[0]
    let reader = new FileReader()

    reader.onload = this.getContent(file)

    reader.readAsText(file)
  }

  handleUploadFile = () => {
    let input = document.createElement('input')

    input.type = 'file'
    input.id = 'import-json'
    input.onchange = this.uploadFile
    document.body.appendChild(input)
    input.click()
    document.body.removeChild(input)
  }

  render () {
    return (
      <div>
        <Button
          mod='primary'
          onClick={this.handleOpen}
        >
          Import from JSON
        </Button>
        <Modal
          show={this.state.show}
          closeModal={this.handleClose}
          title={'Import from JSON'}
          message={
            <JSONeditor
              isShown={!!this.state.json}
              value={adjustToJSONeditor(this.state.json)}
              readOnly
            />
          }
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
                this.handleUploadFile()
              }}
            >
              Choose file
            </Button>
          ]}
        />
      </div>
    )
  }
}

UploadingModal.propTypes = propTypes
UploadingModal.defaultProps = defaultProps

export default UploadingModal
