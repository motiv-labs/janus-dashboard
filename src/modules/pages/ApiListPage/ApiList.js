import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Link,
} from 'react-router-dom';

import block from '../../../helpers/bem-cn';
import Table from '../../Layout/Table/Table';
import Pagination from '../../Pagination/Pagination';
import Icon from '../../Icon/Icon';

const propTypes = {
    apiList: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
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

    isOauthEnabled = (plugins) => {
    // @TODO: find why
    // if (typeof this.isProtected !== 'undefined') {
    //   return this.isProtected;
    // }
        const oauth = plugins.find(plugin => plugin.name.indexOf('oauth2') > -1);

        return !!oauth && !!oauth.enabled;
    }

    handleDelete = (apiName) => {
        this.props.deleteEndpoint(apiName, this.props.refreshEndpoints);
    };

    renderRows = list => list.map(api => (
        <tr className={table('row')} key={api.name}>
            <td className={table('td')}>{api.name}</td>
            <td className={table('td')}>{api.proxy.listen_path}</td>
            <td className={table('td')}>{api.proxy.upstream_url}</td>
            <td className={table('td')}>{`${this.isOauthEnabled(api.plugins)}`}</td>
            <td className={table('td')}>
                {api.active ? <Icon type="checked" /> : null}
            </td>
            <td className={table('td')}>
                <Link to={`/${api.name}`}>
                    <Icon type="edit" />
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
                    <Icon type="copy" />
                </Link>
            </td>
            <td className={table('td')}>
                <Link
                    to={''}
                    onClick={() => {
                        this.handleDelete(api.name);
                    }}
                >
                    <Icon type="delete" />
                </Link>
            </td>
        </tr>
    ))

    renderTable = list => (
        <Table className={table()}>
            <thead>
                <tr>
                    <th className={table('th')}><div>Api Name</div></th>
                    <th className={table('th')}>Listen Path</th>
                    <th className={table('th')}>Upstream URL</th>
                    <th className={table('th')} />
                    <th className={table('th')}>Active</th>
                    <th className={table('th')} />
                    <th className={table('th')} />
                </tr>
            </thead>
            <tbody className={table('tbody')}>
                { this.renderRows(list) }
            </tbody>
            <tfoot className={table('tfoot')}>
                <tr className={table('tfoot', { tr: true })}>
                    <td colSpan="8" />
                </tr>
            </tfoot>
        </Table>
    )

    render() {
        console.error(this.props.apiList);
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
}

ApiList.propTypes = propTypes;

export default ApiList;
