import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { isEmpty } from '../../../helpers';

import Section from '../../Layout/Section/Section';
import Subtitle from '../../Layout/Title/Subtitle';
import EditApiForm from './EditApiForm';

const propTypes = {
  api: PropTypes.object.isRequired,
  deleteEndpoint: PropTypes.func.isRequired,
  fetchEndpoint: PropTypes.func.isRequired,
  refreshEndpoints: PropTypes.func.isRequired,
  resetEndpoint: PropTypes.func.isRequired,
  updateEndpoint: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
};

class ApiItem extends Component {
  componentDidMount() {
    this.props.resetEndpoint();
    this.props.fetchEndpoint(this.props.location.pathname);
  };

  submit = values => {
    this.props.updateEndpoint(this.props.location.pathname, values);
  };

  handleDelete = apiName => {
    this.props.deleteEndpoint(apiName, this.props.refreshEndpoints);
  };

  render() {
    if (!isEmpty(this.props.api)) {
      return (
        <div>
          <Section>
            <Subtitle>{this.props.api.name}</Subtitle>
            
            <Link
              to={'/'}
              onClick={() => {
                this.handleDelete(this.props.api.name)
              }}
            >
              Delete
            </Link>
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
