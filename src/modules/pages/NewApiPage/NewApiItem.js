import React, { Component } from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';
import { deleteProperty } from 'picklock';

import transformFormValues from '../../../helpers/transformFormValues';

import Subtitle from '../../Layout/Title/Subtitle';
import EndpointForm from '../../forms/EndpointForm/EndpointForm';
import Preloader from '../../Preloader/Preloader';

const propTypes = {
    api: PropTypes.object.isRequired,
    fetchEndpointSchema: PropTypes.func.isRequired,
    resetEndpoint: PropTypes.func.isRequired,
    saveEndpoint: PropTypes.func.isRequired,
    excludePlugin: PropTypes.func.isRequired,
    selectPlugin: PropTypes.func.isRequired,
    selectedPlugins: PropTypes.arrayOf(PropTypes.string).isRequired,
    location: PropTypes.object.isRequired,
    willClone: PropTypes.func.isRequired,
};

class NewApiItem extends Component {
    componentDidMount() {
        this.props.resetEndpoint();

        if (this.hasToBeCloned()) {
            this.props.fetchEndpointSchema();
            this.props.willClone(deleteProperty(this.props.location.state.clone, 'name'));
            return;
        }

        this.props.fetchEndpointSchema(true);
    }

    handleDelete = apiName => {
        this.props.deleteEndpoint(apiName, this.props.refreshEndpoints);
    };

    submit = values => {
        const transformedValues = transformFormValues(values, true);
        const plugins = transformedValues.plugins;
        const selectedPlugins = this.props.selectedPlugins;
        const addedPlugins = plugins.filter((plugin) => {
            return selectedPlugins.indexOf(plugin.name) !== -1;
        });
        const computedPlugins = {
            ...transformedValues,
            plugins: addedPlugins,
        };

        this.props.saveEndpoint(this.props.location.pathname, computedPlugins);
    }

    hasToBeCloned = () => {
        if (this.props.location.state && !R.isEmpty(this.props.location.state.clone)) {
            return {
                clone: this.props.location.state.clone,
            };
        }

        return false;
    }

    renderForm = () => {
        if (R.isEmpty(this.props.apiSchema)) return <Preloader />;

        const isCloning = () => this.hasToBeCloned() && !R.isEmpty(this.props.api);
        const getUpdatedApi = () => {
            const api = this.props.api;
            const apiPlugins = api.plugins;
            const defaultPlugins = this.props.apiSchema.plugins;
            const updatedPlugins = defaultPlugins.map(item => {
                const res = apiPlugins.filter(pl => pl.name === item.name);

                return res.length > 0 ? res[0] : item;
            });
            const lens = R.lensPath(['plugins']);
            // substitude the plugin.config.limit
            const updatedApi = R.set(lens, updatedPlugins, api);

            return updatedApi;
        };

        const passValues = () => isCloning() ? getUpdatedApi() : this.props.apiSchema;

        return (
            <EndpointForm
                api={this.props.api}
                apiSchema={this.props.apiSchema}
                editing={isCloning()}
                disabled={false}
                excludePlugin={this.props.excludePlugin}
                handleDelete={this.handleDelete}
                initialValues={transformFormValues(passValues())}
                onSubmit={this.submit}
                selectedPlugins={this.props.selectedPlugins}
                selectPlugin={this.props.selectPlugin}
            />
        );
    }

    render() {
        return (
            <div>
                <Subtitle>{this.props.api.name}</Subtitle>
                { this.renderForm() }
            </div>
        );
    }
}

NewApiItem.propTypes = propTypes;

export default NewApiItem;
