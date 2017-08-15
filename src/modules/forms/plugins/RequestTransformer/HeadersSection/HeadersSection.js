import React, { Component } from 'react';
import R from 'ramda';
import PropTypes from 'prop-types';
import { Field, FieldArray } from 'redux-form';

// import block from '../../../../helpers/bem-cn';

import Row from '../../../../Layout/Row/Row';
import Label from '../../../../labels/Label';
import Input from '../../../../inputs/Input';
import Hint from '../../../../labels/Hint/Hint';
import KeyValueRow from '../KeyValueRow/KeyValueRow';
import Control from '../../../../buttons/Control/Control';
import Icon from '../../../../Icon/Icon';

const propTypes = {
    name: PropTypes.string.isRequired,
    keyName: PropTypes.string.isRequired,
    valueName: PropTypes.string.isRequired,
};

class HeadersSection extends Component {
    state = {
        config: [],
    }

    componentDidMount = () => {
        this.setState({config: this.props.config});
    }

    renderMembers = ({ fields, hint, title }) => (
        <ul>
            <Row>
                <Label>{ title }</Label>
                <Control
                    onClick={() => fields.push({})}
                    icon="add"
                />
            </Row>
            {
                fields.map((member, index) => {
                    return (
                        <Row key={index} col>
                            <Hint>{ hint }</Hint>
                            <Row>
                                <Row col>
                                    <Field
                                        name={`${member}.key`}
                                        type="text"
                                        component={Input}
                                        label="First Name"
                                    />
                                </Row>
                                <Row col>
                                    <Field
                                        name={`${member}.value`}
                                        type="text"
                                        component={Input}
                                        label="Last Name"
                                    />
                                </Row>
                                <Control
                                    onClick={() => fields.remove(index)}
                                    icon="remove"
                                />
                            </Row>
                        </Row>
                    );
                })
            }
        </ul>
    )

    renderHeaders = ({ fields }) => {
        return (
            <div>

                <FieldArray
                    name={`${this.props.name}`}
                    title="Limit Value"
                    hint="A list of headers that the Gateway should append to the request and the value for each."
                    component={this.renderMembers}
                />
            {/*{
                this.props.config.map((item, key) => {
                    console.warn(`${this.props.name}['${key}']`);

                    return (
                        <Row key={key}>
                            <Row col>
                                <Field
                                    name={`${this.props.name}['${key}'].key`}
                                    type="text"
                                    placeholder="Key"
                                    component={Input}
                                />
                            </Row>
                            <Row col>
                                <Field
                                    name={`${this.props.name}['${key}'].value`}
                                    type="text"
                                    placeholder="Value"
                                    component={Input}
                                />
                            </Row>
                            <button type="button" onClick={() => {
                                this.handleRemoveHeader(key);
                            }}
                            >REMOVE</button>
                        </Row>
                    );
                })
            }*/}
            </div>
        );
    }

    render() {
        return (
            <Row col>

                <FieldArray name="headers" component={this.renderHeaders}/>

                {/*{
                    this.renderHeaders(this.state.config)
                }*/}

                <Hint>The maximum number of requests that the Gateway will forward to the upstream_path.</Hint>
                {/*<Row>
                    <Row col>
                        <Field
                            name={`${this.props.name}`}
                            type="text"
                            placeholder="Key"
                            component={Input}
                        />
                    </Row>
                    <Row col>
                        <Field
                            name={`${this.props.name}`}
                            type="text"
                            placeholder="Value"
                            component={Input}
                        />
                    </Row>
                </Row>*/}
            </Row>
        );
    }
};

export default HeadersSection;
