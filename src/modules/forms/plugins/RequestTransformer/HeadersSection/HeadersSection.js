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

    renderMembers = ({ fields }) => (
        <ul>
            <li>
            <button type="button" onClick={() => fields.push({})}>Add Member</button>
            </li>
            {
                fields.map((member, index) => {
                    console.warn('s/_/_/_/_/_/_/_/_/_/_/_/_/');
                    console.error('MEMBER:: ', member);
                    console.warn('e/_/_/_/_/_/_/_/_/_/_/_/_/');
                    return <li key={index}>
                        <button
                            type="button"
                            title="Remove Member"
                            onClick={() => fields.remove(index)}
                        />
                        <h4>Member #{index + 1}</h4>

                        <Field
                            name={`${member}.key`}
                            type="text"
                            component={Input}
                            label="First Name"
                        />
                        <Field
                            name={`${member}.value`}
                            type="text"
                            component={Input}
                            label="Last Name"
                        />
                    </li>;
                })
            }
        </ul>
    )

    renderHeaders = ({ fields }) => {
        return (
            <div>

                <FieldArray name={`${this.props.name}`} component={this.renderMembers}/>
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
                <Row>
                    <Label>Limit Value</Label>
                    {/*<button type="button" onClick={this.handleAddHeader}>ADD</button>*/}
                </Row>

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
