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

const propTypes = {
    className: PropTypes.string,
    name: PropTypes.string.isRequired,
    pluginName: PropTypes.string.isRequired,
    handlePluginExclude: PropTypes.func.isRequired,
};

const AuthPlugin = ({ className, name, handlePluginExclude, pluginName }) => {
    const b = block(className);

    return (
        <div className={b('section')()}>
            <Row fullwidth>
                <Row col>
                    <Label>Plugin Name</Label>
                    <Input input={{value: 'oAuth'}} disabled />
                </Row>
                <ControlBar name={`${name}.enabled`} removePlugin={() => handlePluginExclude(pluginName)} />
            </Row>
            <Row className={b('row')()} fullwidth>
                <Row col>
                    <Label>Server Name</Label>
                    <Field
                        name={`${name}.config.server_name`}
                        type="text"
                        placeholder={SETUP.placeholders.auth.server_name}
                        component={Input}
                    />
                    <Hint>The server that the Gateway will use as the oauth provider for requests to the listen_path.</Hint>
                </Row>
            </Row>
        </div>
    );
};

AuthPlugin.propTypes = propTypes;

export default AuthPlugin;
