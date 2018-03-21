import React from 'react'
import AceEditor from 'react-ace'
import 'brace/mode/json'
import 'brace/theme/github'
import 'brace/ext/beautify'
import 'brace/ext/searchbox'

import './JSONeditor.css'

const JSONeditor = props => (
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

export default JSONeditor
