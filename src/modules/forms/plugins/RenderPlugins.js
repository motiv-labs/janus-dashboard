import React, { Component } from 'react';
import PropTypes from 'prop-types';

import block from '../../../helpers/bem-cn';
import { typeOf } from '../../../helpers';

import PluginSection from '../../PluginSection/PluginSection';
import SelectPlugin from '../../selects/SelectPlugin/SelectPlugin';
import Row from '../../Layout/Row/Row';
import Button from '../../buttons/Button';

import Section from '../../Layout/Section/Section';
import FormField from '../FormField';
import FormLabel from '../FormLabel';
import FormInput from '../FormInput/FormInput';

// import './RenderPlugins.css';
// const b = block('j-plugins');

const propTypes = {
    className: PropTypes.string,
    plugins: PropTypes.arrayOf(PropTypes.object.isRequired),
    handlePluginActivation: PropTypes.func.isRequired,
};

class RenderPlugin extends Component {
    state = {
        visiblePlugins: false,
    }

    showPlugins = () => {
        this.setState(prevState => ({ visiblePlugins: !prevState.visiblePlugins }));
    }

    render() {
        const { className, plugins, handlePluginActivation } = this.props;
        const b = block(className);
        const names = plugins.map(plugin => ({
            label: plugin.name,
            value: plugin.name,
        }));

        return (
            <div>
                {
                    this.state.visiblePlugins &&
                        <Row className={b('row')}>
                            <SelectPlugin
                                name="form-field-name"
                                options={names}
                                onChange={handlePluginActivation}
                            />
                        </Row>
                }

                <Row className={b('row')()}>
                    <Button
                        type="button"
                        mod="primary"
                        onClick={this.showPlugins}
                    >
                        + Add Plugin
                    </Button>
                </Row>

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
            </div>
        );
    };
};

RenderPlugin.propTypes = propTypes;

export default RenderPlugin;
