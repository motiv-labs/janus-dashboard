import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Link,
} from 'react-router-dom';
import Pagimagic from 'react-pagimagic';

import block from '../../../helpers/bem-cn';
import Table from '../../Layout/Table/Table';
import Td from '../../Layout/Table/Td';
import Control from '../../Control/Control';

const propTypes = {
  apiList: PropTypes.arrayOf(PropTypes.object.isRequired),
  currentPageIndex: PropTypes.number.isRequired,
  setCurrentPageIndex: PropTypes.func.isRequired,
  deleteEndpoint: PropTypes.func.isRequired,
  fetchEndpoints: PropTypes.func.isRequired,
  refreshEndpoints: PropTypes.func.isRequired,
};

const table = block('j-table');

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
        <tr className={table('row')} key={api.name}>
          <td className={table('td')}>{api.name}</td>
          <td className={table('td')}>{api.proxy.listen_path}</td>
          <td className={table('td')}>{api.proxy.upstream_url}</td>
          <td className={table('td')}>{`${this.isOauthEnabled(api.plugins)}`}</td>
          <td className={table('td')}>
            {api.active ? <Control type="checked" /> : null}
          </td>
          <td className={table('td')}>
            <Link to={`/${api.name}`}>
              <Control type="edit"/>
            </Link>
          </td>
          <td className={table('td')}>
            <Link
              to={{
                pathname: '/new',
                state: {
                  clone: api,
                },
              }}
            >
              <Control type="copy"/>
            </Link>
          </td>
          <td className={table('td')}>
            <Link
              to={''}
              onClick={() => {
                this.handleDelete(api.name)
              }}
            >
              <Control type="delete"/>
            </Link>
          </td>
        </tr>
      );
    });
  }

  renderTable = list => {
    return (
      <Table className={table}>
        <thead>
          <tr>
            <th className={table('th')}><div>Api Name</div></th>
            <th className={table('th')}>Listen Path</th>
            <th className={table('th')}>Upstream URL</th>
            <th className={table('th')}></th>
            <th className={table('th')}>Active</th>
            <th className={table('th')}></th>
            <th className={table('th')}></th>
          </tr>  
        </thead>
        <tbody className={table('tbody')}>
          { this.renderRows(list) }
        </tbody>
        <tfoot className={table('tfoot')}>
          <tr className={table('tfoot', { tr: true })}>
            <td colSpan="8"></td>
          </tr>
        </tfoot>
      </Table>
    );
  }
  
  render() {
    if (this.props.apiList.length > 0) {
      return (
        <Pagimagic 
          list={this.props.apiList}
          itemsPerPage={3}
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
