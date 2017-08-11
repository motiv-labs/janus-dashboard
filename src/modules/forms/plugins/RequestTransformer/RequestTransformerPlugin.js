import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

import block from '../../../../helpers/bem-cn';

import Row from '../../../Layout/Row/Row';
import Label from '../../../labels/Label';
import Input from '../../../inputs/Input';
import Radio from '../../../inputs/Radio/Radio';
import Hint from '../../../labels/Hint/Hint';
import ControlBar from '../ControlBar/ControlBar';
import HeadersSection from './HeadersSection/HeadersSection';

const propTypes = {
    className: PropTypes.string,
    name: PropTypes.string.isRequired,
    pluginName: PropTypes.string.isRequired,
    handlePluginExclude: PropTypes.func.isRequired,
};

const RequestTransformerPlugin = ({ className, name, handlePluginExclude, plugin, pluginName }) => {
    const b = block(className);

    return (
        <div className={b('section')()}>
            <Row fullwidth>
                <Row col>
                    <Label>Plugin Name</Label>
                    <Input input={{value: 'Request Transformer'}} disabled />
                </Row>
                <ControlBar name={`${name}.enabled`} removePlugin={() => handlePluginExclude(pluginName)} />
            </Row>
            <Row className={b('row')()} fullwidth>
                <HeadersSection
                    name={`${name}.config.add.headers`}
                    config={plugin.config.add.headers}
                />
                <Row col>
                    <Label>Limit Value</Label>
                    <Hint>The maximum number of requests that the Gateway will forward to the upstream_path.</Hint>
                    <Row>
                        <Row col>
                            <Field
                                name={`${name}.config.limit.value`}
                                type="text"
                                placeholder="Key"
                                component={Input}
                            />
                        </Row>
                        <Row col>
                            <Field
                                name={`${name}.config.limit.units`}
                                type="text"
                                placeholder="Value"
                                component={Input}
                            />
                        </Row>
                    </Row>
                </Row>
            </Row>
        </div>
    );
};

RequestTransformerPlugin.propTypes = propTypes;

export default RequestTransformerPlugin;
