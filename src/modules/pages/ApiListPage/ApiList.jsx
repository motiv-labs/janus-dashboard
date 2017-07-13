import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Link,
} from 'react-router-dom';
import Pagimagic from 'react-pagimagic';
// import Pagimagic from '../../../P';

import Table from '../../Layout/Table/Table';

const propTypes = {
  apiList: PropTypes.arrayOf(PropTypes.object.isRequired),
  currentPageIndex: PropTypes.number.isRequired,
  setCurrentPageIndex: PropTypes.func.isRequired,
  fetchAPIs: PropTypes.func.isRequired,
};

class ApiList extends PureComponent {
  componentDidMount() {
    this.props.fetchAPIs();
  }

  isOauthEnabled(plugins) {
    // @TODO: find why
    // if (typeof this.isProtected !== 'undefined') {
    //   return this.isProtected;
    // }
    const oauth = plugins.find(plugin => plugin.name.indexOf('oauth2') > -1);

    return !!oauth && !!oauth.enabled;
  }

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
        </tr>
      );
    });
  }

  renderTable = (list) => {
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
        <Pagimagic 
          list={this.props.apiList}
          itemsPerPage={10}
          currentPageIndex={this.props.currentPageIndex}
          changePageIndex={this.props.setCurrentPageIndex}
          className="your-class-if-its-necessary"
          maximumVisiblePaginators={3}
          renderChildren={this.renderTable}
          useDefaultStyles
        />
      );
    }
    
    return <div>Loading...</div>;
    
  }
};

ApiList.propTypes = propTypes;

export default ApiList;
