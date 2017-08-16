import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, FieldArray } from 'redux-form';

import block from '../../../../../helpers/bem-cn';

import Row from '../../../../Layout/Row/Row';
import Label from '../../../../labels/Label';
import Input from '../../../../inputs/Input';
import Hint from '../../../../labels/Hint/Hint';
import Control from '../../../../buttons/Control/Control';

const row = block('j-row');

const propTypes = {
    name: PropTypes.string.isRequired,
    title: PropTypes.string,
    hint: PropTypes.string,
};

class QueryStringSection extends Component {
    renderMembers = ({ fields, hint, title }) => (
        <ul>
            <div className={row()}>
                <Label>{ title }</Label>
                <Control
                    onClick={() => fields.push()}
                    icon="add"
                />
            </div>
            <Hint title>{ hint }</Hint>
            {
                fields.map((member, index) => {
                    return (
                        <Row key={index} col>
                            <div className={row()}>
                                <div className={row('item')}>
                                    <Field
                                        name={`${member}`}
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

    renderHeaders = ({ fields, hint, title }) => {
        return (
            <div>
                <FieldArray
                    name={`${this.props.name}`}
                    title={title}
                    hint={hint}
                    component={this.renderMembers}
                />
            </div>
        );
    }

    render() {
        const { hint, title } = this.props;

        return (
            <Row col>
                <FieldArray
                    name="headers"
                    component={this.renderHeaders}
                    title={title}
                    hint={hint}
                />
            </Row>
        );
    }
};

QueryStringSection.propTypes = propTypes;

export default QueryStringSection;
