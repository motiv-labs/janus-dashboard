import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { isEmpty } from '../../../helpers';

import Section from '../../Layout/Section/Section';
import Subtitle from '../../Layout/Title/Subtitle';
import EditApiForm from './EditApiForm';

const propTypes = {
  api: PropTypes.object.isRequired,
  deleteAPI: PropTypes.func.isRequired,
  fetchAPI: PropTypes.func.isRequired,
  refreshAPIs: PropTypes.func.isRequired,
  resetAPI: PropTypes.func.isRequired,
  updateAPI: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
};

class ApiItem extends Component {
  componentDidMount() {
    this.props.resetAPI();
    this.props.fetchAPI(this.props.location.pathname);
  };

  submit = values => {
    this.props.updateAPI(this.props.location.pathname, values);
  };

  handleDelete = apiName => {
    this.props.deleteAPI(apiName, this.props.refreshAPIs);
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
