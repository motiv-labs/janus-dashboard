import React, { Component } from 'react';
import R from 'ramda';
import PropTypes from 'prop-types';

import transformFormValues from '../../../helpers/transformFormValues';

import EndpointForm from '../../forms/EndpointForm/EndpointForm';
import Preloader from '../../Preloader/Preloader';

const propTypes = {
    api: PropTypes.object.isRequired,
    deleteEndpoint: PropTypes.func.isRequired,
    excludePlugin: PropTypes.func.isRequired,
    fetchEndpointSchema: PropTypes.func.isRequired,
    fillSelected: PropTypes.func.isRequired,
    selectPlugin: PropTypes.func.isRequired,
    fetchEndpoint: PropTypes.func.isRequired,
    refreshEndpoints: PropTypes.func.isRequired,
    resetEndpoint: PropTypes.func.isRequired,
    updateEndpoint: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
};

class ApiItem extends Component {
    componentDidMount() {
        this.props.resetEndpoint();
        this.props.fetchEndpointSchema();
        this.props.fetchEndpoint(this.props.location.pathname);
    }

    fillSelected = (arr) => {
        const selectedPlugins = arr.map(item => item.name);

        this.props.fillSelected(selectedPlugins);
    }

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

        this.props.updateEndpoint(this.props.location.pathname, computedPlugins);
    }

    handleDelete = (apiName) => {
        this.props.deleteEndpoint(apiName);
    };

    render() {
        if (R.isEmpty(this.props.api) || R.isEmpty(this.props.apiSchema)) return <Preloader />;

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

        return (
            <EndpointForm
                api={this.props.api}
                apiSchema={this.props.apiSchema}
                disabled={true}
                editing={true}
                excludePlugin={this.props.excludePlugin}
                handleDelete={this.handleDelete}
                initialValues={transformFormValues(updatedApi)}
                onSubmit={this.submit}
                selectPlugin={this.props.selectPlugin}
                selectedPlugins={this.props.selectedPlugins}
            />
        );
    }
}

ApiItem.propTypes = propTypes;

export default ApiItem;
