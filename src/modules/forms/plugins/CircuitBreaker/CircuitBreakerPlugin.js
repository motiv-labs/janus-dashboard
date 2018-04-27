import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'

import block from '../../../../helpers/bem-cn'
import parse from '../../../../helpers/parse-value'

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

const CircuitBreakerPlugin = ({ className, name, handlePluginExclude, pluginName, previewPage }) => {
  const b = block(className)

  return (
    <div className={b('section')()}>
      <Row className={b('row')()} fullwidth>
        <Row col>
          <Label>Plugin Name</Label>
          <Input input={{value: 'Circuit breaker'}} disabled />
        </Row>
        {
          !previewPage &&
          <ControlBar name={`${name}.enabled`} removePlugin={() => handlePluginExclude(pluginName)} />
        }
      </Row>
      <Row className={b('row')()} fullwidth>
        <Row col>
          <Row col>
            <Label>Timeout</Label>
            <Field
              type='number'
              name={`${name}.config.timeout`}
              component={Input}
              parse={parse}
              disabled={previewPage}
            />
          </Row>
          <Hint>Timeout that the CB will wait till the request responds</Hint>
          <Row col>
            <Label>Max concurent requests</Label>
            <Field
              name={`${name}.config.max_concurrent_requests`}
              type='number'
              component={Input}
              parse={parse}
              disabled={previewPage}
            />
          </Row>
          <Hint>How many commands of the same type can run at the same time</Hint>
          <Row col>
            <Label>Error percent threshold</Label>
            <Field
              name={`${name}.config.error_percent_threshold`}
              type='number'
              component={Input}
              parse={parse}
              disabled={previewPage}
            />
          </Row>
          <Hint>Causes circuits to open once the rolling measure of errors exceeds this percent of requests</Hint>
        </Row>
        <Row col>
          <Row col>
            <Label>Request volume threshold</Label>
            <Field
              type='number'
              name={`${name}.config.request_volume_threshold`}
              component={Input}
              parse={parse}
              disabled={previewPage}
            />
          </Row>
          <Hint>Is the minimum number of requests needed before a circuit can be tripped due to health</Hint>
          <Row col>
            <Label>Sleep window</Label>
            <Field
              name={`${name}.config.sleep_window`}
              type='number'
              component={Input}
              parse={parse}
              disabled={previewPage}
            />
          </Row>
          <Hint>Is how long, in milliseconds, to wait after a circuit opens before testing for recovery</Hint>
          <Row col>
            <Label>Predicate</Label>
            <Field
              name={`${name}.config.predicate`}
              type='text'
              component={Input}
              disabled={previewPage}
            />
          </Row>
          <Hint>The rule that we will check to define if the request was successful or not. You have access to statusCode and all the request object. Defaults to `statusCode == 0</Hint>
        </Row>
      </Row>
    </div>
  )
}

CircuitBreakerPlugin.propTypes = propTypes

export default CircuitBreakerPlugin
