import React from 'react'
import {
  bool,
  func,
  string
} from 'prop-types'
import AceEditor from 'react-ace'
import 'brace/mode/json'
import 'brace/theme/github'
import 'brace/ext/beautify'
import 'brace/ext/searchbox'

import './JSONeditor.css'

const propTypes = {
  value: string.isRequired,
  isShown: bool.isRequired,
  onChange: func,
  readOnly: bool
}

const JSONeditor = props => {
  console.warn('JSON is shown:', props.isShown)
  if (!props.isShown) return null

  return (
    <AceEditor
      mode='json'
      theme='github'
      className='json-editor'
      name='gw-json-editor'
      readOnly={props.readOnly}
      onChange={props.onChange}
      value={props.value}
      editorProps={{
        highlightActiveLine: true,
        showGutter: true,
        showLineNumbers: true,
        $blockScrolling: Infinity
      }}
    />
  )
}

JSONeditor.propTypes = propTypes

export default JSONeditor
