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
import QueryStringSection from './QueryStringSection/QueryStringSection';

const propTypes = {
    className: PropTypes.string,
    name: PropTypes.string.isRequired,
    pluginFromValues: PropTypes.object.isRequired,
    pluginName: PropTypes.string.isRequired,
    handlePluginExclude: PropTypes.func.isRequired,
};

const RequestTransformerPlugin = ({ className, name, handlePluginExclude, plugin, pluginFromValues, pluginName }) => {
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
                    config={pluginFromValues.config.add.headers}
                    title="Add Header"
                    hint="A list of headers that the Gateway should append to the request and the value for each."
                />
                <QueryStringSection
                    name={`${name}.config.add.querystring`}
                    config={pluginFromValues.config.add.querystring}
                    title="Add Query String"
                />
            </Row>
            <Row className={b('row')()} fullwidth>
                <HeadersSection
                    name={`${name}.config.append.headers`}
                    config={pluginFromValues.config.append.headers}
                    title="Append Header"
                    hint="A list of headers that the Gateway should append to the request and the value for each."
                />
            </Row>
            <Row className={b('row')()} fullwidth>
                <HeadersSection
                    name={`${name}.config.replace.headers`}
                    config={pluginFromValues.config.replace.headers}
                    title="Replace Header"
                    hint="A list of headers that the Gateway should append to the request and the value for each."
                />
            </Row>
            <Row className={b('row')()} fullwidth>
                <HeadersSection
                    name={`${name}.config.remove.headers`}
                    config={pluginFromValues.config.remove.headers}
                    title="Remove Header"
                    hint="A list of headers that the Gateway should remove when forwarding the request to the  upstream_url."
                />
            </Row>
        </div>
    );
};

RequestTransformerPlugin.propTypes = propTypes;

export default RequestTransformerPlugin;
