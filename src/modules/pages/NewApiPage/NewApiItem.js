import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { deleteProperty } from 'picklock';

import { isEmpty } from '../../../helpers';
import Subtitle from '../../Layout/Title/Subtitle';
import NewApiForm from './NewApiForm';

const propTypes = {
  api: PropTypes.object.isRequired,
  fetchEndpointSchema: PropTypes.func.isRequired,
  resetEndpoint: PropTypes.func.isRequired,
  saveEndpoint: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
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

  submit = (values) => {
    this.props.saveEndpoint(this.props.location.pathname, values);
  }

  hasToBeCloned = () => {
    if (this.props.location.state && !isEmpty(this.props.location.state.clone)) {
      return {
        clone: this.props.location.state.clone,
      };
    }
  }

  render() {
    return (
      <div>
        <Subtitle>{this.props.api.name}</Subtitle>
        <NewApiForm onSubmit={this.submit} />
      </div>
    );
  }
}

NewApiItem.propTypes = propTypes;

export default NewApiItem;
