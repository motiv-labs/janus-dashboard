import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import R from 'ramda'

import block from '../../../../helpers/bem-cn'

import Row from '../../../Layout/Row/Row'
import Label from '../../../../components/Label/Label'
import Input from '../../../inputs/Input'
import Hint from '../../../../components/Hint/Hint'
import ControlBar from '../ControlBar/ControlBar'
import SimpleSelect from '../../../selects/SimpleSelect/SimpleSelect'

const grid = block('j-grid')

const propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  plugin: PropTypes.object.isRequired,
  pluginName: PropTypes.string.isRequired,
  handlePluginExclude: PropTypes.func.isRequired
}

const RateLimitPlugin = ({
  apiSchema,
  className,
  name,
  handlePluginExclude,
  plugin,
  pluginFromValues,
  pluginName,
  response
}) => {
  const b = block(className)
  const getLabels = plugins => plugins.filter(pl => pl.name === plugin.name)[0].config.limit.labels

  const createOptions = (list1, list2) => {
    const combinedListOfUnitsAndLabels = R.zip(list1, list2)

    return combinedListOfUnitsAndLabels.map(item => ({
      label: item[1],
      value: item[0]
    }))
  }

  return (
    <div className={b('section')()}>
      <Row fullwidth>
        <Row col>
          <Label>Plugin Name</Label>
          <Input input={{value: 'Rate Limit'}} disabled />
        </Row>
        <ControlBar name={`${name}.enabled`} removePlugin={() => handlePluginExclude(pluginName)} />
      </Row>
      <Row className={b('row')()} fullwidth>
        <Row col>
          <div className={grid('row', { 2: true })}>
            <Row col>
              <Label>Limit Value</Label>
              <Field
                type='number'
                name={`${name}.config.limit.value`}
                placeholder=''
                component={Input}
              />
            </Row>
            <Row col>
              <Label>Limit Unit</Label>
              <Field
                name={`${name}.config.limit.unit`}
                type='text'
                searchable={false}
                clearable={false}
                options={createOptions(plugin.config.limit.units, getLabels(apiSchema.plugins))}
                component={SimpleSelect}
              />
            </Row>
          </div>
          <Hint>The maximum number of requests that the Gateway will forward to the upstream_path.</Hint>
        </Row>
        <Row col>
          <Label>Policy</Label>
          <Field
            name={`${name}.config.policy.selected`}
            type='text'
            searchable={false}
            clearable={false}
            options={plugin.config.policy.options}
            component={SimpleSelect}
          />
          <Hint>The type of rate-limiting policy used for retrieving and incrementing the limits.</Hint>
          <Hint>The rate-limiting policies to use for retrieving and incrementing the limits. Available values are local (counters will be stored locally in-memory on the node) and redis (counters are stored on a Redis server and will be shared across the nodes).</Hint>
        </Row>
      </Row>
    </div>
  )
}

RateLimitPlugin.propTypes = propTypes

export default RateLimitPlugin
