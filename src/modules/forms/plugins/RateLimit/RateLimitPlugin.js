import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

import block from '../../../../helpers/bem-cn';

import Row from '../../../Layout/Row/Row';
import Label from '../../../labels/Label';
import Input from '../../../inputs/Input';
import Hint from '../../../labels/Hint/Hint';
import ControlBar from '../ControlBar/ControlBar';
import SimpleSelect from '../../../selects/SimpleSelect/SimpleSelect';

const propTypes = {
    className: PropTypes.string,
    name: PropTypes.string.isRequired,
    plugin: PropTypes.object.isRequired,
    pluginName: PropTypes.string.isRequired,
    handlePluginExclude: PropTypes.func.isRequired,
};

const RateLimitPlugin = ({ className, name, handlePluginExclude, plugin, pluginName }) => {
    const b = block(className);
    const optionsTransformer = config => config.map(item => ({
        label: item,
        value: item,
    }));

    return (
        <div className={b('section')()}>
            <Row fullwidth>
                <Row col>
                    <Label>Plugin Name</Label>
                    <Input input={{value: 'Rate Limit'}} disabled />
                </Row>
                <ControlBar name={`${name}.enabled`} removePlugin={() => handlePluginExclude(pluginName)} />
            </Row>
            <Row className={b('row')()} fullwidth>
                <Row col>
                    <Row>
                        <Row col>
                            <Label>Limit Value</Label>
                            <Field
                                type="number"
                                name={`${name}.config.limit.value`}
                                placeholder=""
                                component={Input}
                            />
                        </Row>
                        <Row col>
                            <Label>Limit Unit</Label>
                            <Field
                                name={`${name}.config.limit.units`}
                                type="text"
                                options={optionsTransformer(plugin.config.limit.units)}
                                component={SimpleSelect}
                            />
                        </Row>
                    </Row>
                    <Hint>The maximum number of requests that the Gateway will forward to the upstream_path.</Hint>
                </Row>
                <Row col>
                    <Label>Policy</Label>
                    <Field
                        name={`${name}.config.policy`}
                        type="text"
                        options={plugin.config.policy}
                        component={SimpleSelect}
                    />
                    <Hint>The type of rate-limiting policy used for retrieving and incrementing the limits.</Hint>
                </Row>
            </Row>
        </div>
    );
};

RateLimitPlugin.propTypes = propTypes;

export default RateLimitPlugin;
