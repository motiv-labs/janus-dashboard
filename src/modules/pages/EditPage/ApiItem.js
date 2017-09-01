import React, { Component } from 'react';
import R from 'ramda';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import transformFormValues from '../../../helpers/transformFormValues';

import Button from '../../buttons/Button';
import Icon from '../../Icon/Icon';

import Section from '../../Layout/Section/Section';
import Subtitle from '../../Layout/Title/Subtitle';
import EditApiForm from './EditApiForm';

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
        // console.error('API ITEM did mount:', selectedPlugins);
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

    // submit = (values) => {
    //     const transformedValues = transformFormValues(values, true);

    //     // this.props.updateEndpoint(this.props.location.pathname, transformedValues);
    //     this.props.updateEndpoint(this.props.location.pathname, transformedValues);
    //     // this.props.saveEndpoint(this.props.location.pathname, values);
    // };

    handleDelete = (apiName) => {
        this.props.deleteEndpoint(apiName, this.props.refreshEndpoints);
    };

    render() {
        // console.error('API ITEM api:', this.props.api);

        // const YYY = this.props.api.plugins.map(item => item.name)
        if (!R.isEmpty(this.props.api)) {
            const r = this.props.api.plugins.map(item => item.name);
            // console.warn(r);
            return (
                <EditApiForm
                    api={this.props.api}
                    handleDelete={this.handleDelete}
                    excludePlugin={this.props.excludePlugin}
                    selectPlugin={this.props.selectPlugin}
                    selectedPlugins={r}
                    disabled={true}
                    onSubmit={this.submit}
                />
            );
        }

        return <div>Loading...</div>;
    }
}

ApiItem.propTypes = propTypes;

export default ApiItem;
