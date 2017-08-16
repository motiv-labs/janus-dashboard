import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

import SETUP from '../setup.config';
import block from '../../../../helpers/bem-cn';

import Row from '../../../Layout/Row/Row';
import Label from '../../../labels/Label';
import Input from '../../../inputs/Input';
import Hint from '../../../labels/Hint/Hint';
import ControlBar from '../ControlBar/ControlBar';
import MultiSelect from '../../../selects/MultiSelect/MultiSelect';
import TagSelect from '../../../selects/TagSelect/TagSelect';

const propTypes = {
    className: PropTypes.string,
    name: PropTypes.string.isRequired,
    plugin: PropTypes.object.isRequired,
    pluginName: PropTypes.string.isRequired,
    handlePluginExclude: PropTypes.func.isRequired,
};

const CorsPlugin = ({ className, name, handlePluginExclude, plugin, pluginName }) => {
    const b = block(className);
    const optionsTransformer = config => {
        return config.map(item => ({
            label: item,
            value: item,
        }));
    };

    return (
        <div className={b('section')()}>
            <Row fullwidth>
                <Row col>
                    <Label>Plugin Name</Label>
                    <Input input={{value: 'CORS'}} disabled />
                </Row>
                <ControlBar name={`${name}.enabled`} removePlugin={() => handlePluginExclude(pluginName)} />
            </Row>
            <Row className={b('row')()} fullwidth>
                <Row col>
                    <Label>Domains</Label>
                    <Field
                        name={`${name}.config.domains`}
                        type="text"
                        placeholder={SETUP.placeholders.cors.domains}
                        component={Input}
                    />
                    <Hint>A list of all domains from which the endpoint will accept requests</Hint>
                </Row>
                <Row col>
                    <Label>Methods</Label>
                    <Field
                        name={`${name}.config.methods`}
                        type="text"
                        placeholder={SETUP.placeholders.cors.methods}
                        options={optionsTransformer(plugin.config.methods)}
                        component={MultiSelect}
                    />
                    <Hint>HTTP methods that are supported for the endpoint.</Hint>
                </Row>
            </Row>
            <Row className={b('row')()} fullwidth>
                <Row col>
                    <Label>Request Headers</Label>
                    <Field
                        name={`${name}.config.request_headers`}
                        type="text"
                        placeholder={SETUP.placeholders.cors.request_headers}
                        options={optionsTransformer(plugin.config.request_headers)}
                        component={TagSelect}
                    />
                    <Hint>Value(s) for the Access-Control-Allow-Headers header.</Hint>
                </Row>
                <Row col>
                    <Label>Exposed Headers</Label>
                    <Field
                        name={`${name}.config.exposed_headers`}
                        type="text"
                        placeholder={SETUP.placeholders.cors.request_headers}
                        options={optionsTransformer(plugin.config.exposed_headers)}
                        component={TagSelect}
                    />
                    <Hint>Value for the Access-Control-Expose-Headers header.</Hint>
                </Row>
            </Row>
        </div>
    );
};

CorsPlugin.propTypes = propTypes;

export default CorsPlugin;
