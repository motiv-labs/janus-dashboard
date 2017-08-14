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

    handleAddHeader = () => {
        console.log('ADD HEADER');
        console.warn(this.state.config);
        this.setState(prevState => {
            console.log('prevState.config: ', prevState.config);
            return {
                config: prevState.config.concat({key: '', value: ''}),
            };
        });
    }

    handleRemoveHeader = (i) => {
        console.clear();
        console.log(i);
        // const newConfig = this.state.config.filter(item => item.key !== i);
        R.remove(i, 1, this.props.config);
        const newConfig = R.remove(i, 1, this.state.config);
        console.error('NEW!!!!!!!!!! ', newConfig);
        // this.setState(prevState => {
        //     // console.log('prevState.config: ', i, prevState.config);
        //     return {
        //         config: newConfig,
        //     };
        // });
        this.setState({ config: newConfig });
        // console.error(this.state);
    }

    getSt = () => {
        console.error(this.state.config);
    }

    renderHeaders = ({ fields }) => {
        // console.error('CONFIG ==> ', config);
        console.error('FIELDS::::', fields);
        return (
            <div>
                <li>
                    <button type="button" onClick={() => this.props.config.push({})}>Add Member</button>
                </li>
                {fields.map((member, index) => <span>{index}</span>)}
            {
                this.props.config.map((item, key) => {
                // console.warn(`${this.props.name}['${key}']`);

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
            }
            </div>
        );
    }

/*
    renderHeaders = config => {
        console.error('CONFIG ==> ', config);
        return config.map((item, key) => {
            console.warn(`${this.props.name}['${key}']`);

            return (
                <Row key={`${key}-${item.key}`} dataKey={item.key}>
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
                    <button type="button" onClick={() => config.remove(key)}>remove</button><br />
                </Row>
            );
        });
    }
*/
    render() {
        console.error('THIS>PROPS>', this.props);
        console.error('THIS>STATE>', this.state);
        // const { config } = this.props;
        // console.error(Object.keys(config));
        return (
            <Row col>
                <Row>
                    <Label>Limit Value <button type="button" onClick={this.getSt}>state</button></Label>
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
