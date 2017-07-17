import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
    // this.props.fetchAPI(this.props.location.pathname);
    // reset form and reducer api
    this.props.resetAPI();
    this.props.fetchApiSchema();
  }

  submit = (values) => {
    console.log('Values for new API::: ', values);
    this.props.saveAPI(this.props.location.pathname, values);
  }
  
  render() {
    console.log('API PROPS:: ', isEmpty(this.props.api));
    // if (!isEmpty(this.props.api)) {
      // const keys = Object.keys(this.props.api);
    return (
      <div>
        <Subtitle>{this.props.api.name}</Subtitle>
        <NewApiForm onSubmit={this.submit} />
      </div>
    );
    // }    
  }
};

NewApiItem.propTypes = propTypes;

export default NewApiItem;
