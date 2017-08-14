import React, { Component } from 'react';
import R from 'ramda';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

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
        config: this.props.config,
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

    getSt = () => {
        console.error(this.state.config);
    }

    renderHeaders = config => {
        console.error('CONFIG ==> ', config);
        return config.map((item, key) => {
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
                </Row>
            );
        });
    }

    render() {
        console.error('THIS>PROPS>', this.props);
        const { config } = this.props;
        console.error(Object.keys(config));
        return (
            <Row col>
                <Row>
                    <Label>Limit Value <button type="button" onClick={this.getSt}>state</button></Label>
                    <button type="button" onClick={this.handleAddHeader}>ADD</button>
                </Row>

                {
                    this.renderHeaders(this.state.config)
                }

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
