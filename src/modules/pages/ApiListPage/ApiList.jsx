import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Link,
} from 'react-router-dom';

import Table from '../../Layout/Table/Table';
import Pagination from '../../Pagination/Pagination';

const propTypes = {
  apiList: PropTypes.arrayOf(PropTypes.object.isRequired),
  currentPageIndex: PropTypes.number.isRequired,
  setCurrentPageIndex: PropTypes.func.isRequired,
  deleteEndpoint: PropTypes.func.isRequired,
  fetchEndpoints: PropTypes.func.isRequired,
  refreshEndpoints: PropTypes.func.isRequired,
};

class ApiList extends PureComponent {
  componentDidMount() {
    this.props.fetchEndpoints();
  }

  isOauthEnabled(plugins) {
    // @TODO: find why
    // if (typeof this.isProtected !== 'undefined') {
    //   return this.isProtected;
    // }
    const oauth = plugins.find(plugin => plugin.name.indexOf('oauth2') > -1);

    return !!oauth && !!oauth.enabled;
  };

  handleDelete = (apiName) => {
    this.props.deleteEndpoint(apiName, this.props.refreshEndpoints);
  };

  renderRows = list => {
    return list.map(api => {
      return (
        <tr key={api.name}>
          <td>{api.name}</td>
          <td>{`${api.active}`}</td>
          <td>{api.proxy.listen_path}</td>
          <td>{api.proxy.upstream_url}</td>
          <td>{`${this.isOauthEnabled(api.plugins)}`}</td>
          <td>
            <Link to={`/${api.name}`}>EDIT</Link>
          </td>
          <td>
            <Link
              to={{
                pathname: '/new',
                state: {
                  clone: api,
                },
              }}
            >Clone</Link>
          </td>
          <td>
            <Link
              to={''}
              onClick={() => {
                this.handleDelete(api.name)
              }}
            >
              Delete
            </Link>
          </td>
        </tr>
      );
    });
  }

  renderTable = list => {
    return (
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Active</th>
            <th>Listen Path</th>
            <th>Upstream URL</th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
          </tr>  
        </thead>
        <tbody>
          { this.renderRows(list) }
        </tbody>
      </Table>
    );
  }
  
  render() {
    if (this.props.apiList.length > 0) {
      return (
        <Pagination 
          list={this.props.apiList}
          itemsPerPage={3}
          currentPageIndex={this.props.currentPageIndex}
          changePageIndex={this.props.setCurrentPageIndex}
          maximumVisiblePaginators={3}
          renderChildren={this.renderTable}
        />
      );
    }
    
    return <div>Loading...</div>;
    
  }
};

ApiList.propTypes = propTypes;

export default ApiList;
