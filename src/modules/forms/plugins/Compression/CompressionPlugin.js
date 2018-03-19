import React from 'react'
import PropTypes from 'prop-types'

import block from '../../../../helpers/bem-cn'

import Row from '../../../Layout/Row/Row'
import Label from '../../../../components/Label/Label'
import Input from '../../../inputs/Input'
import ControlBar from '../ControlBar/ControlBar'

const propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  pluginName: PropTypes.string.isRequired,
  handlePluginExclude: PropTypes.func.isRequired
}

const CompressionPlugin = ({ className, name, handlePluginExclude, pluginName }) => {
  const b = block(className)

  return (
    <div className={b('section')()}>
      <Row className={b('row')()} fullwidth>
        <Row col>
          <Label>Plugin Name</Label>
          <Input input={{value: 'Compression'}} disabled />
        </Row>
        <ControlBar name={`${name}.enabled`} removePlugin={() => handlePluginExclude(pluginName)} />
      </Row>
    </div>
  )
}

CompressionPlugin.propTypes = propTypes

export default CompressionPlugin
