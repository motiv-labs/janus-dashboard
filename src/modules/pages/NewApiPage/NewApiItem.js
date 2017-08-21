import React, { Component } from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';
import { deleteProperty } from 'picklock';

import transformFormValues from '../../../helpers/transformFormValues';

import Subtitle from '../../Layout/Title/Subtitle';
import NewApiForm from './NewApiForm';

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
    componentWillMount() {
        this.props.resetEndpoint();

        if (this.hasToBeCloned()) {
            this.props.willClone(deleteProperty(this.props.location.state.clone, 'name'));
        } else {
            this.props.fetchEndpointSchema();
        }
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

    render() {
        const { api, excludePlugin, selectPlugin } = this.props;
        return (
            <div>
                <Subtitle>{api.name}</Subtitle>
                <NewApiForm onSubmit={this.submit} excludePlugin={excludePlugin} selectPlugin={selectPlugin} />
            </div>
        );
    }
}

NewApiItem.propTypes = propTypes;

export default NewApiItem;
