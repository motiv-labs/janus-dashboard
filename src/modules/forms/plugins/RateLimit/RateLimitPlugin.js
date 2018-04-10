import React, { PureComponent } from 'react'
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

const propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  plugin: PropTypes.object.isRequired,
  pluginName: PropTypes.string.isRequired,
  handlePluginExclude: PropTypes.func.isRequired
}

class RateLimitPlugin extends PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      selectedPolicy: {}
    }
  }

  handleChangeSelectedPolicy = value => {
    this.setState(() => ({
      selectedPolicy: value
    }))
  }

  renderRedisOptions = value => {
    if (value === 'redis') {
      return <div>
        <Row col>
          <Label>Redis DSN</Label>
          <Field
            type='text'
            name={`${this.props.name}.config.redis.dsn`}
            placeholder=''
            component={Input}
          />
        </Row>
        <Row col>
          <Label>Redis prefix</Label>
          <Field
            type='text'
            name={`${this.props.name}.config.redis.prefix`}
            placeholder=''
            component={Input}
          />
        </Row>
      </div>
    }

    return null
  }

  render () {
    const {
      apiSchema,
      className,
      name,
      handlePluginExclude,
      plugin,
      pluginName
    } = this.props

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
            <Hint>The maximum number of requests that the Gateway will forward to the upstream_path.</Hint>
          </Row>
          <Row col>
            <Label>Policy</Label>
            <Field
              className='j-select'
              name={`${name}.config.policy.selected`}
              type='text'
              searchable={false}
              clearable={false}
              options={plugin.config.policy.options}
              onChange={this.handleChangeSelectedPolicy}
              value={this.state.selectedPolicy}
              component={SimpleSelect}
            />
            <Hint>The type of rate-limiting policy used for retrieving and incrementing the limits.</Hint>
            <Hint>The rate-limiting policies to use for retrieving and incrementing the limits. Available values are local (counters will be stored locally in-memory on the node) and redis (counters are stored on a Redis server and will be shared across the nodes).</Hint>
            { this.renderRedisOptions(this.props.pluginFromValues.config.policy.selected) }
          </Row>
        </Row>
      </div>
    )
  }
}

RateLimitPlugin.propTypes = propTypes

export default RateLimitPlugin
