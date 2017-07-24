import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Link,
} from 'react-router-dom';
import Pagimagic from 'react-pagimagic';

import block from '../../../helpers/bem-cn';
import Table from '../../Layout/Table/Table';
import Td from '../../Layout/Table/Td';

const propTypes = {
  apiList: PropTypes.arrayOf(PropTypes.object.isRequired),
  currentPageIndex: PropTypes.number.isRequired,
  setCurrentPageIndex: PropTypes.func.isRequired,
  fetchAPIs: PropTypes.func.isRequired,
};

const table = block('j-table');

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
        <tr className={table('row')}  key={api.name}>
          <Td className={table('td')}>{api.name}</Td>
          <Td className={table('td')}>{`${api.active}`}</Td>
          <Td className={table('td')}>{api.proxy.listen_path}</Td>
          <Td className={table('td')}>{api.proxy.upstream_url}</Td>
          <Td className={table('td')}>{`${this.isOauthEnabled(api.plugins)}`}</Td>
          <Td className={table('td')}>
            <Link to={`/${api.name}`}>EDIT</Link>
          </Td>
          <Td className={table('td')}>
            <Link
              to={{
                pathname: '/new',
                state: {
                  clone: api,
                },
              }}
            >Clone</Link>
          </Td>
        </tr>
      );
    });
  }

  renderTable = (list) => {
    return (
      <Table className={table}>
        <thead>
          <tr>
            <th className={table('th')}><div>Name</div></th>
            <th className={table('th')}>Active</th>
            <th className={table('th')}>Listen Path</th>
            <th className={table('th')}>Upstream URL</th>
            <th className={table('th')}></th>
            <th className={table('th')}></th>
            <th className={table('th')}></th>
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
