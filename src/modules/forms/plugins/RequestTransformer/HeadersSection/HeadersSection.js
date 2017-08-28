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

class HeadersSection extends Component {
    renderMembers = ({ fields, hint, title }) => {
        console.error('___________________');
        console.log('fields', fields);
        console.error('___________________');
        return (
            <div>
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
                        console.warn(member);
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
                                    <div className={row('item', {'pair': true})}>
                                        <Field
                                            name={`${member}.value`}
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
            </div>
        );
    };

    renderHeaders = ({ fields, hint, title }) => {
        return (
            <FieldArray
                name={`${this.props.name}`}
                title={title}
                hint={hint}
                component={this.renderMembers}
            />
        );
    }

    render() {
        const { title, hint} = this.props;

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

HeadersSection.propTypes = propTypes;

export default HeadersSection;
