import React, { Component } from 'react';
import R from 'ramda';
import PropTypes from 'prop-types';
import { Field, FieldArray } from 'redux-form';

import block from '../../../../../helpers/bem-cn';

import Row from '../../../../Layout/Row/Row';
import Label from '../../../../labels/Label';
import Input from '../../../../inputs/Input';
import Hint from '../../../../labels/Hint/Hint';
import KeyValueRow from '../KeyValueRow/KeyValueRow';
import Control from '../../../../buttons/Control/Control';
import Icon from '../../../../Icon/Icon';

const row = block('j-row');

const propTypes = {
    name: PropTypes.string.isRequired,
    keyName: PropTypes.string.isRequired,
    title: PropTypes.string,
    valueName: PropTypes.string.isRequired,
};

class QueryStringSection extends Component {
    renderMembers = ({ fields, hint, title }) => (
        <ul>
            <div className={row()}>
                <Label>{ title }</Label>
                <Control
                    onClick={() => fields.push({})}
                    icon="add"
                />
            </div>
            <Hint title>{ hint }</Hint>
            {
                fields.map((member, index) => {
                    return (
                        <Row key={index} col>
                            <div className={row()}>
                                <div className={row('item', {'pair': true})}>
                                    <Field
                                        name={`${member}.key`}
                                        type="text"
                                        component={Input}
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
                    );
                })
            }
        </ul>
    )

    renderHeaders = ({ fields, title }) => {
        return (
            <div>
                <FieldArray
                    name={`${this.props.name}`}
                    title={title}
                    hint="A list of headers that the Gateway should append to the request and the value for each."
                    component={this.renderMembers}
                />
            </div>
        );
    }

    render() {
        const { title } = this.props;

        return (
            <Row col>
                <FieldArray
                    name="headers"
                    component={this.renderHeaders}
                    title={title}
                />
            </Row>
        );
    }
};

export default QueryStringSection;
