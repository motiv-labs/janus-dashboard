import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { deleteProperty } from 'picklock';

import { isEmpty } from '../../../helpers';
import Subtitle from '../../Layout/Title/Subtitle';
import NewApiForm from './NewApiForm';

const propTypes = {
  api: PropTypes.object.isRequired,
  fetchApiSchema: PropTypes.func.isRequired,
  resetAPI: PropTypes.func.isRequired,
  saveAPI: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
};

class NewApiItem extends Component {
  componentWillMount() {
    this.props.resetAPI();
    
    if (this.hasToBeCloned()) {
      this.props.willClone(deleteProperty(this.props.location.state.clone, 'name')); 
    }
    else {
      this.props.fetchApiSchema();
    }
  }

  submit = (values) => {
    this.props.saveAPI(this.props.location.pathname, values);
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
};

NewApiItem.propTypes = propTypes;

export default NewApiItem;
