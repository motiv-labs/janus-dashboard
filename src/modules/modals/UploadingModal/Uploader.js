import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'

import Button from '../../../components/Button/Button'
import JSONeditor from '../../../components/JSONeditor/JSONeditor'

import block from '../../../helpers/bem-cn'
import adjustToJSONeditor from '../../../helpers/adjustToJSONeditor'

import './Uploader.css'

const cn = block('uploader')
const events = ['dragenter', 'dragover', 'dragleave', 'drop']

class Uploader extends PureComponent {
  componentDidMount () {
    const element = ReactDOM.findDOMNode(this)

    events.forEach(eventName => {
      element.addEventListener(eventName, this.preventDefaults, false)
      document.body.addEventListener(eventName, this.preventDefaults, false)
    }, false)

    element.addEventListener('drop', this.handleDrop, false)
  }

  componentWillUnmount () {
    const element = ReactDOM.findDOMNode(this)

    events.forEach(eventName => {
      element.removeEventListener(eventName, this.preventDefaults, false)
      document.body.removeEventListener(eventName, this.preventDefaults, false)
    }, false)

    element.removeEventListener('drop', this.handleDrop, false)
  }

  preventDefaults = e => {
    e.preventDefault()
    e.stopPropagation()
  }

  handleDrop = e => {
    const file = e.dataTransfer.files[0]
    let reader = new FileReader()

    reader.onload = this.props.getContent(file)
    reader.readAsText(file)
  }

  render () {
    return (
      <div className={cn()}>
        <JSONeditor
          isShown={!!this.props.json}
          value={adjustToJSONeditor(this.props.json)}
          onChange={this.props.handleJSONonChange}
        />
        {
          !this.props.showTooltip &&
            <div className={cn('drag-n-drop')()}>
              <input
                className={cn('input')()}
                type='file'
              />
              <p className={cn('tooltip')()}>Drag-n-drop JSON file here</p>
              <p className={cn('tooltip')()}>or</p>
            </div>
        }
        <div className={cn('choose-button')()}>
          <Button
            key='choose'
            mod='primary'
            onClick={() => {
              this.props.uploadFile()
            }}
          >
            {
              this.props.showTooltip ? 'Choose another file' : 'Choose file'
            }
          </Button>
        </div>
      </div>
    )
  }
}

export default Uploader
