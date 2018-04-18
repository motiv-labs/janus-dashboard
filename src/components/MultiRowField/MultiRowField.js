import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Field, FieldArray } from 'redux-form'

import block from '../../helpers/bem-cn'
import checkOnPattern from '../../helpers/pattern-check'

import Row from '../../modules/Layout/Row/Row'
import Label from '../../components/Label/Label'
import Input from '../../modules/inputs/Input'
import Hint from '../../components/Hint/Hint'
import Control from '../../components/Control/Control'

const row = block('j-row')

const propTypes = {
  name: PropTypes.string.isRequired,
  hint: PropTypes.string,
  isValidate: PropTypes.string,
  placeholder: PropTypes.string,
  suffix: PropTypes.string,
  title: PropTypes.string,
  disabled: PropTypes.bool
}

const defaultProps = {
  isValidate: null
}

class MultiRowField extends PureComponent {
    renderMembers = ({ fields, hint, isValidate, placeholder, suffix, title, warningMessage }) => (
      <div>
        <div className={row()}>
          <Label>{ title } { placeholder }</Label>
          {
            !this.props.disabled &&
            <Control
              onClick={() => fields.push()}
              icon='add'
            />
          }
        </div>
        {
          hint &&
          <Hint title>{ hint }</Hint>
        }
        {
          fields.map((member, index) =>
            <Row className='double-fields' key={index} col>
              <div className={row()}>
                <div className={row('item')()}>
                  <Field
                    name={suffix ? `${member}.${suffix}` : `${member}`}
                    type='text'
                    component={Input}
                    placeholder={placeholder || ''}
                    validate={isValidate && checkOnPattern(isValidate)}
                    disabled={this.props.disabled}
                  />
                  {
                    warningMessage &&
                    <span className='j-input__warning'>{warningMessage}</span>
                  }
                </div>
                {
                  !this.props.disabled &&
                  <div className={row('control')()}>
                    <Control
                      onClick={() => fields.remove(index)}
                      icon='remove'
                    />
                  </div>
                }
              </div>
            </Row>
          )
        }
      </div>
    )

    render () {
      const { hint, isValidate, name, placeholder, suffix, title, warningMessage } = this.props

      return (
        <Row col>
          <FieldArray
            name={`${name}`}
            component={this.renderMembers}
            hint={hint}
            placeholder={placeholder}
            suffix={suffix}
            title={title}
            isValidate={isValidate}
            warningMessage={warningMessage}
          />
        </Row>
      )
    }
};

MultiRowField.defaultProps = defaultProps
MultiRowField.propTypes = propTypes

export default MultiRowField
