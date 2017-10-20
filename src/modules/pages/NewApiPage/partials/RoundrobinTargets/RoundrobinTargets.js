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

class RoundrobinTargets extends Component {
    renderMembers = ({ fields, hint, title }) => {
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
                    fields.map((member, index) => (
                        <Row key={index} col>
                            <div className={row()}>
                                <div className={row('item')}>
                                    <Field
                                        name={`${member}.target`}
                                        type="text"
                                        component={Input}
                                        placeholder="Target"
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
                    name={`${name}`}
                    component={this.renderMembers}
                    title={title}
                />
            </div>
        );
    }
};

RoundrobinTargets.propTypes = propTypes;

export default RoundrobinTargets;
