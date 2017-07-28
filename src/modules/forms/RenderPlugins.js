import React from 'react';
import PropTypes from 'prop-types';

import { typeOf } from '../../helpers';

import PluginSection from '../PluginSection/PluginSection';

import Section from '../Layout/Section/Section';
import FormField from './FormField';
import FormLabel from './FormLabel';
import FormInput from './FormInput/FormInput';

const propTypes = {
    plugins: PropTypes.arrayOf(PropTypes.object.isRequired),
};

const RenderPlugin = ({ plugins }) => (
    <Section>
        {
            plugins.map((plugin, index) => (
                <PluginSection key={plugin.name} name={plugin.name}>
                    <FormInput component="input" label="Plugin" attachTo={`plugins[${index}].name`} type="text" disabled />
                    <FormInput component="input" label="Enabled" attachTo={`plugins[${index}].enabled`} type="checkbox" normalize={v => !!v} />
                    <FormField>
                        <FormLabel text="Config" />
                        {
                        plugin.config && Object.keys(plugin.config).map((item) => {
                            const config = plugins[index].config[item];

                            if (typeOf(config, 'Object')) {
                                return (
                                    <FormField key={item}>
                                        <FormLabel text={item} />
                                        {
                                            Object.keys(config).map((el) => {
                                                if (typeOf(config[el], 'Object')) {
                                                    return (
                                                        <FormField key={item}>
                                                            <FormLabel text={item} />
                                                            {
                                                                Object.keys(config[el]).map(e => (
                                                                    <FormInput key={e} component="input" label={e} attachTo={`plugins[${index}].config[${item}][${el}][${e}]`} type="text" />
                                                                ))
                                                            }
                                                        </FormField>
                                                    );
                                                }

                                                return (
                                                    <FormInput key={el} component="input" label={el} attachTo={`plugins[${index}].config[${item}][${el}]`} type="text" />
                                                );
                                            })
                                        }
                                    </FormField>
                                );
                            }

                            return (
                                <FormInput key={item} component="input" label={item} attachTo={`plugins[${index}].config[${item}]`} type="text" />
                            );
                        })
                    }
                    </FormField>
                </PluginSection>
            ))
        }
    </Section>
);

RenderPlugin.propTypes = propTypes;

export default RenderPlugin;
