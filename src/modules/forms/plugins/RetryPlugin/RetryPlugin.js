import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'

import block from '../../../../helpers/bem-cn'

import Row from '../../../Layout/Row/Row'
import Label from '../../../../components/Label/Label'
import Input from '../../../inputs/Input'
import ControlBar from '../ControlBar/ControlBar'
import Hint from '../../../../components/Hint/Hint'

const propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  pluginName: PropTypes.string.isRequired,
  handlePluginExclude: PropTypes.func,
  previewPage: PropTypes.bool
}

const RetryPlugin = ({ className, name, handlePluginExclude, pluginName, previewPage }) => {
  const b = block(className)

  return (
    <div className={b('section')()}>
      <Row className={b('row')()} fullwidth>
        <Row col>
          <Label>Plugin Name</Label>
          <Input input={{value: 'Retry'}} disabled />
        </Row>
        {
          !previewPage &&
          <ControlBar name={`${name}.enabled`} removePlugin={() => handlePluginExclude(pluginName)} />
        }
      </Row>
      <Row className={b('row')()} fullwidth>
        <Row col>
          <Row col>
            <Label>Attempts</Label>
            <Field
              name={`${name}.config.attempts`}
              type='number'
              searchable={false}
              clearable={false}
              component={Input}
              disabled={previewPage}
            />
            <Hint>Number of attempts</Hint>
          </Row>
          <Row col>
            <Label>Backoff</Label>
            <Field
              name={`${name}.config.backoff`}
              type='string'
              searchable={false}
              clearable={false}
              component={Input}
              disabled={previewPage}
            />
            <Hint>Time that we should wait to retry. This must be given in the [ParseDuration](https://golang.org/pkg/time/#ParseDuration) format.</Hint>
          </Row>
        </Row>
        <Row col>
          <Label>Predicate</Label>
          <Field
            name={`${name}.config.predicate`}
            type='string'
            searchable={false}
            clearable={false}
            component={Input}
            disabled={previewPage}
          />
          <Hint>The rule that we will check to define if the request was successful or not. You have access to `statusCode` and all the `request` object.</Hint>
        </Row>
      </Row>
    </div>
  )
}

RetryPlugin.propTypes = propTypes

export default RetryPlugin
