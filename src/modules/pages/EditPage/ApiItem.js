import React, { Component } from 'react';
import R from 'ramda';
import PropTypes from 'prop-types';

import transformFormValues from '../../../helpers/transformFormValues';

import EditApiForm from './EditApiForm';
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
        if (!R.isEmpty(this.props.api)) {
            const r = this.props.api.plugins.map(item => item.name);

            return (
                <EditApiForm
                    api={this.props.api}
                    handleDelete={this.handleDelete}
                    excludePlugin={this.props.excludePlugin}
                    selectPlugin={this.props.selectPlugin}
                    selectedPlugins={r}
                    disabled={true}
                    onSubmit={this.submit}
                    location={this.props.location}
                />
            );
        }

        return <Preloader />;
    }
}

ApiItem.propTypes = propTypes;

export default ApiItem;
