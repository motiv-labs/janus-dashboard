import React, { Component } from 'react';
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

    }

    render() {
        console.error('THIS>PROPS>', this.props);
        const { config } = this.props;
        console.error(Object.keys(config));
        return (
            <Row col>
                <Row>
                <Label>Limit Value</Label>
                </Row>

                {
                    Object.keys(config).map(key => {
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
                    })
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
