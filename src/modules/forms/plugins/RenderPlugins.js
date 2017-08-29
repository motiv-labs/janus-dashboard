import React, { Component } from 'react';
import PropTypes from 'prop-types';

import block from '../../../helpers/bem-cn';

import SelectPlugin from '../../selects/SelectPlugin/SelectPlugin';
import Row from '../../Layout/Row/Row';
import Button from '../../buttons/Button';

import CorsPlugin from './Cors/CorsPlugin';
import RateLimitPlugin from './RateLimit/RateLimitPlugin';
import AuthPlugin from './oAuth/AuthPlugin';
import CompressionPlugin from './Compression/CompressionPlugin';
import RequestTransformerPlugin from './RequestTransformer/RequestTransformerPlugin';

const propTypes = {
    className: PropTypes.string,
    apiSchema: PropTypes.object.isRequired,
    edit: PropTypes.bool,
    initialValues: PropTypes.object,
    plugins: PropTypes.arrayOf(PropTypes.object.isRequired),
    handlePluginExclude: PropTypes.func.isRequired,
    handlePluginInclude: PropTypes.func.isRequired,
    selectedPlugins: PropTypes.arrayOf(PropTypes.string).isRequired,
};

class RenderPlugin extends Component {
    state = {
        visiblePlugins: false,
    }

    showPlugins = () => {
        this.setState({ visiblePlugins: true });
    }

    getPluginIndex = (plugins, pluginName) => {
        const pluginIndex = plugins.findIndex(plugin => {
            return plugin.name === pluginName;
        });

        return pluginIndex;
    }

    render() {
        const { className, apiSchema, edit, plugins, selectedPlugins, handlePluginExclude, handlePluginInclude, initialValues } = this.props;
        // console.error(plugins);
        const b = block(className);
        const names = apiSchema.plugins.map(plugin => ({
            label: plugin.name,
            value: plugin.name,
        }));

        return (
            <div>
                {
                    selectedPlugins.map(pluginName => {
                        const opts = {
                            className: b(),
                            key: pluginName,
                            name: `plugins[${this.getPluginIndex(plugins, pluginName)}]`,
                            handlePluginExclude,
                            plugin: initialValues.plugins[this.getPluginIndex(plugins, pluginName)],
                            pluginFromValues: plugins[this.getPluginIndex(plugins, pluginName)],
                            pluginName,
                            apiSchema,
                            edit,
                        };

                        switch (pluginName) {
                            case 'cors':
                                return (
                                    <CorsPlugin
                                        {...opts}
                                    />
                                );
                            case 'rate_limit':
                                {/*@FIXME: limit units & policy*/}
                                return (
                                    <RateLimitPlugin
                                        {...opts}
                                    />
                                );
                            case 'oauth2':
                                return (
                                    <AuthPlugin
                                        {...opts}
                                    />
                                );
                            case 'compression':
                                return (
                                    <CompressionPlugin
                                        {...opts}
                                    />
                                );
                                {/*@TODO: FIX SOMETHING WOTH REQUEST TRANSFORM*/}
                            case 'request_transformer':
                                return (
                                    <RequestTransformerPlugin
                                        {...opts}
                                    />
                                );
                            default:
                                return null;
                        }
                    })
                }

                {
                    this.state.visiblePlugins &&
                        <Row className={b('row')()}>
                            <SelectPlugin
                                name="form-field-name"
                                options={names}
                                onChange={handlePluginInclude}
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
            </div>
        );
    };
};

RenderPlugin.propTypes = propTypes;

export default RenderPlugin;
