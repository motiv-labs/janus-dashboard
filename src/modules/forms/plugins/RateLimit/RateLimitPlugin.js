import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
// import Select from 'react-select';
import Select from '../../../selects/SimpleSelect/SimpleSelect';

import SETUP from '../setup.config';
import block from '../../../../helpers/bem-cn';

import Row from '../../../Layout/Row/Row';
import Label from '../../../labels/Label';
import Input from '../../../inputs/Input';
import Radio from '../../../inputs/Radio/Radio';
import Hint from '../../../labels/Hint/Hint';
import ControlBar from '../ControlBar/ControlBar';
import MultiSelect from '../../../selects/MultiSelect/MultiSelect';
import SimpleSelect from '../../../selects/SimpleSelect/SimpleSelect';
// import Select from '../../../selects/SelectPlugin/SelectPlugin';

const propTypes = {
    className: PropTypes.string,
    name: PropTypes.string.isRequired,
    plugin: PropTypes.object.isRequired,
    pluginName: PropTypes.string.isRequired,
    handlePluginExclude: PropTypes.func.isRequired,
};

const RateLimitPlugin = ({ className, name, handlePluginExclude, plugin, pluginName }) => {
    console.error('PLUGIN:', plugin);
    const b = block(className);
    const optionsTransformer = config => {
        console.error('CONFIG:: ', config);
        return config.map(item => ({
            label: item,
            value: item,
        }));
        // return [
        //     {value: 'bla', label: 'bla'},
        //     {value: 'local', label: 'local'},
        // ];
    };

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
                    <Label>Domains</Label>
                    {/*<Field
                        name={`${name}.config.domains`}
                        type="text"
                        placeholder={SETUP.placeholders.cors.domains}
                        component={Input}
                    />
                    <Hint>A list of all domains from which the endpoint will accept requests</Hint>*/}
                </Row>
                <Row col>
                    <Label>Policy</Label>
                    <Field
                        name={`${name}.config.policy`}
                        type="text"
                        options={optionsTransformer(plugin.config.policy)}
                        component={Select}
                    />
                    <Hint>The type of rate-limiting policy used for retrieving and incrementing the limits.</Hint>
                </Row>
            </Row>
        </div>
    );
};

RateLimitPlugin.propTypes = propTypes;

export default RateLimitPlugin;
