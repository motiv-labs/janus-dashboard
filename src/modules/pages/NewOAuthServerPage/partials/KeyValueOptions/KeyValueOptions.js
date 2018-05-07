import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field, FieldArray } from 'redux-form'

import block from '../../../../../helpers/bem-cn'

import Row from '../../../../Layout/Row/Row'
import Label from '../../../../../components/Label/Label'
import Input from '../../../../inputs/Input'
import Control from '../../../../../components/Control/Control'

const row = block('j-row')

const propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string,
  placeholder: PropTypes.object
}

class SecretsOptions extends Component {
    renderMembers = ({ fields, title }) => {
      return (
        <div>
          <div className={row()}>
            <Label>{ title }</Label>
            <Control
              onClick={() => fields.push({})}
              icon='add'
            />
          </div>
          {
            fields.length &&
              fields.map((member, index) => (
                <Row className='double-fields' key={index} col>
                  <div className={row()}>
                    <div className={row('item', {pair: true})()}>
                      <Field
                        name={`${member}.${this.props.k}`}
                        type='text'
                        component={Input}
                        placeholder={`${this.props.placeholder.key}`}
                      />
                    </div>
                    <div className={row('item', {pair: true})()}>
                      <Field
                        name={`${member}.${this.props.val}`}
                        type='text'
                        component={Input}
                        placeholder={`${this.props.placeholder.value}`}
                      />
                    </div>
                    <div className={row('control')()}>
                      <Control
                        onClick={() => fields.remove(index)}
                        icon='remove'
                      />
                    </div>
                  </div>
                </Row>
              ))
          }
        </div>
      )
    };

    render () {
      const { name, title } = this.props

      return (
        <div className='j-col__item'>
          <FieldArray
            name={`${name}`}
            component={this.renderMembers}
            title={title}
          />
        </div>
      )
    }
};

SecretsOptions.propTypes = propTypes

export default SecretsOptions
