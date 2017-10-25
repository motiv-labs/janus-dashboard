import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, FieldArray } from 'redux-form';

import block from '../../../../../helpers/bem-cn';

import Row from '../../../../Layout/Row/Row';
import Label from '../../../../labels/Label';
import Input from '../../../../inputs/Input';
import Control from '../../../../buttons/Control/Control';

const row = block('j-row');

const propTypes = {
    name: PropTypes.string.isRequired,
    title: PropTypes.string,
};

class JWTStrategyOptions extends Component {
    renderMembers = ({ fields, name, title }) => {
        return (
            <div>
                <div className={row()}>
                    <Label>{ title }</Label>
                    <Control
                        onClick={() => fields.push({})}
                        icon="add"
                    />
                </div>
                {
                    fields.length &&
                        fields.map((member, index) => (
                            <Row className="double-fields" key={index} col>
                                <div className={row()}>
                                    <div className={row('item', {pair: true})}>
                                        <Field
                                            name={`${member}.alg`}
                                            type="text"
                                            component={Input}
                                            placeholder="Alg"
                                        />
                                    </div>
                                    <div className={row('item', {pair: true})}>
                                        <Field
                                            name={`${member}.key`}
                                            type="text"
                                            component={Input}
                                            placeholder="Key"
                                        />
                                    </div>
                                    <div className={row('control')()}>
                                        <Control
                                            onClick={() => fields.remove(index)}
                                            icon="remove"
                                        />
                                    </div>
                                </div>
                            </Row>
                        ))
                }
            </div>
        );
    };

    render() {
        const { name, title } = this.props;

        return (
            <div className="j-col__item">
                <FieldArray
                    name={`${this.props.name}`}
                    component={this.renderMembers}
                    title={title}
                />
            </div>
        );
    }
};

JWTStrategyOptions.propTypes = propTypes;

export default JWTStrategyOptions;
