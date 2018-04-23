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
  previewPage: PropTypes.bool
}

const defaultProps = {
  isValidate: null
}
const renderField = ({ input }) => (
  <div>
    <input type='text' {...input} />
  </div>
)
const validateInline = isValidate => value => {
  // console.log('isValidate', isValidate)
  console.warn(checkOnPattern(isValidate)(value))
  console.warn('VALUE', value)

  return ''
}

const renderList = ({ fields, suffix, isValidate }) => console.warn('fields', isValidate) || (
  <div>
    { fields.map((member, index) => (
      <Field
        // name={ field + ".foo" }
        name={suffix ? `${member}.${suffix}` : `${member}`}
        component={renderField}
        isValidate={isValidate}
        // handleDelete={() => fields.remove( index )}
        validate={validateInline(isValidate)}
        // validate={isValidate && checkOnPattern(isValidate)}
      />
    ))}
  </div>
)
class MultiRowField extends PureComponent {
  constructor (props) {
    super(props)

    this.state = {}
  }
  componentDidMount () {
    this.setState({
      jo: renderList
    })
  }
  componentWillUnmount () {
    console.error('===========')
  }
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
                  !this.props.previewPage &&
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
      const { hint, isValidate, name, placeholder, suffix, title, warningMessage } = this.props // eslint-disable-line
      console.error('name', this.props)

      if (!this.state.jo) return null
      return (
        <Row col>
          <FieldArray
            // name={`${name}`}
            name='proxy.upstreams.targets'
            // component={this.renderMembers}
            component={this.state.jo}
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
