import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field, FieldArray } from 'redux-form'

import block from '../../../../../helpers/bem-cn'

import Row from '../../../../Layout/Row/Row'
import Label from '../../../../../components/Label/Label'
import Input from '../../../../inputs/Input'
import Hint from '../../../../../components/Hint/Hint'
import Control from '../../../../../components/Control/Control'

const row = block('j-row')

const propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string,
  hint: PropTypes.string,
  disabled: PropTypes.bool
}

class HeadersSection extends Component {
    renderMembers = ({ fields, hint, title, disabled }) => {
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
          <Hint title>{ hint }</Hint>
          {
            fields.map((member, index) => {
              return (
                <Row className='double-fields' key={index} col>
                  <div className={row()}>
                    <div className={row('item', {pair: true})}>
                      <Field
                        name={`${member}.key`}
                        type='text'
                        component={Input}
                        placeholder='Key'
                        disabled={disabled}
                      />
                    </div>
                    <div className={row('item', {pair: true})}>
                      <Field
                        name={`${member}.value`}
                        type='text'
                        component={Input}
                        placeholder='Value'
                        disabled={disabled}
                      />
                    </div>
                    <div className={row('control')()}>
                      {
                        !disabled &&
                        <Control
                          onClick={() => fields.remove(index)}
                          icon='remove'
                        />
                      }
                    </div>
                  </div>
                </Row>
              )
            })
          }
        </div>
      )
    };

    render () {
      const { title, hint, disabled } = this.props

      return (
        <div className='j-col__item'>
          <FieldArray
            name={`${this.props.name}`}
            component={this.renderMembers}
            title={title}
            hint={hint}
            disabled={disabled}
          />
        </div>
      )
    }
};

HeadersSection.propTypes = propTypes

export default HeadersSection
