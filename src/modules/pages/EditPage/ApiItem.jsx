import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { isEmpty } from '../../../helpers';

import Section from '../../Layout/Section/Section';
import Subtitle from '../../Layout/Title/Subtitle';
import EditApiForm from './EditApiForm';

const propTypes = {
  api: PropTypes.object.isRequired,
  fetchAPI: PropTypes.func.isRequired,
  resetAPI: PropTypes.func.isRequired,
  updateAPI: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
};

class ApiItem extends Component {
  componentDidMount() {
    this.props.resetAPI();
    this.props.fetchAPI(this.props.location.pathname);
  }

  submit = (values) => {
    // console.log('subm this', this)
    // console.log('Values::: ', values);
    this.props.updateAPI(this.props.location.pathname, values);
  }
  
  render() {
    // console.log('API PROPS:: ', isEmpty(this.props.api));
    if (!isEmpty(this.props.api)) {
      // const keys = Object.keys(this.props.api);
      return (
        <div>
          <Section>
            <Subtitle>{this.props.api.name}</Subtitle>
          </Section>
          <Section>
            <EditApiForm onSubmit={this.submit} />
          </Section>
        </div>
      );
    }
    
    return <div>Loading...</div>;
    
  }
};

ApiItem.propTypes = propTypes;

export default ApiItem;
