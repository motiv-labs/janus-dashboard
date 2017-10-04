import React, { Component } from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';
import { deleteProperty } from 'picklock';

import transformFormValues from '../../../helpers/transformFormValues';

import Subtitle from '../../Layout/Title/Subtitle';
import NewApiForm from './NewApiForm';
import EditApiForm from '../EditPage/EditApiForm';
import Preloader from '../../Preloader/Preloader';

const propTypes = {
    api: PropTypes.object.isRequired,
    apiSchema: PropTypes.object.isRequired,
    fetchEndpointSchema: PropTypes.func.isRequired,
    initialValues: PropTypes.object.isRequired,
    resetEndpoint: PropTypes.func.isRequired,
    saveEndpoint: PropTypes.func.isRequired,
    excludePlugin: PropTypes.func.isRequired,
    selectPlugin: PropTypes.func.isRequired,
    selectedPlugins: PropTypes.arrayOf(PropTypes.string).isRequired,
    location: PropTypes.object.isRequired,
    willClone: PropTypes.func.isRequired,
};

class NewApiItem extends Component {
    componentWillMount() {
        this.props.resetEndpoint();

        if (this.hasToBeCloned()) {
            this.props.fetchEndpointSchema();
            this.props.willClone(deleteProperty(this.props.location.state.clone, 'name'));
            return;
        }

        this.props.fetchEndpointSchema();
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
        console.error('this.props.apiSchema => ', this.props.apiSchema);

        if (
            R.isEmpty(this.props.initialValues) ||
            R.isEmpty(this.props.apiSchema)
        ) return <Preloader />;

        if (this.hasToBeCloned() && !R.isEmpty(this.props.api)) {
            console.warn('IF');

            const r = this.props.api.plugins.map(item => item.name);

            return (
                <EditApiForm
                    api={this.props.api}
                    apiSchema={this.props.apiSchema}
                    handleDelete={this.handleDelete}
                    initialValues={this.props.initialValues}
                    selectedPlugins={r}
                    excludePlugin={this.props.excludePlugin}
                    selectPlugin={this.props.selectPlugin}
                    disabled={false}
                    onSubmit={this.submit}
                />
            );
        }
        console.warn('ELSE');


        return (
            <NewApiForm
                apiSchema={this.props.apiSchema}
                onSubmit={this.submit}
                excludePlugin={this.props.excludePlugin}
                initialValues={this.props.initialValues}
                selectPlugin={this.props.selectPlugin}
                selectedPlugins={this.props.selectedPlugins}
            />
        );
    }

    render() {
        console.error('New Api Item => render() => this.props::: ', this.props);

        const { api } = this.props;

        return (
            <div>
                <Subtitle>{api.name}</Subtitle>
                { this.renderForm() }
            </div>
        );
    }
}

NewApiItem.propTypes = propTypes;

export default NewApiItem;
