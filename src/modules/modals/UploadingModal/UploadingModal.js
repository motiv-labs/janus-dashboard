import React, { PureComponent } from 'react'
import { bool, object } from 'prop-types'
import { connect } from 'react-redux'
import R from 'ramda'

import { confirmAction } from '../../../store/actions'

import Modal from '../../../components/Modal/Modal'
import Button from '../../../components/Button/Button'
import Uploader from './Uploader'

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
      updatedJSON: null,
      json: null
    }
  }

  handleDragAndDrop = () => {}

  handleOpen = () => this.setState({ show: true })

  handleClose = () => this.setState({ show: false, json: null })

  setJSON = json => this.setState({
    updatedJSON: json,
    json
  })

  getContent = file => e => this.setJSON(JSON.parse(e.target.result))

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

  handleUpdateJson = updatedJSON => this.setState({ updatedJSON })

  render () {
    return (
      <div>
        <Button
          mod='primary'
          onClick={this.handleOpen}
        >
          Import JSON
        </Button>
        <Modal
          show={this.state.show}
          closeModal={this.handleClose}
          title={'Import from JSON'}
          message={
            <Uploader
              getContent={this.getContent}
              uploadFile={this.handleUploadFile}
              json={this.state.json}
              handleJSONonChange={this.handleUpdateJson}
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
              key='upload'
              mod='primary'
              onClick={() => {
                this.props.confirmAction('save', 'endpoint', uploaderMediator(this.state.updatedJSON))
                this.handleClose()
              }}
            >
              Upload
            </Button>
          ]}
        />
      </div>
    )
  }
}

UploadingModal.propTypes = propTypes
UploadingModal.defaultProps = defaultProps

export default connect(
  null,
  {
    confirmAction
  }
)(UploadingModal)

function uploaderMediator (obj) {
  return R.type(obj) === 'Object' ? obj : JSON.parse(obj)
}
