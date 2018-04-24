import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Field, FieldArray } from 'redux-form'

import block from '../../helpers/bem-cn'
import parse from '../../helpers/parse-value'
import checkOnPattern from '../../helpers/pattern-check'

import Row from '../../modules/Layout/Row/Row'
import Label from '../../components/Label/Label'
import Input from '../../modules/inputs/Input'
import Control from '../../components/Control/Control'

import './AddDoubleFields.css'

const row = block('j-row')

const propTypes = {
  isValidate: PropTypes.string,
  name: PropTypes.string.isRequired,
  title: PropTypes.string,
  config: PropTypes.arrayOf(PropTypes.object).isRequired,
  warningMessage: PropTypes.string
}

const defaultProps = {
  isValidate: null
}

const passParse = config => config.type === 'number' ? parse : undefined

const renderMembers = ({ fields, isValidate, config, title, warningMessage, disabled }) => {
  return (
    <div>
      <div className={row()}>
        <Label>{ title }</Label>
        {
          !disabled &&
          <Control
            onClick={() => fields.push({})}
            icon='add'
          />
        }
      </div>
      {
        fields.map((member, index) => (
          <Row className='double-fields' key={index} col>
            <div className={row()}>
              <div className={row('item', {pair: true})()}>
                <Field
                  name={`${member}.${config[0].sufix}`}
                  type={config[0].type}
                  component={Input}
                  placeholder={config[0].placeholder}
                  parse={passParse(config[0])}
                  validate={isValidate && checkOnPattern(isValidate)}
                  disabled={disabled}
                />
                {
                  warningMessage &&
                  <span className='j-input__warning'>{warningMessage}</span>
                }
              </div>
              <div className={row('item')()}>
                <Field
                  name={`${member}.${config[1].sufix}`}
                  type={config[1].type}
                  component={Input}
                  placeholder={config[1].placeholder}
                  parse={passParse(config[1])}
                  disabled={disabled}
                />
              </div>
              {
                !disabled &&
                <div className={row('control')()}>
                  <Control
                    onClick={() => fields.remove(index)}
                    icon='remove'
                  />
                </div>
              }
            </div>
          </Row>
        ))
      }
    </div>
  )
}

class AddDoubleFields extends PureComponent {
  constructor (props) {
    super(props)

    this.state = {}
  }

  componentDidMount () {
    this.setState({ renderMembers })
  }

  render () {
    if (!this.state.renderMembers) return null

    const { config, isValidate, name, title, warningMessage } = this.props

    return (
      <div className='j-col__item'>
        <FieldArray
          name={`${name}`}
          component={renderMembers}
          title={title}
          config={config}
          isValidate={isValidate}
          warningMessage={warningMessage}
        />
      </div>
    )
  }
};

AddDoubleFields.defaultProps = defaultProps
AddDoubleFields.propTypes = propTypes

export default AddDoubleFields
