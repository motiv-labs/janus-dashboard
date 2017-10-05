import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import R from 'ramda';

import SETUP from '../setup.config';
import block from '../../../../helpers/bem-cn';

import Row from '../../../Layout/Row/Row';
import Label from '../../../labels/Label';
import Input from '../../../inputs/Input';
import SimpleSelect from '../../../selects/SimpleSelect/SimpleSelect';
import Hint from '../../../labels/Hint/Hint';
import ControlBar from '../ControlBar/ControlBar';

const propTypes = {
    apiSchema: PropTypes.object.isRequired,
    className: PropTypes.string,
    name: PropTypes.string.isRequired,
    pluginName: PropTypes.string.isRequired,
    handlePluginExclude: PropTypes.func.isRequired,
};

const AuthPlugin = ({ apiSchema, className, name, handlePluginExclude, pluginName }) => {
    const b = block(className);
    // console.warn('apiSchema: ', apiSchema.plugins);
    const defaultPlugins = apiSchema.plugins;
    const predicate = R.propEq('name', pluginName);
    const defaultPlugin = R.filter(predicate, defaultPlugins)[0];
    const serverNames = defaultPlugin.config.server_names;
    const createOptions = list => list.reduce((acc, item) => {
        acc.push({
            label: item,
            value: item,
        });

        return acc;
    }, []);

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
                    {/*<Field
                        name={`${name}.config.server_name`}
                        type="text"
                        placeholder={SETUP.placeholders.auth.server_name}
                        component={Input}
                    />*/}
                    <Field
                        name={`${name}.config.server_name`}
                        type="text"
                        searchable={false}
                        clearable={false}
                        options={createOptions(serverNames)}
                        component={SimpleSelect}
                    />
                    <Hint>The server that the Gateway will use as the oauth provider for requests to the listen_path.</Hint>
                </Row>
            </Row>
        </div>
    );
};

AuthPlugin.propTypes = propTypes;

export default AuthPlugin;
